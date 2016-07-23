import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import GoogleMap from 'google-map-react'
import { provideHooks } from 'redial'
import DefaultMarker from '../components/DefaultMarker'
import Marker from '../components/Marker'
import * as mapProperties from '../reducers/mapProperties'
import * as pokemons from '../reducers/pokemons'
import { initializeMap } from '../actions'

const redial = {
  fetch: ({ dispatch }) => dispatch(initializeMap())
}

const Map = ({ map, pmids, pokemons }) => {
  return (
    <div style={style}>
      <GoogleMap {...map}>
        <DefaultMarker lat={map.defaultCenter[0]} lng={map.defaultCenter[1]}/>
        {pmids.map((id) => {
          return (<Marker lat={pokemons[id]['latitude']} lng={pokemons[id]['longitude']} key={id} id={id} />)
        })}
      </GoogleMap>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    map: mapProperties.selector(state.mapProperties),
    pmids: pokemons.ids(state.pokemons),
    pokemons: state.pokemons
  }
}

export default provideHooks(redial)(connect(mapStateToProps)(Map))

const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
}
