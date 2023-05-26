import { Formik } from 'formik';
import * as yup from 'yup'
import { Container, Button, Col, Form, InputGroup, Row } from 'react-bootstrap';

function AddBlog() {
    //using schema for validation from yup. Formik will validate the user input against this using the validationSchema prop. Formik has built in compatibility with yup for this.
    const schema = yup.object().shape({
        blogTitle: yup.string().required(),
        blogText: yup.string().required(),
        username: yup.string().required(),
        file: yup.mixed().required(),
    });

    return (
    <Container>
        <img 
            className="headerImage" 
            src="https://images.pexels.com/photos/368260/pexels-photo-368260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="nightime mountain view" 
            style={{borderRadius:'20px', marginTop:'20px'}}
        />
        <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{
                blogTitle: '',
                blogText: '',
                username: '',
                file: null,
            }}
        >
        {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
        }) => (
        <Form className='mt-5 mb-5' noValidate onSubmit={handleSubmit}>
            <h1 style={{fontFamily:'Permanent Marker, cursive', color:'green'}}>Create a new blog post!</h1>
            <Row className="mb-3">
            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik101"
              className="position-relative"
            >
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="blogTitle"
                    placeholder='Enter the title for your post'
                    value={values.blogTitle}
                    onChange={handleChange}
                    isValid={touched.blogTitle && !errors.blogTitle}
                    isInvalid={!!errors.blogTitle}
                />
                <Form.Control.Feedback type='valid' tooltip>
                    Looks good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type='invalid' tooltip>
                    {errors.blogTitle}
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group 
                className="mt-3 mb-3" 
                controlId="validationFormik102"
            >
                <Form.Label>Blog Text</Form.Label>
                <Form.Control 
                    as="textarea"
                    name='blogText'
                    placeholder='Enter blog text here...' 
                    rows={10}
                    value={values.blogText}
                    onChange={handleChange}
                    isValid={touched.blogText && !errors.blogText}
                    isInvalid={!!errors.blogText}
                />
            </Form.Group>
            
            <Form.Group 
                as={Col} 
                md="4" 
                controlId="validationFormikUsername2"
            >
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
                    <Form.Control.Feedback type="invalid" tooltip>
                        {errors.username}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            </Row>
          
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

          <Button type="submit">Post Blog!</Button>
        </Form>
        )}
        </Formik>
    </Container>
  );
}

export { AddBlog }