function LoginReducer(state, action){
    switch(action.type){
        case 'START_LOGIN': {
            return {
                user: null,
                fetching: true,
                error: false
            }
        }
        case 'SUCCESS_LOGIN': {
            return {
                user: action.payload,
                fetching: false,
                error: false
            }
        }
        case 'FAIL_LOGIN': {
            return {
                user: null,
                fetching: true,
                error: false
            }
        }
        default:
            return state
    }
}