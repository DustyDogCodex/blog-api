import axios from 'axios'
import { useContext, useState } from 'react'
import { Container, Button, Col, Form, Row, Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { MyContext } from '../MyContext'
import { CategoryBubble } from '../components/CategoryBubble'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

function AddBlog() {
    //grabbing user name from userinfo stored in context
    const { userInfo } = useContext(MyContext)

    //using react-hook-form for form submission and validation
    const { register, handleSubmit, formState: { errors } } = useForm()

    //array for adding category tags to created blog post
    const [ catInput, setCatInput ] = useState('')
    const [ emptyTag, setEmptyTag ] = useState(false)
    const [ duplicateTag, setDuplicateTag ] = useState(false)
    const [ categories, setCategories ] = useState([])
    
    //variable to track image upload
    const [ image, setImage ] = useState('')

    //function to add category tags and validate input
    function addTag(){
        if(!catInput.length){
            setEmptyTag(true)
            return 
        } else if (categories?.includes(catInput)) {
            setDuplicateTag(true)
            return
        } else {
            setCategories([ ...categories, catInput ])
            setCatInput('')
        }
    }

    //function to submit form data
    function createBlog(data){
        //formData to append image if image is uploaded
        const formData = new FormData()

        formData.append('username', userInfo.username)
        formData.append('userId', userInfo._id)
        formData.append('title', data.title)
        formData.append('subtitle', data.subtitle)
        formData.append('post', data.post)
        formData.append('categories', categories)

        if(image){
            formData.append('image', image)
        }

        //api call to post blog
        axios.post(
            'https://bloggy-production.up.railway.app/post/new',
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            },
            { withCredentials: true }
        )
        .then(res => {
            if (res.data === 'success'){
                window.location.assign('/')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <Container
            style={{ 
                minHeight:'100vh', 
                height:'100%' 
            }}
        >
            {/* stock header image for page */}
            <img 
                src="https://images.pexels.com/photos/368260/pexels-photo-368260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="nightime mountain view" 
                style={{ 
                    borderRadius:'2rem', 
                    marginTop:'2rem',
                    width:'100%',
                    height:'fit-content',
                    maxHeight:'25rem',
                    objectFit:'cover' 
                }}
            />

            {/* form for creating and posting a blog post */}
            <Form 
                className='mt-2 mb-5' 
                onSubmit={handleSubmit(createBlog)}
            >
                {/* title */}
                <h1 
                    style={{ fontFamily:'Permanent Marker, cursive', color:'green', textAlign: 'center' }}
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
                            placeholder='Enter the title for your post'
                            style={{ 
                                border:'1px solid skyblue',
                                borderRadius:'1rem'
                            }}
                        />
                        {errors.title && (
                            <div
                                className='d-flex align-items-center justify-content-center my-2'
                            >
                                {errors.title.type == 'required' && 
                                    <Alert variant='danger' dismissible> 
                                        Title is required
                                    </Alert>
                                }
                                
                                {errors.title.type == 'maxLength' && 
                                    <Alert variant='danger' dismissible>
                                        Title cannot be more than 200 characters
                                    </Alert>
                                }
                            </div>
                        )}
                    </Form.Group>

                    <Form.Group
                        as={Col}
                        md="4"
                    >
                        <Form.Label>Subtitle</Form.Label>
                        <Form.Control
                            {...register('subtitle', { required: true, maxLength: 300 })}
                            type="text"
                            placeholder='Enter a subtitle for your post'
                            style={{ 
                                border:'1px solid skyblue',
                                borderRadius:'1rem'
                            }}
                        />
                        {errors.subtitle && (
                            <div
                                className='d-flex align-items-center justify-content-center my-2'
                            >
                                {errors.subtitle.type == 'required' && <Alert variant='danger' dismissible> 
                                    Subtitle is required
                                </Alert>}
                                
                                {errors.subtitle.type == 'maxLength' && <Alert variant='danger' dismissible>
                                    Subtitle cannot be more than 300 characters
                                </Alert>}
                            </div>
                        )}
                    </Form.Group>
            
                    <Form.Group 
                        className="mt-2" 
                    >
                        <Form.Label>Blog Text</Form.Label>
                        <Form.Control 
                            {...register('post', { required: true, minLength: 500, maxLength: 2500 })}
                            as="textarea"
                            placeholder='Enter blog text here...' 
                            rows={10}
                            style={{ 
                                border:'1px solid skyblue',
                                borderRadius:'1rem'
                            }}
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
                
                {/* file upload for adding an image to blog post */}
                <Form.Group className="mt-2 mb-3">
                    <Form.Label>Image (optional)</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={e => setImage(e.target.files[0])}
                        style={{ 
                            border:'1px solid skyblue',
                            borderRadius:'1rem'
                        }}
                    />
                </Form.Group>
                
                <p>Add categories</p>
                 
                <div
                    className='d-flex justify-content-evenly'
                    style={{ 
                        border:'1px solid skyblue', 
                        borderRadius:'1rem', 
                        padding:'0.5rem' 
                    }}
                >    
                    {/* display for user added category tags */}
                    <div
                        style={{ 
                            display:'flex', 
                            flexWrap:'wrap' 
                        }}
                    >
                        {categories?.map((cat,index) => 
                            <div
                                key={index}
                                style={{ display:'flex' }}
                            >
                                <CategoryBubble category={cat} />
                                <FontAwesomeIcon 
                                    icon={faXmark} 
                                    style={{ color:'red', cursor:'pointer' }} 
                                    onClick={() => setCategories(categories.filter(category => category !== cat))}
                                />
                            </div>
                        )}
                    </div>

                    {/* inputs for creating and adding tags to post */}
                    <div className='d-flex justify-content-between px-5'>
                        <div
                            className='d-flex'
                        >
                            <input
                                type="text"
                                name="tags"
                                placeholder='Enter a category'
                                value={catInput}
                                onChange={(e) => setCatInput(e.target.value)}
                            />

                            {/* button to add tags */}
                            <Button 
                                type='button' 
                                variant='success'
                                className='mx-3'
                                onClick={addTag}
                            >
                                Add tag
                            </Button>
                        </div>
                        
                        {/* alert if user submits an empty tag */}
                        <Alert 
                            show={emptyTag} 
                            variant='danger' 
                            onClose={() => setEmptyTag(!emptyTag)}
                            dismissible
                        >
                            Category Tag cannot be empty
                        </Alert>

                        {/* alert if user submits a duplicate tag */}
                        <Alert 
                            show={duplicateTag} 
                            variant='danger' 
                            onClose={() => setDuplicateTag(!duplicateTag)}
                            dismissible
                        >
                            This tag has already been added
                        </Alert>
                    </div>
                </div>
                
                {/* form submit button */}
                <div
                    className='d-flex align-items-center justify-content-center mt-2'
                >
                    <Button type="submit">Post Blog!</Button>
                </div>
            </Form>
        </Container>
    )
}

export { AddBlog }