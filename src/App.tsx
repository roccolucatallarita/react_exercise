import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Home } from './pages/Home'

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/:type/:page/:name?" component={Home} />
          <Redirect from="/" to={'/characters/1'} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
