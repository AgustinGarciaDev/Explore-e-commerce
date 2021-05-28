import { useEffect, useState } from "react"
import cartActions from "../redux/actions/cartActions"
import { connect } from "react-redux"

const CardProduct = (props) => {
    const { buyArticle , product } = props
    const buy = () => {
        buyArticle(product)
    }

    return (
        <div className="containerCardProduct">
            <div className="imgProductHome"  >
                <img src={product.coverImage} alt="" />
            </div>
            <div className="containerText">
                <p>{product.brand}</p>
                <h3 className="titleProductHome">{product.name}</h3>
                <h4 className="titleProductPrecie">€{product.price}</h4>
                <button onClick={buy}>add to cart</button>
            </div>
        </div>
    )
}

const mapStateToProps = state =>{
    return{
        usuarioStatus: state.user.usuarioStatus 
    }
}

const mapDispatchToProps = {
    buyArticle: cartActions.buyArticle,
}


export default connect(mapStateToProps, mapDispatchToProps)(CardProduct)