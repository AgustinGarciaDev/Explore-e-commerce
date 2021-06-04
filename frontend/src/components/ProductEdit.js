import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import productsActions from '../redux/actions/productsActions'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ProductEdit = (props) => {
    const [product, setProduct] = useState()
    const [productToCompare, setProductToCompare] = useState()

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
        setProduct({
            ...product,
            [name]: value
        })
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
                {
                    !product
                        ?
                        <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_9ivolvho.json" background="transparent" speed="1" loop autoplay></lottie-player>
                        :
                        (
                            <div className="productEditContainer">
                                <div className="editInput">
                                    <input
                                        name="name"
                                        value={product.name}
                                        onChange={readInput}
                                    />
                                    <span className="material-icons" onClick={() => editProduct({ name: 'name' })} >edit</span>
                                </div>

                                <div className="editInput">
                                    <input
                                        name="brand"
                                        value={product.brand}
                                        onChange={readInput}
                                    />
                                    <span className="material-icons" onClick={() => editProduct({ name: 'brand' })} >edit</span>
                                </div>

                                <div className="productEditImg" style={{ backgroundImage: `url('${product.coverImage}')` }}>
                                    <input
                                        name="coverImage"
                                        value={product.coverImage}
                                        onChange={readInput}
                                    />
                                    <span className="material-icons" onClick={() => editProduct({ name: 'coverImage' })} >edit</span>
                                </div>
                                <div className="editInput">
                                    <textarea
                                        name="description"
                                        value={product.description}
                                        onChange={readInput}
                                    />
                                    <span className="material-icons" onClick={() => editProduct({ name: 'description' })} >edit</span>
                                </div>
                                <div className="tags-input">
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

                                <div className="tags-input">
                                    <ul id="tags">
                                        {product.productsImages.map((image, index) => (
                                            <li key={index} className="tag">
                                                <span className='tag-title'>{image.photo}</span>
                                                <span className="material-icons" onClick={() => imagesActions({ image, action: 'delete' })} >clear</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <input
                                        className="newCategoryInput"
                                        type="text"
                                        onKeyUp={event => event.key === "Enter" ? imagesActions({ event, action: 'add' }) : null}
                                        placeholder="Press enter to add image"
                                    />
                                </div>


                                <div className="shortsInputsContainer">
                                    <div className="shortInputs">
                                        <p>Price</p>
                                        <input
                                            type="number"
                                            name="price"
                                            value={product.price}
                                            onChange={readInput}
                                        />
                                        <span className="material-icons" onClick={() => editProduct({ name: 'price' })} >edit</span>
                                    </div>

                                    <div className="shortInputs">
                                        <p>Stock</p>
                                        <input
                                            type="number"
                                            name="stock"
                                            value={product.stock}
                                            onChange={readInput}
                                        />
                                        <span className="material-icons" onClick={() => editProduct({ name: 'stock' })} >edit</span>
                                    </div>
                                </div>


                                <div className="shortInputs">
                                    <p>Discount</p>
                                    <input
                                        type="number"
                                        name="discount"
                                        value={product.discount}
                                        onChange={readInput}
                                    />
                                    <span className="material-icons" onClick={() => editProduct({ name: 'discount' })} >edit</span>
                                </div>
                            </div>


                        )
                }
                <Link to="/admin">Go back</Link>
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