import { NavLink } from 'react-router-dom'

const Admin = () => {
    return (
        <>
            <h1>soy admin</h1>
            <NavLink to="/add-new-product" >
                <p>add new course</p>
            </NavLink>
            <NavLink to="/edit-products" >
                <p>edit products</p>
            </NavLink>
        </>
    )
}

export default Admin