import React from "react";
import SearchField from "react-search-field";
import { SummonInfo } from "./modals/SummonInfo";
import { Title } from "../utils/Title";
import { FilterButtonGroup } from "../utils/FilterButtonGroup";
import { ImageButton } from "../utils/ImageButton";
import { Pagination } from "../utils/Pagination";
import "app/styles/reference.css";

export class SummonReference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filteredItems: [],
      filter: {
        search: "",
        rarity: "",
        element: "",
      },
      show: false,
      selectedSummon: undefined,
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

    if (this.state.filter.search) {
      filter = this.state.filter.search.toLowerCase();
      filteredData = newData.filter((summon) => {
        return summon.name.toLowerCase().includes(filter);
      });
      newData = filteredData;
    }
    if (this.state.filter.rarity) {
      filter = this.state.filter.rarity.toLowerCase();
      filteredData = newData.filter((summon) => {
        return summon.rarity.name.toLowerCase() == filter;
      });
      newData = filteredData;
    }
    if (this.state.filter.element) {
      filter = this.state.filter.element.toLowerCase();
      filteredData = newData.filter((summon) => {
        return summon.element.name.toLowerCase() == filter;
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
    let changedFilter = this.state.filter;

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
    }

    this.setState({ filter: changedFilter });
    this.setState({ filteredItems: this.getMatchedData() });
  };
  onSearchChange = (value) => {
    let changedFilter = this.state.filter;
    changedFilter.search = value;
    this.setState({ filter: changedFilter });
    this.setState({ filteredItems: this.getMatchedData() });
  };
  showModal = (summon) => {
    this.setState({ show: true, selectedSummon: summon });
  };
  hideModal = () => {
    this.setState({ show: false });
  };

  componentDidMount() {
    const url =
      process.env.REACT_APP_API + process.env.REACT_APP_API_BASESUMMON;
    fetch(url)
      .then((res) => res.json())
      .then((summonData) => {
        let summonDataF = summonData.baseSummons.map((item) => {
          return item.baseSummon;
        });

        this.pageMax = Math.ceil(summonDataF.length / this.pageElements);
        this.setState({
          items: summonDataF,
          filteredItems: summonDataF.slice(0, this.pageElements),
        });
      })
      .catch(console.log);
  }

  shouldComponentUpdate(nextProps, nextState) {
    //avoid updating if any of the filter options are changed
    //update components only when actual data or modal state changes
    if (this.state.filter.search != nextState.filter.search) {
      return false;
    } else if (this.state.filter.rarity != nextState.filter.rarity) {
      return false;
    } else if (this.state.filter.element != nextState.filter.element) {
      return false;
    }

    return true;
  }

  render() {
    return (
      <div className="container mt-4">
        <Title text="Summons" />
        <SummonInfo
          show={this.state.show}
          handleClose={this.hideModal}
          summon={this.state.selectedSummon}
          id="infoModal"
        />
        <div className="row col-lg-6 searchField mx-auto">
          <SearchField onChange={this.onSearchChange} placeholder="Search" />
        </div>
        <div className="row col-lg-8 mx-auto">
          <FilterButtonGroup
            items={this.props.rarities}
            name="rarity"
            handleChange={this.onFilterChange}
          />
          <FilterButtonGroup
            items={this.props.elements}
            name="element"
            handleChange={this.onFilterChange}
          />
        </div>
        <div className="row mt-3">
          {this.state.filteredItems.map((summon, index) => (
            <ImageButton
              key={index}
              item={summon}
              handleClick={this.showModal}
              modalTarget="#infoModal"
            />
          ))}
        </div>
        <div className="row mt-1 mb-3">
          <Pagination
            handleChange={this.onPaginationChange}
            pageMax={this.pageMax}
            currentPage={this.pageNumber+1}
          />
        </div>
      </div>
    );
  }
}
