import { useEffect, useState } from "react"
import { connect } from "react-redux"
import cartActions from "../redux/actions/cartActions"

const ArticleCart = (props) => {
    const { article , removeArticle , add , subtract } = props
    const [accountant,setAccountant] = useState(1)

    const remove = () => {
        removeArticle(article)
    }

    const addAndRemove = (action) => {
        if (action === "Add") {
         /*    add() */
            setAccountant(accountant + 1)
        } else {
           /*  subtract() */
            setAccountant(accountant - 1)
        }
    }

    return (
        <div className="articleCart">
            <div className="photoCart" style={{ backgroundImage: `url(${article.coverImage})` }} ></div>
            <div><p>$ {article.price}</p></div>
            <div>
                <button onClick={()=>addAndRemove("Add")}>+</button>
                <p>{accountant}</p>
                <button onClick={()=>addAndRemove("remove")}>-</button>
            </div>
            <div><p>£36.99</p></div>
            <button onClick={remove}>X</button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        usuarioStatus: state.user.usuarioStatus
    }
}

const mapDispatchToProps = {
    removeArticle: cartActions.removeArticle,
    add: cartActions.add,
    subtract: cartActions.subtract, 
}


export default connect(mapStateToProps, mapDispatchToProps)(ArticleCart)