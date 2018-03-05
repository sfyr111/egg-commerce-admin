/**
 * create by yangran on 2018/3/1
 */

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Login from './container/login/login'
import AuthRoute from './component/authroute/authroute'
import Dashboard from './component/dashboard/dashboard'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  componentDidCatch() {
    console.log('ERROR')
    this.setState({ hasError: true })
  }

  render() {
    return this.state.hasError
      ? <h2>出错了</h2>
      : (
          <div className="App">
            <AuthRoute />
            <Switch>
              <Route path='/login' component={Login} />
              {/*<Route path='/dashboard' component={Dashboard} />*/}
              <Route component={Dashboard} />
            </Switch>
          </div>
        )
  }
}

export default App
