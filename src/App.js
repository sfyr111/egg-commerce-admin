/**
 * create by yangran on 2018/3/1
 */

import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Login from './container/login/login'
import AuthRoute from './component/authroute/authroute'
import Dashboard from './component/dashboard/dashboard'
import NotFound from './component/not-found/not-found'

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
              <Route exact path='/' render={() => <Redirect to='/index' push />}></Route>
              <Route path='/login' component={Login} />
              {/*<Route path='/dashboard' component={Dashboard} />*/}
              <Route path='/404' component={NotFound}></Route>
              <Route component={Dashboard} />
              {/*<Route component={NotFound}></Route>*/}
            </Switch>
          </div>
        )
  }
}

export default App
