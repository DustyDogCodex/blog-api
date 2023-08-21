import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Alert } from "react-bootstrap"
import { Link, Navigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useForm } from "react-hook-form"
import Loading from "./Loading"
import { CategoryBubble } from "./CategoryBubble"

function EditPost() {
    //grabbing post id from params
    const { postId } = useParams()

    //variable for storing post info
    const [ blog, setBlog ] = useState({})

    //loading screen toggle
    const [ loading, setLoading ] = useState(true)

    //variables related to adding category tags to created blog post
    const [ catInput, setCatInput ] = useState('')
    const [ emptyTag, setEmptyTag ] = useState(false)
    const [ duplicateTag, setDuplicateTag ] = useState(false)
    const [ categories, setCategories ] = useState()

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

    //using react-hook-form to populate values and validate user input
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    //grab post info from server
    useEffect(() => {
        const getPost = async() => {
            axios.get(`http://localhost:5000/post/${postId}`)
            .then(res => { 
                setBlog(res.data)
                setCategories(res.data.categories)
                setLoading(false)
            })
            .catch(err => console.log(err))
        }
        getPost()
    }, [])

    //using react hook form to reset form with values fetched from server once blog's value is changed
    useEffect(() => {
        reset(blog)
    }, [ blog ])

    //reseting file input to empty 
    function resetFile() {
        const file = document.querySelector('#newFile')
        file.value = ''
    }

    //api call to update post with new parameters
    async function updatePost(){
        //submitting formData with uploaded image to update post
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("subtitle", data.subtitle)
        formData.append("post", data.post)
        /* formData.append("categories", data.categories) */
        
        if(newImage  /* || editimagepath */){
            formData.append("image", )
            formData.append('newImage', true)
        }

        //sending patch request to update post info on server
        axios.put(`http://localhost:5000/post/${postId}`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            },
            { withCredentials: true } 
        )
        .then(res => {
            if(res.data === 'updated'){
                window.location.replace('/dashboard')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <Container
            style={{ margin:'2rem 0rem', minHeight:'90vh', height:'100%' }}
        >
            {loading
                ?
                <Loading />
                :
                <>
                    <h3>Edit your post</h3>
                    <div
                        style={{ 
                            border:'1px solid black', 
                            position:'relative', 
                            display:'flex', 
                            alignItems:'center', 
                            justifyContent:'center', 
                            width:'fit-content' 
                        }}
                    >
                        <img 
                            src={`http://localhost:5000/uploads/${blog.image}`} 
                            alt="image with post"
                            style={{ maxHeight:'40rem', width:'fit-content' }}
                        />

                        {/* icon for deleting image */}
                        <div
                            style={{ 
                                position:'absolute', 
                                bottom:'1rem', 
                                right:'1rem', 
                                background:'white', 
                                borderRadius:'100%', 
                                padding:'0.5rem', 
                                display:'flex', 
                                alignItems:'center', 
                                justifyContent:'center' 
                            }}
                        >
                            <FontAwesomeIcon 
                                icon={faTrash} 
                                style={{ 
                                    color: "#fa0000", 
                                    height:'2rem', 
                                    width:'2rem', 
                                    cursor:'pointer' 
                                }} 
                                /* onClick={() => setEditImagePath('')} */
                            /> 
                        </div>
                    </div>
                            
                    <div
                        style={{ marginTop:'1rem' }}
                    >
                        <label style={{ marginRight:'2rem' }}>Title</label>
                        <input
                            {...register('title', { required: true, maxLength: 200 })}
                            type="text" 
                            style={{ 
                                width:'50%', 
                                padding:'0.25rem', 
                                marginBottom:'1rem', 
                                background:'lightgray', 
                                border:'none' 
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
                    </div>
            
                    <div
                        className="mt-2"
                    >
                        <label style={{ marginRight:'2rem' }}>Subtitle</label>
                        <input
                            {...register('subtitle', { required: true, })}
                            type="text" 
                            style={{ 
                                width:'50%', 
                                padding:'0.25rem', 
                                marginBottom:'1rem', 
                                background:'lightgray', 
                                border:'none' 
                            }}
                        />
                    </div>

                    <div
                        className="mt-2"
                    >
                        <label className="mb-2">Post</label>
                        <textarea
                            rows={20}
                            {...register('post', { required: true, })} 
                            style={{ 
                                width:'100%', 
                                padding:'0.25rem', 
                                marginBottom:'1rem', 
                                background:'lightgray', 
                                border:'none' 
                            }}
                        />
                    </div> 
                    
                    <label>Edit Categories</label>
                    <div
                        className='d-flex justify-content-evenly border p-2'
                    >    
                        {/* display for user added category tags */}
                        <div
                            style={{ display:'flex', flexWrap:'wrap' }}
                        >
                            {categories?.map((cat,index) => 
                                <div
                                    style={{ display:'flex' }}
                                >
                                    <CategoryBubble key={index} category={cat} />
                                    <FontAwesomeIcon 
                                        icon={faXmark} 
                                        style={{ color:'red' }} 
                                        onClick={() => setCategories(categories.filter(category => category !== cat))}
                                    />
                                </div>
                            )}
                        </div>
                        
                        {/* inputs for creating and adding tags to post */}
                        <div className='d-flex flex-col justify-content-between px-5'>
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

                    {/* buttons to save or cancel editing the post */}
                    <div
                        className="d-flex align-items-center justify-content-center mt-4"
                    >
                        <Button 
                            variant="success"
                            style={{ borderRadius:'1rem' }}
                        >
                            Save
                        </Button>
                        
                        <Link 
                            to={'/dashboard'} 
                            className="link"
                            style={{ 
                                background:'skyblue', 
                                color:'white', 
                                marginLeft:'3rem',
                                padding:'0.5rem 0.8rem',
                                borderRadius:'1rem' 
                            }}
                        >
                            Cancel
                        </Link>
                    </div>   
                </>
            }           
        </Container>
    )
}

export default EditPost