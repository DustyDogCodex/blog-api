import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { CategoryBubble } from "./CategoryBubble"
import useMediaQuery from "../hooks/useMediaQuery"

function Sidebar(){
    //using state to update list of available catgories in the sidebar
    const [categories, setCategories] = useState([])

    //custom mediaQuery hook 
    const aboveMediumScreens = useMediaQuery('(min-width:1060px)')

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
        <div 
            style={{
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center',
                width:`${ aboveMediumScreens ? '25%' : '100%' }`,
                height:'fit-content',
                padding:'2rem 0.5rem'
            }}
            /* className="sidebar" */
        >
            <span 
                style={{ 
                    margin:`${ aboveMediumScreens ? '1rem' : '0.5rem' }`, 
                    textAlign:'center' 
                }}
            >
                Discover more of what matters to you
            </span>

            <div
                style={{
                    display:'flex',
                    flexWrap:'wrap',
                    justifyContent:'center',
                    gap:'0.3rem',
                    textAlign:'center'
                }}
            >
                { categoriesElements }
            </div>
        </div>
    )
}

export { Sidebar }