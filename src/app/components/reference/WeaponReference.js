import React from 'react'
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

export class WeaponReference extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: [],
      filteredItems: [],
      show: false,
      selectedWeapon: undefined,
      loading: true,
    }

    this.filter = {
      search: '',
      rarity: '',
      element: '',
      weaponType: '',
    }

    this.pagination = {
      pageElements: 120,
      pageMax: 1,
      pageNumber: 0,
      pageChanged: false,
    }

    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onFilterChange = this.onFilterChange.bind(this)
    this.onPaginationChange = this.onPaginationChange.bind(this)
  }

  getMatchedData = () => {
    const [filteredData, newPagination] = baseItemFilter(
      this.state.items,
      this.filter,
      this.pagination
    )
    this.pagination = newPagination
    this.setState({ filteredItems: filteredData })
  }

  onPaginationChange = (value) => {
    if (
      this.pagination.pageNumber == value ||
      value > this.pagination.pageMax ||
      value < 0
    ) {
      return
    }

    this.pagination.pageChanged = true
    this.pagination.pageNumber = value
    this.getMatchedData()
  }
  onFilterChange = (filterName, value) => {
    let changedFilter = this.filter

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

    this.filter = changedFilter
    this.getMatchedData()
  }
  onSearchChange = (value) => {
    this.filter.search = value
    this.getMatchedData()
  }
  showModal = (weapon) => {
    this.setState({ show: true, selectedWeapon: weapon })
  }
  hideModal = () => {
    this.setState({ show: false })
  }

  componentDidMount() {
    const url = process.env.REACT_APP_API + process.env.REACT_APP_API_BASEWEAPON
    fetch(url)
      .then((res) => res.json())
      .then((weaponData) => {
        let weaponDataF = weaponData.baseWeapons.map((item) => {
          return item.baseWeapon
        })

        this.pagination.pageMax = Math.ceil(
          weaponDataF.length / this.pagination.pageElements
        )
        this.setState({
          items: weaponDataF,
          filteredItems: weaponDataF.slice(0, this.pagination.pageElements),
          loading: false,
        })
      })
      .catch(console.log)
  }

  render() {
    if (this.state.loading) {
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
          show={this.state.show}
          handleClose={this.hideModal}
          weapon={this.state.selectedWeapon}
          id='infoModal'
        />
        <div className='row col-lg-6 searchField mx-auto'>
          <SearchField onChange={this.onSearchChange} placeholder='Search' />
        </div>
        <div className='row col-lg-8 mx-auto'>
          <FilterButtonGroup
            items={this.props.weaponTypes}
            name='weaponType'
            handleChange={this.onFilterChange}
          />
          <FilterButtonGroup
            items={this.props.elements}
            name='element'
            handleChange={this.onFilterChange}
          />
          <FilterButtonGroup
            items={this.props.rarities}
            name='rarity'
            handleChange={this.onFilterChange}
          />
        </div>
        <div className='row mt-3'>
          {this.state.filteredItems.map((weapon, index) => (
            <ImageButton
              key={index}
              item={weapon}
              handleClick={this.showModal}
              modalTarget='#infoModal'
            />
          ))}
        </div>
        <div className='row mt-1 mb-3'>
          <Pagination
            handleChange={this.onPaginationChange}
            pageMax={this.pagination.pageMax}
            currentPage={this.pagination.pageNumber + 1}
          />
        </div>
      </div>
    )
  }
}

WeaponReference.propTypes = {
  rarities: PropTypes.array,
  elements: PropTypes.array,
  weaponTypes: PropTypes.array,
}
