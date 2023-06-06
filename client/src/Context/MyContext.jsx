import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

//this initial state will be updated with user info if user passes login authentication
export const MyContext = createContext({});

export const ContextProvider = ({ children }) => {

    //function to get user information after user logs in
    useEffect(() => {
        const getProfile = async() => {
        const res = await axios.get(
            'http://localhost:5000/auth/getuser',
            { withCredentials: true })
                .then(res => {console.log(res)})
        }
        getProfile()
    }, [])
    
    const [userInfo, setUserInfo] = useState({})

    return (
        <MyContext.Provider 
            value={{ userInfo }}
        > 
            {children} 
        </MyContext.Provider>
    )
}