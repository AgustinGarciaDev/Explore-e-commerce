import React, { useState } from 'react'
import { connect } from 'react-redux'
import productActions from '../redux/actions/productsActions'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { toast } from 'react-toastify'

const NewProduct = (props) => {
    const [newProduct, setNewProduct] = useState({ coverImage: '', description: '', price: '', discount: '', brand: '', name: '', stock: '' })
    const [categories, setCategories] = useState([])
    const [productsImages, setProductsImages] = useState([])
    const [errors, setErrors] = useState({})
    const errorInput = { coverImage: null, description: null, price: null, discount: null, brand: null, name: null, categories: null, productsImages: null, stock: null }

    const addCategories = event => {
        if (event.target.value !== "") {
            setCategories([
                ...categories,
                { name: event.target.value }
            ]);
            event.target.value = ""
        }
    }

    const addImages = event => {
        if (event.target.value !== "") {
            setProductsImages([
                ...productsImages,
                { photo: event.target.value }
            ]);
            event.target.value = ""
        }
    }

    const deleteCategory = (data) => {
        setCategories(categories.filter(category => category.name !== data.name))
    }
    const deleteImage = (data) => {
        setProductsImages(productsImages.filter(image => image.photo !== data.photo))
    }

    const readInput = e => {
        const value = e.target.value
        const name = e.target.name
        setNewProduct({
            ...newProduct,
            [name]: value
        })
    }

    const sendNewProdcut = async e => {
        e.preventDefault()
        const product = {
            ...newProduct,
            categories,
            productsImages
        }
        const response = await props.createNewProdudct({ product, token: localStorage.getItem('token') })
        if (response) {
            if (response.success) {
                setErrors({})
                setCategories([])
                setProductsImages([])
                setNewProduct({ coverImage: '', description: '', price: '', discount: '', brand: '', name: '', stock: '' })
                toast.success('The product was added successfully!', {
                    position: "top-right",
                    autoClose: 1700,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } else {
                response.error.details.map(error => {
                    errorInput[error.path[0]] = error.message
                    return null
                })
                setErrors(errorInput)
            }
        }
    }

    return (
        <>
            <Header />
            <div className="adminContainer">
                <form className="adminFrom">
                    <h2>Add new product</h2>

                    <div className="inputContainer">
                        <label>Image</label>
                        <input type="text" name="coverImage" value={newProduct.coverImage} onChange={readInput} className="adminFormInputs" />
                    </div>
                    {errors.coverImage ? <small>{errors.coverImage}</small> : <p>.</p>}

                    <div className="tags-input">
                        <ul id="tags">
                            {productsImages.map((image, index) => (
                                <div key={index} className="imagesForEdit" style={{ backgroundImage: `url('${image.photo}')` }}>
                                    <span className="material-icons" onClick={() => deleteImage(image)} >clear</span>
                                </div>
                            ))}
                        </ul>
                        <input
                            className="newCategoryInput"
                            type="text"
                            onKeyUp={event => event.key === "Enter" ? addImages(event) : null}
                            placeholder="Press enter to add image"
                        />
                    </div>
                    {errors.productsImages ? <small>{errors.productsImages}</small> : <p>.</p>}

                    <div className="inputContainer">
                        <label>Product description</label>
                        <input type="text" name="description" value={newProduct.description} onChange={readInput} className="adminFormInputs" />
                    </div>
                    {errors.description ? <small>{errors.description}</small> : <p>.</p>}

                    <div className="inputContainer">
                        <label>Product name</label>
                        <input type="text" name="name" value={newProduct.name} onChange={readInput} className="adminFormInputs" />
                    </div>
                    {errors.name ? <small>{errors.name}</small> : <p>.</p>}

                    <div className="tags-input">
                        <ul id="tags">
                            {categories.map((category, index) => (
                                <li key={index} className="tag">
                                    <span className='tag-title'>{category.name}</span>
                                    <span className='tag-close-icon'
                                        onClick={() => deleteCategory(category)}
                                    >
                                        x
						</span>
                                </li>
                            ))}
                        </ul>
                        <input
                            className="newCategoryInput"
                            type="text"
                            onKeyUp={event => event.key === "Enter" ? addCategories(event) : null}
                            placeholder="Press enter to add categories"
                        />
                    </div>
                    {errors.categories ? <small>{errors.categories}</small> : <p>.</p>}

                    <div className="inputContainer">
                        <label>Product brand</label>
                        <input type="text" name="brand" value={newProduct.brand} onChange={readInput} className="adminFormInputs" />
                    </div>
                    {errors.brand ? <small>{errors.brand}</small> : <p>.</p>}

                    <div className="rowInputs">
                        <div>
                            <div>
                                <label htmlFor="price">Price: </label>
                                <input type="number" name="price" value={newProduct.price} id="price" onChange={readInput} className="adminFormInputsNumber" />
                            </div>
                            {errors.price ? <small>{errors.price}</small> : <p>.</p>}
                        </div>

                        <div>
                            <div>
                                <label htmlFor="discount">Discount: </label>
                                <input type="number" name="discount" value={newProduct.discount} onChange={readInput} className="adminFormInputsNumber" />
                            </div>
                            {errors.discount ? <small>{errors.discount}</small> : <p>.</p>}
                        </div>

                        <div>
                            <div>
                                <label htmlFor="stock">Stock: </label>
                                <input type="number" name="stock" value={newProduct.stock} onChange={readInput} className="adminFormInputsNumber" />
                            </div>
                            {errors.stock ? <small>{errors.stock}</small> : <p>.</p>}
                        </div>

                    </div>
                    <div className="adminBtnContainer">
                        <Link to="/admin" className="adminButton">Admin</Link>
                        <button type="button" onClick={sendNewProdcut} className="adminButton">Add</button>
                    </div>
                </form>
            </div>
        </>
    )
}

const mapDispatchToProps = {
    createNewProdudct: productActions.createNewProdudct
}

export default connect(null, mapDispatchToProps)(NewProduct)