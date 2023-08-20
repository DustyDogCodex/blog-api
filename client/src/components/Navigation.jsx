import axios from "axios"
import { useContext } from "react"
import { Navbar, Container, Nav, Button } from "react-bootstrap"
import { MyContext } from "../MyContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons"

function Navigation(){
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
        <>
        {/* custom background color for navbar */}
        <style type="text/css">
            {`
                .navbar-custom {
                    background: rgb(255, 172, 28);
                }
                .nav-link, .navbar-brand{
                    color: white;
                }
                .navbar-brand{
                    font-size: 2.5rem;
                    font-family: 'Permanent Marker', cursive;
                }
                .nav-link{
                    font-size: 1.1rem;
                    font-family: 'Roboto Mono', sans-serif;
                }
                .navbar-toggler{
                    border: 1px solid white;
                }
                .navbar-toggler:focus{
                    box-shadow: 2px 2px white;
                }
            `}
        </style>

        <Navbar variant="custom" expand="lg" sticky="top">
            <Container style={{ display:'flex', justifyContent:'space-between' }}>
                <Navbar.Brand href="/">Bloggy</Navbar.Brand>

                {/* collapsible nav menu */}
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <FontAwesomeIcon 
                        icon={faBars} 
                        style={{color: "#ffffff", height:'2rem'}} 
                    />
                </Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav
                        className="justify-content-end align-items-center"
                        style={{ width:'100%' }}
                    >
                        <Nav.Link href="/about">Who We Are</Nav.Link>
                        <Nav.Link href="/addblog">Write</Nav.Link>
                        {/* conditional rendering of login/account button */}
                        {userInfo 
                            ?   
                            /* if user is logged in, display avatar and link to account */
                            <>
                                {/* link to user dashboard */}
                                <Nav.Link href="/dashboard">
                                    {/* conditionally rendering avatar or icon */}
                                    {userInfo.avatar
                                        ?
                                        <img 
                                            style={{ width:'2rem', height:'2rem', borderRadius:'100%' }}
                                            src={`http://localhost:5000/uploads/${userInfo.avatar}`}
                                            alt="user avatar" 
                                        />
                                        :
                                        <FontAwesomeIcon 
                                            icon={faUser} 
                                            style={{ color:'white', height:'1.5rem', width:'1.5rem' }} 
                                        />
                                    }                                            
                                </Nav.Link>

                                {/* Logout button */}
                                <Button 
                                    variant="danger" 
                                    type='button'
                                    onClick={logout}
                                >
                                    Logout
                                </Button>
                            </>
                            :   
                            /* if no logged in user, links to login and register */
                            <>
                                <Nav.Link href="/login">Login</Nav.Link> 
                                <Nav.Link href="/register">Register</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    )
}

export { Navigation }