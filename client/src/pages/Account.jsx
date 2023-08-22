import { useContext, useState } from "react"
import { Container, Button, Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { MyContext } from "../MyContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { faCheck, faUser, faXmark } from "@fortawesome/free-solid-svg-icons"

function Account(){
    //grabbing userInfo from context
    const { userInfo } = useContext(MyContext)

    //variables to track user input
    const [ aboutMe, setAboutMe ] = useState('')
    const [ profilePic, setProfilePic ] = useState('')

    //toggle inputs to enter new user info
    const [ editAboutMe, setEditAboutMe ] = useState(false)
    const [ editPicture, setEditPicture ] = useState(false)

    //react hook form to submit and validate form
    const { register, handleSubmit, formState: { errors } } = useForm()

    //api calls for updating user settings
    async function updateAboutMe(){
        axios.put(`http://localhost:5000/settings/location`,
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
        axios.put(`http://localhost:5000/settings/profilepic`,
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
                height:'100%', 
                padding:'2rem',
                border:'1px solid black'
            }}
        >
            <div
                style={{
                    border:'1px solid green',
                    width:'100%',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center'
                }}
            >
                <h3>
                    User Settings
                </h3>

                {/* Edit user info section */}
                <div
                    className="mt-5 flex items-center justify-between"
                    style={{
                        marginTop:'2rem',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'space-between'
                    }}
                >
                    {/* about me section */}
                        <label style={{ fontWeight:'900', fontSize:'large'}}>AboutMe</label>
                        <div
                            className={` flex items-center justify-around`}
                            style={{
                                display:`${ editAboutMe ? 'hidden' : 'flex' }`,
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            <p 
                                style={{ marginLeft:'0.5rem' }}
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
                                display:`${ editAboutMe ? '' : 'hidden' }`
                            }}
                        >
                            <input 
                                type="text"
                                value={aboutMe} 
                                onChange={(e) => setAboutMe(e.target.value)}
                                className="rounded-lg p-1 dark:text-black"
                                style={{ 
                                    padding:'0.5rem',
                                    borderRadius:'0.5rem'
                                }}
                            />
                            <FontAwesomeIcon 
                                icon={faCheck} 
                                style={{color: "#05fa2e", cursor:'pointer', marginLeft:'5px'}} 
                                onClick={updateAboutMe}
                            />
                            <FontAwesomeIcon 
                                icon={faXmark} 
                                style={{color: "#ff0000", cursor:'pointer', marginLeft:'5px'}}
                                onClick={() => setEditAboutMe(!editAboutMe)} 
                            />
                        </div>
                    </div>

                    <div
                        className="mt-5 flex items-center justify-between"
                        style={{
                            marginTop:'2rem',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'space-between'
                        }}
                    >
                        <label style={{ fontWeight:'900', fontSize:'large'}}>Profile Picture</label>
                        <div
                            style={{
                                display:`${editPicture ? 'hidden' : 'flex'}`,
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
                                        style={{ color: "#00e9fa", cursor:'pointer', marginLeft:'1rem' }}
                                        onClick={() => setEditPicture(!editPicture)}
                                    />
                                </>
                                :
                                <FontAwesomeIcon
                                    icon={faUser}
                                    style={{ 
                                        color:'gray',
                                        height:'5rem',
                                        width:'5rem'
                                    }}
                                />
                            }
                        </div>

                        {/* this section will be displayed after user clicks the edit button first */}
                        <div
                            className={`${editPicture ? '' : 'hidden'}`}
                        >
                            <input 
                                type="file"
                                onChange={(e) => setProfilePic(e.target.files[0])}
                                className="rounded-lg p-1 border border-sky-500 ml-5"
                                
                            />
                            <FontAwesomeIcon 
                                icon={faCheck} 
                                style={{color: "#05fa2e", cursor:'pointer', marginLeft:'5px'}} 
                                onClick={updateProfilePic}
                            />
                            <FontAwesomeIcon 
                                icon={faXmark} 
                                style={{color: "#ff0000", cursor:'pointer', marginLeft:'5px'}}
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