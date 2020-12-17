import React from 'react'
import { Route, Switch } from 'react-router-dom'
import OrderList from './list'
import OrderDetail from './detail'

class Order extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/order/detail/:orderId?' component={OrderDetail} />
                <Route path='/order' component={OrderList} />
            </Switch>
        )
    }
}
export default Order