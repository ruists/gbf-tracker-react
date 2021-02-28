import React, { useEffect, useReducer, useState } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './utils/PrivateRoute'
import { Header } from './components/Header'
import { SummonReference } from './components/reference/SummonReference'
import { WeaponReference } from './components/reference/WeaponReference'
import { CharacterReference } from './components/reference/CharacterReference'
import { Register } from './components/authentication/Register'
import { NotAuthenticated } from './components/error/NotAuthenticated'
import { authenticationService } from './services/authentication.service'
import {
  sortAlphabetically,
  removeNeutralRarity,
  removeAnyElement,
} from './utils/utils'
import 'app/styles/general.css'

async function register(usr, pwd) {
  return authenticationService.register(usr, pwd)
}
async function login(usr, pwd) {
  return authenticationService.login(usr, pwd)
}
function logout() {
  authenticationService.logout()
}

function App() {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    currentUser: null,
  })
  const [data, setData] = useReducer(dataReducer, {
    elements: [],
    rarities: [],
    races: [],
    weaponTypes: [],
    styles: [],
    loading: true,
  })
  let userSubscription = null

  function dataReducer(state, newState) {
    return { ...newState, loading: false }
  }

  //fetch data needed throughout the app
  useEffect(() => {
    let elementUrl =
      process.env.REACT_APP_API + process.env.REACT_APP_API_ELEMENT
    let rarityUrl = process.env.REACT_APP_API + process.env.REACT_APP_API_RARITY
    let raceUrl = process.env.REACT_APP_API + process.env.REACT_APP_API_RACE
    let wtypeUrl =
      process.env.REACT_APP_API + process.env.REACT_APP_API_WEAPONTYPE
    let styleUrl = process.env.REACT_APP_API + process.env.REACT_APP_API_STYLE

    Promise.all([
      fetch(elementUrl).then((res) => res.json()),
      fetch(rarityUrl).then((res) => res.json()),
      fetch(raceUrl).then((res) => res.json()),
      fetch(wtypeUrl).then((res) => res.json()),
      fetch(styleUrl).then((res) => res.json()),
    ])
      .then(([elementData, rarityData, raceData, wTypeData, styleData]) => {
        let elementDataF = elementData.elements.map((item) => {
          return item.element
        })
        let rarityDataF = rarityData.rarities.map((item) => {
          return item.rarity
        })
        let raceDataF = raceData.races.map((item) => {
          return item.race
        })
        let wTypeDataF = wTypeData.weaponTypes.map((item) => {
          return item.weaponType
        })
        let styleDataF = styleData.styles.map((item) => {
          return item.style
        })

        rarityDataF.sort(sortAlphabetically)

        setData({
          elements: elementDataF,
          rarities: rarityDataF,
          races: raceDataF,
          weaponTypes: wTypeDataF,
          styles: styleDataF,
        })

        userSubscription = authenticationService.currentUser.subscribe((x) =>
          setAuth({ currentUser: x, isAuthenticated: x != null })
        )
        return () => userSubscription?.unsubscribe()
      })
      .catch(console.log)
  }, [])

  return (
    <div className='container-fluid'>
      <Router>
        <div className='row'>
          <Header
            isAuthenticated={auth.isAuthenticated}
            handleLogin={login}
            handleLogout={logout}
            userName={auth.currentUser?.name}
          />
          {data.loading ? (
            <div className='d-flex justify-content-center'>
              <div
                className='spinner-border loadingSpinner align-middle'
                role='status'
              >
                <span className='visually-hidden'>Loading...</span>
              </div>
            </div>
          ) : (
            <Switch>
              {!auth.isAuthenticated && (
                <Route path='/register'>
                  <Register handleRegistration={register} />
                </Route>
              )}
              <Route path='/refWeapon'>
                <WeaponReference
                  rarities={data.rarities}
                  elements={removeAnyElement(data.elements)}
                  weaponTypes={data.weaponTypes}
                />
              </Route>
              <Route path='/refCharacter'>
                <CharacterReference
                  races={data.races}
                  rarities={removeNeutralRarity(data.rarities)}
                  elements={data.elements}
                  weaponTypes={data.weaponTypes}
                  styles={data.styles}
                />
              </Route>
              <Route path='/refSummon'>
                <SummonReference
                  elements={removeAnyElement(data.elements)}
                  rarities={data.rarities}
                />
              </Route>
              <Route path='/401'>
                <NotAuthenticated />
              </Route>
              <PrivateRoute path='/weapon'></PrivateRoute>
              <PrivateRoute path='/character'></PrivateRoute>
              <PrivateRoute path='/summon'></PrivateRoute>
            </Switch>
          )}
        </div>
      </Router>
    </div>
  )
}

render(<App />, window.document.getElementById('app'))
