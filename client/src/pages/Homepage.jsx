import axios from "axios"
import { Container } from "react-bootstrap"
import { Hero } from "../components/Hero"
import { Sidebar } from "../components/Sidebar"
import { PostsDisplay } from "../components/PostsDisplay"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

function Homepage(){    
    //using state to select posts to display
    const [ blogs, setBlogs ] = useState([])

    //using useLocation to identify any query search parameters present in url
    const location = useLocation()
    const searchQuery = location.search

    //fetching data from our API
    useEffect(() => {
        const getBlogs = async() => {
            axios.get(`http://localhost:5000/post/${searchQuery}`)
            .then(res => setBlogs(res.data))
            .catch(err => console.log(err))
        }
        getBlogs()
    }, [ searchQuery ])

    return(
        <>
            <Hero coverPosts={blogs}/>
            
            <Container fluid='xxl' className="home">
                <div
                    className="homepagePostsDisplay"
                >
                    <PostsDisplay blogs={blogs} />
                </div>
                <Sidebar />
            </Container>
        </>
    )
}

export { Homepage }