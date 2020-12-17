import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AdList from './list'
import AdtegorySave from './savre'

class Ad extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/ad/save/:adId?' component={AdtegorySave} />
                <Route path='/ad' component={AdList} />
            </Switch>
        )
    }
}
export default Ad