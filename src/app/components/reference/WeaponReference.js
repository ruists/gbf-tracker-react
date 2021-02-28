import React, { useRef, useState, useReducer, useEffect } from 'react'
import SearchField from 'react-search-field'
import PropTypes from 'prop-types'
import { WeaponInfo } from './modals/WeaponInfo'
import { Title } from '../utils/Title'
import { FilterButtonGroup } from '../utils/FilterButtonGroup'
import { ImageButton } from '../utils/ImageButton'
import { Pagination } from '../utils/Pagination'
import { baseItemFilter } from 'app/utils/filterData'
import 'app/styles/reference.css'
import 'app/styles/general.css'

export function WeaponReference(props) {
  const [data, setData] = useReducer(dataReducer, {
    items: [],
    filteredItems: [],
    loading: true,
  })

  const [modal, setModal] = useReducer(modalReducer, {
    show: false,
    selectedWeapon: undefined,
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
      return { show: false, selectedWeapon: undefined }
    } else {
      return { show: true, selectedWeapon: opt.selectedWeapon }
    }
  }

  useEffect(() => {
    const url = process.env.REACT_APP_API + process.env.REACT_APP_API_BASEWEAPON
    fetch(url)
      .then((res) => res.json())
      .then((weaponData) => {
        let weaponDataF = weaponData.baseWeapons.map((item) => {
          return item.baseWeapon
        })

        pagination.current.pageMax = Math.ceil(
          weaponDataF.length / pagination.current.pageElements
        )
        setData({
          items: weaponDataF,
          filteredItems: weaponDataF.slice(0, pagination.current.pageElements),
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
    }

    filter.current = changedFilter
    getMatchedData()
  }

  function onSearchChange(value) {
    filter.current.search = value
    getMatchedData()
  }

  function showModal(weapon) {
    setModal({ show: true, selectedWeapon: weapon })
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
      <Title text='Weapons' />
      <WeaponInfo
        show={modal.show}
        handleClose={hideModal}
        weapon={modal.selectedWeapon}
        id='infoModal'
      />
      <div className='row col-lg-6 searchField mx-auto'>
        <SearchField onChange={onSearchChange} placeholder='Search' />
      </div>
      <div className='row col-lg-8 mx-auto'>
        <FilterButtonGroup
          items={props.weaponTypes}
          name='weaponType'
          handleChange={onFilterChange}
        />
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
        {data.filteredItems.map((weapon, index) => (
          <ImageButton
            key={index}
            item={weapon}
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

WeaponReference.propTypes = {
  rarities: PropTypes.array,
  elements: PropTypes.array,
  weaponTypes: PropTypes.array,
}
