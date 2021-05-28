import { Navbar, Nav } from 'react-bootstrap'
const Header = () => {
    return (
        <Navbar collapseOnSelect expand="lg" variant="dark">
            <Navbar.Brand href="#home">
                <img src="http://baravdg.com/wp-content/uploads/2021/05/Diseno-sin-titulo-1.png" alt="" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#features">Sex toy</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <Nav.Link href="#pricing">All products</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#deets">Sign In</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">
                        Sign Up
                  </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header