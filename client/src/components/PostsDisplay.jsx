import { Post } from "./Post";

function PostsDisplay(){
    return(
        <div className="postsDisplay">
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    )
}

export { PostsDisplay }