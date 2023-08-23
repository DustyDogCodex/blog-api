import { Form, Button, Alert } from "react-bootstrap"
import { useState } from "react"
import axios from "axios"
import { LinkContainer } from "react-router-bootstrap"

function Register(){
    //using state variables to keep track of user input.
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ password2, setPassword2 ] = useState('')
    const [ image, setImage ] = useState('')
    
    //using state to toggle dismissible bootstrap alerts.
    const [ usernameAlert, setUsernameAlert ] = useState(false)
    const [ passwordAlert, setPasswordAlert ] = useState(false)
    const [ password2Alert, setPassword2Alert ] = useState(false)
    const [ passwordMismatch, setPasswordMismatch ] = useState(false)

    //state variables for successfull and failed registration
    const [ success, setSuccess ] = useState(false)
    const [ fail, setFail ] = useState(false)

    //sending post request with user info to backend
    async function sendInfo(){
        //submitting formdata to upload image
        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)

        //add image if image is uploaded
        if(image){
            formData.append('image', image)
        }

        /* api call to create account */
        axios.post(
            'http://localhost:5000/auth/register',
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            }
        )
        .then(res => {
            const data = res.data
            //failed or successful registration
            data == 'failed' ? setFail(true) : setSuccess(true)
            
            //redirect 3secs after showing success alert
            if(data == 'success') {
                setTimeout(() => {
                    window.location.replace('/login')
                }, 3000)
            } 
        }) 
        .catch(err => console.log(err))
    }

    //handling submit. this will also toggle bootstrap alerts if any field is left empty
    function handleSubmit(e){
        e.preventDefault()
        if(!username || !password || !password2){
            /* set respective missing alerts to true if fields are empty */
            username.length === 0 ? setUsernameAlert(true) : ''
            password.length === 0 ? setPasswordAlert(true) : '' 
            password2.length === 0 ? setPassword2Alert(true) : ''
        } else if(password !== password2){
            //set mismatch password alerts to true
            setPasswordMismatch(true)
        } else {
            //if no errors, sending info to server and create account
            sendInfo()
        }
    }

    //google sign-in
    //signing in with Google. Opens new window to log into google account.
    function googleSignIn(){
        window.open("http://localhost:5000/auth/google", "_self")
    }

    return(
        <div className="login">
            <h1 style={{ 
                    fontFamily:'Permanent Marker, cursive', 
                    fontSize:'4rem', 
                    marginBottom:'2rem'
                }}
            >
                Create a New Account
            </h1>
            
            {/* form for registering a new account  */}
            <Form className="d-flex flex-column" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
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
                        dismissible >
                        Username is a required field.
                    </Alert> 
                </Form.Group>

                <Form.Group className="mb-3">
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
                        dismissible >
                        Password is a required field.
                    </Alert>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        name="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
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

                {/* add profile pic */}
                <Form.Group className="mb-3">
                    <Form.Label>Add profile pic (optional)</Form.Label>
                    <Form.Control 
                        type="file" 
                        name="image"
                        onChange={(e) => setImage(e.target.files[0])} 
                    />
                </Form.Group>

                {/* successful account creation alert */}
                <Alert 
                    className="mt-3" 
                    variant="success" 
                    show={success} 
                    onClose={() => setSuccess(false)}
                    dismissible>
                    User account successfully created! Redirecting to login ... 
                </Alert>

                {/* duplicate uername alert */}
                <Alert 
                    className="mt-3" 
                    variant="warning" 
                    show={fail} 
                    onClose={() => setFail(false)}
                    dismissible>
                    User name already exists! Please choose a different username!
                </Alert>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            
            {/* option to register with google account */}
            {/* <Button 
                variant="danger" 
                className="mt-3"
                onClick={googleSignIn}
            >
                Register with Google
            </Button> */}
            
            {/* redirect to login page */}
            <p style={{marginTop:'30px'}}>
                Already have an account?
            </p>

            <LinkContainer to='/login'>
                <Button variant="success" type="button">
                    Login
                </Button>
            </LinkContainer>
        </div>
    )
}

export { Register }