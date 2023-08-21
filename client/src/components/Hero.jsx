import { Container } from "react-bootstrap"
import Trending from "./Trending"

function Hero({ coverPosts }){
    //selecting the most recent post as our cover post
    let mainPost = coverPosts[2]
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
                style={{ height:'100%', width:'70%' }}
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
                    style={{ height:'30%', display:'flex' }}
                >
                    <h1
                        style={{ width:'50%', fontFamily:'Roboto Mono, cursive' }}
                    >
                        {mainPost?.title}
                    </h1>

                    <h5>{mainPost?.subtitle}</h5>
                </div>
            </div>

            {/* new/featured posts section */}
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