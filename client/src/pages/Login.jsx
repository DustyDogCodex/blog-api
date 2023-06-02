import { Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";

function Login(){
    //using state variables to keep track of user input.
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //using state to toggle dismissible bootstrap alerts.
    const [usernameAlert, setUsernameAlert] = useState(false)
    const [passwordAlert, setPasswordAlert] = useState(false)

    //handling submit
    function handleSubmit(){
        console.log(username,password)
    }

    return(
        <div className="login">
                <h1 style={{fontFamily:'Permanent Marker, cursive', fontSize:'60px', marginBottom:'30px'}}>Login</h1>
                <Form className="d-flex flex-column">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text"
                            name="username" 
                            value={username}
                            placeholder="Enter your username" 
                        />
                        <Alert variant="danger" show={usernameAlert} onClose={() => setUsernameAlert(false)} dismissible>
                           
                        </Alert>  
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password"
                            name="password" 
                            value={password}
                            placeholder="Enter your password" 
                        />
                        <Alert variant="danger" show={passwordAlert} onClose={() => setPasswordAlert(false)} dismissible>
                            
                        </Alert>

                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
                <p style={{marginTop:'30px'}}>Dont have an account?</p>
                <Button variant="success" type="submit">
                    Register
                </Button>
        </div>
    )
}

export { Login }