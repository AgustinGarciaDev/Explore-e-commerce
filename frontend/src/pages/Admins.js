import React, { useState } from 'react'
import { connect } from 'react-redux'
import productActions from '../redux/actions/productsActions'

const Admin = (props) => {
    const [newProduct, setNewProduct] = useState({ coverImage: '', description: '', price: '', discount: '', brand: '', name: '' })
    const [categories, setCategories] = useState([])
    const [productsImages, setProductsImages] = useState([])
    const [errors, setErrors] = useState({})
    const errorInput = { coverImage: null, description: null, price: null, discount: null, brand: null, name: null, categories: null, productsImages: null }

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
        const response = await props.createNewProdudct(product)
        if (response) {
            console.log(response)
            if (response.success) {
                setErrors({})
                setCategories([])
                setProductsImages([])
                setNewProduct({ coverImage: '', description: '', price: '', discount: '', brand: '', name: '' })
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
        <div className="adminContainer">
            <form className="adminFrom">
                <h2>Add new product</h2>

                <input type="text" name="coverImage" value={newProduct.coverImage} placeholder="image" onChange={readInput} className="adminFormInputs" />
                {errors.coverImage ? <small>{errors.coverImage}</small> : <small></small>}

                <div className="tags-input">
                    <ul id="tags">
                        {productsImages.map((image, index) => (
                            <li key={index} className="tag">
                                <span className='tag-title'>{image.photo}</span>
                                <span className='tag-close-icon'
                                    onClick={() => deleteImage(image)}
                                >
                                    x
						</span>
                            </li>
                        ))}
                    </ul>
                    <input
                        className="newCategoryInput"
                        type="text"
                        onKeyUp={event => event.key === "Enter" ? addImages(event) : null}
                        placeholder="Press enter to add categories"
                    />
                </div>
                {errors.productsImages ? <small>{errors.productsImages}</small> : <small></small>}

                <input type="text" name="description" value={newProduct.description} placeholder="Product description" onChange={readInput} className="adminFormInputs" />
                {errors.description ? <small>{errors.description}</small> : <small></small>}

                <input type="text" name="name" value={newProduct.name} placeholder="Product name" onChange={readInput} className="adminFormInputs" />
                {errors.name ? <small>{errors.name}</small> : <small></small>}

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
                {errors.categories ? <small>{errors.categories}</small> : <small></small>}

                <input type="text" name="brand" value={newProduct.brand} placeholder="Prodcut brand" onChange={readInput} className="adminFormInputs" />
                {errors.brand ? <small>{errors.brand}</small> : <small></small>}

                <div className="rowInputs">
                    <div>
                        <div>
                            <label htmlFor="price">Price: </label>
                            <input type="number" name="price" value={newProduct.price} id="price" onChange={readInput} className="adminFormInputsNumber" />
                        </div>
                        {errors.price ? <small>{errors.price}</small> : <small></small>}
                    </div>

                    <div>
                        <div>
                            <label htmlFor="discount">Discount: </label>
                            <input type="number" name="discount" value={newProduct.discount} onChange={readInput} className="adminFormInputsNumber" />
                        </div>
                        {errors.price ? <small>{errors.price}</small> : <small></small>}
                    </div>

                </div>
                <button type="button" onClick={sendNewProdcut} className="adminButton">Add</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    createNewProdudct: productActions.createNewProdudct
}

export default connect(null, mapDispatchToProps)(Admin)