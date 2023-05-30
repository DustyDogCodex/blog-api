import { Container } from "react-bootstrap"
import { HeaderComponent } from "../components/HeaderComponent"
import { Sidebar } from "../components/Sidebar"
import { PostsDisplay } from "../components/PostsDisplay"
import { useEffect, useState } from "react"
import axios from "axios"

function Homepage(){
    //using state to select posts to display
    const [blogs, setBlogs] = useState([])

    //fetching data from our API
    useEffect(() => {
        const getBlogs = async() => {
            const res = await axios.get('http://localhost:5000/post/')
            //setting fetched data as current blogs to be displayed
            setBlogs(res.data)
        }
        getBlogs()
    }, [])

    return(
        <>
            <HeaderComponent />
            <Container fluid='xxl' className="home">
                <PostsDisplay blogs={blogs}/>
                <Sidebar />
            </Container>
        </>
    )
}

export { Homepage }