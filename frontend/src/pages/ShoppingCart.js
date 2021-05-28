import { connect } from "react-redux"
import Footer from "../components/Footer"
import Header from "../components/Header"

const ShoppingCart = (props) => {

    console.log(props.cart)
    return (
        <>
            <Header />
{/*             {
                props.articles.map(article => <h1>{article.name}</h1>)
            } */}
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