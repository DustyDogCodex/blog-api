import { useContext, useState } from "react"
import { Container, Button } from "react-bootstrap"
import { MyContext } from "../MyContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { faCheck, faUser, faXmark } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"

function Account(){
    //grabbing userInfo from context
    const { userInfo } = useContext(MyContext)

    //variables to track user input
    const [ aboutMe, setAboutMe ] = useState('')
    const [ profilePic, setProfilePic ] = useState('')

    //toggle inputs to enter new user info
    const [ editAboutMe, setEditAboutMe ] = useState(false)
    const [ editPicture, setEditPicture ] = useState(false)

    //api calls for updating user settings
    async function updateAboutMe(){
        axios.put(`http://localhost:5000/settings/aboutMe`,
            { userId: userInfo._id, aboutMe },
            { withCredentials: true }
        )
        .then(res => 
            {
                if (res) { 
                    window.location.reload()
                }
            }
        )
        .catch(err => console.log(err))
    }

    async function updateProfilePic(){
        //submitting formData with uploaded image to update post
        const formData = new FormData()
        
        formData.append('userId', userInfo._id)
        
        if(profilePic){
            formData.append("image", profilePic)
        }

        //sending patch request to update post info on server
        axios.put(`http://localhost:5000/settings/profilePic`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            },
            { withCredentials: true } 
        )
        .then(res => {
            if(res){
                window.location.reload()
            }
        })
        .catch(err => console.log(err))
    }

    return(
        <Container
            style={{ 
                marginTop:"4rem", 
                display:'flex', 
                minHeight:'90vh', 
                height:'100%'
            }}
        >
            <div
                style={{
                    width:'100%',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center'
                }}
            >
                <h3>
                    User Settings
                </h3>

                {/* about me section */}
                <div
                    className="mt-5 flex items-center justify-between"
                    style={{
                        marginTop:'2rem',
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'space-around',
                        width:'35rem',
                    }}
                >
                    <label 
                        style={{ 
                            fontWeight:'900', 
                            fontSize:'1.5rem', 
                            marginBottom:'0.75rem' 
                        }}
                    >
                        About Me
                    </label>

                    <div
                        style={{
                            display:`${ editAboutMe ? 'none' : 'flex' }`,
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                    >
                        <p 
                            style={{ 
                                marginLeft:'0.5rem', 
                                width:'20rem', 
                                marginLeft:'1rem',
                                background:'rgb(220,220,220)',
                                padding:'1rem',
                                borderRadius:'1rem'
                            }}
                        >
                            {userInfo.aboutMe ? userInfo.aboutMe : 'Add an about me section'}
                        </p>
                        <FontAwesomeIcon 
                            icon={faPenToSquare} 
                            style={{ 
                                color: "#00e9fa", 
                                cursor:'pointer', 
                                marginLeft:'10px'
                            }} 
                            onClick={() => setEditAboutMe(!editAboutMe)}
                        />
                    </div>

                    {/* this section will be displayed after user clicks the edit button first */}
                    <div
                        style={{
                            display:`${ editAboutMe ? 'flex' : 'none' }`,
                            alignItems:'center',
                        }}
                    >
                        <textarea 
                            type="text"
                            value={aboutMe} 
                            onChange={(e) => setAboutMe(e.target.value)}
                            style={{ 
                                padding:'0.5rem',
                                borderRadius:'0.5rem',
                                marginLeft:'1rem',
                                width:'20rem'
                            }}
                            rows={5}
                        />
                    
                        <FontAwesomeIcon 
                            icon={faCheck} 
                            style={{color: "#05fa2e", cursor:'pointer', marginLeft:'0.5rem'}} 
                            onClick={updateAboutMe}
                        />
                        <FontAwesomeIcon 
                            icon={faXmark} 
                            style={{color: "#ff0000", cursor:'pointer', marginLeft:'0.5rem'}}
                            onClick={() => setEditAboutMe(!editAboutMe)} 
                        />
                    </div>
                </div>
                    
                {/* profile picture section */}
                <div
                    style={{
                        marginTop:'2rem',
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'space-around'
                    }}
                >
                    <label 
                        style={{ 
                            fontWeight:'900', 
                            fontSize:'1.5rem',
                            marginBottom:'0.75rem'
                        }}
                    >
                        Profile Picture
                    </label>

                    <div
                        style={{
                            display:`${editPicture ? 'none' : 'flex'}`,
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                    >
                        {userInfo.avatar
                            ?
                            <>
                                <img 
                                    src={`http://localhost:5000/uploads/${userInfo.avatar}`} 
                                    alt="user profile picture" 
                                    style={{
                                        width:'12rem',
                                        height:'12rem',
                                        borderRadius:'1rem',
                                        marginLeft:'2.5rem'
                                    }}
                                />
                                <FontAwesomeIcon 
                                    icon={faPenToSquare} 
                                    style={{ 
                                        color: "#00e9fa", 
                                        cursor:'pointer', 
                                        marginLeft:'1rem' 
                                    }}
                                    onClick={() => setEditPicture(!editPicture)}
                                />
                            </>
                            :
                            <>
                                {/* displaying a default user icon if user does not have an avatar */}
                                <FontAwesomeIcon
                                    icon={faUser}
                                    style={{ 
                                        color:'gray',
                                        height:'5rem',
                                        width:'5rem'
                                    }}
                                />
                                <FontAwesomeIcon 
                                    icon={faPenToSquare} 
                                    style={{ 
                                        color: "#00e9fa", 
                                        cursor:'pointer', 
                                        marginLeft:'1rem' 
                                    }}
                                    onClick={() => setEditPicture(!editPicture)}
                                />
                            </>
                        }
                    </div>

                    {/* this section will be displayed after user clicks the edit button first */}
                    <div
                        style={{
                            display:`${ editPicture ? '' : 'none' }`
                        }}
                    >
                        <input 
                            type="file"
                            onChange={(e) => setProfilePic(e.target.files[0])}
                            style={{ 
                                border:'1px solid skyblue',
                                marginLeft:'1rem',
                                borderRadius:'1rem',
                                padding:'0.5rem'
                            }}
                        />
                        
                        <FontAwesomeIcon 
                            icon={faCheck} 
                            style={{
                                color: "#05fa2e", 
                                cursor:'pointer', 
                                marginLeft:'5px'
                            }} 
                            onClick={updateProfilePic}
                        />
                        <FontAwesomeIcon 
                            icon={faXmark} 
                            style={{ 
                                color: "#ff0000", 
                                cursor:'pointer', 
                                marginLeft:'5px'
                            }}
                            onClick={() => setEditPicture(!editPicture)} 
                        />
                    </div>
                </div>
                
                {/* delete account button */}
                <div
                    style={{ 
                        marginTop:'2rem',
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center' 
                    }}
                >
                    <h3 style={{ color:'red' }}>!!! DANGER ZONE !!!</h3>

                    <Button
                        variant="danger"
                        style={{ marginTop:'1rem' }}
                    >
                        Delete Your Account
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export { Account }