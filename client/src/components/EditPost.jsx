import axios from "axios"
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { useForm } from "react-hook-form"

function EditPost() {
    //grabbing post id from params
    const { postId } = useParams()

    //using react-hook-form to populate values and validate user input
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    
    //variable for storing post info
    const [ post, setPost ] = useState({})

    //grab post info from server
    useEffect(() => {
        const getPost = async() => {
            axios.get(`http://localhost:5000/post/${postId}`)
            .then(res => setPost(res.data))
            .catch(err => console.log(err))
        }
        getPost()
    }, [])

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
            if(res){
                window.location.replace('/dashboard')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <Container
            style={{ marginTop:'1rem', height:'90vh' }}
        >
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
                    src={`http://localhost:5000/uploads/${post.image}`} 
                    alt="image with post"
                    style={{ maxHeight:'40rem', width:'fit-content' }}
                />

                {/* icon for deleting image */}
                <div
                    style={{ position:'absolute', bottom:'1rem', right:'1rem', background:'white', borderRadius:'100%', padding:'0.5rem', display:'flex', alignItems:'center', justifyContent:'center' }}
                >
                    <FontAwesomeIcon 
                        icon={faTrash} 
                        style={{ color: "#fa0000", height:'2rem', width:'2rem', cursor:'pointer' }} 
                        /* onClick={() => setEditImagePath('')} */
                    /> 
                </div>
            </div>

            <div
                style={{ marginTop:'1rem' }}
            >
                <label>Title</label>
                <input
                    {...register('title', { required: true, })}
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
                style={{ marginTop:'1rem' }}
            >
                <label>Subtitle</label>
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
                style={{ marginTop:'1rem' }}
            >
                <label>Post</label>
                <textarea
                    rows={6}
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
        </Container>
    )
}

export default EditPost