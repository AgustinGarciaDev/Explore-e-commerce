import { useEffect, useState } from "react"
import { connect } from "react-redux"
import productActions from '../redux/actions/productsActions'
import CardProductHome from '../components/Home/CardProductHome'
import Header from "../components/Header"
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
    }, [products])

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
                        <h1 className="titleCategory">Accesories</h1>
                        <p className="textCategory">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, dolorum! Provident, nostrum quos eos iure aperiam, enim illum placeat eaque explicabo laudantium odit, sequi porro officia repellat nobis minima quas.</p>
                    </div>
                    <div className="containerIcons">
                    </div>
                </div>
                <div className="containerProductCardSexToy">
                    <div className="containerTextCardSexToy">
                        <h2>Lubricants</h2>
                        <p>
                            We have hand picked our favourite lubricants from the vast, vast array available on the market from water based, silicone based and lubricants designed for anal usage.
                    </p>
                    </div>
                    <div className="lubricantsCover"></div>
                </div>
                <div className="containerProductsSextoy">
                    {
                        sexToyPennis.map(item => <CardProductHome product={item} key={item._id} />)
                    }
                </div>

                <div className="containerProductCardSexToy">
                    <div className="sexGameCover"></div>
                    <div className="containerTextCardSexToy">
                        <h2>Sex Games</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum repudiandae quia praesentium placeat atque sunt id iusto? Rerum odio repellat iure quidem illum quisquam, eos, sint sequi ducimus, dolor earum!
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
                        <h2>Clenear</h2>
                        <p>
                            Anal stimulation is a powerful part of sexual pleasure and commonly one of the least explored. And we think thats a shame! There's so much to offer - from the full feeling of butt plugs, designed to stay in place during play or the popping sensations of anal beads being repeatedly removed and reinserted to the infamous prostate massagers and anal dildos, the array of sensations available to explore are mind blowing.
                    </p>
                    </div>
                    <div className="clearToy"></div>
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

export default connect(mapStateToProps, mapDispatchToPops)(Accesories)