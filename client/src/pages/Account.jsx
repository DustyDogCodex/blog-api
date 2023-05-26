import { Container } from "react-bootstrap";
import { Sidebar } from "../components/Sidebar"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';

function Account(){
    //using formik to handle submitting and managing forms
    const { Formik } = formik;

    //schema for validating account info entered by our user
    const userSchema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
    });

    return(
        <Container className="account">
            <div className="accountContent">
                <div className="settings">
                    <span className="editAccount">Edit Your Account Info</span>
                    <span className="deleteAccount">Delete Your Account</span>
                </div>
                <Formik
                    validationSchema={userSchema}
                    onSubmit={console.log}
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        username: ''
                    }}
                >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group as={Col} md="4" controlId="validationFormik01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            isValid={touched.firstName && !errors.firstName}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationFormik02">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            isValid={touched.lastName && !errors.lastName}
                        />

                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationFormikUsername">
                        <Form.Label>Username</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                isInvalid={!!errors.username}
                                />
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    
                    <Form.Group className="position-relative mb-3">
                        <Form.Label>File</Form.Label>
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
            </div>
            <Sidebar />
        </Container>
    )
}

export { Account }