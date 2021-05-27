import { Carousel } from 'react-bootstrap'
const HeroHome = () => {

    return (
        <div>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100 sizeImage"
                        src="https://cdn.shopify.com/s/files/1/0530/2091/7929/files/Banner1_1512x.jpg?v=1610375897"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100 sizeImage"
                        src="https://cdn.shopify.com/s/files/1/0530/2091/7929/files/Banner1_1512x.jpg?v=1610375897"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 sizeImage"
                        src="https://cdn.shopify.com/s/files/1/0530/2091/7929/files/Banner1_1512x.jpg?v=1610375897"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default HeroHome