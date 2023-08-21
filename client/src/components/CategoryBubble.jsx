function CategoryBubble({ category }){
    return(
        <div 
            style={{ 
                fontFamily:'Roboto Mono, san-serif', 
                fontSize:'0.9rem', 
                marginRight:'0.2rem', 
                padding:'0.5rem', 
                background:'skyblue', 
                color:'gold', 
                borderRadius:'1rem', 
                cursor:'pointer', 
                width:'fit-content' 
            }}
        >
            {category}
        </div>
    )
}

export{ CategoryBubble }