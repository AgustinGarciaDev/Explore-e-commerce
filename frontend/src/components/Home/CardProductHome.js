const CardProductHome = (props) => {

    const { name, precie, productsImages, _id, categories } = props.product
    return (
        <div className="containerCardProduct">
            <div className="imgProductHome"  >
                <img src={productsImages} alt="" />
            </div>
            <div className="containerText">
                <p>Marca</p>
                <h3 className="titleProductHome">{name}</h3>
                <h4 className="titleProductPrecie">€{precie}</h4>
            </div>

        </div>
    )
}

export default CardProductHome