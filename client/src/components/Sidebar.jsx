import { useEffect, useState } from "react"
import axios from "axios"

function Sidebar(){

    //using state to update list of available catgories in the sidebar
    const [categories, setCategories] = useState([])

    //fetching available categories
    useEffect(() => {
        const getCategories = async() => {
            const res = await axios.get('http://localhost:5000/category')
            setCategories(res.data)
            console.log('these are our categories',categories)
        }
        getCategories()
    },[])

    //mapping categories into an array for display
    let categoriesElements = categories.map((cat,index) => {
                        <li key={index} className="sidebarListItem">{cat.name}</li>
                    })

    return(
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">About me</span>
                <img 
                    className="sidebarImage" 
                    src="https://e1.pxfuel.com/desktop-wallpaper/467/133/desktop-wallpaper-pin-on-anime-y-mas-anime-avatar-girl.jpg" 
                    alt="avatar" 
                />
                <p style={{margin:'15px'}}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore, necessitatibus quo hic ratione earum dolore sunt consectetur, beatae reiciendis non, nihil magni maiores tenetur quaerat possimus amet debitis! Ex, accusantium?
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">Categories</span>
                <ul className="sidebarList">
                    { categoriesElements }
                </ul>
            </div>
        </div>
    )
}

export { Sidebar }