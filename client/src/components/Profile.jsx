import Loading from "./Loading"
import { useState, useEffect } from "react"
import axios from "axios"
import { PostsDisplay } from "./PostsDisplay"
import useMediaQuery from "../hooks/useMediaQuery"
import { Container } from "react-bootstrap"

function Profile({ userId }) {
    //custom media query
    const aboveMediumScreens = useMediaQuery('(min-width:1060px)')

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
            axios.get(`https://bloggy-production.up.railway.app/user/${userId}`)
            .then(res => {
                setUserProfile(res.data)
                setLoadingUser(false)
            })
            .catch(err => console.log(err))
        }

        //api call to get user's posts
        const getUserPosts = async() => {
            axios.get(`https://bloggy-production.up.railway.app/post/user/${userId}`)
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
                    <Container
                        style={{
                            minHeight:'100vh',
                            height:'100%'
                        }}
                    >
                    <h1
                        style={{ 
                            margin:'1rem 0rem', 
                            textAlign:`${ aboveMediumScreens ? 'left' : 'center' }`
                        }}
                    >
                        {userProfile.username}'s Profile
                    </h1>

                    <div
                        style={{ 
                            minHeight:`${ aboveMediumScreens ? '100vh' : '50vh' }`, 
                            height:'100%', 
                            display:'flex',
                            flexDirection:`${ aboveMediumScreens ? 'row' : 'column-reverse' }`
                        }}
                    >
                        {/* left hand side of page with user created posts */}
                        <div
                            style={{ 
                                width:`${ aboveMediumScreens ? '70%' : '100%' }` 
                            }}
                        >
                            <div>
                                {loadingPosts
                                    ?
                                    //posts loading animation
                                    <Loading />
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
                                borderLeft:`${ aboveMediumScreens ? '1px solid rgb(230,230,230)' : 'none' }`, 
                                borderBottom:`${ aboveMediumScreens ? 'none' : '1px solid rgb(230,230,230)' }`,
                                width:`${ aboveMediumScreens ? '30%' : '100%' }`, 
                                marginLeft:`${ aboveMediumScreens ? '1rem' : '0' }`
                            }}
                        >
                        <div
                            style={{ 
                                width:'100%',
                                height:'fit-content', 
                                padding:'2rem 1rem',
                                display:"flex",
                                flexDirection:'column',
                                alignItems:`${ aboveMediumScreens ? 'left' : 'center' }`,
                                textAlign:`${ aboveMediumScreens ? 'left' : 'center' }`
                            }}
                        >
                            {/* User avatar if it exists */}
                            {userProfile.avatar
                                ?
                                <img 
                                    src={`https://bloggy-production.up.railway.app/uploads/${userProfile.avatar}`} 
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

                            <p style={{ color:'rgb(128,128,128)' }}>{userProfile.aboutMe}</p>
                        </div>
                        </div>
                    </div>
                    </Container>
                )
            }
        </>
    ) 
}
export default Profile