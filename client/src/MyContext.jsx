import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

//this initial state will be updated with user info if user passes login authentication
export const MyContext = createContext({})

export const ContextProvider = ({ children }) => {

    //using state to store and update user information
    //set to false till user data is fetched
    const [ userInfo, setUserInfo ] = useState(false)

    //function to get user information after user logs in
    //then the user info is passed into our context using setUserInfo
    useEffect(() => {
        const getProfile = async() => {
            axios.get(
                'https://bloggy-production.up.railway.app/auth/getuser',
                { withCredentials: true }
            )
            .then(res => setUserInfo(res.data))
            .catch(err => console.log(err))
        }
        getProfile()
    }, [])

    return (
        <MyContext.Provider 
            value={{ userInfo }}
        > 
            {children} 
        </MyContext.Provider>
    )
}