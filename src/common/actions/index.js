import axios from 'axios'

export const MAP_INITIALIZE = 'MAP_INITIALIZE'
export const POKEMON_NEW_BUNCH = 'POKEMON_NEW_BUNCH'

export function initializeMap() {
  return (dispatch, getState) => {
    return axios.get('http://localhost:3000/init')
      .then((response) => {
        dispatch(setMapProps(response.data))
      })
  }
}

export function setMapProps(props) {
  return {
    type: MAP_INITIALIZE,
    payload: props
  }
}

export function initializeData() {
  return (dispatch, getState) => {
    axios.get('/pokemons')
      .then((response) => {
        dispatch(newBunchPokemons(response.data))
      })
  }
}

function newBunchPokemons(pokemons) {
  return {
    type: POKEMON_NEW_BUNCH,
    payload: pokemons
  }
}
