import ImageGallery from 'react-image-gallery';

const Product = () => {
    const images = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
    ];

    return (
        <div className="productContainer">
            <div className="photosProducts">
                <div className="carrouselProduct">
                    <ImageGallery items={images} />
                </div>
            </div>
            <div className="infoProducts">
                <div className="logoProduct">
                    <h2>Colt Kettlebell Cock Ring</h2>
                </div>
                <p className="priceProduct">$200</p>
                <div className="buyNowProduct">
                    <button>add to cart</button>
                </div>
                <div className="infoProduct">
                    <h3>"Chunky Vibrating Ring"</h3>
                </div>
                <div className="descProduct">
                        <p>Whether you’re a blushing beginner or an pleasure pioneer, the Colt® Weighted Kettlebell Ring is here to enhance your pleasure. The vibrating cock weight is connected to the stretchy, durable ring covered in rows of ravishing ridges with 12 intense functions of vibration.</p>
                </div>
            </div>
        </div>
    )
}

export default Product