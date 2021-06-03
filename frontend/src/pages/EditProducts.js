import { useEffect } from 'react'
import { connect } from 'react-redux'
import ProductForEdit from '../components/PorductForEdit'
import productActions from '../redux/actions/productsActions'

const EditProduct = (props) => {

    useEffect(() => {
        if (props.products.length === 0) {
            props.getProducts()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="editProductsContainer">
                <h1>Products</h1>
                <div className="productsContainerimportant">
                    {
                        props.products.length === 0
                            ?
                            <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_9ivolvho.json" background="transparent" speed="1" loop autoplay></lottie-player>
                            :
                            props.products.map(product => <ProductForEdit key={product._id} product={product} />)
                    }
                </div>
            </div>
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