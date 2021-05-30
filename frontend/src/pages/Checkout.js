import react, { useState, useEffect } from "react"
import { connect } from "react-redux"
import productsAction from "../redux/actions/productsActions"
import PaymentForm from "../components/PaymentForm"


const Checkout = ({ sendMail, history }) => {
    const [form, setForm] = useState({ email: "", check: false, firstName: "", lastName: "", adress: "", apartment: "", city: "", country: "", postCode: "", phone: "" })
    const [countries, setCountries] = useState([])
    const [visible, setVisible] = useState(false)
    const [creditCard, setCreditCard] = useState({})

    useEffect(() => {
        fetch("https://restcountries.eu/rest/v2/all")
            .then(data => data.json())
            .then(data => setCountries(data))
            .catch(err => console.log(err))
    }, [])

    const readFields = (e) => { setForm({ ...form, [e.target.name]: e.target.value }) }

    const readCreditCard = state => { setCreditCard(state) }

    const sendAll = () => {
        sendMail(form, creditCard)
        .then(data => data.success && history.push("/payment") )
    }


    return <div className="mainContainer">

        <div className="leftContainer ">

            <div className="imgContainer">
                <div className="logo" />
            </div>
            <div className="formasDePagoContainer">
                <h6>formas de pago</h6>
            </div>
            <hr className="divider" />
            <div className="formContainer" >
                <div className="ContactInformation">
                    <div>
                        <h3>Contact Information</h3>
                        <h6>Already have an account? <span>SignIn</span></h6>
                    </div>
                    <input type="text" disabled={visible ? true : false} name="email" onChange={readFields} placeholder="Email" />
                </div>
                <div className="checkbox">
                    <input type="checkbox" disabled={visible ? true : false} onClick={() => setForm({ ...form, check: !form.check })} />
                    <p>Keep me up to date on news and exclusive offers</p>
                </div>
                <div className="deliveryAdress">
                    <h3>Delivery address</h3>
                    <div className="inputDouble">
                        <input type="text" disabled={visible ? true : false} name="firstName" onChange={readFields} placeholder="First name" className="primerInput" />
                        <input type="text" disabled={visible ? true : false} name="lastName" onChange={readFields} placeholder="Last name" className="inputRigth" />
                    </div>
                    <div>
                        <input type="text" disabled={visible ? true : false} name="adress" onChange={readFields} placeholder="Adress" />
                    </div>
                    <div>
                        <input type="text" disabled={visible ? true : false} name="apartment" onChange={readFields} placeholder="Apartment,suite,etc.(opcional)" />
                    </div>
                    <div>
                        <input type="text" disabled={visible ? true : false} name="city" onChange={readFields} placeholder="City" />
                    </div>
                    <div className="inputDouble">
                        <select className="select" disabled={visible ? true : false} name="country" onChange={readFields} placeholder="Country/Region">
                            {countries.length &&
                                countries.map(country => <option key={country.name} value={country.name}>{country.name}</option>)
                            }
                        </select>
                        <input type="text" disabled={visible ? true : false} name="postCode" onChange={readFields} placeholder="Postcode" className="inputRigth" />
                    </div>
                    <div>
                        <input type="text" disabled={visible ? true : false} name="phone" onChange={readFields} placeholder="Phone (optional)" />
                    </div>
                    <button className="continue" onClick={() => setVisible(!visible)} >{!visible ? "Continue to delivery" : "Back to form"}</button>
                </div>
            </div>

            <div className={visible ? "d-block paymentContainer " : "d-none"} >

                <h1>Payment</h1>
                <hr />
                <PaymentForm redState={readCreditCard} />

                <div className="MakePayment" text-center>
                    <button onClick={sendAll} className="continue">Make payment</button>
                </div>
            </div>

        </div>

        <div className="rigthContainer">
            <div className="rightChildContainer">
                <div className="productsContainer" >
                    <div>
                        <div className="productImg" style={{ backgroundImage: "url('https://staticcl.natura.com/cdn/ff/Bz_PZGIa5cFUtEI-s7cptyY034XRKwLsHRvU8va9MyU/1617908940/public/styles/product_image_facebook_share/public/products/77430_1_8.jpg?itok=mDW-q_n-')" }} ></div>
                        <h6>Hola</h6>
                    </div>

                    <h6>$255</h6>
                </div>
                <hr />
                <div className="discountContainer">
                    <input type="text" placeholder="Discount code" />
                    <button>Apply</button>
                </div>
                <hr />
                <div>
                    <div className="counts-flex">
                        <h6 className="d-flex">Subtotal</h6>
                        <span>$7</span>
                    </div>
                    <div className="counts-flex">
                        <h6>Delivery </h6>
                        <span>Calculated at next step</span>
                    </div>
                </div>
                <hr />
                <div className="counts-flex">
                    <h6>Total</h6>
                    <span>$7.19</span>
                </div>
            </div>
        </div>
    </div>
}

const mapDispatchToProps = {
    sendMail: productsAction.sendMail
}


export default connect(null, mapDispatchToProps)(Checkout)