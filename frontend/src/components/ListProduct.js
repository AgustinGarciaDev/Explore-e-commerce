import { useEffect, useState } from "react"
import CardProduct from "../components/CardProduct"
import { connect } from "react-redux"
import cartActions from "../redux/actions/cartActions"

const ListProduct = (props) => {
    const products = props.products 
    console.log(products)
    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = () => {
        props.allProducts()
    }

    return (
        <>
            <div>
                <div className="titleContainerProducts"><h2>Popular sextoy</h2></div>
                <div className="productsListHome">
                    {products.map(product => <CardProduct key={product._id} product={product} />)}
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        products: state.cart.articles
    }
}

const mapDispatchToProps = {
    allProducts: cartActions.allProducts
}


export default connect(mapStateToProps, mapDispatchToProps)(ListProduct)