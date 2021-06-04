import { useEffect, useState } from "react"
import CardProduct from "../components/CardProduct"
import { connect } from "react-redux"
import cartActions from "../redux/actions/cartActions"

const ListProduct = (props) => {
    const [products, setProducts] = useState([])
    const [productsCopy, setProductsCopy] = useState([])
    const [num,setNum] = useState({numero: ""})

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
        let filterProducts = productsCopy.filter(article => article.name.toLocaleLowerCase().trim().indexOf(value.toLocaleLowerCase().trim()) === 0)
        setProducts(filterProducts)
    }

    const fetchProducts = () => {
        props.allProducts()
    }

    const range = (e) => {
        console.log(e.target.value)
        const value = e.target.value
        let filterProducts = productsCopy.filter(article => article.price <= value)
        setProducts(filterProducts)
        setNum({numero: value})
    }

    return (
        <>
            <div className="filterProducts">
                <input onChange={readInput} type="text" />
                <input onChange={range} type="range" min="0" max="200" step="10" />
                <input style={{color: "white"}} type="text" value={num.numero} disabled/>
            </div>
            <div>
                <div className="titleContainerProducts"><h2>Popular sextoy</h2></div>
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