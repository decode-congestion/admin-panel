import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import BusesScreen from './screens/Buses'
import BusScreen from './screens/Bus'
import StopsScreen from './screens/Stops'
import StopScreen from './screens/Stop'
import TasksScreen from './screens/Tasks'

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
            <BusesScreen />
          </Route>
          <Route exact path="/buses/:id">
            <BusScreen />
          </Route>
          <Route exact path="/tasks">
            <TasksScreen />
          </Route>
          <Route exact path="/stops">
            <StopsScreen />
          </Route>
          <Route exact path="/stops/:id">
            <StopScreen />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
