import { Link } from "react-router-dom"
import { CategoryBubble } from './CategoryBubble'

/* This is the post component for controlling/styling individual posts. For the component that displays posts, please go to Posts.jsx */
function Post({ id, title, username, post, image, categories, created }){

    //mapping categories to display as an array
    const categoryElements = categories.map((category,index) => 
        <CategoryBubble key={index} category={category} />
    )

    return(
        <div className="post">
            <div className="postContent">
                <Link 
                    to={`/post/${id}`} 
                    className="link"
                >
                    <div className="postTitle">{title}</div>
                </Link>

                <p>
                    By <strong>{username}</strong> on { new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long" }).format(new Date(created)) }
                </p>
                
                <div className="postCategories">
                    { categoryElements }
                </div>
                
                <div className="postSummary">
                    { post }
                </div>
            </div>

            {/* conditionally rendering image */}
            {image
                ?
                <img 
                    src={`http://localhost:5000/uploads/${image}`} 
                    alt="blog image" 
                    className="postImg" 
                />
                :
                ''
            }
        </div>
    )
}

export { Post }