import axios from "axios"
import { Container } from "react-bootstrap"
import { Hero } from "../components/Hero"
import { Sidebar } from "../components/Sidebar"
import { PostsDisplay } from "../components/PostsDisplay"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Loading from "../components/Loading"

function Homepage(){    
    //using state to select posts to display
    const [ blogs, setBlogs ] = useState([])

    //loading screen toggle
    const [ loading, setLoading ] = useState(true)

    //using useLocation to identify any query search parameters present in url
    const location = useLocation()
    const searchQuery = location.search

    //fetching data from our API
    useEffect(() => {
        const getBlogs = async() => {
            axios.get(`http://localhost:5000/post/${searchQuery}`)
            .then(res => { 
                setBlogs(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
        }
        getBlogs()
    }, [ searchQuery ])

    return(
        <>
            {loading
                ?
                <Loading />
                :
                <>
                    {!searchQuery && <Hero coverPosts={blogs.slice(0,4)} />}

                    <Container 
                        fluid='xxl' 
                        style={{ 
                            display:'flex', 
                            justifyContent:'flex-start', 
                            marginBottom:'2rem',
                            minHeight:'90vh',
                            height:'100%'
                        }}
                    >
                        <div
                            style={{ width:'75%' }}
                        >
                            <PostsDisplay blogs={blogs.slice(4)} dashboard={false}/>
                        </div>
                        <Sidebar />
                    </Container>
                </>
            }
        </>
    )
}

export { Homepage }