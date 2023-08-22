import useMediaQuery from "../hooks/useMediaQuery"

function Spotlight({ avatar, username }){
    //custom media query
    const aboveMediumScreens = useMediaQuery('(min-width:1060px)')

    return(
        <div 
            style={{ 
                borderTop:'1px solid black', 
                borderBottom:'1px solid black', 
                height:`${ aboveMediumScreens ? '6.5rem' : '4rem' }`, 
                width:'100%', 
                fontSize:`${ aboveMediumScreens ? '2rem' : '1.5rem' }`, 
                display:'flex', 
                alignItems:'center', 
                justifyContent:'space-around' 
            }}
        >
            <img 
                style={{ 
                    height:`${ aboveMediumScreens ? '4rem' : '3rem' }`, 
                    width:`${ aboveMediumScreens ? '4rem' : '3rem' }`, 
                    borderRadius:'100%' 
                }}
                src={avatar} 
                alt={`${username}'s avatar`}
            />
            <p>{ username }</p>
        </div>
    )
}

export { Spotlight }