import React, { useEffect, useReducer, useRef } from 'react'
import SearchField from 'react-search-field'
import PropTypes from 'prop-types'
import { Title } from '../utils/Title'
import { CharacterInfo } from './modals/CharacterInfo'
import { FilterButtonGroup } from '../utils/FilterButtonGroup'
import { ImageButton } from '../utils/ImageButton'
import { Pagination } from '../utils/Pagination'
import { baseItemFilter } from 'app/utils/filterData'
import 'app/styles/general.css'
import 'app/styles/reference.css'

export function CharacterReference(props) {
  const [data, setData] = useReducer(dataReducer, {
    items: [],
    filteredItems: [],
    loading: true,
  })

  const [modal, setModal] = useReducer(modalReducer, {
    show: false,
    selectedCharacter: undefined,
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
      return { show: false, selectedCharacter: undefined }
    } else {
      return { show: true, selectedCharacter: opt.selectedCharacter }
    }
  }

  useEffect(() => {
    const url =
      process.env.REACT_APP_API + process.env.REACT_APP_API_BASECHARACTER
    fetch(url)
      .then((res) => res.json())
      .then((charaData) => {
        let charaDataF = charaData.baseCharacters.map((item) => {
          return item.baseCharacter
        })

        pagination.current.pageMax = Math.ceil(
          charaDataF.length / pagination.current.pageElements
        )

        setData({
          items: charaDataF,
          filteredItems: charaDataF.slice(0, pagination.current.pageElements),
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
    } else if (filterName == 'weaponType') {
      if (changedFilter.weaponType == value) {
        return
      } else {
        changedFilter.weaponType = value
      }
    } else if (filterName == 'race') {
      if (changedFilter.race == value) {
        return
      } else {
        changedFilter.race = value
      }
    } else if (filterName == 'style') {
      if (changedFilter.style == value) {
        return
      } else {
        changedFilter.style = value
      }
    }

    filter.current = changedFilter
    getMatchedData()
  }

  function onSearchChange(value) {
    filter.current.search = value
    getMatchedData()
  }
  function showModal(character) {
    setModal({ show: true, selectedCharacter: character })
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
      <Title text='Characters' />
      <CharacterInfo
        show={modal.show}
        handleClose={hideModal}
        character={modal.selectedCharacter}
        id='infoModal'
      />
      <div className='row col-lg-6 searchField mx-auto'>
        <SearchField onChange={onSearchChange} placeholder='Search' />
      </div>
      <div className='row col-lg-8 mx-auto'>
        <FilterButtonGroup
          handleChange={onFilterChange}
          name={'weaponType'}
          items={props.weaponTypes}
        />
        <FilterButtonGroup
          handleChange={onFilterChange}
          name={'element'}
          items={props.elements}
        />
        <FilterButtonGroup
          handleChange={onFilterChange}
          name={'race'}
          items={props.races}
        />
        <FilterButtonGroup
          handleChange={onFilterChange}
          name={'style'}
          items={props.styles}
        />
        <FilterButtonGroup
          handleChange={onFilterChange}
          name={'rarity'}
          items={props.rarities}
        />
      </div>
      <div className='row mt-3'>
        {data.filteredItems.map((character, index) => (
          <ImageButton
            key={index}
            item={character}
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

CharacterReference.propTypes = {
  races: PropTypes.array,
  elements: PropTypes.array,
  rarities: PropTypes.array,
  styles: PropTypes.array,
  weaponTypes: PropTypes.array,
}
