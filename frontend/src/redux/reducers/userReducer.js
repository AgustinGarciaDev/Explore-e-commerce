
const initialState = {
    usuarioStatus: null,
}

const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'SIGNIN_USER':
            localStorage.setItem('userLogged', JSON.stringify({
                photo: action.payload.img,
                name: action.payload.name
            }))
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                usuarioStatus: action.payload
            }

        case 'SIGNOUT_USER':
            localStorage.removeItem("userLogged")
            localStorage.removeItem("token")
            return {
                ...state,
                usuarioStatus: null
            }

        default:
            return state

    }
}



export default userReducer