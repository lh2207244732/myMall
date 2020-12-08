import React from 'react'
import { Link } from 'react-router-dom'

class CategoryList extends React.Component {
    render() {
        return (
            <div className='CategoryList'>
                <Link to='/category/save'><p>新增</p></Link>
                CategoryList page
            </div>
        )
    }
}
export default CategoryList