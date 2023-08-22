import { Link } from "react-router-dom"
import useMediaQuery from "../hooks/useMediaQuery"

function Trending({ postId, title, subtitle }) {
    //custom media query hook
    const aboveMediumScreens = useMediaQuery('(min-width:1060px)')
    
    return (
        <Link
            to={`/post/${postId}`}
            style={{ 
                margin:'1.4rem 1rem', 
                borderBottom:"1px solid rgb(211,211,211, 0.6)",  
                paddingBottom:'2rem',
                textAlign:`${ aboveMediumScreens ? 'left' : 'center' }`
            }}
            className="link"
        >
            <p style={{ color:'white', fontSize:'1.5rem', margin:'0' }}>{title}</p>
            
            <span style={{ color:'grey', fontSize:'1rem' }}>{subtitle}</span>
        </Link>
    )
}

export default Trending