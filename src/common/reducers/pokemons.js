import * as ActionTypes from '../actions'

const pokemons = (state={}, action) => {
  switch(action.type) {
    case ActionTypes.POKEMON_NEW_BUNCH:
      return Object.assign({}, state, normalizePokemons(action.payload))

    default:
      return state
  }
}

export default pokemons

const normalizePokemons = (pokemonArray) => {
  return pokemonArray.reduce((prev, current) => {
    const id = current['encounter_id']
    prev[id] = current
    return prev
  }, {})
}

export const ids = (pokemons) => {
  return Object.keys(pokemons)
}
