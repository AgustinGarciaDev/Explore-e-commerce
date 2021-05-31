import {Link, NavLink, Redirect} from "react-router-dom"

const CardProductHome = (props) => {
    /*     console.log(props) */
    const { name, price, _id, brand, coverImage } = props.product

    return (
        <div className="containerCardProduct">
            <div className="imgProductHome"  >
                <img src={coverImage} alt="" />
            </div>
            <div className="containerText">
                <p>{brand}</p>
                <NavLink to={`/product/${_id}`}>
                    <h3 className="titleProductHome">{name}</h3>
                </NavLink>
                <h4 className="titleProductPrecie">€{price}</h4>
            </div>
        </div>
    )
}

export default CardProductHome