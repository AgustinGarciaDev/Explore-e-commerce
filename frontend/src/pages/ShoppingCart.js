import { connect } from "react-redux"
import ArticleCart from "../components/ArticleCart"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { toast } from "react-toastify"

const ShoppingCart = (props) => {

    const cart = props.articles ? props.articles : []
    let prices = cart.map(article => {
        let operatorDiscount = article.price - (article.discount / 100) * article.price
        let operator = operatorDiscount * article.units
        return operator
    })
    let total = prices.length === 0 ? 0 : prices.reduce((a, b) => a + b)
    
    return (
        <>
            <Header />
            <div className="cartMainContainer">
                <h1>My shopping Cart</h1>

                <hr />

                <div className="descriptionContainer">
                    <h3>Description</h3>
                    <h3>Quantity</h3>
                    <h3>Remove</h3>
                    <h3>Price</h3>
                </div>

                <hr />

                <div className="articlesContainer">
                    {cart.length
                        ? cart.map(article => (<ArticleCart key={article._id} article={article} />))
                        : <div> <h5>Don't have any articles so far</h5>  </div>
                    }
                </div>

                <hr />

                <div className="containers" >
                    <div>
                        <span>Delivery</span>
                        <span>FREE</span>
                    </div>
                    <div>
                        <span>Subtotal</span>
                        <span>€ {total}</span>
                    </div>
                    <div>
                        <span>Total</span>
                        <span>€ {total}</span>
                    </div>
                </div>

                <div className="buttonsAction">
                    <div>
                        <button onClick={() => {
                            if (cart.length === 0) {
                                toast("your cart is empty", { type: "warning" })
                            } else {
                                props.history.push("/checkout")
                            }
                        }}>Checkout</button>
                        <button onClick={() => props.history.push("/products")} >Continue shopping</button>
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
        articles: state.cart.articles.filter(article => article.status === true)
    }
}

export default connect(mapStateToProps)(ShoppingCart)



