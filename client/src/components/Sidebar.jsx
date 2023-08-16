import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { CategoryBubble } from "./CategoryBubble"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"

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
    },[])

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

            <div style={{marginTop:'20px', borderTop:'1px solid black'}}>
                <a 
                    href="https://github.com/DustyDogCodex/bloggy"
                    target="_blank" 
                    rel="noopener"
                >
                    <FontAwesomeIcon 
                        icon={faGithub} 
                        style={{ color: "black", height:'30px', width:'30px', margin:'10px' }} 
                    />
                </a>

                <a 
                    href="https://twitter.com/VarunMalaviya2"
                    target="_blank" 
                    rel="noopener" 
                >
                    <FontAwesomeIcon 
                        icon={faTwitter} 
                        style={{ color: "#055ffa", height:'30px', width:'30px', margin:'10px' }} 
                    />
                </a>

                <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener"
                    onClick={() => window.location = 'mailto:varunmalaviya7@gmail.com'}
                >
                    <FontAwesomeIcon 
                        icon={faEnvelope} 
                        style={{ color: "#efc90b", height:'30px', width:'30px', margin:'10px' }} 
                    />
                </a>
            </div>
        </div>
    )
}

export { Sidebar }