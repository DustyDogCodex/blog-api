import { Link } from "react-router-dom"
import { CategoryBubble } from './CategoryBubble'

/* This is the post component for controlling/styling individual posts. For the component that displays posts, please go to Posts.jsx */
function Post({ id, title, summary, username, categories, created }){

    //mapping categories to display as an array
    const categoryElements = categories.map((category,index) => 
        <CategoryBubble key={index} category={category} />
    )

    return(
        <div className="post">
            <img 
                src="https://img.freepik.com/free-photo/aerial-view-mountain-covered-fog-beautiful-pink-sky_181624-4676.jpg?t=st=1685049492~exp=1685050092~hmac=ff83ba7cda77f50cbaeae1890e17b274a0b720b2ffcfb46452aba5957aa8d790" 
                alt="mountain at sunset" 
                className="postImg" 
            />
            <div className="postContent">
                <Link 
                    to={`/post/${id}`} 
                    className="link"
                >
                    <div className="postTitle">{title}</div>
                </Link>
                <div className="postCategories">
                    { categoryElements }
                </div>
                <span className="postCreatedAt">
                    { new Date(created).toLocaleDateString() }
                </span>
                <div className="postSummary">
                    { summary }
                </div>
            </div>
        </div>
    )
}

export { Post }