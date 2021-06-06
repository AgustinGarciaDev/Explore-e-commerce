import { useState } from "react"
import { connect } from "react-redux"
import { toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login'
import userActions from '../redux/actions/userActions'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const SignUp = (props) => {

    const [photo, setPhoto] = useState({ photo: '' })
    const [infoUser, setInfoUser] = useState({ user: "", email: "", password: "" })
    const [error, setError] = useState({})
    const errorsImput = { user: null, email: null, password: null }
    const [inputText, setInputText] = useState("Select a file")

    const uploadPhoto = e => {
        if (e.target.files[0]) {
            setPhoto({ photo: e.target.files[0] })
            setInputText(e.target.files[0].name)
        }
    }

    const changeValue = (e) => {
        setInfoUser({
            ...infoUser,
            [e.target.name]: e.target.value
        })
    }

    const createAccount = async (e = null, googleUser = null) => {
        e && e.preventDefault()

        let user = e ? infoUser : googleUser

        if (googleUser) {
            const response = await props.createAcount(user)
            if (response) {
                if (!response.success) {
                    toast.error(response.response.error)
                }
            }
        } else {
            if (photo.photo) {
                const formData = new FormData()
                formData.append('user', user.user)
                formData.append('email', user.email)
                formData.append('password', user.password)
                formData.append('photo', photo.photo)

                const response = await props.createAcount(formData)
                if (response) {
                    if (response.error) {
                        console.log("aca ariba")
                        if (response.error.details) {
                            response.error.details.map(error => {
                                errorsImput[error.context.label] = error.message
                                return null
                            })
                            setError(errorsImput)
                        }
                    } else {
                        toast.error(response.response.error)
                    }
                }
            } else {
                toast.error('You must complete all the fields', {
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
    }

    const responseGoogle = (response) => {
        if (response) {
            if (!response.error) {
                const { email, imageUrl, givenName, googleId } = response.profileObj
                createAccount(null, { user: givenName, email: email, password: 'a' + googleId, urlImg: imageUrl, googleFlag: true })
            }
        }
    }

    return (
        <>
            <Header />
            <section className="containerForm">
                <h1 className="titleForm">Create Account</h1>
                <div className="formularioSignUP">

                    <GoogleLogin
                        clientId="96796139704-21kkhk4q7hqudkpvga86qprq8c61i53s.apps.googleusercontent.com"
                        render={renderProps => (
                            <button className="btnGoogleSignUp" onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="fab fa-google"></i>Sign up with Google</button>
                        )}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <h3 className="titleRegisterEmail">Or use your email for registration:</h3>

                    <div className="inputCointainer">

                        <label >
                            <p>Nick Name</p>
                            <input name="user" placeholder="Nick Name" onChange={changeValue} value={infoUser.user} type="text" />
                        </label>
                    </div>
                    {error.user ? <small>{error.user}</small> : <p></p>}

                    <div className="inputCointainer">
                        <label >
                            <p>Email</p>
                            <input name="email" placeholder="Email" onChange={changeValue} value={infoUser.email} type="text" />
                        </label>
                    </div>
                    {error.email ? <small>{error.email}</small> : <p></p>}

                    <div className="container-input">
                        <input type="file" name="file-1" id="file-1" onChange={uploadPhoto} className="inputfile inputfile-1" data-multiple-caption="{count} archivos seleccionados" multiple />
                        <label htmlFor="file-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="iborrainputfile" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
                            <span className="iborrainputfile">{inputText}</span>
                        </label>
                    </div>

                    <div className="inputCointainer">
                        <label >
                            <p>Password</p>
                            <input name="password" placeholder="Password" onChange={changeValue} value={infoUser.password} type="password" />
                        </label>
                    </div>
                    {error.password ? <small>{error.password}</small> : <p></p>}

                    <div className="formbottom">
                        <p>Already have an account? <Link to="/signin">Sign in here !</Link></p>
                    </div>

                    <button className="btnSendForm" onClick={createAccount}>Create Acount</button>
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
            <Footer />
        </>
    )
}




const mapDispatchToProps = {

    createAcount: userActions.createAcount,
    uploadPhoto: userActions.uploadPhoto,
}


export default connect(null, mapDispatchToProps)(SignUp)