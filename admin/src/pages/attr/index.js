import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AttrList from './list'
import AttrSave from './savre'

class Attr extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/attr/save/:attrId?' component={AttrSave} />
                <Route path='/attr' component={AttrList} />
            </Switch>
        )
    }
}
export default Attr