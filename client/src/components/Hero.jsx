import { Container } from "react-bootstrap"
import Trending from "./Trending"
import { Link } from "react-router-dom"

function Hero({ coverPosts }){
    //selecting the most recent post as cover post
    let mainPost = coverPosts[3]
    let trendingPosts = coverPosts.slice(0,3)
    
    return(
        <Container
            style={{ 
                display:'flex', 
                alignItems:'center', 
                justifyContent:'center', 
                height:'45rem', 
                padding:'0', 
                marginTop:'2rem', 
                marginBottom:'2rem' 
            }}
        >
            {/* main cover article */}
            <div
                style={{ height:'100%', width:'70%', marginRight:'1rem' }}
            >
                {/* cover image */}
                <div
                    style={{ 
                        display:'flex', 
                        alignItems:'center', 
                        justifyContent:'center', 
                        height:'70%', 
                        background:'rgb(211,211,211)' 
                    }}
                >
                    <img 
                        src={`http://localhost:5000/uploads/${mainPost?.image}`} 
                        alt='posts image'
                        style={{ height:'100%', width:'100%', objectFit:'fill' }} 
                    />
                </div>
                
                {/* title and subtitle */}
                <div
                    style={{ 
                        height:'30%', 
                        display:'flex' 
                    }}
                >
                    <p
                        style={{ 
                            width:'50%', 
                            fontFamily:'Montserrat, sans-serif',
                            fontSize:'2.3rem',
                            fontWeight:'800',
                            padding:'1rem 0rem'
                        }}
                    >
                        {mainPost?.title}
                    </p>

                    <p
                        style={{ 
                            padding:'2rem 0rem',
                            fontSize:'1.4rem',
                            color:'rgba(128,128,128)',
                            width:'50%',
                            display:'flex',
                            flexDirection:'column',
                            alignItems:'center'
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
                    width:'30%', 
                    display:'flex', 
                    flexDirection:'column', 
                    background:'rgb(3, 0, 28)' 
                }}
            >
                {/* heading */}
                <h3
                    style={{ 
                        color: "gold", 
                        fontSize:'2.5rem' , 
                        fontFamily:'Permanent Marker, cursive', 
                        margin:'1rem' 
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