import React from 'react'
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

export class SummonReference extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      filteredItems: [],
      show: false,
      selectedSummon: undefined,
      loading: true,
    }

    this.filter = {
      search: '',
      rarity: '',
      element: '',
    }

    //set initial paging values
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
    }

    this.filter = changedFilter
    this.getMatchedData()
  }
  onSearchChange = (value) => {
    this.filter.search = value
    this.getMatchedData()
  }
  showModal = (summon) => {
    this.setState({ show: true, selectedSummon: summon })
  }
  hideModal = () => {
    this.setState({ show: false })
  }

  componentDidMount() {
    const url = process.env.REACT_APP_API + process.env.REACT_APP_API_BASESUMMON
    fetch(url)
      .then((res) => res.json())
      .then((summonData) => {
        let summonDataF = summonData.baseSummons.map((item) => {
          return item.baseSummon
        })

        this.pagination.pageMax = Math.ceil(
          summonDataF.length / this.pagination.pageElements
        )
        this.setState({
          items: summonDataF,
          filteredItems: summonDataF.slice(0, this.pagination.pageElements),
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
        <Title text='Summons' />
        <SummonInfo
          show={this.state.show}
          handleClose={this.hideModal}
          summon={this.state.selectedSummon}
          id='infoModal'
        />
        <div className='row col-lg-6 searchField mx-auto'>
          <SearchField onChange={this.onSearchChange} placeholder='Search' />
        </div>
        <div className='row col-lg-8 mx-auto'>
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
          {this.state.filteredItems.map((summon, index) => (
            <ImageButton
              key={index}
              item={summon}
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

SummonReference.propTypes = {
  rarities: PropTypes.array,
  elements: PropTypes.array,
}
