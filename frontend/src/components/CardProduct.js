import cartActions from "../redux/actions/cartActions"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

const CardProduct = (props) => {
    const { product } = props

    return (
        <div className="containerCardProduct">
            <div className="imgProductHome"  >
                <img src={product.coverImage} alt="" />
            </div>
            <div className="containerText">
                <p>{product.brand}</p>
                <Link to={`/product/${product._id}`}><h3 className="titleProductHome">{product.name}</h3></Link>
                <h4 className="titleProductPrecie">€{product.price}</h4>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        usuarioStatus: state.user.usuarioStatus
    }
}

const mapDispatchToProps = {
    buyArticle: cartActions.buyArticle,
}


export default connect(mapStateToProps, mapDispatchToProps)(CardProduct)