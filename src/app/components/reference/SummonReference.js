import React, { useEffect, useReducer, useRef } from 'react'
import SearchField from 'react-search-field'
import PropTypes from 'prop-types'
import { SummonInfo } from './modals/SummonInfo'
import { Title } from '../utils/Title'
import { FilterButtonGroup } from '../utils/FilterButtonGroup'
import { ImageButton } from '../utils/ImageButton'
import { Pagination } from '../utils/Pagination'
import { baseItemFilter } from 'app/utils/filterData'
import 'app/styles/general.css'
import 'app/styles/reference.css'

export function SummonReference(props) {
  const [data, setData] = useReducer(dataReducer, {
    items: [],
    filteredItems: [],
    loading: true,
  })

  const [modal, setModal] = useReducer(modalReducer, {
    show: false,
    selectedSummon: undefined,
  })

  const filter = useRef({
    search: '',
    rarity: '',
    element: '',
    race: '',
    weaponType: '',
  })

  const pagination = useRef({
    pageElements: 120,
    pageMax: 1,
    pageNumber: 0,
    pageChanged: false,
  })

  function dataReducer(state, newData) {
    //initial data
    if (newData.items) {
      return { ...newData, loading: false }
    }

    //update only filteredItems
    return { ...state, filteredItems: newData }
  }

  function modalReducer(state, opt) {
    if (!opt.show) {
      return { show: false, selectedSummon: undefined }
    } else {
      return { show: true, selectedSummon: opt.selectedSummon }
    }
  }

  useEffect(() => {
    const url = process.env.REACT_APP_API + process.env.REACT_APP_API_BASESUMMON
    fetch(url)
      .then((res) => res.json())
      .then((summonData) => {
        let summonDataF = summonData.baseSummons.map((item) => {
          return item.baseSummon
        })

        pagination.current.pageMax = Math.ceil(
          summonDataF.length / pagination.current.pageElements
        )
        setData({
          items: summonDataF,
          filteredItems: summonDataF.slice(0, pagination.current.pageElements),
        })
      })
      .catch(console.log)
  }, [])

  function getMatchedData() {
    const [filteredData, newPagination] = baseItemFilter(
      data.items,
      filter.current,
      pagination.current
    )
    pagination.current = newPagination
    setData(filteredData)
  }

  function onPaginationChange(value) {
    if (
      pagination.current.pageNumber == value ||
      value > pagination.current.pageMax ||
      value < 0
    ) {
      return
    }

    pagination.current.pageChanged = true
    pagination.current.pageNumber = value
    getMatchedData()
  }

  function onFilterChange(filterName, value) {
    console.log(filter.current)
    let changedFilter = filter.current

    //ignore clicks in filters currently selected
    if (filterName == 'element') {
      if (changedFilter.element == value) {
        return
      } else {
        changedFilter.element = value
      }
    } else if (filterName == 'rarity') {
      if (changedFilter.rarity == value) {
        return
      } else {
        changedFilter.rarity = value
      }
    }

    filter.current = changedFilter
    getMatchedData()
  }

  function onSearchChange(value) {
    filter.current.search = value
    getMatchedData()
  }
  function showModal(summon) {
    setModal({ show: true, selectedSummon: summon })
  }
  function hideModal() {
    setModal({ show: false })
  }

  if (data.loading) {
    return (
      <div className='d-flex justify-content-center'>
        <div className='spinner-border loadingSpinner' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className='container mt-4'>
      <Title text='Summons' />
      <SummonInfo
        show={modal.show}
        handleClose={hideModal}
        summon={modal.selectedSummon}
        id='infoModal'
      />
      <div className='row col-lg-6 searchField mx-auto'>
        <SearchField onChange={onSearchChange} placeholder='Search' />
      </div>
      <div className='row col-lg-8 mx-auto'>
        <FilterButtonGroup
          items={props.elements}
          name='element'
          handleChange={onFilterChange}
        />
        <FilterButtonGroup
          items={props.rarities}
          name='rarity'
          handleChange={onFilterChange}
        />
      </div>
      <div className='row mt-3'>
        {data.filteredItems.map((summon, index) => (
          <ImageButton
            key={index}
            item={summon}
            handleClick={showModal}
            modalTarget='#infoModal'
          />
        ))}
      </div>
      <div className='row mt-1 mb-3'>
        <Pagination
          handleChange={onPaginationChange}
          pageMax={pagination.current.pageMax}
          currentPage={pagination.current.pageNumber + 1}
        />
      </div>
    </div>
  )
}

SummonReference.propTypes = {
  rarities: PropTypes.array,
  elements: PropTypes.array,
}
