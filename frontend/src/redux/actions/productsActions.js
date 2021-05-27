import axios from 'axios'

const productActions = {

    createNewProdudct: (data) => {
        return async (dispatch, getState) => {
            console.log(data)
        }
    }

}

export default productActions