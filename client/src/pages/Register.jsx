import { Form, Button, Alert } from "react-bootstrap"
import { useState } from "react"
import axios from "axios"

function Register(){
    //using state variables to keep track of user input.
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    //using state to toggle dismissible bootstrap alerts.
    const [usernameAlert, setUsernameAlert] = useState(false)
    const [passwordAlert, setPasswordAlert] = useState(false)
    const [password2Alert, setPassword2Alert] = useState(false)
    const [passwordMismatch, setPasswordMismatch] = useState(false)

    //onChange handling functions
    function changeUsername(e){
        setUsername(e.target.value)
    }
    function changePassword(e){
        setPassword(e.target.value)
    }
    function changePassword2(e){
        setPassword2(e.target.value)
    }

    //sending post request with user info to backend
    async function sendInfo(){
        const res = await axios.post(
            'http://localhost:5000/auth/register',
            { username, password })

        console.log(res.data)
    }

    //handling submit. this will also toggle bootstrap alerts is any field is left empty
    function handleSubmit(e){
        e.preventDefault()
        if(!username || !password || !password2){
            username.length === 0 ? setUsernameAlert(true) : ''
            password.length === 0 ? setPasswordAlert(true) : '' 
            password2.length === 0 ? setPassword2Alert(true) : ''
        } else if(password !== password2){
            setPasswordMismatch(true)
        } else {
            sendInfo()
        }
    }

    return(
        <div className="login">
            <h1 style={{ 
                fontFamily:'Permanent Marker, cursive', 
                fontSize:'60px', 
                marginBottom:'30px'}}>
                Create a New Account
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
                        Username is a required field.
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
                        Password is a required field.
                    </Alert>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        name="password"
                        value={password2}
                        onChange={changePassword2}
                        placeholder="Confirm your password" 
                    />
                    <Alert 
                        variant="danger" 
                        show={password2Alert}
                        className="mt-3" 
                        onClose={() => setPassword2Alert(false)} 
                        dismissible >
                        Please confirm your password.
                    </Alert>
                    <Alert 
                        variant="danger" 
                        show={passwordMismatch}
                        className="mt-3" 
                        onClose={() => setPasswordMismatch(false)} 
                        dismissible >
                        Passwords do not match. Please try again.
                    </Alert>
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