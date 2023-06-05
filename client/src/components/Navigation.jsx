import axios from "axios";
import { Navbar, Container, NavDropdown, Nav, Button } from "react-bootstrap"

function Navigation(){
    //same as in our browser router, certain things in the nav bar will be hidden depending one whether a user is logged in or not
    const user = false

    //function to log user out and invalidate set cookies.
    async function logout(e) {
        e.preventDefault()
        const res = await axios.get('http://localhost:5000/auth/logout')
        console.log(res)
    }

    return(
        <Navbar bg="light" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="/">Bloggy</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto d-flex align-items-center justify-content-center">
                        <Nav.Link href="/">About</Nav.Link>
                        <Nav.Link href="#contact">Contact</Nav.Link>
                        <Nav.Link href="/addblog">Write</Nav.Link>

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

                        <Nav.Link href="/account">
                            { 
                            user 
                            ?   <div style={{display:'flex', alignItems:'center'}}>
                                    <img 
                                        className="navbarImage m-1" 
                                        src="https://e1.pxfuel.com/desktop-wallpaper/467/133/desktop-wallpaper-pin-on-anime-y-mas-anime-avatar-girl.jpg" 
                                        alt="user avatar" 
                                    />
                                    <Button variant="danger" className="m-1" onClick={logout}>Logout</Button>
                                </div>
                            :   <div style={{display:'flex'}}>
                                    <Nav.Link href="/login">Login</Nav.Link> 
                                    <Nav.Link href="/register">Register</Nav.Link>
                                </div>
                            }
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export { Navigation }