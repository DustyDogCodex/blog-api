import { useContext } from "react"
import { Container } from "react-bootstrap"
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { useForm } from "react-hook-form"
import MyContext from '../MyContext'

function Account(){
    //grabbing userInfo from context
    const { userInfo } = useContext(MyContext)

    //react hook form to submit and validate form
    const { register, handleSubmit, formState: { errors } } = useForm()

    return(
        <Container
            style={{ marginTop:"4rem", display:'flex', justifyContent:'center', minHeight:'90vh', height:'100%', padding:'2rem' }}
        >
            <div
                style={{ width:'100%', }}
            >
                <h3>
                    Edit Your Account Info
                </h3>

                {/* form for editting user info */}
                <Form>
                    <Form.Group as={Col} md="4">
                        <Form.Label>About Me</Form.Label>
                        <Form.Control
                            {...register('aboutMe', { required: true, maxLength: 300 })}
                            type="text"
                            as='textarea'
                            rows={4}
                            placeholder="Update your about me"
                        />

                    </Form.Group>

                    <Form.Group as={Col} md='4' style={{ marginTop:'1rem' }}>
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control
                            type="file"
                            name="file"
                        />
                    </Form.Group>
                    
                    {/* submit form */}
                    <Button 
                        type="submit"
                        className="mt-3"
                    >
                        Submit form
                    </Button>
                </Form>
                
                {/* delete account button */}
                <div
                    style={{ marginTop:'2rem' }}
                >
                    <h3 style={{ color:'red' }}>!!! DANGER ZONE !!!</h3>

                    <Button
                        variant="danger"
                        style={{marginTop:'1rem'}}
                    >
                        Delete Your Account
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export { Account }