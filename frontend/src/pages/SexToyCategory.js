import { useEffect, useState } from "react"
import { connect } from "react-redux"
import productActions from '../redux/actions/productsActions'
import CardProductHome from '../components/Home/CardProductHome'
import Header from "../components/Header"
import Footer from "../components/Footer"
const SexToyCategory = (props) => {

    const [sexToyPennis, setSexToyPennis] = useState([])
    const [sexToyVulva, setSexToyVulva] = useState([])
    const [sexToyButts, setSexToyButts] = useState([])
    const [loading, setLoading] = useState(true)
    const { getProducts, products } = props

    useEffect(() => {
        if (products.length === 0) {
            getProducts()

        } else {
            setLoading(false)
        }
        filterProducts()
        scroll()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])

    const scroll = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    const filterProducts = () => {

        let penises = []
        let vulva = []
        let butts = []

        if (products.length !== 0) {
            products.map(product => {
                const categories = product.categories
                categories.map(category => {
                    if (category.name === 'penises') {
                        penises.push(product)
                    } else if (category.name === 'vulva') {
                        vulva.push(product)
                    } else if (category.name === 'butt') {
                        butts.push(product)
                    }
                    return null
                })
                return null
            })
        }

        setSexToyPennis(penises)
        setSexToyVulva(vulva)
        setSexToyButts(butts)

    }

    return (
        <>
            <Header />
            <>
                <div className="containerPortadaSexToy">
                    <div className="containerTextCategory">
                        <h1 className="titleCategory">Sex Toys</h1>
                        <p className="textCategory">
                            We don't subscribe to gender stereotypes. When you shop with us you shop based on the body part you want to pleasure.
                        </p>
                    </div>
                    <div className="containerIcons">
                    </div>
                </div>
                <div className="containerProductCardSexToy">
                    <div className="lubricantContainer">
                        <h2>Sex Toys for Penises</h2>
                        <p>
                            The best sex toys for penises are for sexual pleasure, what sriracha sauce is for a bowl of hot noodles! With such a great selection, whether your playing solo or with a partner.
                    </p>
                    </div>
                    <div className="containerProducPresent"></div>
                </div>
                <div className="containerProductsSextoy">
                    {
                        loading
                            ?
                            <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_9ivolvho.json" background="transparent" speed="1" loop autoplay></lottie-player>

                            :
                            sexToyPennis.map(item => <CardProductHome product={item} key={item._id} />)
                    }
                </div>

                <div className="containerProductCardSexToy">
                    <div className="containerProductsVulva"></div>
                    <div className="lubricantContainer">
                        <h2>Sex Toys for Vulvas</h2>
                        <p>
                            The selection of toys available for vulvas is enormous so our team have been working like busy bees to hand pick a great edited selection that provide a little bit of everything. For internal pleasure we have vibrators, dildos in all shapes and sizes, and much more.
                    </p>
                    </div>
                </div>
                <div className="containerProductsSextoy">
                    {
                        loading
                            ?
                            <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_9ivolvho.json" background="transparent" speed="1" loop autoplay></lottie-player>

                            :
                            sexToyVulva.map(item => <CardProductHome product={item} key={item._id} />)
                    }
                </div>
                <div className="containerProductCardSexToy">
                    <div className="lubricantContainer">
                        <h2>Sex Toys for Butts</h2>
                        <p>
                            Anal stimulation is a powerful part of sexual pleasure and commonly one of the least explored. And we think thats a shame! There's so much to offer.
                    </p>
                    </div>
                    <div className="containerProductsButts"></div>
                </div>
                <div className="containerProductsSextoy">
                    {
                        loading
                            ?
                            <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_9ivolvho.json" background="transparent" speed="1" loop autoplay></lottie-player>

                            :
                            sexToyButts.map(item => <CardProductHome product={item} key={item._id} />)
                    }

                </div>
            </>
            <Footer />
        </>
    )
}

const mapStateToProps = state => {
    return {
        products: state.productReducer.products
    }
}

const mapDispatchToPops = {
    getProducts: productActions.getAllProduct,
}

export default connect(mapStateToProps, mapDispatchToPops)(SexToyCategory)