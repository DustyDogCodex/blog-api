import { Post } from "./Post";

function PostsDisplay({ blogs }){

    //mapping blog data into individual <post/> components that will be displayed as an array
    const blogElements = blogs.map((blog,index) => 
        <Post 
            key={index} 
            id={blog._id} 
            title={blog.title} 
            summary={blog.summary} 
            username={blog.username} 
            categories={blog.categories} 
            created={blog.createdAt} 
        />
    )

    return(
        <div className="postsDisplay">
            {blogElements.reverse()}
        </div>
    )
}

export { PostsDisplay }