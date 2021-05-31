import { useEffect, useState } from "react"
import { connect } from "react-redux"
import cartActions from "../redux/actions/cartActions"

const ArticleCart = (props) => {
    const { article , removeArticle , add , subtract , globalAccountant } = props
    const [accountant,setAccountant] = useState( article.units )

    const remove = () => {
        removeArticle(article)
    }

    const addAndRemove = (action) => {
        if (action === "Add") {
            setAccountant(accountant + 1)
            add()
        } else {
            if (accountant < 2) {
                removeArticle(article)
            } else {
                setAccountant(accountant - 1)
                subtract()
            }
        }
    }

    return (
        <div className="articleCart">
            <div className="photoCart" style={{ backgroundImage: `url(${article.coverImage})` }} ></div>
            <div><p>$ {article.price}</p></div>
            <div>
                <button onClick={()=>{addAndRemove("Add")}}>+</button>
                <p>{accountant}</p>
                <button onClick={()=>{addAndRemove("remove")}}>-</button>
            </div>
            <div><p>£36.99</p></div>
            <button onClick={remove}>X</button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        globalAccountant: state.cart.accountant
    }
}

const mapDispatchToProps = {
    removeArticle: cartActions.removeArticle,
    add: cartActions.add,
    subtract: cartActions.subtract, 
}


export default connect(mapStateToProps, mapDispatchToProps)(ArticleCart)