import { NavLink } from 'react-router-dom'
import Header from '../components/Header'
import EditProducts from './EditProducts'

const Admin = () => {
    return (
        <>
            <Header />
            <EditProducts />
        </>
    )
}

export default Admin