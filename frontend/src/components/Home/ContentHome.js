import CardProductHome from "./CardProductHome"

const ContentHome = () => {

    const products = [
        {
            name: "Glass G-Spot Wand",
            precie: 50,
            categories: ["sex toy", "sexi", "new"],
            productsImages: "http://baravdg.com/wp-content/uploads/2021/05/1_9b31637f-3d1d-4b61-9285-c25339d940e1_400x.png",
            _id: "123"
        },
        {
            name: "Glass G-Spot Wand",
            precie: 50,
            categories: ["accesorios"],
            productsImages: "http://baravdg.com/wp-content/uploads/2021/05/1_9b31637f-3d1d-4b61-9285-c25339d940e1_400x.png",
            _id: "123"
        },
        {
            name: "Glass G-Spot Wand",
            precie: 50,
            categories: ["cremas"],
            productsImages: "http://baravdg.com/wp-content/uploads/2021/05/1_9b31637f-3d1d-4b61-9285-c25339d940e1_400x.png",
            _id: "123"
        },
    ]


    return (
        <>
            <div className="containerAboutUs">
                <div className="containerImgHome"></div>
                <div className="containerTextAbout">
                    <h2>Where do I start!?</h2>
                    <p>
                        So many toys, so little time! Knowing where to start is a minefield and that's why we have created Sexplore, an online sex toy website where each toy has been handpicked by out team because we love them.
                </p>
                    <p>
                        We don't subscribe to gender stereotypes, we let you choose toys based on your body parts so take a look, we have sex toys for Penises, Vulvas and Butts
                </p>
                </div>
            </div>
            <div>
                <div className="titleContainerProducts"><h2>Popular sextoy</h2></div>
                <div className="productsListHome">
                    {products.map(product => <CardProductHome key={product._id} product={product} />)}
                </div>
            </div>

            <div>
                <div className="titleContainerProducts"><h2>Popular Accesorios</h2></div>
                <div className="productsListHome">
                    {products.map(product => <CardProductHome key={product._id} product={product} />)}
                </div>
            </div>
            <div >
                <div className="titleContainerProducts"><h2>Popular Cremas</h2></div>
                <div className="productsListHome">
                    {products.map(product => <CardProductHome key={product._id} product={product} />)}
                </div>
            </div>


        </>
    )
}

export default ContentHome