import { Container } from "react-bootstrap"

function Hero({ coverPosts }){
    //main posts for hero
    console.log(coverPosts)

    return(
        <Container
            style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'50vh' }}
        >
            <div 
                style={{ display:'flex', width:'100%', border:'1px solid red' }}
            >
                {/* main cover article */}
                <div
                    style={{ width:'70%', height:'100%', border:'1px solid black' }}
                >
                    
                </div>

                {/* new/featured posts section */}
                <div
                    style={{ width:'30%' }}
                >
                    <h3>New</h3>
                </div>
            </div>
        </Container>
    )
}

export { Hero }