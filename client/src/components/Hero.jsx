import Trending from "./Trending"
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import useMediaQuery from "../hooks/useMediaQuery"

function Hero({ coverPosts }){
    //selecting the most recent post as cover post
    let mainPost = coverPosts[3]
    let trendingPosts = coverPosts.slice(0,3)

    //media query hook
    const aboveMediumScreens = useMediaQuery('(min-width:1060px)')
    
    return(
        <Container
            style={{ 
                display:'flex', 
                alignItems:'center', 
                flexDirection:`${ aboveMediumScreens ? 'row' : 'column' }`,
                justifyContent:'center', 
                minHeight:`${ aboveMediumScreens ? '45rem' : '100vh' }`, 
                padding:'0', 
                marginTop:'1.5rem', 
                marginBottom:`${ aboveMediumScreens ? '2rem' : '0' }`
            }}
        >
            {/* main cover article */}
            <div
                style={{ 
                    height:'100%', 
                    width:`${ aboveMediumScreens ? '70%' : '100%' }`, 
                    marginRight:'1rem' 
                }}
                className="heroCover"
            >
                {/* cover image */}
                <div
                    style={{ 
                        display:'flex', 
                        alignItems:'center', 
                        justifyContent:'center', 
                        height:`${ aboveMediumScreens ? '70%' : '100%' }`, 
                        background:'rgb(211,211,211)' 
                    }}
                >
                    <img 
                        src={`https://bloggy-production.up.railway.app/uploads/${mainPost?.image}`} 
                        alt='posts image'
                        style={{ height:'100%', width:'100%', objectFit:'fill' }} 
                    />
                </div>
                
                {/* title and subtitle */}
                <div
                    style={{ 
                        height:`${ aboveMediumScreens ? '30%' : '100%' }`, 
                        display:'flex',
                        flexDirection:`${ aboveMediumScreens ? 'row' : 'column' }` 
                    }}
                >
                    <p
                        style={{ 
                            width:`${ aboveMediumScreens ? '50%' : '100%' }`, 
                            fontFamily:'Montserrat, sans-serif',
                            fontSize:`${ aboveMediumScreens ? '2.3rem' : '1.5rem' }`,
                            fontWeight:'800',
                            padding:`${ aboveMediumScreens ? '1rem 0rem' : '1rem' }`,
                            textAlign:`${ aboveMediumScreens ? 'left' : 'center' }`
                        }}
                    >
                        {mainPost?.title}
                    </p>

                    <p
                        style={{ 
                            padding:`${ aboveMediumScreens ? '2rem 0rem' : '1rem' }`,
                            fontSize:'1.4rem',
                            color:'rgba(128,128,128)',
                            width:`${ aboveMediumScreens ? '50%' : '100%' }`,
                            display:'flex',
                            flexDirection:'column',
                            alignItems:'center',
                            textAlign:`${ aboveMediumScreens ? 'left' : 'center' }`
                        }}
                    >
                        {mainPost?.subtitle}

                        <Link
                            to={`post/${mainPost._id}`}
                            className="link"
                            style={{
                                background:'red',
                                color:'white',
                                padding:'0.5rem 1rem',
                                fontSize:'smaller',
                                marginTop:'0.5rem',
                                border:'none',
                                borderRadius:'1rem'
                            }}
                        >
                            Read More
                        </Link>
                    </p>
                </div>
            </div>

            {/* new/trending posts section */}
            <div
                style={{ 
                    height:'100%', 
                    width:`${ aboveMediumScreens ? '30%' : '100%' }`, 
                    display:'flex', 
                    flexDirection:'column', 
                    background:'rgb(3, 0, 28)' 
                }}
                className="heroTrending"
            >
                {/* heading */}
                <h3
                    style={{ 
                        color: "gold", 
                        fontSize:'2.5rem' , 
                        fontFamily:'Permanent Marker, cursive', 
                        margin:'1rem',
                        textAlign:`${ aboveMediumScreens ? 'left' : 'center' }`
                    }}
                >
                    New
                </h3>

                {/* new/trending posts section */}
                {trendingPosts.map((post,index) => 
                    <Trending 
                        key={index}
                        postId={post._id}
                        title={post.title}
                        subtitle={post.subtitle}
                    />
                ).toReversed()}
            </div> 
        </Container>
    )
}

export { Hero }