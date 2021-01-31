import React from "react";
import { render } from "react-dom";
import { Header } from "./components/Header";
import { SummonReference } from "./components/reference/SummonReference";
import { WeaponReference } from "./components/reference/WeaponReference";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { sortAlphabetically, removeNeutralRarity } from "./utils/utils";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      rarities: [],
      races: [],
      weaponTypes: [],
      styles: [],
    };
  }
  componentDidMount() {
    let elementUrl =
      process.env.REACT_APP_API + process.env.REACT_APP_API_ELEMENT;
    let rarityUrl =
      process.env.REACT_APP_API + process.env.REACT_APP_API_RARITY;
    let raceUrl = process.env.REACT_APP_API + process.env.REACT_APP_API_RACE;
    let wtypeUrl =
      process.env.REACT_APP_API + process.env.REACT_APP_API_WEAPONTYPE;
    let styleUrl = process.env.REACT_APP_API + process.env.REACT_APP_API_STYLE;

    //GET basic data for use throughout the app
    Promise.all([
      fetch(elementUrl).then((res) => res.json()),
      fetch(rarityUrl).then((res) => res.json()),
      fetch(raceUrl).then((res) => res.json()),
      fetch(wtypeUrl).then((res) => res.json()),
      fetch(styleUrl).then((res) => res.json()),
    ])
      .then(([elementData, rarityData, raceData, wTypeData, styleData]) => {
        let elementDataF = elementData.elements.map((item) => {
          return item.element;
        });
        let rarityDataF = rarityData.rarities.map((item) => {
          return item.rarity;
        });
        let raceDataF = raceData.races.map((item) => {
          return item.race;
        });
        let wTypeDataF = wTypeData.weaponTypes.map((item) => {
          return item.weaponType;
        });
        let styleDataF = styleData.styles.map((item) => {
          return item.style;
        });

        rarityDataF.sort(sortAlphabetically);

        this.setState({
          elements: elementDataF,
          rarities: rarityDataF,
          races: raceDataF,
          weaponTypes: wTypeDataF,
          styles: styleDataF,
        });
      })
      .catch(console.log);
  }

  render() {
    return (
      <div className="container-fluid">
        <Router>
          <div className="row">
            <Header />
            <Switch>
              <Route path="/refWeapon">
                <WeaponReference
                  rarities={this.state.rarities}
                  elements={this.state.elements}
                  weaponTypes={this.state.weaponTypes}
                />
              </Route>
              <Route path="/refCharacter">
                <div></div>
              </Route>
              <Route path="/refSummon">
                <SummonReference
                  elements={this.state.elements}
                  rarities={this.state.rarities}
                />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

render(<App />, window.document.getElementById("app"));
