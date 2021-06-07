import { useState } from "react"
import { connect } from "react-redux"
import cartActions from "../redux/actions/cartActions"
import { toast } from "react-toastify"

const ArticleCart = (props) => {
    const { article, removeArticle, buyArticle, subtract } = props
    const [accountant, setAccountant] = useState(article.units)
    let operatorDiscount = article.price - (article.discount / 100) * article.price

    const remove = () => {
        removeArticle(article)
    }

    const addAndRemove = (action) => {
        if (action === "Add") {
            if (accountant === article.stock) {
                toast("Stock sold out", { type: "warning" })
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

    return (<>
        <div className="firstSection">
            <div className="articleImg" style={{ backgroundImage: `url(${article.coverImage})` }} ></div>
            <div>
                <h4>{article.name.slice(0, 15)}</h4>
                <h4 className="productDescription" >{article.description.slice(0, 25)}...</h4>
            </div>
        </div>

        <div className="buttonsContainer">
            <button onClick={() => { addAndRemove("Add") }}>+</button>
            <span>{accountant && accountant}</span>
            <button onClick={() => { addAndRemove("remove") }}>-</button>
        </div>

        <div className="removeButton">
            <button onClick={remove} >X</button>
        </div>

        <div className="priceContainer">
            <span>€ {operatorDiscount * accountant}</span>
        </div>
    </>
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