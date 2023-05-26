import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap"

function Navigation(){
    return(
        <Navbar bg="light" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="#home">Bloggy</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto d-flex align-items-center justify-content-center">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                        <Nav.Link href="#contact">Contact</Nav.Link>
                        <Nav.Link href="#write">Write</Nav.Link>
                        <NavDropdown title="Socials" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Twitter</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Github
                            </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">LinkedIn</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#account">
                            <img 
                                className="navbarImage" 
                                src="https://e1.pxfuel.com/desktop-wallpaper/467/133/desktop-wallpaper-pin-on-anime-y-mas-anime-avatar-girl.jpg" 
                                alt="avatar" 
                            />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export { Navigation }