import * as ActionTypes from '../actions'

const mapProperties = (state = { lat: 0, lng: 0, apiKey: "" }, action) => {
  switch(action.type) {
    case ActionTypes.MAP_INITIALIZE:
      return Object.assign({}, state, action.payload)

    default:
      return state
  }
}

export default mapProperties

export const selector = (state) => {
  return {
    bootstrapURLKeys: {
      key: state.apiKey,
      language: 'en'
    },
    defaultCenter: [state.lat, state.lng],
    defaultZoom: 16
  }
}
