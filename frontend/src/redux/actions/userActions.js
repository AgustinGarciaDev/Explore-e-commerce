import axios from "axios";
import { toast } from 'react-toastify';

const userActions = {

    createAcount: (infoUser) => {

        return async (dispatch, getState) => {

            try {
                const response = await axios.post("http://localhost:4000/api/user/signup", infoUser)
                /*      if (!response.data.success) {
                         return response.data.errores
                     } */
                console.log(response)
                /*    dispatch({ type: 'SIGNIN_USER', payload: response.data.success ? response.data.respuesta : null }) */
            } catch (error) {
                console.log(error)
            }
        }
    },
    signInUser: (infoUser) => {

        return async (dispatch, getState) => {
            try {
                const response = await axios.post("http://localhost:4000/api/user/signin", infoUser)
                /*   if (!response.data.success) {
  
                      return response.data.error
                  } */
                console.log(response)
                   dispatch({ type: 'SIGNIN_USER', payload: response.data.success ? response.data.response : null })
            } catch (error) {
                console.log(error)
            }
        }

    },

    SignOut: () => {
        return (dispatch, getState) => {

            dispatch({ type: 'DESLOGUEAR_USUARIO' })
            toast.success("👋Bye", {
                autoClose: 1000,
                position: "top-center",
            })
        }
    },

    relogin: (userToken) => {   
        return async (dispatch, getState) => {
          const response= await axios.get("http://localhost:4000/api/user/relogin", {headers: {'Authorization': 'Bearer '+userToken} })
        
                dispatch({type: 'SIGNIN_USER', payload: {
                    ...response.data.response,
                    token: userToken                  
                }})
        }
    },

     uploadPhoto: (formData) => {   
        return async (dispatch, getState) => {
            await axios.post("http://localhost:4000/api/user/uploadPhoto", formData)
        }
    },

    modifyUser: (dateToChange) => {   
        return async (dispatch, getState) => {
            await axios.put("http://localhost:4000/api/user/modifyuser", dateToChange)
        }
    },

}

export default userActions