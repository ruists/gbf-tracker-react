import React from 'react'
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

export class CharacterReference extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      filteredItems: [],
      show: false,
      selectedCharacter: undefined,
      loading: true,
    }

    this.filter = {
      search: '',
      rarity: '',
      element: '',
      race: '',
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
    // this.setState({ filteredItems: this.getMatchedData() })
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

    this.filter = changedFilter
    this.getMatchedData()
    // this.setState({ filteredItems: this.getMatchedData() })
  }
  onSearchChange = (value) => {
    this.filter.search = value
    this.getMatchedData()
    // this.setState({ filteredItems: this.getMatchedData() })
  }
  showModal = (character) => {
    this.setState({ show: true, selectedCharacter: character })
  }
  hideModal = () => {
    this.setState({ show: false })
  }

  componentDidMount() {
    const url =
      process.env.REACT_APP_API + process.env.REACT_APP_API_BASECHARACTER
    fetch(url)
      .then((res) => res.json())
      .then((charaData) => {
        let charaDataF = charaData.baseCharacters.map((item) => {
          return item.baseCharacter
        })

        this.pagination.pageMax = Math.ceil(
          charaDataF.length / this.pagination.pageElements
        )

        console.log(this.pagination.pageMax)
        this.setState({
          items: charaDataF,
          filteredItems: charaDataF.slice(0, this.pageElements),
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
        <Title text='Characters' />
        <CharacterInfo
          show={this.state.show}
          handleClose={this.hideModal}
          character={this.state.selectedCharacter}
          id='infoModal'
        />
        <div className='row col-lg-6 searchField mx-auto'>
          <SearchField onChange={this.onSearchChange} placeholder='Search' />
        </div>
        <div className='row col-lg-8 mx-auto'>
          <FilterButtonGroup
            handleChange={this.onFilterChange}
            name={'weaponType'}
            items={this.props.weaponTypes}
          />
          <FilterButtonGroup
            handleChange={this.onFilterChange}
            name={'element'}
            items={this.props.elements}
          />
          <FilterButtonGroup
            handleChange={this.onFilterChange}
            name={'race'}
            items={this.props.races}
          />
          <FilterButtonGroup
            handleChange={this.onFilterChange}
            name={'style'}
            items={this.props.styles}
          />
          <FilterButtonGroup
            handleChange={this.onFilterChange}
            name={'rarity'}
            items={this.props.rarities}
          />
        </div>
        <div className='row mt-3'>
          {this.state.filteredItems.map((character, index) => (
            <ImageButton
              key={index}
              item={character}
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

CharacterReference.propTypes = {
  races: PropTypes.array,
  elements: PropTypes.array,
  rarities: PropTypes.array,
  styles: PropTypes.array,
  weaponTypes: PropTypes.array,
}
