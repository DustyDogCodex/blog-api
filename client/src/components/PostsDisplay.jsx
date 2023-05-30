import { Post } from "./Post";

function PostsDisplay({ blogs }){

    //mapping blog data into individual <post/> components that will be displayed as an array
    const blogElements = blogs.map((blog,index) => 
        <Post key={index} title={blog.title} summary={blog.summary} username={blog.username} categories={blog.categories} />
    )

    return(
        <div className="postsDisplay">
            {blogElements}
        </div>
    )
}

export { PostsDisplay }