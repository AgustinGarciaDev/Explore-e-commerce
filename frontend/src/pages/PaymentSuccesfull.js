import Header from "../components/Header"
import Footer from "../components/Footer"

const PaymentSuccessFull = () => {

    return (
        <>
            <Header />
            <div className="containerPayment">
                <div className="containerTitlePayment">
                    <h1 className="titlePayment">Payment completed successfully</h1>
                    <h3 className="subTitlePayment">We send you the purchase details to your email</h3>
                </div>
                <div>
                    <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_ynz5xr.json" background="transparent" speed="1" style={{ width: 300, height: 300 }} loop autoplay></lottie-player>
                </div>
                <div>
                    <button className="botonHomePayment">Go to Home!</button>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default PaymentSuccessFull