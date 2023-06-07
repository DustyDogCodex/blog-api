function Spotlight({ avatar, username }){
    return(
        <div className="spotLight">
            <img 
                className='spotLightImg' 
                src={avatar} 
                alt={`${username}'s avatar`}
            />
            <p>{ username }</p>
        </div>
    )
}

export { Spotlight }