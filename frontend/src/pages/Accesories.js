import { useEffect, useState } from "react"
import { connect } from "react-redux"
import productActions from '../redux/actions/productsActions'
import CardProductHome from '../components/Home/CardProductHome'
import Header from "../components/Header"
import Footer from "../components/Footer"
const Accesories = (props) => {

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
                    if (category.name === 'lubricants') {
                        penises.push(product)
                    } else if (category.name === 'sexGame') {
                        vulva.push(product)
                    } else if (category.name === 'clenear') {
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
                        <h1 className="titleCategory">Accesories</h1>
                    </div>
                    <div className="containerIcons">
                    </div>
                </div>
                <div className="containerProductCardSexToy">
                    <div className="lubricantContainer">
                        <h2>Lubricants</h2>
                        <p>
                            We have hand picked our favourite lubricants from the vast, vast array available on the market from water based, silicone based and lubricants designed for anal usage.
                    </p>
                    </div>
                    <div className="lubricantsCover"></div>
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
                    <div className="sexGameCover" />
                    <div className="lubricantContainer">
                        <h2>Sex Games</h2>
                        <p>
                            Enjoy fun and engaging games with your partner.
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
                        <h2>Clenear</h2>
                        <p>
                            Anal stimulation is a powerful part of sexual pleasure and commonly one of the least explored. And we think thats a shame! There's so much to offer !!
                    </p>
                    </div>
                    <div className="clearToy"></div>
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

export default connect(mapStateToProps, mapDispatchToPops)(Accesories)