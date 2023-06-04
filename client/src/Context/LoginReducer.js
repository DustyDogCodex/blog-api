//reducer function for consolidating logic that will be used to update user info state to provide context for the entire app.
function LoginReducer(state, action){
    switch(action.type){
        //begin login process by sending post request
        case 'START_LOGIN': {
            return {
                user: null,
                fetching: true,
                error: false
            }
        }
        //user was succesfully authenticated aka logged in. User info is retrieved from api and stored in context
        case 'SUCCESS_LOGIN': {
            return {
                user: action.payload,
                fetching: false,
                error: false
            }
        }
        //user authentication failed. No user information was retrieved. Instead an error is returned and used to update state.
        case 'FAIL_LOGIN': {
            return {
                user: null,
                fetching: true,
                error: true
            }
        }
        default:
            return state
    }
}

export default LoginReducer