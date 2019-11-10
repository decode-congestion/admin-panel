import React, { useState, useEffect } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Switch } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AdminMap = ({ showBuses }) => {
  const [lat, setLat] = useState(49.246292)
  const [lng, setLng] = useState(-123.116226)
  const [zoom, setZoom] = useState(13)
  const [buses, setBuses] = useState([])

  useEffect(() => {
    const fetchBusData = () => {
      axios.get('/api/vehicles')
      .then(res => {
        setBuses(res.data)
      })
    }

    fetchBusData()
    const int = setInterval(fetchBusData, 4000)

    return (() => {
      clearInterval(int)
    })
  }, [])

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
      {
        showBuses && buses.map(b => (
          <Marker key={b.vehicle_no} position={[b.lat, b.long]}>
            <Popup>
              <Link to={`/buses/${b.vehicle_no}`}><b>Vehicle: {b.vehicle_no}</b></Link>
            </Popup>
          </Marker>
        ))
      }
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
            <h2><Link to={`/tasks`}><b>Tasks</b></Link></h2>

          </div>
        </div>
        <AdminMap showBuses={showBuses}/>
    </div>
  )
}

export default Screen