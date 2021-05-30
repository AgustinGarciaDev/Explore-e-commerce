import axios from 'axios'

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
            .then( data => data.data )
            .catch( err => console.log( err ) )
        }
    }
}

export default productActions