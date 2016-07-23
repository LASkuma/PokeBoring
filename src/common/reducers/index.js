import { combineReducers } from 'redux'
import mapProperties from './mapProperties'
import pokemons from './pokemons'

export default function createReducer(asyncReducers) {
  return combineReducers({
    mapProperties,
    pokemons
  })
}
