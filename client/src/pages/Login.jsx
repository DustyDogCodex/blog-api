import { Container, Form, Button } from "react-bootstrap";

function Login(){
    return(
        <div className="login">
            <Form className="d-flex flex-column">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" />
                </Form.Group>
    
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <p style={{marginTop:'30px'}}>Dont have an account?</p>
            <Button variant="success" type="button">
                Register
            </Button>
        </div>
    )
}

export { Login }