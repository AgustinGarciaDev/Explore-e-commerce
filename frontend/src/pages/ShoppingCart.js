import { connect } from "react-redux"
import ArticleCart from "../components/ArticleCart"
import Footer from "../components/Footer"
import Header from "../components/Header"

const ShoppingCart = (props) => {
    console.log(props.cart)
    return (
        <>
            <Header />
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
                        props.cart.length === 0 ?
                            <h1>NO HAY ARTICULOS CARGADOS</h1>
                            :
                            props.cart.map(article => <ArticleCart article={article}/>)
                    }
                    <div className="totalCart">
                        <div><h3>Subtotal:</h3></div>
                        <div><h3>£36.99</h3></div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cart
    }
}

export default connect(mapStateToProps)(ShoppingCart)