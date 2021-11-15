import React, { useRef, useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Title } from '../utils/Title'
import { FilterButtonGroup } from '../utils/FilterButtonGroup'
import { ImageButton } from '../utils/ImageButton'
import { CharacterInfo } from './modals/CharacterInfo'
import { Pagination } from '../utils/Pagination'
import { inventoryItemFilter } from 'app/utils/filterData'
import { authorizedFetch } from 'app/utils/fetch'
import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import 'app/styles/inventory.css'

export function CharacterInventory(props) {
  const [data, setData] = useReducer(dataReducer, {
    items: [],
    filteredItems: [],
    baseItems: [],
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
    const invUrl =
      process.env.REACT_APP_API + process.env.REACT_APP_API_CHARACTER
    const baseUrl =
      process.env.REACT_APP_API + process.env.REACT_APP_API_BASECHARACTER

    Promise.all([
      authorizedFetch('GET', invUrl, {}),
      fetch(baseUrl).then((res) => res.json()),
    ])
      .then(([inventoryData, baseData]) => {
        let baseF = baseData.baseCharacters.map((item) => {
          return item.baseCharacter
        })
        let inventoryF = inventoryData.characters.map((item) => {
          return item.character
        })

        this.pageMax = Math.ceil(inventoryF.length / this.pageElements)
        setData({
          items: inventoryF,
          filteredItems: inventoryF.slice(0, this.pageElements),
          baseCharacters: baseF,
        })
      })
      .catch(console.log)
  }, [])

  function showModal(character) {
    setModal({ show: true, selectedCharacter: character })
  }
  function hideModal() {
    setModal({ show: false })
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

  function getMatchedData() {
    const [filteredData, newPagination] = inventoryItemFilter(
      data.items,
      filter.current,
      pagination.current
    )
    pagination.current = newPagination
    setData(filteredData)
  }

  return (
    <div>
      <div className='floating-button'>
        <Fab color='primary' aria-label='add' className='floating-button'>
          <AddIcon />
        </Fab>
      </div>
      {data.items.length !== 0 ? (
        <div>
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
                  itemData={character.baseCharacter}
                  handleClick={showModal}
                  modalTarget='#infoModal'
                />
              ))}
            </div>
          </div>
          )
        </div>
      ) : (
        <div>
          <div className='container-fluid mt-5 lh-1'>
            <div className='row'>
              <h1 className='text-center fw-bold'>
                You don't have any registered character yet.
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

CharacterInventory.propTypes = {
  races: PropTypes.array,
  elements: PropTypes.array,
  rarities: PropTypes.array,
  styles: PropTypes.array,
  weaponTypes: PropTypes.array,
}
