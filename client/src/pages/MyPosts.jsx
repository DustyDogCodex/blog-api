import { Container } from "react-bootstrap"
import { PostsDisplay } from "../components/PostsDisplay"
import { useContext, useEffect, useState } from "react"
import { MyContext } from "../MyContext"
import axios from "axios"
import Loading from "../components/Loading"
import useMediaQuery from "../hooks/useMediaQuery"

function MyPosts() {
    //getting userInfo through context
    const { userInfo } = useContext(MyContext)

    //custom media query
    const aboveMediumScreens = useMediaQuery('(min-width:1060px)')

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
                <>
                    <h1
                        style={{ 
                            margin:'1rem 0rem', 
                            fontSize:'2rem',
                            textAlign:`${ aboveMediumScreens ? 'left' : 'center' }` 
                        }}
                    >
                        My posts
                    </h1>
                    <PostsDisplay blogs={posts} dashboard={true}/>
                </>
            }
        </Container>
    )
}

export default MyPosts