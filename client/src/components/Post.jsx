/* Component for rectangle box that displays a brief summary of a blog post on the homepage. For the component that displays posts, please go to PostsDisplay.jsx */

import { Link } from "react-router-dom"
import { CategoryBubble } from './CategoryBubble'

function Post({ id, userId, title, username, post, image, categories, created }){

    //mapping categories to display as an array
    const categoryElements = categories.map((category,index) => 
        <CategoryBubble key={index} category={category} />
    )

    return(
        <div className="post">
            <div className="postContent">
                {/* username */}
                <Link
                    to={`/user/${userId}`}
                    style={{margin:'0%', color:'rgba(128,128,128)'}}
                    className="link"
                >
                    {username}
                </Link>
                
                {/* link to postPage for selected blog post */}
                <Link 
                    to={`/post/${id}`} 
                    className="link"
                >
                    <div className="postTitle">{title}</div>
                </Link>
                
                {/* category tags */}
                <div>
                    { categoryElements }
                </div>
                
                {/* brief summary of the post */}
                <div className="postSummary">
                    { post }
                </div>

                {/* date of creation */}
                <p style={{ marginTop:'0.3rem', color:'rgba(128,128,128)' }}>
                    { new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long" }).format(new Date(created)) }
                </p>
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