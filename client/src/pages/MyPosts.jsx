import { Container } from "react-bootstrap"
import { PostsDisplay } from "../components/PostsDisplay"
import { useContext, useEffect, useState } from "react"
import { MyContext } from "../MyContext"
import axios from "axios"
import Loading from "../components/Loading"

function MyPosts() {
    //getting userInfo through context
    const { userInfo } = useContext(MyContext)

    //variable for tracking posts
    const [ posts, setPosts ] = useState([])

    //variable for loading screen
    const [ loading, setLoading ] = useState(true)
 
    //getting posts created by user
    useEffect(() => {
        const getUserPosts = async() => {
            axios.get(
                `http://localhost:5000/post/user/${userInfo._id}`,
                { withCredentials: true }
            )
            .then(res => {
                setPosts(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
        }
        getUserPosts()
    }, [])

    return (
        <Container style={{ height:'90vh' }}>
            {loading
                ?
                /* loading animation while data is being fetched */
                <Loading />
                :
                //displaying user's posts after data is fetched from server
                <PostsDisplay blogs={posts} />
            }
        </Container>
    )
}

export default MyPosts