import { useState } from "react"
import cartActions from "../redux/actions/cartActions"
import { connect } from "react-redux"

const CardProduct = (props) => {

    const { name, precie, productsImages, _id, categories } = props.product

    const buy = () => {
        props.buyArticle(_id)
    }

    return (
        <div className="containerCardProduct">
            <div className="imgProductHome"  >
                <img src={productsImages} alt="" />
            </div>
            <div className="containerText">
                <p>Marca</p>
                <h3 className="titleProductHome">{name}</h3>
                <h4 className="titleProductPrecie">€{precie}</h4>
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
    buyArticle: cartActions.buyArticle
}


export default connect(mapStateToProps, mapDispatchToProps)(CardProduct)