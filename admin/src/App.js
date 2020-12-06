import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Login from 'pages/login'
import Home from 'pages/home'
import User from 'pages/user'
import NotFound from 'pages/not-found'
import { getUsername } from './util'



class App extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        //自定义保护组件路由（验证是否已经登录）
        const ProtectRoute = ({ component: Component, ...rest }) => (
            <Route
                {...rest}
                render={() => (getUsername() ? <Component /> : <Redirect to='/login' />)}
            />
        )
        const LoginRoute = ({ component: Component, ...rest }) => (
            <Route
                {...rest}
                render={() => (getUsername() ? <Redirect to='/' /> : <Component />)}
            />
        )
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <ProtectRoute exact={true} path='/' component={Home} />
                        <LoginRoute path='/login' component={Login} />
                        <ProtectRoute exact={true} path='/user' component={User} />
                        <Route path='*' component={NotFound} />
                    </Switch>
                </div>
            </Router >

        )
    }
}
export default App