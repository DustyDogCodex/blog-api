import { Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";

function Login(){
    //using state variables to keep track of user input.
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //using state to toggle dismissible bootstrap alerts.
    const [usernameAlert, setUsernameAlert] = useState(false)
    const [passwordAlert, setPasswordAlert] = useState(false)

    //onChange handling functions
    function changeUsername(e){
        setUsername(e.target.value)
    }
    function changePassword(e){
        setPassword(e.target.value)
    }

    //handling submit. this will also toggle bootstrap alerts is any field is left empty
    function handleSubmit(e){
        e.preventDefault()
        if(!username || !password){
            username.length === 0 ? setUsernameAlert(true) : ''
            password.length === 0 ? setPasswordAlert(true) : '' 
        }
        console.log(username,password)
    }

    return(
        <div className="login">
                <h1 style={{
                    fontFamily:'Permanent Marker, cursive', 
                    fontSize:'60px', 
                    marginBottom:'30px'}}>
                    Login
                </h1>
                <Form className="d-flex flex-column" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text"
                            name="username" 
                            value={username}
                            onChange={changeUsername}
                            placeholder="Enter your username" 
                        />
                        <Alert 
                            variant="danger" 
                            show={usernameAlert} 
                            className="mt-3"
                            onClose={() => setUsernameAlert(false)} 
                            dismissible >
                            Username is required
                        </Alert>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password"
                            name="password" 
                            value={password}
                            onChange={changePassword}
                            placeholder="Enter your password" 
                        />
                        <Alert 
                            variant="danger" 
                            show={passwordAlert} 
                            className="mt-3"
                            onClose={() => setPasswordAlert(false)} 
                            dismissible >
                            Password is required
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