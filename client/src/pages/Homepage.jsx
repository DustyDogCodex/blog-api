import { Container } from "react-bootstrap"
import { HeaderComponent } from "../components/HeaderComponent"

function Homepage(){
    return(
        <Container>
            <HeaderComponent />
            <h1>This is our Homepage</h1>
        </Container>
    )
}

export { Homepage }