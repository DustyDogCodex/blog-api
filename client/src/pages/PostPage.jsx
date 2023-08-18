import { Container } from "react-bootstrap"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Loading from "../components/Loading"

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
        <Container style={{ display:'flex', marginBottom:'2rem' }}>
            <div style={{ padding:'2rem 1rem', width:'100%' }}>
                {loading
                    ?
                    <Loading />
                    :
                    /* post to be displayed */
                    <> 
                        {currentPost.image
                            ? 
                            <div
                                style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}
                            >
                                <img 
                                    src={`http://localhost:5000/uploads/${currentPost.image}`} 
                                    alt="post's image" 
                                    style={{ maxWidth:'100%', maxHeight:'40rem' }}
                                />
                            </div>
                            :
                            ''
                        }

                        <h1 
                            style={{ textAlign:'center', margin:'1rem', fontFamily:'Permanent Marker, cursive', fontSize:'3rem' }}
                        >
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