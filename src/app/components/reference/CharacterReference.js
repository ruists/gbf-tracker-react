import React from "react";
import SearchField from "react-search-field";
import PropTypes from "prop-types";
import { Title } from "../utils/Title";
import { CharacterInfo } from "./modals/CharacterInfo";
import { FilterButtonGroup } from "../utils/FilterButtonGroup";
import { ImageButton } from "../utils/ImageButton";
import { Pagination } from "../utils/Pagination";
import "app/styles/reference.css";

export class CharacterReference extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      filteredItems: [],
      show: false,
      selectedCharacter: undefined,
    };

    this.filter = {
      search: "",
      rarity: "",
      element: "",
      race: "",
      weaponType: ""
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
      filteredData = newData.filter((character) => {
        return character.name.toLowerCase().includes(filter);
      });
      newData = filteredData;
    }
    if (this.filter.rarity) {
      filter = this.filter.rarity.toLowerCase();
      filteredData = newData.filter((character) => {
        return character.rarity.name.toLowerCase() == filter;
      });
      newData = filteredData;
    }
    if (this.filter.element) {
      filter = this.filter.element.toLowerCase();
      filteredData = newData.filter((character) => {
        return character.element.name.toLowerCase() == filter;
      });
      newData = filteredData;
    }
    if (this.filter.weaponType) {
      filter = this.filter.weaponType.toLowerCase();
      filteredData = newData.filter((character) => {
        return character.weaponType.name.toLowerCase() == filter;
      });
      newData = filteredData;
    }
    if (this.filter.style) {
      filter = this.filter.style.toLowerCase();
      filteredData = newData.filter((character) => {
        return character.style.name.toLowerCase == filter;
      });
      newData = filteredData;
    }
    if (this.filter.race) {
      filter = this.filter.race.toLowerCase();
      filteredData = newData.filter((character) => {
        return character.race.name.toLowerCase == filter;
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
    } else if (filterName == "race") {
      if (changedFilter.race == value) {
        return;
      } else {
        changedFilter.race = value;
      }
    } else if (filterName == "style") {
      if (changedFilter.style == value) {
        return;
      } else {
        changedFilter.style = value;
      }
    }

    this.filter = changedFilter;
    this.setState({ filteredItems: this.getMatchedData() });
  };
  onSearchChange = (value) => {
    this.filter.search = value;
    this.setState({ filteredItems: this.getMatchedData() });
  };
  showModal = (character) => {
    this.setState({ show: true, selectedCharacter: character });
  };
  hideModal = () => {
    this.setState({ show: false });
  };

  componentDidMount() {
    const url =
      process.env.REACT_APP_API + process.env.REACT_APP_API_BASECHARACTER;
    fetch(url)
      .then((res) => res.json())
      .then((charaData) => {
        let charaDataF = charaData.baseCharacters.map((item) => {
          return item.baseCharacter;
        });

        this.pageMax = Math.ceil(charaDataF.length / this.pageElements);
        this.setState({
          items: charaDataF,
          filteredItems: charaDataF.slice(0, this.pageElements),
        });
      })
      .catch(console.log);
  }

  render() {
    return (
      <div className="container mt-4">
        <Title text="Characters" />
        <CharacterInfo />
        <div className="row col-lg-6 searchField mx-auto">
          <SearchField onChange={this.onSearchChange} placeholder="Search" />
        </div>
        <div className="row col-lg-8 mx-auto">
          <FilterButtonGroup
            handleChange={this.onFilterChange}
            name={"race"}
            items={this.props.races}
          />
          <FilterButtonGroup
            handleChange={this.onFilterChange}
            name={"weaponType"}
            items={this.props.weaponTypes}
          />
          <FilterButtonGroup
            handleChange={this.onFilterChange}
            name={"style"}
            items={this.props.styles}
          />
          <FilterButtonGroup
            handleChange={this.onFilterChange}
            name={"element"}
            items={this.props.elements}
          />
          <FilterButtonGroup
            handleChange={this.onFilterChange}
            name={"rarity"}
            items={this.props.rarities}
          />
        </div>
        <div className="row mt-3">
          {this.state.filteredItems.map((character, index) => (
            <ImageButton
              key={index}
              item={character}
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

CharacterReference.propTypes = {
  races: PropTypes.array,
  elements: PropTypes.array,
  rarities: PropTypes.array,
  styles: PropTypes.array,
  weaponTypes: PropTypes.array,
};
