import { use } from "passport"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Redirect , Link } from "react-router-dom"
import ArticleCart from "../components/ArticleCart"
import Footer from "../components/Footer"
import Header from "../components/Header"

const ShoppingCart = (props) => {

    const cart = props.articles ? props.articles : []
    let prices = cart.map(article => article.price * article.units)
    let total = prices.length === 0 ? 0 : prices.reduce((a, b) => a + b)
    return (
        <>
            <Header />
            <Link to="/products">volver</Link>
            <div className="cartContainer">
                <div className="titleShoppingCart">
                    <h1>Shopping Bag</h1>
                </div>
                <div className="cart">
                    <div className="titlesCart">
                        <div><p>Price</p></div>
                        <div><p>Quantity</p></div>
                        <div><p>Total</p></div>
                    </div>
                    {
                        cart.length === 0 ?
                            <h1>NO HAY ARTICULOS CARGADOS</h1>
                            :
                        cart.map(article => <ArticleCart key={article._id} article={article}/>)
                    }
                    <div className="totalCart">
                        <div><h3>Subtotal:</h3></div>
                        <div><h3>£ {total}</h3></div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cart,
        articles: state.cart.articles.filter(article => article.status === true )
    }
}

export default connect(mapStateToProps)(ShoppingCart)