import { Container } from "react-bootstrap"
import { Link, Outlet, useLocation } from "react-router-dom"

function Dashboard() {
    //using uselocation to determine which subpage user is on
    //this variable will be used to conditionally render the styling for the subpage headings
    const location = useLocation()
    let subpage = location.pathname.split('/')[2]
    
    return (
        <Container className="mt-5">
            <div
                style={{ display:'flex', alignItems:'flex-start' }}
            >
                <Link
                    to={'/dashboard'}
                    style={{ 
                        fontFamily:'Roboto Mono, cursive', 
                        fontSize:'1.8rem', 
                        color:`${ subpage == undefined ? 'black' : 'rgba(211,211,211,0.6)' }` , 
                        borderBottom:`${ subpage === undefined ? '1px solid black' : '' }` 
                    }}
                    className="link"
                >
                    Home
                </Link> 
                
                <Link
                    to={'account'}
                    style={{ 
                        fontFamily:'Roboto Mono, cursive', 
                        fontSize:'1.8rem', 
                        marginLeft:'1rem',
                        color:`${ subpage === 'account' ? 'black' : 'rgba(211,211,211,0.6)' }`,  
                        borderBottom:`${ subpage === 'account' ? '1px solid black' : '' }` 
                    }}
                    className="link"
                >
                    Account
                </Link>
            </div>

            {/* outlet for subpages */}
            <Outlet />
        </Container>
    )
}

export default Dashboard