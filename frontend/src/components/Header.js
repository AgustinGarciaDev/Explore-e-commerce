import { Navbar, Nav } from 'react-bootstrap'
import { connect } from "react-redux"
import { Link } from "react-router-dom"

const Header = (props) => {
    return (
        <Navbar collapseOnSelect expand="lg" variant="light">
            <Navbar.Brand href="#home">
                <img className="logo" src="http://tingarciadg.com/wp-content/uploads/2021/05/Diseno-sin-titulo-4.png" alt="" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" bg="light" variant="light">
                    <Nav.Link href="#features">Sex toy</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <Nav.Link href="#pricing">All products</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#deets">Sign In</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">
                        Sign Up
                  </Nav.Link>
                  <h2>{props.accountant}</h2>
                  <Link to="/shoppingCart">cart</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

const mapStateToProps = state =>{
    return{
        accountant: state.cart.accountant
    }
}

export default connect(mapStateToProps)(Header)