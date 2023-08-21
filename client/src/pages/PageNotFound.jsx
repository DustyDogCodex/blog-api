import { Container } from "react-bootstrap"
import johnny from '../assets/johnny-T.gif'

function PageNotFound() {
    return (
        <Container
            style={{
                minHeight:'95vh',
                height:'100%',
                display:'flex',
                flexDirection:'column',
                alignItems:'center'
            }}
        >
            <img 
                src={johnny} 
                alt="huh? where is it?" 
                style={{
                    height:'35rem',
                    width:'fit-content',
                    alignContent:'center'
                }}
            />

            <h3
                className="mt-5"
            >
                Sorry we can't find the page you're looking for! Please try refreshing or navigating to a different page.
            </h3>
        </Container>
    )
}

export default PageNotFound