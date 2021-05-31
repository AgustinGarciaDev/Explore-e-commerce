import axios from 'axios'
import { toast } from 'react-toastify'

const productActions = {

    createNewProdudct: (data) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post('http://localhost:4000/api/products', data)
                if (response) {
                    if (response.data.success) {
                        return response.data
                    } else {
                        return response.data
                    }
                }
            } catch (error) { console.log(error) }
        }
    },
    sendMail:( form )=>{
        return()=>{
           return axios.post("http://localhost:4000/api/mails/sendSumary",{ receiver: form })
            .then( data => data.data  )
            .catch( err => console.log( err ) )
        }
    },

    getAllProduct: () => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/products')
                if (response) {
                    if (response.data.success) {
                        dispatch({ type: 'GET_PRODUCTS', payload: response.data.result })
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    },

    editCategory: (data) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put('http://localhost:4000/api/products/categories/' + data.id, data.info)
                if (response) {
                    if (response.data.success) {
                        dispatch({ type: 'UPDATE_CATEGORY', payload: response.data.result })
                        return response.data
                    } else {
                        toast.error(response.data.err, {
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

    imageActions: (data) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put('http://localhost:4000/api/products/images/' + data.id, data.info)
                if (response) {
                    if (response.data.success) {
                        dispatch({ type: 'UPDATE_CATEGORY', payload: response.data.result })
                        return response.data
                    } else {
                        toast.error(response.data.err, {
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

    editProduct: (data) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put('http://localhost:4000/api/products/' + data.id, data.data)
                if (response) {
                    if (response.data.success) {
                        dispatch({ type: 'UPDATE_CATEGORY', payload: response.data.result })
                        return response.data
                    } else {
                        console.log(response.data)
                    }
                } else {
                    toast.error(response.data.err, {
                        position: "top-right",
                        autoClose: 1700,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
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
    }
}

export default productActions