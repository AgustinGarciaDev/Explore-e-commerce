import { useState } from "react"
import { connect } from "react-redux"
import { toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login'
import userActions from '../redux/actions/userActions'
import Header from '../components/Header'

const SignUp = (props) => {

    const [photo, setPhoto] = useState({ photo: '' })
    const [infoUser, setInfoUser] = useState({ user: "", email: "", password: "" })
    const [error, setError] = useState({})
    const errorsImput = { user: null, email: null, password: null }

    const uploadPhoto = e => {
        setPhoto({ photo: e.target.files[0] })
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
            console.log(response)
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
                alert("carga una imagen puto")
            }
        }
    }

    const responseGoogle = (response) => {
        const { email, imageUrl, givenName, googleId } = response.profileObj
        createAccount(null, { user: givenName, email: email, password: 'a' + googleId, urlImg: imageUrl, googleFlag: true })
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

                    <div className="inputCointainer">
                        <div className="upload-btn-wrapper">
                            <input id="foto" onChange={uploadPhoto} type="file" name="myfile" />
                        </div>
                    </div>

                    <div className="inputCointainer">
                        <label >
                            <p>Password</p>
                            <input name="password" placeholder="Password" onChange={changeValue} value={infoUser.password} type="password" />
                        </label>
                    </div>
                    {error.password ? <small>{error.password}</small> : <p></p>}

                    <button className="btnSendForm" onClick={createAccount}>Create Acount</button>
                </div>
            </section>
        </>
    )
}




const mapDispatchToProps = {

    createAcount: userActions.createAcount,
    uploadPhoto: userActions.uploadPhoto,
}


export default connect(null, mapDispatchToProps)(SignUp)