import axios from "axios"
import { Container } from "react-bootstrap"
import { Hero } from "../components/Hero"
import { Sidebar } from "../components/Sidebar"
import { PostsDisplay } from "../components/PostsDisplay"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Loading from "../components/Loading"
import useMediaQuery from "../hooks/useMediaQuery"

function Homepage(){    
    //using state to select posts to display
    const [ blogs, setBlogs ] = useState([])

    //loading screen toggle
    const [ loading, setLoading ] = useState(true)

    //media query hook
    const aboveMediumScreens = useMediaQuery('(min-width:1060px)')

    //using useLocation to identify any query search parameters present in url
    const location = useLocation()
    const searchQuery = location.search

    //fetching data from our API
    useEffect(() => {
        const getBlogs = async() => {
            axios.get(`https://bloggy-production.up.railway.app/post/${searchQuery}`)
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
                <div
                    style={{
                        minHeight:'95vh',
                        height:'100%'
                    }}
                >
                    {!searchQuery && <Hero coverPosts={blogs.slice(0,4)} />}

                    <Container
                        style={{ 
                            display:'flex', 
                            flexDirection:`${ aboveMediumScreens ? 'row' : 'column-reverse' }`,
                            justifyContent:'flex-start', 
                            marginBottom:'2rem',
                            height:'100%'
                        }}
                    >
                        <div
                            style={{ 
                                width:`${ aboveMediumScreens ? '75%' : '100%' }` 
                            }}
                        >
                            <PostsDisplay blogs={ searchQuery ? blogs : blogs.slice(4) } dashboard={false}/>
                        </div>
                        <Sidebar />
                    </Container>
                </div>
            }
        </>
    )
}

export { Homepage }