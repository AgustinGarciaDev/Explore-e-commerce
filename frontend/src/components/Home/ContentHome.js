
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from "react-slick"

const ContentHome = () => {


    const settings = {
        dots: true,
        infinite: true,
        speed: 900,
        slidesToShow: 4,
        slidesToScroll: 3,
        centerMode: true,
        width: 600,
        autoplaySpeed: 1000,
        cssEase: "linear"
    };

    return (
        <>
            <div className="containerAboutUs">
                <div className="containerImgHome"></div>
                <div className="containerTextAbout">
                    <h2 className="titleContent">Where do I start!?</h2>
                    <p className="textContent">
                        So many toys, so little time! Knowing where to start is a minefield and that's why we have created Explore, an online sex toy website where each toy has been handpicked by out team because we love them.
                </p>
                    <p className="textContent">
                        We don't subscribe to gender stereotypes, we let you choose toys based on your body parts so take a look, we have sex toys for Penises, Vulvas and Butts
                </p>
                </div>
            </div>
            <div className="containerCarrousel">
                <Slider {...settings}>
                    <div className="slideOne">

                    </div>
                    <div className="slideTwo">

                    </div>
                    <div className="slideThree">

                    </div>
                    <div className="slideFor">

                    </div>
                    <div className="slideOne">

                    </div>
                    <div className="slideSix">

                    </div>
                </Slider>
            </div>


        </>
    )
}

export default ContentHome