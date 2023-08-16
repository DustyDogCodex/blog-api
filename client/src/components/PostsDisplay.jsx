import { Post } from "./Post";

function PostsDisplay({ blogs }){
    //individual blogs for display
    const blogElements = blogs.map((blog,index) => 
        <Post 
            key={index} 
            id={blog._id} 
            title={blog.title}
            username={blog.username}  
            post={blog.post} 
            image={blog.image}
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