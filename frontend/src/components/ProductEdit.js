import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import productsActions from '../redux/actions/productsActions'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ProductEdit = (props) => {
    const [product, setProduct] = useState()
    const [productToCompare, setProductToCompare] = useState()
    const [saveChanges, setSaveChanges] = useState([])

    useEffect(() => {
        if (props.products.length === 0) {
            props.getProducts()
        } else {
            setProduct(props.products.find(product => product._id === props.match.params._id))
            setProductToCompare(props.products.find(product => product._id === props.match.params._id))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.products])

    const categoriesActions = async ({ action, event, category }) => {
        if (action === 'add') {
            if (event.target.value !== "") {
                const data = { id: product._id, info: { action: action, newNameCategory: event.target.value }, token: localStorage.getItem('token') }
                const response = await props.editCategory(data)
                if (response) {
                    if (response.success) {
                        event.target.value = ""
                    } else {
                        alert("Something went wrong, try again later !")
                    }
                }
            }
        } else {
            if (product.categories.length === 1) {
                toast.error('There must be at least one category ', {
                    position: "top-right",
                    autoClose: 1700,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } else {
                const data = { id: product._id, info: { action: action, idCategory: category._id }, token: localStorage.getItem('token') }
                const response = await props.editCategory(data)
                if (response) {
                    if (!response.success) {
                        alert("Something went wrong, try again later !")
                    }
                }
            }
        }
    }

    const imagesActions = async ({ action, event, image }) => {
        if (action === 'add') {
            if (event.target.value !== "") {
                const data = { id: product._id, info: { action: action, newNamePhoto: event.target.value }, token: localStorage.getItem('token') }
                const response = await props.imageActions(data)
                if (response) {
                    if (response.success) {
                        event.target.value = ""
                    } else {
                        alert("Something went wrong, try again later !")
                    }
                }
            }
        } else {
            if (product.productsImages.length === 1) {
                toast.error('There must be at least one image ', {
                    position: "top-right",
                    autoClose: 1700,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } else {
                const data = { id: product._id, info: { action: action, idPhoto: image._id }, token: localStorage.getItem('token') }
                const response = await props.imageActions(data)
                if (response) {
                    if (!response.success) {
                        alert("Something went wrong, try again later !")
                    }
                }
            }
        }
    }

    const readInput = e => {
        const value = e.target.value
        const name = e.target.name
        if (product[name] !== value) {
            console.log("entro aca")
            setProduct({
                ...product,
                [name]: value
            })
            setSaveChanges({
                ...saveChanges,
                [name]: value
            })
        }
    }

    const editProduct = async ({ name }) => {
        if (product[name].toString().trim() !== '') {
            if (product[name].toString().trim() !== productToCompare[name].toString()) {
                const response = await props.editProduct({ id: product._id, data: { [name]: product[name] }, token: localStorage.getItem('token') })
                if (response) {
                    if (response.success) {
                        toast.success('Changes were saved', {
                            position: "top-right",
                            autoClose: 1700,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    }
                }
            }
        } else {
            toast.error('you cant send an empty field', {
                position: "top-right",
                autoClose: 1700,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }

    return (
        <>
            <Header />
            <div className="edittingProductContainer">
                <Link className="goBackAdmin" to="/admin">Go back</Link>
                {
                    !product
                        ?
                        <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_9ivolvho.json" background="transparent" speed="1" loop autoplay></lottie-player>
                        :
                        (
                            <div className="productEditContainer">
                                <span className="editNameInput">Name</span>
                                <div className="editInput">
                                    <input
                                        name="name"
                                        value={product.name}
                                        onChange={readInput}
                                    />
                                    <span className="material-icons" style={product.name.trim() === productToCompare.name.trim() ? { color: 'black' } : { color: '#00FF16' }} onClick={() => editProduct({ name: 'name' })} >edit</span>
                                </div>

                                <span className="editNameInput">Brand</span>
                                <div className="editInput">
                                    <input
                                        name="brand"
                                        value={product.brand}
                                        onChange={readInput}
                                    />
                                    <span className="material-icons" style={product.brand.trim() === productToCompare.brand.trim() ? { color: 'black' } : { color: '#00FF16' }} onClick={() => editProduct({ name: 'brand' })} >edit</span>
                                </div>

                                <span className="editNameInput">Cover Image</span>
                                <div className="productImgCover">
                                    <div className="productEditImg" style={{ backgroundImage: `url('${product.coverImage}')` }} />
                                    <div className="editImgInput">
                                        <input
                                            name="coverImage"
                                            value={product.coverImage}
                                            onChange={readInput}
                                        />
                                        <span className="material-icons" style={product.coverImage.trim() === productToCompare.coverImage.trim() ? { color: 'black' } : { color: '#00FF16' }} onClick={() => editProduct({ name: 'coverImage' })} >edit</span>
                                    </div>
                                </div>
                                <span className="editNameInput">Description</span>
                                <div className="editInput">
                                    <textarea
                                        name="description"
                                        value={product.description}
                                        onChange={readInput}
                                    />
                                    <span className="material-icons" style={product.description.trim() === productToCompare.description.trim() ? { color: 'black' } : { color: '#00FF16' }} onClick={() => editProduct({ name: 'description' })} >edit</span>
                                </div>
                                <span className="editNameInput">Categories</span>
                                <div className="tags-input-edit">
                                    <ul id="tags">
                                        {product.categories.map((category, index) => (
                                            <li key={index} className="tag">
                                                <span className='tag-title'>{category.name}</span>
                                                <span className="material-icons" onClick={() => categoriesActions({ category, action: 'delete' })} >clear</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <input
                                        className="newCategoryInput"
                                        type="text"
                                        onKeyUp={event => event.key === "Enter" ? categoriesActions({ event, action: 'add' }) : null}
                                        placeholder="Press enter to add categories"
                                    />
                                </div>
                                <span className="editNameInput">Images</span>
                                <div className="tags-input-edit">
                                    <ul id="tags">
                                        {product.productsImages.map((image, index) => (
                                            <div key={index} className="imagesForEdit" style={{ backgroundImage: `url('${image.photo}')` }}>
                                                <span className="material-icons" onClick={() => imagesActions({ image, action: 'delete' })} >clear</span>
                                            </div>
                                        ))}
                                    </ul>
                                    <input
                                        className="newCategoryInput"
                                        type="text"
                                        onKeyUp={event => event.key === "Enter" ? imagesActions({ event, action: 'add' }) : null}
                                        placeholder="Press enter to add image"
                                    />
                                </div>
                                <div className="shortInputs">
                                    <p>Price</p>
                                    <input
                                        type="number"
                                        name="price"
                                        value={product.price}
                                        onChange={readInput}
                                    />
                                    <span className="material-icons" style={product.price.toString() === productToCompare.price.toString() ? { color: 'black' } : { color: '#00FF16' }} onClick={() => editProduct({ name: 'price' })} >edit</span>
                                </div>

                                <div className="shortInputs">
                                    <p>Stock</p>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={product.stock}
                                        onChange={readInput}
                                    />
                                    <span className="material-icons" style={product.stock.toString() === productToCompare.stock.toString() ? { color: 'black' } : { color: '#00FF16' }} onClick={() => editProduct({ name: 'stock' })} >edit</span>
                                </div>
                                <div className="shortInputs">
                                    <p>Discount</p>
                                    <input
                                        type="number"
                                        name="discount"
                                        value={product.discount}
                                        onChange={readInput}
                                    />
                                    <span className="material-icons" style={product.discount.toString() === productToCompare.discount.toString() ? { color: 'black' } : { color: '#00FF16' }} onClick={() => editProduct({ name: 'discount' })} >edit</span>
                                </div>
                            </div>
                        )
                }
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        products: state.productReducer.products
    }
}

const mapDispatchToPops = {
    getProducts: productsActions.getAllProduct,
    editCategory: productsActions.editCategory,
    editProduct: productsActions.editProduct,
    imageActions: productsActions.imageActions
}

export default connect(mapStateToProps, mapDispatchToPops)(ProductEdit)