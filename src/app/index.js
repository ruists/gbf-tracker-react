import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoute";
import { Header } from "./components/Header";
import { SummonReference } from "./components/reference/SummonReference";
import { WeaponReference } from "./components/reference/WeaponReference";
import { CharacterReference } from "./components/reference/CharacterReference";
import { Register } from "./components/authentication/Register";
import { NotAuthenticated } from "./components/error/NotAuthenticated";
import { authenticationService } from "./services/authentication.service";
import {
  sortAlphabetically,
  removeNeutralRarity,
  removeAnyElement,
} from "./utils/utils";
import "app/styles/general.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      rarities: [],
      races: [],
      weaponTypes: [],
      styles: [],
      currentUser: null,
      isAuthenticated: false,
      loading: true,
    };

    let userSubscription = null;
  }

  register = async (usr, pwd) => {
    return authenticationService.register(usr, pwd);
  };
  login = async (usr, pwd) => {
    return authenticationService.login(usr, pwd);
  };
  logout = () => {
    authenticationService.logout();
  };

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
          loading: false,
        });

        userSubscription = this.userSubscription = authenticationService.currentUser.subscribe(
          (x) => this.setState({ currentUser: x, isAuthenticated: x != null })
        );
      })
      .catch(console.log);
  }

  componentWillUnmount() {
    this.userSubscription?.unsubscribe();
  }

  render() {
    return (
      <div className="container-fluid">
        <Router>
          <div className="row">
            <Header
              isAuthenticated={this.state.isAuthenticated}
              handleLogin={this.login}
              handleLogout={this.logout}
              userName={this.state.currentUser?.name}
            />
            {this.state.loading ? (
              <div className="d-flex justify-content-center">
                <div
                  className="spinner-border loadingSpinner align-middle"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <Switch>
                {!this.state.isAuthenticated && (
                  <Route path="/register">
                    <Register handleRegistration={this.register} />
                  </Route>
                )}
                <Route path="/refWeapon">
                  <WeaponReference
                    rarities={this.state.rarities}
                    elements={removeAnyElement(this.state.elements)}
                    weaponTypes={this.state.weaponTypes}
                  />
                </Route>
                <Route path="/refCharacter">
                  <CharacterReference
                    races={this.state.races}
                    rarities={removeNeutralRarity(this.state.rarities)}
                    elements={this.state.elements}
                    weaponTypes={this.state.weaponTypes}
                    styles={this.state.styles}
                  />
                </Route>
                <Route path="/refSummon">
                  <SummonReference
                    elements={removeAnyElement(this.state.elements)}
                    rarities={this.state.rarities}
                  />
                </Route>
                <Route path="/401">
                  <NotAuthenticated />
                </Route>
                <PrivateRoute path="/weapon"></PrivateRoute>
                <PrivateRoute path="/character"></PrivateRoute>
                <PrivateRoute path="/summon"></PrivateRoute>
              </Switch>
            )}
          </div>
        </Router>
      </div>
    );
  }
}

render(<App />, window.document.getElementById("app"));
