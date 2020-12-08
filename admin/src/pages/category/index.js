import React from 'react'
import { Route, Switch } from 'react-router-dom'
import CategoryList from './list'
import CategorySave from './savre'

class Category extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/category/save/:categoryId?' component={CategorySave} />
                <Route path='/category' component={CategoryList} />
            </Switch>
        )
    }
}
export default Category