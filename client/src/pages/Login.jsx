import { Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";

function Login(){
    //using state variables to keep track of user input.
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //using state to toggle dismissible bootstrap alerts.
    const [usernameAlert, setUsernameAlert] = useState(false)
    const [passwordAlert, setPasswordAlert] = useState(false)

    //invalide credentials Alert toggle
    const [retryAlert, setRetryAlert] = useState(false)

    //handling submit. this will also toggle bootstrap alerts is any field is left empty
    async function handleSubmit(e){
        e.preventDefault()
        //toggle alerts if fields are left empty
        if(!username || !password){
            username.length === 0 ? setUsernameAlert(true) : ''
            password.length === 0 ? setPasswordAlert(true) : '' 
        } else {
            //if no errors, send user info to api to authenticate user.
            const res = await axios.post(
            'http://localhost:5000/auth/login',
            {
                username,
                password
            }, { withCredentials: true })
            .then(res => {
                window.location.replace('/')
            }) 
            .catch(err => {
                setRetryAlert(true)
                console.log(err)
            })
        }
    }

    //signing in with Google. Opens new window to log into google account.
    function googleSignIn(){
        window.open("http://localhost:5000/auth/google", "_self")
    }
    
    return(
        <div className="login">
            <h1 
                style={{ fontFamily:'Permanent Marker, cursive', fontSize:'60px', marginBottom:'30px'}}
            >
                Login
            </h1>

            {/* login form */}
            <Form className="d-flex flex-column" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text"
                        name="username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username" 
                    />

                    <Alert 
                        variant="danger" 
                        show={usernameAlert} 
                        className="mt-3"
                        onClose={() => setUsernameAlert(false)} 
                        dismissible 
                    >
                        Username is required
                    </Alert>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password"
                        name="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password" 
                    />

                    <Alert 
                        variant="danger" 
                        show={passwordAlert} 
                        className="mt-3"
                        onClose={() => setPasswordAlert(false)} 
                        dismissible 
                    >
                        Password is required
                    </Alert>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>

            {/* signin using google */}
            <Button 
                variant="danger" 
                className="mt-3"
                onClick={googleSignIn}>
                Sign in with Google
            </Button>
                
            {/* invalid credentials alert */}
            <Alert 
                variant="danger" 
                show={retryAlert}
                className="mt-3" 
                onClose={() => setRetryAlert(false)} 
                dismissible 
            >
                Incorrect credentials. Please try again.
            </Alert>
                
            {/* link to register page */}
            <p 
                style={{marginTop:'30px'}}
            >
                Dont have an account?
            </p>

            <LinkContainer to='/register'>
                <Button variant="success" type="submit">
                    Register
                </Button>
            </LinkContainer>
        </div>
    )
}

export { Login }