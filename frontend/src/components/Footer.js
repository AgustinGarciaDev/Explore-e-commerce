import { useState } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"
import { toast } from 'react-toastify';
import swal from 'sweetalert'

const Footer = (props) => {

    const [email, setEmail] = useState({ email: "" })

    const alert = (type, message) => {
        toast[type](message, {
            position: "top-center",
            autoClose: 1700,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    const readInput = (e) => {
        let name = e.target.name
        let value = e.target.value
        setEmail({
            ...email,
            [name]: value
        })
    }

    const emailButton = () => {
        if (/^\s+|\s+$/.test(email.email) || email.email === "") {
            alert("info", "You cannot post an empty comment")
        } else if (!(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(email.email))) {
            alert("error", "Incorrect email")
        } else {
            props.sendMail(email)
            swal("Email sent successfully! Check message box!", {
                buttons: {
                    confirm: {
                        text: "Okay",
                        value: "confirm"
                    }
                },
            })
                .then((value) => {
                    switch (value) {
                        case "confirm":
                            setEmail({ email: "" })
                            break;
                        default:
                            break;
                    }
                });
        }
    }

    return (
        <>
            <img className="footerImg" src="http://tingarciadg.com/wp-content/uploads/2021/06/Vector.png" alt="" />
            <footer className="bg-white">
                <div className="container py-5">
                    <div className="row py-4">
                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0"><img src="img/logo.png" alt="" width="180" className="mb-3" />
                            <p className="font-italic text-muted">
                                When you shop with us you shop based on the body part you want to pleasure and once that packaging is open its up to you where you use it!
                            </p>
                            <ul className="list-inline mt-4">
                                <li className="list-inline-item"><i className="fab fa-twitter-square"></i></li>
                                <li className="list-inline-item"><i className="fab fa-facebook-f"></i></li>
                                <li className="list-inline-item"><i className="fab fa-instagram"></i></li>
                                <li className="list-inline-item"><i className="fab fa-pinterest"></i></li>
                                <li className="list-inline-item"><i className="fab fa-vimeo"></i></li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
                            <h6 className="text-uppercase font-weight-bold mb-4">Shop</h6>
                            <ul className="list-unstyled mb-0">
                                <li className="mb-2"><Link to="/products" className="text-muted">All Products</Link></li>
                                <li className="mb-2"><Link to="/sextoy" className="text-muted">Sex Toys</Link></li>
                                <li className="mb-2"><Link to="/accesories" className="text-muted">Accesories</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
                            <h6 className="text-uppercase font-weight-bold mb-4">Company</h6>
                            <ul className="list-unstyled mb-0">
                                <li className="mb-2"><Link to="/signin" className="text-muted">Login</Link></li>
                                <li className="mb-2"><Link to="/signup" className="text-muted">Register</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-lg-0">
                            <h6 className="text-uppercase font-weight-bold mb-4">Newsletter</h6>
                            <p className="text-muted mb-4">Keep up with the latest news!</p>
                            <div className="p-1 rounded border">
                                <div className="input-group">
                                    <input type="email"
                                        placeholder="Enter your email address"
                                        aria-describedby="button-addon1"
                                        className="form-control border-0 shadow-0"
                                        onChange={readInput}
                                        value={email.email}
                                        name="email" required />
                                    <div className="input-group-append">
                                        <button onClick={emailButton} id="button-addon1" type="submit" className="btn btn-link"><i className="fa fa-paper-plane"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-light py-4">
                    <div className="container text-center">
                        <p className="text-muted mb-0 py-2 textFooterGroup">
                            © 2021 Group 3 All rights reserved
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}

const mapStateToProps = state => {
    return {
        accountant: state.cart.accountant,
        userLooged: state.user
    }
}

const mapDispatchToProps = {
    sendMail: userActions.sendMail
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)


