import { Navbar, Nav } from 'react-bootstrap'
import { connect } from "react-redux"
import { LinkContainer } from 'react-router-bootstrap'


const Header = (props) => {
    return (
        <Navbar collapseOnSelect expand="lg" variant="light">

            <LinkContainer to="/" >
                <Navbar.Brand>
                    <img className="logo" src="http://tingarciadg.com/wp-content/uploads/2021/05/Diseno-sin-titulo-4.png" alt="" />
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" bg="light" variant="light">
                    < LinkContainer to="/sextoy">
                        <Nav.Link> Sex toy </Nav.Link>
                    </ LinkContainer>

                    < LinkContainer to="/accesories" >
                        <Nav.Link> Accesories </Nav.Link>
                    </ LinkContainer>
                    < LinkContainer to="/products" >
                        <Nav.Link> All products </Nav.Link>
                    </ LinkContainer>
                </Nav>
                <Nav>
                    < LinkContainer to="/ds" >
                        <Nav.Link> Sign In </Nav.Link>
                    </ LinkContainer>
                    < LinkContainer to="/signup"  >
                        <Nav.Link eventKey={2}> Sign Up </Nav.Link>
                    </ LinkContainer>
                    <h2>{props.accountant}</h2>
                    <LinkContainer to="/shoppingCart">
                        <Nav.Link > Cart </Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

const mapStateToProps = state => {
    return {
        accountant: state.cart.accountant
    }
}

export default connect(mapStateToProps)(Header)