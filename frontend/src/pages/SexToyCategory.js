import { useEffect, useState } from "react"
import { connect } from "react-redux"
import productActions from '../redux/actions/productsActions'
import CardProductHome from '../components/Home/CardProductHome'
import Header from "../components/Header"
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
    }, [products])

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
                })
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
                        <p className="textCategory">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, dolorum! Provident, nostrum quos eos iure aperiam, enim illum placeat eaque explicabo laudantium odit, sequi porro officia repellat nobis minima quas.</p>
                    </div>
                    <div className="containerIcons">
                    </div>
                </div>
                <div className="containerProductCardSexToy">
                    <div className="containerTextCardSexToy">
                        <h2>Sex Toys for Penises</h2>
                        <p>
                            The best sex toys for penises are for sexual pleasure, what sriracha sauce is for a bowl of hot noodles! With such a great selection, whether your playing solo or with a partner, you'll be amazed at how a well designed toy can enhance your sex life, no matter how great it is to begin with.
                    </p>
                    </div>
                    <div className="containerProducPresent"></div>
                </div>
                <div className="containerProductsSextoy">
                    {
                        sexToyPennis.map(item => <CardProductHome product={item} key={item._id} />)
                    }
                </div>

                <div className="containerProductCardSexToy">
                    <div className="containerProductsVulva"></div>
                    <div className="containerTextCardSexToy">
                        <h2>Sex Toys for Vulvas</h2>
                        <p>
                            The selection of toys available for vulvas is enormous so our team have been working like busy bees to hand pick a great edited selection that provide a little bit of everything.

                            For internal pleasure we have vibrators and dildos in all shapes and sizes, clitoral stimulators, suckers and powerful vibrating wands for the ultimate clitoral pleasure.
                    </p>
                    </div>
                </div>
                <div className="containerProductsSextoy">
                    {
                        sexToyVulva.map(item => <CardProductHome product={item} key={item._id} />)
                    }
                </div>
                <div className="containerProductCardSexToy">
                    <div className="containerTextCardSexToy">
                        <h2>Sex Toys for Butts</h2>
                        <p>
                            Anal stimulation is a powerful part of sexual pleasure and commonly one of the least explored. And we think thats a shame! There's so much to offer - from the full feeling of butt plugs, designed to stay in place during play or the popping sensations of anal beads being repeatedly removed and reinserted to the infamous prostate massagers and anal dildos, the array of sensations available to explore are mind blowing.
                    </p>
                    </div>
                    <div className="containerProductsButts"></div>
                </div>
                <div className="containerProductsSextoy">
                    {
                        sexToyButts.map(item => <CardProductHome product={item} key={item._id} />)
                    }

                </div>
            </>
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