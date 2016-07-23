import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const Marker = ({ pokemons, id }) => {

  const pokemon = pokemons[id]
  const pmid = pokemon['pokemon_id']

  const style = {
    position: 'absolute',
    width: 30,
    height: 30,
    left: -15,
    top: -15,
    backgroundImage: `url('/static/icons/${pmid}.png')`,
    backgroundSize: 'cover'
  }

  return (
    <div style={style}>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    pokemons: state.pokemons
  }
}

export default connect(mapStateToProps)(Marker)
