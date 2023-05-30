function HeaderComponent(){
    return(
        <div className="headerComponent">
            <div className="headerTitle">
                <span className="headerTitleSmall">Welcome to</span>
                <span className="headerTitleLarge">Bloggy!</span>
            </div>
            <img 
                className="headerImage" 
                src="https://wallpapercave.com/wp/wp2532971.jpg" 
                alt="nightime mountain view" 
            />
        </div>
    )
}

export { HeaderComponent }