import { useEffect, useState } from "react"
import CardProduct from "../components/CardProduct"
import { connect } from "react-redux"
import cartActions from "../redux/actions/cartActions"

const ListProduct = (props) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        if (props.products.length === 0) {
            props.allProducts()
        } else {
            setProducts(props.products)
        }
        fetchProducts()
        scroll()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.products])

    const scroll = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    const readInput = (e) => {
        /*         let filteredCities = citiesCopy.filter(city => city.titulo.toLocaleLowerCase().trim().indexOf(e.toLocaleLowerCase().trim()) === 0)
                setAllCities(filteredCities) */
    }

    const fetchProducts = () => {
        props.allProducts()
    }

    return (
        <>
            <div className="filterProducts">

            </div>
            <div>
                <div className="titleContainerProducts"><h2>Popular sextoy</h2></div>
                <div className="productsListHome">
                    {
                        props.products.length === 0
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