import axios from "axios"
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { PostsDisplay } from "../components/PostsDisplay"
import Loading from "../components/Loading"

function UserProfile() {
    //grab user id from params
    const { userId } = useParams()

    //loading animation variables
    const [ loadingUser, setLoadingUser ] = useState(true)
    const [ loadingPosts, setLoadingPosts ] = useState(true)

    //variable for user profile info
    const [ userProfile, setUserProfile ] = useState({})
    
    //variable for user posts
    const [ userPosts, setUserPosts ] = useState([])
 
    //get user info & posts from server
    useEffect(() => {
        //api call to get user's profile info
        const getUserProfile = async() => {
            axios.get(`http://localhost:5000/user/${userId}`)
            .then(res => {
                setUserProfile(res.data)
                setLoadingUser(false)
            })
            .catch(err => console.log(err))
        }

        //api call to get user's posts
        const getUserPosts = async() => {
            axios.get(`http://localhost:5000/post/user/${userId}`)
            .then(res => { 
                setUserPosts([ ...res.data ])
                setLoadingPosts(false)
            })
            .catch(err => console.log(err))
        }
        getUserProfile()
        getUserPosts()
    }, [])

    return (
        <Container>
            {loadingUser
                ?
                //loading animation
                <Loading />
                :
                (
                    //main content of page
                    <div
                        style={{ minHeight:'100vh', height:'100%', display:'flex' }}
                    >
                        {/* left hand side of page with user created posts */}
                        <div
                            style={{ width:'70%' }}
                        >
                            {/* username/heading */}
                            <h1
                                style={{ margin:'1rem 0rem' }}
                            >
                                {userProfile.username}
                            </h1>

                            <div>
                                <h3>{userProfile.username}'s Posts</h3>
                                {loadingPosts
                                    ?
                                    //posts loading animation
                                    (
                                        <div
                                            className="loadingAnimation"
                                        >
                                            <img 
                                                src={foShizzle} 
                                                alt="Our developers are loading your stuff"
                                            />
                                        </div>
                                    )
                                    :
                                    (
                                        <PostsDisplay blogs={userPosts} />
                                    )
                                }
                            </div>
                        </div>

                        {/* right hand side with user about me */}
                        <div
                            style={{ width:'30%', height:'fit-content', padding:'2rem 1rem', border:'1px solid black' }}
                        >
                            {/* User avatar if it exists */}
                            {userProfile.avatar
                                ?
                                <img 
                                    src={`http:localhost:5000/uploads/${userProfile.avatar}`} 
                                    alt="" 
                                    style={{ width:'3rem', height:'3rem', borderRadius:'100%'}}
                                />
                                :
                                ''
                            }

                            <h3>{userProfile.username}</h3>

                            <p>{userProfile.aboutMe}</p>
                        </div>
                    </div>
                )
            }
        </Container>
    )
}

export default UserProfile