import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

function BlogPost(){

    //using useLocation to identify id of the blog post
    //then using api call to fetch and display that individual post
    const location = useLocation()
    const blogId = location.pathname.split('/')[2]

    //using state variable to store currently displayed post's information
    const [currentPost, setCurrentPost] = useState([])

    //api call to fetch the selected blog post
    useEffect(() => {
        const getPost = async() => {
        const res = await axios.get(`http://localhost:5000/post/${blogId}`)
        setCurrentPost(res.data)
        }
        getPost()
    }, [blogId])
    
    return(
        <div className="blogPost">
            <img 
                src="https://img.freepik.com/free-photo/beautiful-shot-crystal-clear-lake-snowy-mountain-base-during-sunny-day_181624-5459.jpg?w=1800&t=st=1685055781~exp=1685056381~hmac=908a5fea6ad0fd99a4aabe0bc038b23220941a60ed5264fe6269b9645e4fbab4" 
                alt="blog image" 
                className="blogImg"
            />
            <h1 className="blogTitle">
                {currentPost.title}
                <div className="blogCRUD">
                    <FontAwesomeIcon 
                        icon={faPenToSquare} 
                        className="blogCRUDIcon"
                        style={{color:'#1c71d8'}}
                    />
                    <FontAwesomeIcon 
                        icon={faTrash} 
                        className="blogCRUDIcon"
                        style={{color:'#ec1313'}}
                    />
                </div>
            </h1>
            <div className="blogInfo">
                <span className="blogAuthor">
                    Written by 
                    <Link 
                        to={`/?username=${currentPost.username}`} 
                        style={{textDecoration:"none", color:'black'}}
                    >
                        <strong> {currentPost.username} </strong>
                    </Link>
                </span>
                <span className="blogDate">
                   Created on {new Date(currentPost.createdAt).toLocaleDateString()}
                </span>
            </div>
            <p className="blogText">
                {currentPost.summary}
            </p>
        </div>
    )
}

export { BlogPost }