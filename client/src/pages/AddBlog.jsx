import { Container, Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

function AddBlog() {
    //using react-hook-form for form submission and validation
    const { register, handleSubmit, formState: { errors } } = useForm()

    return (
    <Container>
        <img 
            className="headerImage" 
            src="https://images.pexels.com/photos/368260/pexels-photo-368260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="nightime mountain view" 
            style={{borderRadius:'20px', marginTop:'20px'}}
        />

        
        <Form className='mt-5 mb-5'>
            <h1 
                style={{fontFamily:'Permanent Marker, cursive', color:'green'}}
            >
                Create a new blog post!
            </h1>
            
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
                />
            </Form.Group>
            
            <Form.Group 
                className="mt-3 mb-3" 
            >
                <Form.Label>Blog Text</Form.Label>
                <Form.Control 
                    as="textarea"
                    name='blogText'
                    placeholder='Enter blog text here...' 
                    rows={10}
                />
            </Form.Group>
            
            <Form.Group 
                as={Col} 
                md="4" 
            >
                <Form.Label>Username</Form.Label>
                <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        aria-describedby="inputGroupPrepend"
                        name="username"
                    />
                </InputGroup>
            </Form.Group>
            </Row>
          
          <Form.Group className="position-relative mb-3">
            <Form.Label>File</Form.Label>
            <Form.Control
                type="file"
                required
                name="file"
            />
          </Form.Group>

          <Button type="submit">Post Blog!</Button>
        </Form>
    </Container>
  )
}

export { AddBlog }