import { Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import * as formik from 'formik';
import * as yup from 'yup';

function Login(){
    const { Formik } = formik
    const [usernameAlert, setUsernameAlert] = useState(false)
    const [passwordAlert, setPasswordAlert] = useState(false)

    //using schema for validation from yup. Formik will validate the user input against this using the validationSchema prop. Formik has built in compatibility with yup for this.
    const loginSchema = yup.object().shape({
        username: yup.string().required('Required'),
        password: yup.string().required('Required')
    });

    //handling submit
    function handleSubmit(){
        console.log(username,password)
    }

    return(
        <div className="login" style={{position:'relative'}}>
            <Formik
                validationSchema={loginSchema} 
                initialValues={{ username: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.username) {
                        errors.username = 'Username is required';
                        setUsernameAlert(true)
                    } 
                    if (!values.password) {
                        errors.password = 'Password is required';
                        setPasswordAlert(true)
                    } 
                    return errors;
                }}
                onSubmit={handleSubmit}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <>
                <h1 style={{fontFamily:'Permanent Marker, cursive', fontSize:'60px', marginBottom:'30px'}}>Login</h1>
                <Form className="d-flex flex-column">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text"
                            name="username" 
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter your username" 
                            isValid={touched.username && !errors.username}
                            isInvalid={!!errors.username}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                            {errors.username}
                        </Form.Control.Feedback>
                        <Alert variant="danger" show={usernameAlert} onClose={() => setUsernameAlert(false)} dismissible>
                            {errors.username && touched.username && errors.username}
                        </Alert>  
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password"
                            name="password" 
                            value={values.password}
                            onChange={handleChange} 
                            onBlur={handleBlur}
                            placeholder="Enter your password" 
                            isValid={touched.password && !errors.password}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                            {errors.password}
                        </Form.Control.Feedback>
                        <Alert variant="danger" show={passwordAlert} onClose={() => setPasswordAlert(false)} dismissible>
                            {errors.password && touched.password && errors.password}
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
                </>
            )}
            </Formik>
        </div>
    )
}

export { Login }