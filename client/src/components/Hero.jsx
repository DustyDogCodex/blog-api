import { Container } from "react-bootstrap"

function Hero({ coverPosts }){
    //selecting the most recent post as our cover post
    const latest = coverPosts.toReversed()
    const mainPost = latest[0]
    
    return(
        <Container
            style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'40rem', border:'1px solid black', padding:'0' }}
        >
            {/* main cover article */}
            <div
                style={{ height:'100%', width:'70%', border:'1px solid black' }}
            >
                {/* cover image */}
                <div
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'65%' }}
                >
                    <img 
                        src={`http://localhost:5000/uploads/${mainPost?.image}`} 
                        alt='posts image'
                        style={{ height:'100%', width:'100%', objectFit:'contain' }} 
                    />
                </div>
                
                {/* title and subtitle */}
                <div
                    style={{ height:'35%', display:'flex' }}
                >
                    <h1
                        style={{ width:'50%', fontFamily:'Permanent Marker, cursive' }}
                    >
                        {mainPost?.title}
                    </h1>

                    <h5>{mainPost?.subtitle}</h5>
                </div>
            </div>

            {/* new/featured posts section */}
            <div
                style={{ height:'100%', width:'30%', display:'flex', flexDirection:'column', background:'rgb(3, 0, 28)' }}
            >
                {/* heading */}
                <h3
                    style={{color: "gold", fontFamily:'Roboto Mono, cursive'}}
                >
                    New
                </h3>

                {/* post snippets */}
                
            </div> 
        </Container>
    )
}

export { Hero }