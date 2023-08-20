import axios from "axios"
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { useParams } from "react-router-dom"

function EditPost() {
    //grabbing post id from params
    const { postId } = useParams()
    
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

    return (
        <Container
            style={{ marginTop:'1rem' }}
        >
            <h3>Edit your post</h3>
            
        </Container>
    )
}

export default EditPost