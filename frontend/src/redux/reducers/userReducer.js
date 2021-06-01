
const initialState = {
    usuarioStatus: null,
}

const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'SIGNIN_USER':
            console.log(action.payload)
            localStorage.setItem('userLogged', JSON.stringify({ foto: action.payload.img, name: action.payload.user }))
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                usuarioStatus: action.payload
            }
            break
        case 'SIGNINOUT_USER':
            localStorage.clear()
            return {
                ...state,
                usuarioStatus: null
            }
            break

        default:
            return state

    }
}



export default userReducer