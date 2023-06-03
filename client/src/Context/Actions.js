export const startLogin = (userCredentials) => ({
    type: "START_LOGIN"
})

export const successLogin = (user) => ({
    type: "SUCCESS_LOGIN",
    payload: user
})

export const failLogin = () => ({
    type: "FAIL_LOGIN"
})