import { Container } from "react-bootstrap"
import { useParams } from "react-router-dom"
import Profile from "../components/Profile"

function UserProfile() {
    //grab user id from params
    const { userId } = useParams()

    return (
        <Container>
            <Profile userId={userId} />
        </Container>
    )
}

export default UserProfile