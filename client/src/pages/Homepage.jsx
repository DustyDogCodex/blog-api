import { Container } from "react-bootstrap"
import { HeaderComponent } from "../components/HeaderComponent"
import { Sidebar } from "../components/Sidebar"
import { PostsDisplay } from "../components/PostsDisplay"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import { MyContext } from "../Context/MyContext"

function Homepage(){
    //using context to check for user and then set it to him
    const { user } = useContext(MyContext)

    //using state to select posts to display
    const [blogs, setBlogs] = useState([])

    //using useLocation to identify any query search parameters being passed to url
    const location = useLocation()
    const searchQuery = location.search

    //fetching data from our API
    useEffect(() => {
        const getBlogs = async() => {
            const res = await axios.get(`http://localhost:5000/post/${searchQuery}`)
            //setting fetched data as current blogs to be displayed
            setBlogs(res.data)
        }
        getBlogs()
    }, [ searchQuery ])

    //fetching user account info if user is logged in
    //maybe use react-cookies to get cookies?????
    useEffect(() =>{
        const getProfile = async() => {
            const res = axios.get('http://localhost:5000/auth/profile',{ withCredentials: true })
            .then(res => {
                console.log(res.data.username)
            })
        }
        getProfile()
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