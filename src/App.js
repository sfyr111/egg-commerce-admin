import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'

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
            <Route></Route>
          </div>
        );
  }
}

export default App;
