import React from "react";
import SearchField from "react-search-field";
import PropTypes from "prop-types";
import { WeaponInfo } from "./modals/WeaponInfo";
import { Title } from "../utils/Title";
import { FilterButtonGroup } from "../utils/FilterButtonGroup";
import { ImageButton } from "../utils/ImageButton";
import { Pagination } from "../utils/Pagination";
import "app/styles/reference.css";

export class WeaponReference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      filteredItems: [],
      show: false,
      selectedWeapon: undefined,
    };

    this.filter = {
      search: "",
      rarity: "",
      element: "",
      weaponType: "",
    };

    this.pageElements = 120;
    this.pageMax = 1;
    this.pageNumber = 0;
    this.pageChanged = false;

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onPaginationChange = this.onPaginationChange.bind(this);
  }

  getMatchedData = () => {
    let newData = this.state.items;
    let filteredData = [];
    let filter = "";

    if (this.filter.search) {
      filter = this.filter.search.toLowerCase();
      filteredData = newData.filter((weapon) => {
        return weapon.name.toLowerCase().includes(filter);
      });
      newData = filteredData;
    }
    if (this.filter.rarity) {
      filter = this.filter.rarity.toLowerCase();
      filteredData = newData.filter((weapon) => {
        return weapon.rarity.name.toLowerCase() == filter;
      });
      newData = filteredData;
    }
    if (this.filter.element) {
      filter = this.filter.element.toLowerCase();
      filteredData = newData.filter((weapon) => {
        return weapon.element.name.toLowerCase() == filter;
      });
      newData = filteredData;
    }
    if (this.filter.weaponType) {
      filter = this.filter.weaponType.toLowerCase();
      filteredData = newData.filter((weapon) => {
        return weapon.weaponType.name.toLowerCase() == filter;
      });
      newData = filteredData;
    }

    //prepare results according to pagination settings
    if (!this.pageChanged) {
      let pageMax = Math.ceil(newData.length / this.pageElements);
      this.pageNumber = 0;
      this.pageMax = pageMax;
    }
    let initIndex =
      this.pageNumber == 0 ? 0 : this.pageNumber * this.pageElements + 1;
    let finalIndex = initIndex + this.pageElements;
    this.pageChanged = false;

    filteredData = newData.slice(initIndex, finalIndex);
    return filteredData;
  };

  onPaginationChange = (value) => {
    if (this.pageNumber == value || value > this.pageMax || value < 0) {
      return;
    }

    this.pageChanged = true;
    this.pageNumber = value;
    this.setState({ filteredItems: this.getMatchedData() });
  };
  onFilterChange = (filterName, value) => {
    let changedFilter = this.filter;

    //ignore clicks in filters currently selected
    if (filterName == "element") {
      if (changedFilter.element == value) {
        return;
      } else {
        changedFilter.element = value;
      }
    } else if (filterName == "rarity") {
      if (changedFilter.rarity == value) {
        return;
      } else {
        changedFilter.rarity = value;
      }
    } else if (filterName == "weaponType") {
      if (changedFilter.weaponType == value) {
        return;
      } else {
        changedFilter.weaponType = value;
      }
    }

    this.filter = changedFilter;
    this.setState({ filteredItems: this.getMatchedData() });
  };
  onSearchChange = (value) => {
    this.filter.search = value;
    this.setState({ filteredItems: this.getMatchedData() });
  };
  showModal = (weapon) => {
    this.setState({ show: true, selectedWeapon: weapon });
  };
  hideModal = () => {
    this.setState({ show: false });
  };

  componentDidMount() {
    const url =
      process.env.REACT_APP_API + process.env.REACT_APP_API_BASEWEAPON;
    fetch(url)
      .then((res) => res.json())
      .then((weaponData) => {
        let weaponDataF = weaponData.baseWeapons.map((item) => {
          return item.baseWeapon;
        });

        this.pageMax = Math.ceil(weaponDataF.length / this.pageElements);
        this.setState({
          items: weaponDataF,
          filteredItems: weaponDataF.slice(0, this.pageElements),
        });
      })
      .catch(console.log);
  }

  render() {
    return (
      <div className="container mt-4">
        <Title text="Weapons" />
        <WeaponInfo
          show={this.state.show}
          handleClose={this.hideModal}
          weapon={this.state.selectedWeapon}
          id="infoModal"
        />
        <div className="row col-lg-6 searchField mx-auto">
          <SearchField onChange={this.onSearchChange} placeholder="Search" />
        </div>
        <div className="row col-lg-8 mx-auto">
          <FilterButtonGroup
            items={this.props.weaponTypes}
            name="weaponType"
            handleChange={this.onFilterChange}
          />
          <FilterButtonGroup
            items={this.props.elements}
            name="element"
            handleChange={this.onFilterChange}
          />
          <FilterButtonGroup
            items={this.props.rarities}
            name="rarity"
            handleChange={this.onFilterChange}
          />
        </div>
        <div className="row mt-3">
          {this.state.filteredItems.map((weapon, index) => (
            <ImageButton
              key={index}
              item={weapon}
              handleClick={this.showModal}
              modalTarget="#infoModal"
            />
          ))}
        </div>
        <div className="row mt-1 mb-3">
          <Pagination
            handleChange={this.onPaginationChange}
            pageMax={this.pageMax}
            currentPage={this.pageNumber + 1}
          />
        </div>
      </div>
    );
  }
}

WeaponReference.propTypes = {
  rarities: PropTypes.array,
  elements: PropTypes.array,
  weaponTypes: PropTypes.array,
};
