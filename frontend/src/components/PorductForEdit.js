import { Link } from 'react-router-dom'

const ProductForEdit = (props) => {
    const product = props.product && props.product

    return (
        <Link className="productForEdit" to={`/edit/prodcut/${product._id}`}>
            <div className="productForEditImg" style={{ backgroundImage: `url('${product.coverImage}')` }} />
            <div className="productNameContainer">
                <h4>{product.name}</h4>
            </div>
        </Link>
    )
}

export default ProductForEdit