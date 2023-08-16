import { Container, Button, Col, Form, Row, Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

function AddBlog() {
    //using react-hook-form for form submission and validation
    const { register, handleSubmit, formState: { errors } } = useForm()

    function createBlog(data){
        console.log(data)
    }

    return (
        <Container>
            {/* stock header image for page */}
            <img 
                className="headerImage" 
                src="https://images.pexels.com/photos/368260/pexels-photo-368260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="nightime mountain view" 
                style={{borderRadius:'20px', marginTop:'20px'}}
            />

            {/* form for creating and posting a blog post */}
            <Form 
                className='mt-5 mb-5' 
                onSubmit={handleSubmit(createBlog)}
            >
                {/* title */}
                <h1 
                    style={{fontFamily:'Permanent Marker, cursive', color:'green', textAlign: 'center'}}
                >
                    Create a new blog post!
                </h1>
            
                <Row className="mb-3">
                    <Form.Group
                        as={Col}
                        md="4"
                    >
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            {...register('title', { required: true, maxLength: 200 })}
                            type="text"
                            name="blogTitle"
                            placeholder='Enter the title for your post'
                        />
                        {errors.title && (
                            <div
                                className='d-flex align-items-center justify-content-center my-2'
                            >
                                {errors.title.type == 'required' && <Alert variant='danger' dismissible> 
                                    Title is required
                                </Alert>}
                                
                                {errors.title.type == 'maxLength' && <Alert variant='danger' dismissible>
                                    Title cannot be more than 200 characters
                                </Alert>}
                            </div>
                        )}
                    </Form.Group>
            
                    <Form.Group 
                        className="mt-3 mb-3" 
                    >
                        <Form.Label>Blog Text</Form.Label>
                        <Form.Control 
                            {...register('post', { required: true, minLength: 500, maxLength: 2500 })}
                            as="textarea"
                            placeholder='Enter blog text here...' 
                            rows={10}
                        />
                        {errors.post && (
                            <div
                                className='d-flex align-items-center justify-content-center my-2'
                            >
                                {errors.post.type == 'required' && <Alert variant='danger' dismissible>
                                    Blog post is required
                                </Alert>}

                                {errors.post.type == 'minLength' && <Alert variant='danger' dismissible>
                                    Post must be more than 500 characters
                                </Alert>}
                                
                                {errors.post.type == 'maxLength' && <Alert variant='danger' dismissible>
                                    Post cannot be more than 2500 characters
                                </Alert>}
                            </div>
                        )}
                    </Form.Group>
                </Row>
          
                <Form.Group className="position-relative mb-3">
                    <Form.Label>File (optional)</Form.Label>
                    <Form.Control
                        type="file"
                        name="file"
                    />
                </Form.Group>
                
                <div
                    className='d-flex align-items-center justify-content-center'
                >
                    <Button type="submit">Post Blog!</Button>
                </div>
            </Form>
        </Container>
    )
}

export { AddBlog }