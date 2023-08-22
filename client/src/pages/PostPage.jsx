import { Container } from "react-bootstrap"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Loading from "../components/Loading"
import useMediaQuery from '../hooks/useMediaQuery'

/* this is the page users will be directed to when they click on a blog post to view it */
function PostPage(){
    //grabbing blogid from params
    const { blogId } = useParams()

    //variables for loading animation
    const [ loading, setLoading ] = useState(true)

    //custom media query hook
    const aboveMediumScreens = useMediaQuery('(min-width:1060px)')

    //using state variable to store currently displayed post's information
    const [ currentPost, setCurrentPost ] = useState([])

    //api call to fetch the selected blog post
    useEffect(() => {
        const getPost = async() => {
            axios.get(`http://localhost:5000/post/${blogId}`)
            .then(res => { 
                setCurrentPost(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
        }
        getPost()
    }, [])

    //editing retrieved post to display it the way it was created by user
    const editedPost = currentPost?.post?.split('\n')

    return(
        <Container style={{ display:'flex', marginBottom:'2rem' }}>
            <div style={{ padding:'2rem 1rem', width:'100%' }}>
                {loading
                    ?
                    <Loading />
                    :
                    /* post to be displayed */
                    <> 
                        {/* post's image if it exists */}
                        {currentPost.image
                            ? 
                            <div
                                style={{ 
                                    width:'100%', 
                                    display:'flex', 
                                    alignItems:'center', 
                                    justifyContent:'center' 
                                }}
                            >
                                <img 
                                    src={`http://localhost:5000/uploads/${currentPost.image}`} 
                                    alt="post's image" 
                                    style={{ 
                                        width:'100%', 
                                        maxHeight:'40rem' 
                                    }}
                                />
                            </div>
                            :
                            ''
                        }

                        {/* post title */}
                        <h1 
                            style={{ 
                                textAlign:'center', 
                                margin:'1rem', 
                                fontFamily:'Permanent Marker, cursive', 
                                fontSize:`${ aboveMediumScreens ? '3rem' : '2rem' }` 
                            }}
                        >
                            {currentPost.title}
                        </h1>

                        {/* post subtitle */}
                        <h3
                            style={{
                                textAlign:'center',
                                marginTop:'1rem',
                                marginBottom:'2rem',
                                fontFamily:'Montserrat, sans-serif',
                                fontSize:`${ aboveMediumScreens ? '2rem' : '1.5rem' }`,
                                color:'rgb(128,128,128)'
                            }}
                        >
                            {currentPost.subtitle}
                        </h3>

                        {/* info about blog like author, date created */}
                        <div
                            style={{
                                margin:`${ aboveMediumScreens ? '0.75rem 0rem' : '0.25rem 0rem' }`,
                                display:'flex',
                                justifyContent:'space-between',
                                alignItems:'center'
                            }}
                        >
                            <span 
                                style={{
                                   fontSize:`${ aboveMediumScreens ? '1.2rem' : '1rem' }` 
                                }}
                            >
                                By 
                                <Link 
                                    to={`/user/${currentPost.userId}`} 
                                    className="link"
                                >
                                    <strong> {currentPost.username} </strong>
                                </Link>
                            </span>

                            <span 
                                style={{
                                    marginLeft:'0.6rem',
                                    fontStyle:'italic',
                                    fontSize:`${ aboveMediumScreens ? '1.2rem' : '1rem' }`
                                }}
                            >
                                On { new Date(currentPost.createdAt).toLocaleDateString() }
                            </span>
                        </div>

                        {/* blog content */}
                        <p 
                            style={{ fontSize:'1.2rem' }}
                            className="blogText"
                        >
                            {editedPost.map((part,index) => 
                                <span key={index}>
                                    {part}
                                    <br />
                                </span>
                            )}
                        </p>
                    </>
                }
            </div>
        </Container>
    )
}

export { PostPage }