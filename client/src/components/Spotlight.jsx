function Spotlight({ avatar, username }){
    return(
        <div 
            style={{ borderTop:'1px solid black', borderBottom:'1px solid black', height:'6.5rem', width:'100%', fontSize:'2rem', display:'flex', alignItems:'center', justifyContent:'space-around' }}
        >
            <img 
                style={{ height:'4rem', width:'4rem', borderRadius:'100%' }}
                src={avatar} 
                alt={`${username}'s avatar`}
            />
            <p>{ username }</p>
        </div>
    )
}

export { Spotlight }