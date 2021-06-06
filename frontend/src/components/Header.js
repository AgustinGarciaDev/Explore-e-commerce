import { Navbar, Nav } from 'react-bootstrap'
import { connect } from "react-redux"
import { LinkContainer } from 'react-router-bootstrap'
import userActions from '../redux/actions/userActions'

const Header = (props) => {

    return (
        <Navbar collapseOnSelect expand="lg" variant="light">

            <LinkContainer to="/" >
                <Navbar.Brand>
                    <div className="logo" style={{ backgroundImage: `url('http://tingarciadg.com/wp-content/uploads/2021/05/Diseno-sin-titulo-4.png')` }} />
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" bg="light" variant="light">
                    < LinkContainer to="/sextoy" className="navigator">
                        <Nav.Link> Sex toys </Nav.Link>
                    </ LinkContainer>

                    < LinkContainer to="/accesories" className="navigator">
                        <Nav.Link> Accesories </Nav.Link>
                    </ LinkContainer>
                    < LinkContainer to="/products" className="navigator">
                        <Nav.Link> All products </Nav.Link>
                    </ LinkContainer>
                    {
                        props.userLooged.usuarioStatus && props.userLooged.usuarioStatus.admin &&
                        <>
                            < LinkContainer to="/admin" className="navigator">
                                <Nav.Link> Admin </Nav.Link>
                            </ LinkContainer>
                        </>
                    }
                </Nav>
                <Nav>
                    {
                        !props.userLooged.usuarioStatus
                            ?
                            <>
                                < LinkContainer className="navigator" to="/signin" >
                                    <Nav.Link> Sign in </Nav.Link>
                                </ LinkContainer>
                                < LinkContainer className="navigator" to="/signup"  >
                                    <Nav.Link eventKey={2}> Sign Up </Nav.Link>
                                </ LinkContainer>
                            </>
                            :
                            <>
                                <div className="userLogo" style={{ backgroundImage: `url('${props.userLooged.usuarioStatus.img}')` }} />
                                <p className="signOutHeader" onClick={props.signOut}>Sign out</p>
                            </>
                    }
                    <LinkContainer to="/shoppingCart">
                        <Nav.Link className="cartContainerHeader" >
                            <i className="fas fa-shopping-cart"></i>
                            <span className="totalCartHeader">{props.accountant}</span>
                        </Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

const mapStateToProps = state => {
    return {
        accountant: state.cart.accountant,
        userLooged: state.user
    }
}

const mapDispatchToProps = {
    signOut: userActions.SignOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)