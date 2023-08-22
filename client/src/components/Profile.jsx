import Loading from "./Loading"
import { useState, useEffect } from "react"
import axios from "axios"
import foShizzle from '../assets/snoop.gif'
import { PostsDisplay } from "./PostsDisplay"

function Profile({ userId }) {

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
        <>
        {loadingUser
                ?
                //loading animation
                <Loading />
                :
                (
                    //main content of page
                    /* username/heading */
                    <>
                    <h1
                        style={{ margin:'1rem 0rem' }}
                    >
                        {userProfile.username}'s Profile
                    </h1>

                    <div
                        style={{ minHeight:'100vh', height:'100%', display:'flex' }}
                    >
                        {/* left hand side of page with user created posts */}
                        <div
                            style={{ width:'70%' }}
                        >
                            <div>
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
                            style={{ 
                                borderLeft:'1px solid rgb(230,230,230)', 
                                width:'30%', 
                                marginLeft:'1rem' 
                            }}
                        >
                        <div
                            style={{ 
                                width:'100%',
                                height:'fit-content', 
                                padding:'2rem 1rem'
                            }}
                        >
                            {/* User avatar if it exists */}
                            {userProfile.avatar
                                ?
                                <img 
                                    src={`http://localhost:5000/uploads/${userProfile.avatar}`} 
                                    alt="" 
                                    style={{ 
                                        width:'5rem', 
                                        height:'5rem', 
                                        borderRadius:'100%', 
                                        marginBottom:'2rem'
                                    }}
                                />
                                :
                                ''
                            }

                            <h3>{userProfile.username}</h3>

                            <p style={{ color:'rgb(128,128,128)'}}>{userProfile.aboutMe}</p>
                        </div>
                        </div>
                    </div>
                    </>
                )
            }
        </>
    ) 
}
export default Profile