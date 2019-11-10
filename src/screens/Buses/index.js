import React, { useState } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Switch } from 'antd'

const AdminMap = () => {
  const [lat, setLat] = useState(51.505)
  const [lng, setLng] = useState(-0.09)
  const [zoom, setZoom] = useState(13)

  const position = [lat, lng]
  return (
    <Map style={{
      height: '100vh',
      width: '80vw'
    }} center={position} zoom={zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </Map>
  )
}

const Screen = () => {
  const [showBuses, setShowBuses] = useState(true)
  
  const onChange = (checked) => {
    setShowBuses(checked)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row'
    }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          width: '20vw',
          padding: '50px'
        }}>
          <div>
            <Switch 
            checkedChildren="Buses" unCheckedChildren="Buses"
            defaultChecked onChange={onChange} />
          </div>
        </div>
        <AdminMap showBuses={showBuses}/>
    </div>
  )
}

export default Screen