function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">About me</span>
                <img className="sidebarImage" src="https://e1.pxfuel.com/desktop-wallpaper/467/133/desktop-wallpaper-pin-on-anime-y-mas-anime-avatar-girl.jpg" alt="avatar" />
                <p style={{margin:'15px'}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore, necessitatibus quo hic ratione earum dolore sunt consectetur, beatae reiciendis non, nihil magni maiores tenetur quaerat possimus amet debitis! Ex, accusantium?</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">Categories</span>
                <ul className="sidebarList">
                    <li className="sidebarListItem">Life</li>
                    <li className="sidebarListItem">Music</li>
                    <li className="sidebarListItem">Sports</li>
                    <li className="sidebarListItem">Nature</li>
                    <li className="sidebarListItem">Tech</li>
                    <li className="sidebarListItem">Movies</li>
                </ul>
            </div>
        </div>
    )
}

export { Sidebar }