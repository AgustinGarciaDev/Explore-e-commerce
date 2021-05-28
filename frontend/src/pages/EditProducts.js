import { useEffect } from 'react'
import { connect } from 'react-redux'
import productActions from '../redux/actions/productsActions'

const EditProduct = (props) => {

    useEffect(() => {
        props.getProducts()
    }, [])

    return (
        <>
            <h1>edit product</h1>
            {
                props.products.length === 0
                ?
                <h2>loading</h2>
                :
                props.products.map(product => <h3>{product._id}</h3>)
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        products: state.productReducer.products
    }
}

const mapDispatchToPops = {
    getProducts: productActions.getAllProduct
}

export default connect(mapStateToProps, mapDispatchToPops)(EditProduct)