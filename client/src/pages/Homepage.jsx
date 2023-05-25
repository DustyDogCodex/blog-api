import { Container } from "react-bootstrap"
import { HeaderComponent } from "../components/HeaderComponent"
import { Posts } from "../components/Posts"
import { Sidebar } from "../components/Sidebar"

function Homepage(){
    return(
        <>
            <HeaderComponent />
            <Container fluid='xxl' className="home">
                <Posts/>
                <Sidebar />
            </Container>
        </>
    )
}

export { Homepage }