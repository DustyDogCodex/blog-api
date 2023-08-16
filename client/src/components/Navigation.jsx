import axios from "axios";
import { useContext } from "react";
import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap"
import { MyContext } from "../MyContext";

function Navigation(){
    //same as in our browser router, certain things in the nav bar will be hidden depending one whether a user is logged in or not
    //using context to check for user
    const { userInfo } = useContext(MyContext)

    //function to log out user
    async function logout(e) {
        e.preventDefault()
        axios.get(
            'http://localhost:5000/auth/logout',
            { withCredentials: true }
        )
        .then(res => { 
            if(res.data){
                window.location.assign('/')
            }
        })
        .catch(err => console.log(err))
    }

    return(
        <Navbar bg="info" variant="dark" expand="lg" sticky="top">
            <Container className="d-flex justify-space-between">
                <Navbar.Brand href="/">Bloggy</Navbar.Brand>

                {/* collapsible nav menu */}
                <div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav
                            className="me-auto d-flex align-items-center justify-content-center"
                        >
                            <Nav.Link href="/about">Who We Are</Nav.Link>
                            <Nav.Link href="/addblog">Write</Nav.Link>

                            <Nav.Item>
                                {/* conditional rendering of login/account button */}
                                { 
                                userInfo 
                                    ?   
                                    /* if user is logged in, display avatar and link to account */
                                    <div style={{display:'flex', alignItems:'center'}}>
                                        <Nav.Link href="/account">
                                            <img 
                                                className="navbarImage m-1" 
                                                src={userInfo.avatar || "https://e1.pxfuel.com/desktop-wallpaper/467/133/desktop-wallpaper-pin-on-anime-y-mas-anime-avatar-girl.jpg"}
                                                alt="user avatar" 
                                            />
                                        </Nav.Link>

                                        {/* Logout button */}
                                        <Button 
                                            variant="danger" 
                                            className="m-1" 
                                            type='button'
                                            onClick={logout}
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                    :   
                                    /* if no logged in user, links to login and register */
                                    <div style={{display:'flex'}}>
                                        <Nav.Link href="/login">Login</Nav.Link> 
                                        <Nav.Link href="/register">Register</Nav.Link>
                                    </div>
                                }
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Container>
        </Navbar>
    )
}

export { Navigation }