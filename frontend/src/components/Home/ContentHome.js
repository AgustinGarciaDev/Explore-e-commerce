
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from "react-slick"

const ContentHome = () => {


    const settings = {
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 4,
        slidesToScroll: 2,
        width: 600,
        autoplaySpeed: 2000,
        arrows: true,
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
                <div className="titleSliderContainer"><p className="titleSlider">Sale Now On</p></div>
                <Slider {...settings}>
                    <div className="slideOne">
                        <div className="contentSliders">
                            <div className="contentSliderTitle"> Lorem. </div>
                            <div> <button className="contentSliderButton">Click ME</button> </div>
                        </div>
                    </div>
                    <div className="slideTwo">
                        <div className="contentSliders">
                            <div className="contentSliderTitle"> Lorem. </div>
                            <div> <button className="contentSliderButton">Click ME</button> </div>
                        </div>
                    </div>
                    <div className="slideThree">
                        <div className="contentSliders">
                            <div className="contentSliderTitle"> Lorem. </div>
                            <div> <button className="contentSliderButton">Click ME</button> </div>
                        </div>
                    </div>
                    <div className="slideFor">
                        <div className="contentSliders">
                            <div className="contentSliderTitle"> Lorem. </div>
                            <div> <button className="contentSliderButton">Click ME</button> </div>
                        </div>
                    </div>
                    <div className="slideFive">
                        <div className="contentSliders">
                            <div className="contentSliderTitle"> Lorem. </div>
                            <div> <button className="contentSliderButton">Click ME</button> </div>
                        </div>
                    </div>
                    <div className="slideSix">
                        <div className="contentSliders">
                            <div className="contentSliderTitle"> Lorem. </div>
                            <div> <button className="contentSliderButton">Click ME</button> </div>
                        </div>
                    </div>
                </Slider>
            </div>
            <>
                <div className="imageContainerTop">
                    <div className="imgTop"></div>
                    <div className="infoTop">
                        <div>
                            <h2>Sex Toys Need No Gender</h2>
                            <p>As children we often grow up expected to play with 'boys toys' or 'girls toys' and whilst many areas of society are, thankfully, moving on from this default setting, the world of sex toys hasn't quite moved at the same pace...</p>
                        </div>
                    </div>
                </div>
                <div className="imageContainerBot">
                    <div className="infoBot">
                        <div>
                            <h2>We've Got You Pegged</h2>
                            <p>You might be mistaken for thinking that 'Pegging' is a new, 21st Century 'trend', made popular by millennials and unheard of before the insta generation but whilst the catchy term seems to have been coined around the 90's, the practice of a cisgender female anally penetrating a cisgender male dates back as much as...</p>
                        </div>
                    </div>
                    <div className="imgBot"></div>
                </div>
            </>
            <h2 style={{
                margin: "0 0 0 1rem"
            }}>FAQ Delivery</h2>
            <section>
                <div className="container">
                    <div className="accordion">
                        <div className="accordion-item" id="question1">
                            <a className="accordion-link" href="#question1">
                                <div className="flex">
                                    <h3>Are your packages sent discreetly?</h3>
                                </div>
                                <i className="icon ion-md-arrow-forward"></i>
                                <i className="icon ion-md-arrow-down"></i>
                            </a>
                            <div className="answer">
                                <p> Yep! All our packages are sent free of any identifying company names or logo's. Your postie won't be any the wiser!</p>
                            </div>
                            <hr />
                        </div>
                        <div className="accordion-item" id="question2">
                            <a className="accordion-link" href="#question2">
                                <div className="flex">
                                    <h3>How long does delivey take?</h3>
                                </div>
                                <i className="icon ion-md-arrow-forward"></i>
                                <i className="icon ion-md-arrow-down"></i>
                            </a>
                            <div className="answer">
                                <p>We provide two options for delivery; the first taking between 1-2 days and the second taking 3-4 days.</p>
                            </div>
                            <hr />
                        </div>
                        <div className="accordion-item" id="question3">
                            <a className="accordion-link" href="#question3">
                                <div className="flex">
                                    <h3>What countries do you deliver to?</h3>
                                </div>
                                <i className="icon ion-md-arrow-forward"></i>
                                <i className="icon ion-md-arrow-down"></i>
                            </a>
                            <div className="answer">
                                <p>Currently we are limited to the UK mainland but we're hoping to expand in the future</p>
                            </div>
                            <hr />
                        </div>
                        <div className="accordion-item" id="question4">
                            <a className="accordion-link" href="#question4">
                                <div>
                                    <h3>What if I am not homw when they try do deliver my parcel?</h3>
                                </div>
                                <i className="icon ion-md-arrow-forward"></i>
                                <i className="icon ion-md-arrow-down"></i>
                            </a>
                            <div className="answer">
                                <p>If you're out when the postie tries to deliver your parcel, they will find a safe place to leave your parcel or will take it to the nearest Post Office. They will leave a card explaining how you can collect your parcel.</p>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </section>
            <h2 style={{
                margin: "0 0 0 1rem"
            }}>Privacy & Security</h2>
            <section>
                <div className="container">
                    <div className="accordion">
                        <div className="accordion-item" id="question5">
                            <a className="accordion-link" href="#question5">
                                <div className="flex">
                                    <h3>Is it safe to order from Explore?</h3>
                                </div>
                                <i className="icon ion-md-arrow-forward"></i>
                                <i className="icon ion-md-arrow-down"></i>
                            </a>
                            <div className="answer">
                                <p>Absolutely! Sexplore is built upon the popular Shopify platform. Shopify is certified level 1 PCI DSS compliant ensuring a secure network which protects cardholder data. Find out more here</p>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </section>
            <div className="containerIconsHome">
                <div className="boxTextAndIcon">
                    <i className="fas fa-truck"></i>
                    <h2>Free Delivery</h2>
                    <p>On Orders Over £50</p>
                </div>
                <div className="boxTextAndIcon">
                    <i className="fas fa-box-open"></i>
                    <h2>14 Day Returns</h2>
                    <p>T&C's Apply</p>
                </div>
                <div className="boxTextAndIcon">
                    <i className="fas fa-hand-holding-heart"></i>
                    <h2>Hand Picked</h2>
                    <p>By Our Team</p>
                </div>
                <div className="boxTextAndIcon">
                    <i className="fas fa-box"></i>
                    <h2>Discreet</h2>
                    <p>Non-Identifiable Packaging</p>
                </div>
            </div>

        </>
    )
}

export default ContentHome