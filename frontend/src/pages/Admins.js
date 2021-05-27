import React, { useState } from 'react'

const Admin = () => {
    const [newProduct, setNewProduct] = useState({ image: '', description: '', price: '', discount: '', brand: '' })
    const [categories, setCategories] = useState([])

    const addCategories = event => {
        if (event.target.value !== "") {
            setCategories([
                ...categories,
                { name: event.target.value }
            ]);
            event.target.value = ""
        }
    }

    const deleteCategory = (tag) => {
        setCategories(categories.filter(category => category.name !== tag.name))
    }

    const readInput = e => {
        const value = e.target.value
        const name = e.target.name
        setNewProduct({
            ...newProduct,
            [name]: value
        })
    }

    const sendNewProdcut = e => {
        e.preventDefault()
        const product = {
            ...newProduct,
            categories
        }
        console.log(product)
    }

    return (
        <div className="adminContainer">
            <form className="adminFrom">
                <h2>Add new product</h2>

                <input type="text" name="image" value={newProduct.image} placeholder="image" onChange={readInput} className="adminFormInputs" />

                <input type="text" name="description" value={newProduct.description} placeholder="Product description" onChange={readInput} className="adminFormInputs" />

                <div className="tags-input">
                    <ul id="tags">
                        {categories.map((tag, index) => (
                            <li key={index} className="tag">
                                <span className='tag-title'>{tag.name}</span>
                                <span className='tag-close-icon'
                                    onClick={() => deleteCategory(tag)}
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

                <input type="text" name="brand" value={newProduct.brand} placeholder="Prodcut brand" onChange={readInput} className="adminFormInputs" />

                <div className="rowInputs">
                    <label htmlFor="price">Price: </label>
                    <input type="number" name="price" value={newProduct.price} id="price" onChange={readInput} className="adminFormInputsNumber" />
                    <label htmlFor="discount">Discount: </label>
                    <input type="number" name="discount" value={newProduct.discount} onChange={readInput} className="adminFormInputsNumber" />
                </div>
            </form>
            <button onClick={sendNewProdcut} className="adminButton">Add</button>
        </div>
    )
}

export default Admin