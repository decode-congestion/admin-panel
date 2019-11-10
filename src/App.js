import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Button } from 'antd'

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



function App() {
  return (
    <Router>
      <div style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/buses"></Redirect>
          </Route>
          <Route exact path="/buses">
            <Button>Hello world</Button>
            <AdminMap />
          </Route>
          <Route exact path="/buses/:id">
            <h1>Specific bus</h1>
          </Route>
          <Route exact path="/tasks">
            <h1>Tasks</h1>
          </Route>
          <Route exact path="/stops">
            <h1>All stops</h1>
          </Route>
          <Route exact path="/stops/:id">
            <h1>Single stop</h1>
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
