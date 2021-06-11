import axios from 'axios'
import { toast } from 'react-toastify'

const productActions = {

    createNewProdudct: (data) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post('https://explore-2021.herokuapp.com/api/products', data.product, {
                    headers: {
                        'Authorization': 'Bearer ' + data.token
                    }
                })
                if (response) {
                    if (response.data.success) {
                        dispatch({ type: 'GET_PRODUCTS', payload: response.data.result })
                        return response.data
                    } else {
                        return response.data
                    }
                }
            } catch (error) {
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
    sendMail: (form, creditCard, cart) => {
        return () => {
            return axios.post("https://explore-2021.herokuapp.com/api/mails/sendSumary", { form, creditCard, cart })
                .then(data => data.data)
                .catch(err => toast.error('Something went wrong, try again later!', {
                    position: "top-right",
                    autoClose: 1700,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }))
        }
    },

    getAllProduct: () => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('https://explore-2021.herokuapp.com/api/products')
                if (response) {
                    if (response.data.success) {
                        dispatch({ type: 'GET_PRODUCTS', payload: response.data.result })
                    }
                }
            } catch (error) {
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

    editCategory: (data) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put('https://explore-2021.herokuapp.com/api/products/categories/' + data.id, data.info, {
                    headers: {
                        'Authorization': 'Bearer ' + data.token
                    }
                })
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
                const response = await axios.put('https://explore-2021.herokuapp.com/api/products/images/' + data.id, data.info, {
                    headers: {
                        'Authorization': 'Bearer ' + data.token
                    }
                })
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
                const response = await axios.put('https://explore-2021.herokuapp.com/api/products/' + data.id, data.data, {
                    headers: {
                        'Authorization': 'Bearer ' + data.token
                    }
                })
                if (response) {
                    if (response.data.success) {
                        dispatch({ type: 'UPDATE_CATEGORY', payload: response.data.result })
                        return response.data
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