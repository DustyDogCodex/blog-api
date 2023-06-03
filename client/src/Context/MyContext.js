import { createContext } from 'react';

//using context for managing user authentication. This will allow the website to restrict access to certain pages, conditional on whether the user is logged in or not.

export const MyContext = createContext({
    user: null,
    fetching: false,
    error: false
});
