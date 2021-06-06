import { useEffect, useState } from "react"
import CardProduct from "../components/CardProduct"
import { connect } from "react-redux"
import cartActions from "../redux/actions/cartActions"

const ListProduct = (props) => {
    const [products, setProducts] = useState([])
    const [productsCopy, setProductsCopy] = useState([])
    const [num, setNum] = useState({ numero: "" })

    useEffect(() => {
        if (props.products.length === 0) {
            props.allProducts()
        } else {
            setProducts(props.products)
            setProductsCopy(props.products)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.products])


    useEffect(() => {
        fetchProducts()
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [])

    const readInput = (e) => {
        const value = e.target.value
        let filterProducts = productsCopy.filter(article => article.name.toLocaleLowerCase().trim().includes(value.toLocaleLowerCase().trim()))
        setProducts(filterProducts)
    }

    const fetchProducts = () => {
        props.allProducts()
    }

    const range = (e) => {
        const value = e.target.value
        let filterProducts = productsCopy.filter(article => article.price <= value)
        setProducts(filterProducts)
        setNum({ numero: value })
    }

    return (
        <>
            <div className="containerPortadaSexToy">
                <div className="containerTextCategory">
                    <h1 className="titleCategory">All products</h1>
                    <p className="textCategory">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, dolorum! Provident, nostrum quos eos iure aperiam, enim illum placeat eaque explicabo laudantium odit, sequi porro officia repellat nobis minima quas.</p>
                </div>
                <div className="containerIcons">
                </div>
            </div>

            <div className="filterProducts">
                <div className="filterArticle">
                    <input onChange={readInput} type="text" placeholder="Find your product!" />
                </div>
                <div className="filterPrice">
                    <p>PRICE:</p>
                    <input className="inputPrice" onChange={range} type="range" min="0" max="200" step="10" />
                    <input className="inputPriceValue" style={{ color: "black" }} type="text" value={"€ " + num.numero} disabled />
                </div>
            </div>
            <div>
                <div className="titleContainerProducts"><h2>-Popular Products-</h2></div>
                <div className="productsListHome">
                    {
                        products.length === 0
                            ?
                            <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_9ivolvho.json" background="transparent" speed="1" loop autoplay></lottie-player>
                            :
                            products.map(product => <CardProduct key={product._id} product={product} />)}
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        products: state.cart.articles
    }
}

const mapDispatchToProps = {
    allProducts: cartActions.allProducts
}


export default connect(mapStateToProps, mapDispatchToProps)(ListProduct)