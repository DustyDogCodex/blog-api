import { createContext, useReducer } from 'react';
import LoginReducer from './LoginReducer';

//using context for managing user authentication. This will allow the website to restrict access to certain pages, conditional on whether the user is logged in or not.

const INITIAL_STATE = {
    user: null,
    fetching: false,
    error: false
}

//this initial state will be updated with user info if user passes login authentication
export const MyContext = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(LoginReducer, INITIAL_STATE)

    return (
        <MyContext.Provider 
            value={{
                user: state.user, 
                fetching: state.fetching, 
                error: state.error
            }}
        > 
            {children} 
        </MyContext.Provider>
    )
}