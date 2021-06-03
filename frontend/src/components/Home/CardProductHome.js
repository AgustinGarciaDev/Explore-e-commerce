import { NavLink } from "react-router-dom"

const CardProductHome = (props) => {
    const { name, price, _id, brand, coverImage } = props.product

    return (
        <div className="containerCardProduct">
            <div className="imgProductHome" style={{ backgroundImage: (`url('${coverImage}')`) }} />
            <div className="containerText">
                <p>{brand}</p>
                <div className="tittleProductContainer">
                    <NavLink to={`/product/${_id}`}>
                        <h3 className="titleProductHome">{name}</h3>
                    </NavLink>
                </div>
                <h4 className="titleProductPrecie">€{price}</h4>
            </div>
        </div>
    )
}

export default CardProductHome