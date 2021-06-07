import axios from "axios"
import { toast } from 'react-toastify'

const userActions = {

    createAcount: (infoUser) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post("https://explore-2021.herokuapp.com/api/user/signup", infoUser)
                if (response) {
                    if (!response.data.success) {
                        return response.data
                    } else {
                        dispatch({ type: 'SIGNIN_USER', payload: response.data.response })
                        toast.success('Welcome ' + response.data.response.name + '!', {
                            position: "top-center",
                            autoClose: 1700,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    }
                }
            } catch {
                toast.error('Something went wrong, try again later!', {
                    position: "top-right",
                    autoClose: 1700,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        }
    },
    signInUser: (infoUser) => {

        return async (dispatch, getState) => {
            try {
                const response = await axios.post("https://explore-2021.herokuapp.com/api/user/signin", infoUser)
                if (response) {
                    if (response.data.success) {
                        dispatch({ type: 'SIGNIN_USER', payload: response.data.response })
                        toast.success('Welcome back ' + response.data.response.user + '!', {
                            position: "top-center",
                            autoClose: 1700,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    } else {
                        return response.data
                    }
                }
            } catch {
                toast.error('Something went wrong, try again later!', {
                    position: "top-right",
                    autoClose: 1700,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        }

    },

    SignOut: () => {
        return (dispatch, getState) => {

            dispatch({ type: 'SIGNOUT_USER' })
            toast.success("see you soon", {
                autoClose: 1000,
                position: "top-center",
            })
        }
    },

    relogin: (userLoggedForzed) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('https://explore-2021.herokuapp.com/api/user/relogin', {
                    headers: {
                        'Authorization': 'Bearer ' + userLoggedForzed.token
                    }
                })
                dispatch({
                    type: 'SIGNIN_USER', payload: {
                        ...response.data.response,
                        token: userLoggedForzed.token
                    }
                })
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        localStorage.clear()
                        toast.error("what are you trying to do ???")
                    }
                }
            }
        }
    },


    modifyUser: (dateToChange, token) => {
        return async (dispatch, getState) => {
            const response = await axios.put("https://explore-2021.herokuapp.com/api/user/modifyuser/:id", dateToChange, { headers: { 'Authorization': 'Bearer ' + token } })
            return (response)
        }
    },

    sendMail: (mail) => {
        return async (dispatch, getState) => {
            const response = await axios.post("https://explore-2021.herokuapp.com/api/mails/sendDiscount", {mail: mail})
            return (response)
        }
    },


}

export default userActions