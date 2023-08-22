import { Container } from "react-bootstrap"
import Profile from "../components/Profile"
import { useContext } from "react"
import { MyContext } from "../MyContext"

function MyProfile() {
    //getting userId from context
    const { userInfo } = useContext(MyContext)

    return (
        <Container>
            <Profile userId={userInfo._id} />
        </Container>
    )
}
export default MyProfile