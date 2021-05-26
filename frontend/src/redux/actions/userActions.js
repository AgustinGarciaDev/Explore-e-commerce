import axios from "axios";
import { toast } from 'react-toastify';

const userActions = {

    createAcount: (infoUser) => {

        return async (dispatch, getState) => {

            try {
                const response = await axios.post("http://localhost:4000/user/signup", infoUser)
                /*      if (!response.data.success) {
                         return response.data.errores
                     } */
                console.log(response)
                /*    dispatch({ type: 'LOGUEAR_USUARIO', payload: response.data.success ? response.data.respuesta : null }) */
            } catch (error) {
                console.log(error)
            }
        }
    },
    signInUser: (infoUser) => {

        return async (dispatch, getState) => {
            try {
                const response = await axios.post("http://localhost:4000/user/signin", infoUser)
                /*   if (!response.data.success) {
  
                      return response.data.error
                  } */
                console.log(response)
                /*   dispatch({ type: 'LOGUEAR_USUARIO', payload: response.data.success ? response.data.respuesta : null })
   */
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

}

export default userActions