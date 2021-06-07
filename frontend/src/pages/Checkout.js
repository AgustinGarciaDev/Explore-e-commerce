import { useState, useEffect } from "react"
import "../Style/checkout.css"
import { connect } from "react-redux"
import productsAction from "../redux/actions/productsActions"
import PaymentForm from "../components/PaymentForm"
import cartActions from "../redux/actions/cartActions"
import PaypalButton from "../components/PaypalButton"
import { toast } from 'react-toastify';
import Header from "../components/Header"
import { Link } from 'react-router-dom'

const Checkout = ({ articles, sendMail, history, removeAll, userLooged }) => {
    const [form, setForm] = useState({
        email: userLooged ? userLooged.email : '',
        firstName: "",
        lastName: "",
        adress: "",
        apartment: "",
        city: "",
        country: "",
        postCode: "",
        phone: ""
    })
    const [countries, setCountries] = useState([])
    const [visible, setVisible] = useState(false)
    const [creditCard, setCreditCard] = useState({})
    const cartArticles = articles && articles.filter(article => article.status)
    const [total, setTotal] = useState("")

    useEffect(() => {
        let contador = 0
        cartArticles.map(article => {
            let operatorDiscount = article.price - (article.discount / 100) * article.price
            return (
                contador += operatorDiscount * article.units
            )
        })
        setTotal(contador)
    }, [cartArticles])

    useEffect(() => {
        fetch("https://restcountries.eu/rest/v2/all")
            .then(data => data.json())
            .then(data => setCountries(data))
            .catch(err => console.log(err))
    }, [])

    const readFields = (e) => { setForm({ ...form, [e.target.name]: e.target.value }) }

    const readCreditCard = state => { setCreditCard(state) }

    const sendAll = (value) => {

        if (value) {
            let form = {
                email: value.payer.email_address,
                firstName: value.payer.name.given_name,
                lastName: value.payer.name.surname,
                country: value.payer.address.country_code,
            }
            sendMail(form, { cardBrand: "Paypal", number: 0 }, { cartArticles, total })
                .then(data => !data && toast.error("Sorry we can't process your payment"))

        } else {
            sendMail(form, creditCard, { cartArticles, total })
                .then(data => !data && toast.error("Sorry we can't process your payment"))
            removeAll()
            history.push("/payment")
        }

    }

    const lookingDown = () => {
        window.scroll({
            top: 100000,
            behavior: 'smooth'
        });

    }

    return (
        <>
            <Header />
            <div className="mainContainer">

                <div className="leftContainer ">

                    <div className="imgContainer">
                        <div className="logo" />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }} >
                        <PaypalButton total={total} sendAll={sendAll} />
                    </div>
                    <p style={{ textAlign: 'center' }}>or</p>
                    <hr className="divider" />
                    <div className="formContainer" >
                        <div className="ContactInformation">
                            <div>
                                <h3>Contact Information</h3>
                                {
                                    !userLooged && <h6>Already have an account? <Link to="/signin">SignIn</Link></h6>
                                }
                            </div>
                            <input
                                type="text"
                                disabled={visible ? true : false}
                                name="email"
                                onChange={readFields}
                                placeholder="Email"
                                value={form.email}
                            />
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
                                <input type="number" disabled={visible ? true : false} name="phone" onChange={readFields} placeholder="Phone (optional)" />
                            </div>
                            <button className="continue" onClick={() => { setVisible(!visible); !visible && lookingDown() }} >{!visible ? "Continue to delivery" : "Back to form"}</button>
                        </div>
                    </div>

                    <div className={visible ? "d-block paymentContainer " : "d-none"} >
                        <hr />
                        <h1>Payment</h1>
                        <hr />
                        <PaymentForm redState={readCreditCard} />
                        <hr />

                        <div className="MakePayment">
                            <button onClick={() => {
                                !Object.values(form).some(value => !value.trim())
                                    ? sendAll()
                                    : toast.error("You must complete all the fields")
                            }}
                                className="continue">Make payment</button>
                        </div>
                    </div>

                </div>

                <div className="rigthContainer">
                    <div className="rightChildContainer">
                        <div className="productsContainer" >

                            {cartArticles.length
                                ? cartArticles.map(article => {
                                    let operatorDiscount = article.price - (article.discount / 100) * article.price
                                    return <div key={article._id} className="articleCheckout" >
                                        <div>
                                            <div className="productImg" style={{ backgroundImage: `url('${article.coverImage}')` }} >
                                                <span>{article.units} </span>
                                            </div>
                                            <h6>{article.name}</h6>
                                        </div>
                                        <h6 style={{ width: "4rem" }}>{operatorDiscount}</h6>
                                    </div>
                                })
                                : <h4>Don't have any articles</h4>
                            }

                        </div>
                        <hr />
                        <div>
                            <div className="counts-flex">
                                <h6 className="d-flex">Subtotal</h6>
                                <span>€ {total}</span>
                            </div>
                        </div>
                        <hr />
                        <div className="counts-flex">
                            <h6>Total</h6>
                            <span>€ {total}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        articles: state.cart.articles,
        userLooged: state.user.usuarioStatus
    }
}


const mapDispatchToProps = {
    sendMail: productsAction.sendMail,
    removeAll: cartActions.removeAll
}


export default connect(mapStateToProps, mapDispatchToProps)(Checkout)