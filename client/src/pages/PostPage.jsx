import { Container } from "react-bootstrap"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import foShizzle from '../assets/snoop.gif'

/* this is the page users will be directed to when they click on a blog post to view it */
function PostPage(){
    //grabbing blogid from params
    const { blogId } = useParams()

    //variables for loading animation
    const [ loading, setLoading ] = useState(true)

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
        <Container className="postPage">
            <div className="blogPost">
                {loading
                    ?
                    /* loading animation while data is being fetched */
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
                    /* post to be displayed */
                    <> 
                        {currentPost.image
                            ? 
                            <img 
                                src='https://images7.alphacoders.com/681/681197.jpg' 
                                alt="" 
                            />
                            :
                            ''
                        }

                        <h1 className="blogTitle">
                            {currentPost.title}
                        </h1>

                        {/* info about blog like author, date created */}
                        <div className="blogInfo">
                            <span className="blogAuthor">
                                Written by 
                                <Link 
                                    to={`/?username=${currentPost.username}`} 
                                    className="link"
                                >
                                    <strong> {currentPost.username} </strong>
                                </Link>
                            </span>

                            <span className="blogDate">
                                Created on { new Date(currentPost.createdAt).toLocaleDateString() }
                            </span>
                        </div>

                        {/* blog content */}
                        <p className="blogText">
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