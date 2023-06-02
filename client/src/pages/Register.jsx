import { Form, Button } from "react-bootstrap";

function Register(){

    return(
        <div className="login">
            <h1 style={{fontFamily:'Permanent Marker, cursive', fontSize:'60px', marginBottom:'30px'}}>Create a New Account</h1>
            <Form className="d-flex flex-column">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter your username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" />
                </Form.Group>
    
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <p style={{marginTop:'30px'}}>Already have an account?</p>
            <Button variant="success" type="button">
                Login
            </Button>
        </div>
    )
}

export { Register }