import { Container } from "react-bootstrap";
import { Sidebar } from "../components/Sidebar";
import { BlogPost } from "../components/BlogPost";

/* this is the page users will b directed to when they click on a blog post to view it */
function PostPage(){
    return(
        <Container className="postPage">
            <BlogPost/>
            <Sidebar/>
        </Container>
    )
}

export { PostPage }