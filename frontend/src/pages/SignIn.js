import { useState } from "react"
import { connect } from "react-redux"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from 'react-google-login'
import userActions from '../redux/actions/userActions'
import Header from '../components/Header'
import Footer from "../components/Footer"
import { Link } from 'react-router-dom'

const SignIn = (props) => {

    const [infoUser, setInfoUser] = useState({ email: "", password: "", })

    const changeValue = (e) => {
        setInfoUser({
            ...infoUser,
            [e.target.name]: e.target.value
        })
    }
    const loginUser = async (e = null, googleUser = null) => {
        e && e.preventDefault()
        let user = e ? infoUser : googleUser

        const response = await props.signInUser(user)
        if (response) {
            toast.error(response.error, {
                position: "top-right",
                autoClose: 1700,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }

    }
    
    const responseGoogle = (response) => {
        if (response) {
            if (!response.error) {
                const { email, googleId } = response.profileObj
                loginUser(null, { email: email, password: 'a' + googleId })
            }
        }
    }

    return (
        <>
            <Header />
            <div className="containerForm">
                <h1 className="titleForm">Sign In</h1>
                <div className="formularioSignUP">
                    <GoogleLogin
                        clientId="96796139704-21kkhk4q7hqudkpvga86qprq8c61i53s.apps.googleusercontent.com"
                        render={renderProps => (
                            <button className="btnGoogleSignUp" onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="fab fa-google"></i>Sign in with Google</button>
                        )}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <div className="inputCointainer">
                        <label >
                            <p>Email</p>
                            <input name="email" onChange={changeValue} value={infoUser.email} type="text" />
                        </label>
                    </div>

                    <div className="inputCointainer">
                        <label >
                            <p>Password</p>
                            <input name="password" onChange={changeValue} value={infoUser.password} type="password" />
                        </label>
                    </div>
                    <div className="formbottom">
                        <p>Not have an account? <Link to="/signup">Sign Up here !</Link></p>
                    </div>
                    <div>
                        <button className="btnSendForm" onClick={loginUser}>Sign In</button>
                    </div>
                </div>
            </div>
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
            <Footer />
        </>
    )
}


const mapStateToProps = state => {
    return {
        usuarioStatus: state.user.usuarioStatus
    }
}

const mapDispatchToProps = {

    signInUser: userActions.signInUser
}


export default connect(mapStateToProps, mapDispatchToProps)(SignIn)