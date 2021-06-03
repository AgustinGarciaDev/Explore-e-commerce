import { useEffect, useState } from "react"
import { connect } from "react-redux"
import cartActions from "../redux/actions/cartActions"

const ArticleCart = (props) => {
    const { article , removeArticle , buyArticle , subtract , globalAccountant } = props
    const [accountant,setAccountant] = useState( article.units )
    let operatorDiscount = article.price - (article.discount / 100) * article.price

    const remove = () => {
        removeArticle(article)
    }

    const addAndRemove = (action) => {
        if (action === "Add") {
            if (accountant === article.stock) {
                alert("llegaste al stock pa")
            } else {
                setAccountant(accountant + 1)
                buyArticle(article)
            }
        } else {
            if (accountant < 2) {
                removeArticle(article)
            } else {
                setAccountant(accountant - 1)
                subtract(article)
            }
        }
    }

    return (
        <div className="articleCart">
            <div className="photoCart" style={{ backgroundImage: `url(${article.coverImage})` }} ></div>
            <div><p>{article.name}</p></div>
            <div>
                <button onClick={()=>{addAndRemove("Add")}}>+</button>
                <p>{accountant}</p>
                <button onClick={()=>{addAndRemove("remove")}}>-</button>
            </div>
            <div><p>£ {operatorDiscount * accountant}</p></div>
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
    buyArticle: cartActions.buyArticle,
    subtract: cartActions.subtract, 
}


export default connect(mapStateToProps, mapDispatchToProps)(ArticleCart)