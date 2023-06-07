import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import * as formik from 'formik';
import * as yup from 'yup';

function Account(){
    //using formik to handle submitting and managing forms
    const { Formik } = formik;

    //schema for validating account info entered by our user
    const userSchema = yup.object().shape({
        username: yup.string().required(),
        email: yup.string().required(),
        password: yup.string().required(),
        file: yup.mixed().required()
    });

    return(
        <Container className="account">
            <div className="accountContent p-5">
                <h3 className="editAccount">Edit Your Account Info</h3>
                <Formik
                    validationSchema={userSchema}
                    onSubmit={console.log}
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        file: null
                    }}
                >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group as={Col} md="4" controlId="validationFormik01">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            isValid={touched.username && !errors.username}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            {errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationFormik02">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            isValid={touched.email && !errors.email}
                            isInvalid={!!errors.password}
                        />

                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationFormikUsername">
                        <Form.Label>Password</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="password"
                                placeholder="change password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isValid={touched.password && !errors.password}
                                isInvalid={!!errors.password}
                                />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="position-relative mt-3 mb-3">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control
                            type="file"
                            required
                            name="file"
                            onChange={handleChange}
                            isInvalid={!!errors.file}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                            {errors.file}
                        </Form.Control.Feedback>
                    </Form.Group>
          
                    <Button type="submit" className="mt-3">Submit form</Button>
                </Form>
                )}
                </Formik>
                <p className="deleteAccount" style={{marginTop:'20px', color:'red'}}>Delete Your Account</p>
            </div>
        </Container>
    )
}

export { Account }