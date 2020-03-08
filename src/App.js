import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { adminRoutes } from './routes'
import { Frame} from './components'
const menus = adminRoutes.filter(route => route.isNav ===true)
const mapState = state => ({
  isLogin: state.login.isLogin
})
@connect(mapState)
class App extends Component {
  render() {
    return (
      this.props.isLogin ?
     <Frame menus={menus}>
       <Switch>
        {
          adminRoutes.map(route => {
            return <Route 
              key={route.pathname} 
              path={route.pathname} 
              exact={route.ecact}
              render={(routerProps) => {
              return <route.componemt  {...routerProps}/>
            }}/>
          })
        }
         <Redirect to={adminRoutes[0].pathname} from="/admin" exact />
          <Redirect to="/404" />
        </Switch>
     </Frame>
     :
     <Redirect to="/login"/>
    )
  }
}

export default App;