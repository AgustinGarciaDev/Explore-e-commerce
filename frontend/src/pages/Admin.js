import { NavLink } from 'react-router-dom'
import Header from '../components/Header'
import EditProducts from './EditProducts'

const Admin = () => {
    return (
        <>
            <Header />
            <NavLink to="/add-new-product" >
                <p>add new course</p>
            </NavLink>
            <EditProducts />
        </>
    )
}

export default Admin