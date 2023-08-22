import { Post } from "./Post"

function PostsDisplay({ blogs, dashboard }){
    //individual blogs for display
    const blogElements = blogs.map((blog,index) => 
        <Post 
            key={index} 
            id={blog._id} 
            title={blog.title}
            username={blog.username}  
            userId={blog.userId}
            post={blog.post} 
            image={blog.image}
            categories={blog.categories} 
            created={blog.createdAt} 
            dashboard={dashboard}
        />
    )

    return(
        <div 
            style={{ marginBottom:'3rem' }}
        >
            {/* in case of empty search result, display a small message */}
            {blogs.length 
                ? 
                blogElements.reverse() 
                :  
                <p style={{ textAlign:'center' }}>
                    Sorry, no results matching your search were found.
                </p> 
            }
        </div>
    )
}

export { PostsDisplay }