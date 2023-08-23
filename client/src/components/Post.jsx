/* Component for rectangle box that displays a brief summary of a blog post on the homepage. For the component that displays posts, please go to PostsDisplay.jsx */
import { Link } from "react-router-dom"
import { CategoryBubble } from './CategoryBubble'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { Button } from "react-bootstrap"
import axios from "axios"
import useMediaQuery from "../hooks/useMediaQuery"

function Post({ id, userId, title, username, post, image, categories, created, dashboard }){
    //toggle for confirm delete post popup
    const [ confirmDelete, setConfirmDelete ] = useState(false)

    //custome media query
    const aboveMediumScreens = useMediaQuery('(min-width:1060px)')

    //mapping categories to display as an array
    const categoryElements = categories.map((category,index) => 
        <CategoryBubble key={index} category={category} />
    )

    //delete post api call
    function deletePost(){
        axios.delete(`https://bloggy-production.up.railway.app/post/${id}`)
        .then(res => {
            if(res.data === 'deleted'){
                window.location.replace('/dashboard')
            }
        })
        .catch(err => console.log(err))
    }

    //delete confirm popup
    if(confirmDelete){
        return(
            <div
                style={{ 
                    position:'fixed', 
                    top:'0', 
                    right:'0', 
                    zIndex:'20', 
                    height:'100vh', 
                    width:'100vw', 
                    background:'rgba(211,211,211,0.6)', 
                    display:'flex', 
                    alignItems:'center', 
                    justifyContent:'center' 
                }}
            >
                {/* centered div with main content */}
                <div
                    style={{ 
                        width:'fit-content', 
                        height:'fit-content', 
                        background:'white', 
                        borderRadius:'3rem', 
                        padding: '2% 5%' 
                    }}
                >
                    {/* heading + close popup button */}
                    <div
                        style={{ 
                            display:'flex', 
                            justifyContent:'space-around', 
                            alignItems:'center' 
                        }}
                    >
                        <h2>Confirm Delete</h2> 
                        <FontAwesomeIcon 
                            icon={faXmark} 
                            style={{ 
                                color:'red', 
                                height:'3rem', 
                                cursor:'pointer' 
                            }} 
                            onClick={() => setConfirmDelete(!confirmDelete)}    
                        />
                    </div>

                    {/* yes/no buttons + confirm delete message */}
                    <div
                        style={{ 
                            marginTop:'10%', 
                            display:'flex', 
                            flexDirection:'column', 
                            alignItems:"center", 
                            justifyContent:'center'  
                        }}
                    >
                        <h3 style={{ textAlign:'center' }} >Are you sure you want to delete:</h3>
                        
                        <h4 
                            style={{ 
                                fontFamily:'Permanent Marker, cursive', 
                                fontSize:'2rem',
                                textAlign:'center' 
                            }}
                        >
                            {title}
                        </h4>

                        <div
                            style={{ marginTop:'2%' }}
                        >
                            <Button 
                                variant="danger"
                                onClick={deletePost}
                            >
                                Yes
                            </Button>

                            <Button 
                                variant="success" 
                                style={{ marginLeft:'1rem' }}
                                onClick={() => setConfirmDelete(!confirmDelete)} 
                            >
                                No
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    /* main component */
    return(
        <div 
            style={{ 
                padding:'1rem 0rem', 
                borderBottom:'1px solid rgba(211,211,211,0.6)', 
                display:'flex', 
                flexDirection:`${ aboveMediumScreens ? 'row' : 'column-reverse' }`,
                alignItems:'center', 
                justifyContent:'space-between' 
            }}
        >
            {/* left hand side w/ username, title, summary, category and date */}
            <div
                style={{ 
                    marginTop:'0.5rem', 
                    display:'flex', 
                    flexDirection:'column', 
                    alignItems:`${ aboveMediumScreens ? 'start' : 'center' }`, 
                    justifyContent:'flex-start' 
                }}
            >
                {/* username */}
                <Link
                    to={`/user/${userId}`}
                    style={{margin:'0%', color:'rgba(128,128,128)'}}
                    className="link"
                >
                    {username}
                </Link>
                
                {/* link to postPage for selected blog post */}
                <Link 
                    to={`/post/${id}`} 
                    className="link"
                >
                    <h2
                        style={{ 
                            fontSize:'1.6rem', 
                            margin:'0.2rem 0rem', 
                            fontFamily:'Permanent Marker, cursive', 
                            cursor:'pointer',
                            textAlign:`${ aboveMediumScreens ? 'left' : 'center' }`
                        }}
                    >
                        {title}
                    </h2>
                </Link>
                
                {/* category tags */}
                <div 
                    style={{ display:'flex' }}
                >
                    { categoryElements }
                </div>
                
                {/* brief summary of the post */}
                <div className="postSummary">
                    { post }
                </div>

                {/* date of creation */}
                <p 
                    style={{ 
                        marginTop:'0.3rem', 
                        color:'rgba(128,128,128)' 
                    }}
                >
                    { new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long" }).format(new Date(created)) }
                </p>
            </div>

            {/*right hand side of post w/ conditionally rendering image */}
            {image
                ?
                <img 
                    src={`https://bloggy-production.up.railway.app/uploads/${image}`} 
                    alt="blog image" 
                    style={{ 
                        width:`${ aboveMediumScreens ? '25%' : '100%' }`, 
                        height:'12rem', 
                        borderRadius:'2rem', 
                        marginLeft:`${ aboveMediumScreens ? '1rem' : '0' }`
                    }}
                />
                :
                ''
            }

            {/* CRUD icons, these will only be displayed if these posts are currently displayed on the user's dashboard */}
            {dashboard && (
                <div
                    style={{ 
                        marginLeft:'1rem',
                        display:'flex',
                        flexDirection:`${ aboveMediumScreens ? 'column' : 'row' }`
                    }}
                >
                    <Link
                        to={`edit/${id}`}
                    >
                        <FontAwesomeIcon 
                            icon={faPenToSquare} 
                            style={{ color:'skyblue', height:'1.6rem', cursor:'pointer',margin:'0.5rem' }}
                        />
                    </Link>
                    
                    <FontAwesomeIcon 
                        icon={faTrash} 
                        style={{ color:'red', height:'1.6rem', cursor:'pointer', margin:'0.5rem' }}
                        onClick={() => setConfirmDelete(!confirmDelete)}
                    />
                </div>
            )}
        </div>
    )
}

export { Post }