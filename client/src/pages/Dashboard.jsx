import { Container } from "react-bootstrap"
import { Link, Outlet } from "react-router-dom"

function Dashboard() {
    return (
        <Container className="mt-5">
            <div
                style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-evenly' }}
            >
                <Link
                    to={'/dashboard'}
                    style={{ fontFamily:'Roboto Mono, cursive', fontSize:'1.8rem'}}
                    className="link"
                >
                    Home
                </Link> 
                
                <Link
                    to={'account'}
                    style={{ fontFamily:'Roboto Mono, cursive', fontSize:'1.8rem'}}
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