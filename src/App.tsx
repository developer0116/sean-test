import React from 'react'
import './App.less'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Home, User } from 'pages'
interface IProps {
  history: any
}

function App({ history }: IProps) {
  return (
    <div className='App'>
      <ConnectedRouter history={history}>
        <Router>
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/user/:id' component={User} exact />
          </Switch>
        </Router>
      </ConnectedRouter>
    </div>
  )
}

export default App
