import { Container } from "react-bootstrap"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

/* this is the page users will be directed to when they click on a blog post to view it */
function PostPage(){
    //using useLocation to identify id of the blog post
    //then using api call to fetch and display that individual post
    const location = useLocation()
    const blogId = location.pathname.split('/')[2]

    //using state variable to store currently displayed post's information
    const [ currentPost, setCurrentPost ] = useState([])

    //api call to fetch the selected blog post
    useEffect(() => {
        const getPost = async() => {
            axios.get(`http://localhost:5000/post/${blogId}`)
            .then(res => setCurrentPost(res.data))
            .catch(err => console.log(err))
        }
        getPost()
    }, [ blogId ])

    return(
        <Container className="postPage">
            <div className="blogPost">
                {currentPost.image
                    ? 
                    <img 
                        src='https://images7.alphacoders.com/681/681197.jpg' 
                        alt="" 
                    />
                    :
                    'No associated image'
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
                    {currentPost.summary}
                </p>
            </div>
        </Container>
    )
}

export { PostPage }