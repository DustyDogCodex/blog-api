import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { CategoryBubble } from "./CategoryBubble"

function Sidebar(){
    //using state to update list of available catgories in the sidebar
    const [categories, setCategories] = useState([])

    //fetching available categories
    useEffect(() => {
        const getCategories = async() => {
            axios.get('http://localhost:5000/category/')
            .then(res => setCategories(res.data))
            .catch(err => console.log(err))
        }
        getCategories()
    }, [])

    //mapping categories into an array for display
    //adding Link so we can view all posts in a particular category at once.
    const categoriesElements = categories.map((category,index) => 
        <Link 
            key={ index }
            to={`/?category=${category.name}`}
            className="link"
        >
           <CategoryBubble key={index} category={category.name} />
        </Link>
    )

    return(
        <div className="sidebar">
            <span 
                className="sidebarTitle"
            >
                Discover more of what matters to you
            </span>

            <div className="sidebarList">
                { categoriesElements }
            </div>
        </div>
    )
}

export { Sidebar }