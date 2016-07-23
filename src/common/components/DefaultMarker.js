import React, { PropTypes } from 'react'

const DefaultMarker = () => {
  return (
    <div style={style}>
    </div>
  )
}

export default DefaultMarker

const style = {
  position: 'absolute',
  width: 40,
  height: 40,
  left: -20,
  top: -40,
  backgroundImage: "url('/static/icons/marker.svg')",
  backgroundSize: 'cover'
}
