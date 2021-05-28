import CardProduct from "../components/CardProduct"

const ListProduct = () => {

    const products = [
        {
            name: "Glass G-Spot Wand",
            precie: 50,
            categories: ["sex toy", "sexi", "new"],
            productsImages: "http://baravdg.com/wp-content/uploads/2021/05/1_9b31637f-3d1d-4b61-9285-c25339d940e1_400x.png",
            _id: "60b0135e7877711718bf57ec"
        },
        {
            name: "Glass G-Spot Wand",
            precie: 50,
            categories: ["accesorios"],
            productsImages: "http://baravdg.com/wp-content/uploads/2021/05/1_9b31637f-3d1d-4b61-9285-c25339d940e1_400x.png",
            _id: "60b0135e7877711718bf57ec"
        },
        {
            name: "Glass G-Spot Wand",
            precie: 50,
            categories: ["cremas"],
            productsImages: "http://baravdg.com/wp-content/uploads/2021/05/1_9b31637f-3d1d-4b61-9285-c25339d940e1_400x.png",
            _id: "60b0135e7877711718bf57ec"
        },
    ]

    return (
        <>
            <div>
                <div className="titleContainerProducts"><h2>Popular sextoy</h2></div>
                <div className="productsListHome">
                    {products.map(product => <CardProduct key={product._id} product={product} />)}
                </div>
            </div>
{/*             <div>
                <div className="titleContainerProducts"><h2>Popular Accesorios</h2></div>
                <div className="productsListHome">
                    {products.map(product => <CardProduct key={product._id} product={product} />)}
                </div>
            </div>
            <div >
                <div className="titleContainerProducts"><h2>Popular Cremas</h2></div>
                <div className="productsListHome">
                    {products.map(product => <CardProduct key={product._id} product={product} />)}
                </div>
            </div> */}
        </>
    )
}

export default ListProduct