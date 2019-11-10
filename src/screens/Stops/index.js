import React, { useState, useEffect } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Switch } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import MarkerClusterGroup from 'react-leaflet-markercluster';


const AdminMap = ({ showStops, showBuses, route }) => {
  const [lat, setLat] = useState(49.246292)
  const [lng, setLng] = useState(-123.116226)
  const [zoom, setZoom] = useState(13)
  const [buses, setBuses] = useState([])
  const [stops, setStops] = useState([])

  useEffect(() => {
    if (route) {
        const fetchStopData = () => {
            axios.get(`/api/stops/${route.route_no}/${route.direction}`)
            .then(res => {
                setStops(res.data)
            })
        }
        
        fetchStopData()
    }
  }, [route])

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
      {/* <MarkerClusterGroup> */}

      {
        showStops ? stops.map(s => (
          <Marker key={s.stop_no} position={[s.lat, s.long]}>
            <Popup>
              <Link to={`/stops/${s.stop_no}`}><b>Stop: {s.stop_no}</b></Link>
            </Popup>
          </Marker>
        )) : null
      }
    {/* </MarkerClusterGroup> */}

    </Map>
  )
}

const Screen = () => {
    // buses SHOULD only be buses with passengers on them
    const [showBuses, setShowBuses] = useState(true)
    const [showStops, setShowStops] = useState(true)
    const [routes, setRoutes] = useState([])
    const [route, setRoute] = useState(null)


    useEffect(() => {
        const fetchRoutes = () => {
        axios.get('/api/routes')
            .then(res => {
                setRoutes(res.data.routes)
            })
        }

        fetchRoutes()
    }, [])

    const onChangeStops = (checked) => {
        setShowStops(checked)
    }

    const onChangeBuses = (checked) => {
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
            defaultChecked onChange={onChangeBuses} />
            <Switch 
            checkedChildren="Stops" unCheckedChildren="Stops"
            defaultChecked onChange={onChangeStops} />

            <h2><Link to={`/tasks`}><b>Tasks</b></Link></h2>
            <div style={{
                height: '50vh',
                overflow: 'scroll'
            }}>
                {
                    routes.map((r, i) => <p key={i} onClick={() => setRoute(r)}>{r.route_no}</p>)
                }
            </div>

            </div>
        </div>
        <AdminMap route={route} showBuses={showBuses} showStops={showStops}/>
    </div>
  )
}

export default Screen