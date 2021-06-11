import { useEffect, useState } from "react"
import { connect } from "react-redux"
import cartActions from "../redux/actions/cartActions"
import CardProductHome from '../components/Home/CardProductHome'

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                </div>
                <div className="containerIcons">
                </div>
            </div>

            <div className="filterProducts">
                <div className="filterArticle">
                    <h3>Type the product you are looking for:</h3>
                    <input onChange={readInput} type="text" placeholder="Find your product!" />
                </div>
                <div className="filterPrice">
                    <h3>What's your budget?</h3>
                    <div>
                        <input className="inputPrice" onChange={range} type="range" min="0" max="200" step="20" />
                        <input className="inputPriceValue" style={{ color: "black" }} type="text" value={"€ " + num.numero} disabled />
                    </div>
                </div>
            </div>
            <div>
                <div className="productsListHome">
                    {
                        products.length === 0
                            ?
                            <div className="containerNotFound" >
                                <h1> No products available for that search </h1>
                                <lottie-player src="https://assets1.lottiefiles.com/private_files/lf30_s1uhh6lz.json" style={{ width: "50vw" }} speed="1" loop autoplay></lottie-player>
                            </div>
                            :
                            products.map(item => <CardProductHome product={item} key={item._id} />)}
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