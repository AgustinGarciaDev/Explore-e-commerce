import { useState, useEffect } from "react"
import { connect } from "react-redux"
import { toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login'
import userActions from '../redux/actions/userActions'

const SignUp = (props) => {

    const [photo, setPhoto] = useState({ photo: '' })
    const [errores, setErrores] = useState([])
    const [infoUser, setInfoUser] = useState({
        user: "",
        email: "",
        password: "",
        urlImg: "",
    })

    const uploadPhoto = e => {
        console.log(e.target.files[0])
        setPhoto({ photo: e.target.files[0] })
    }

    const sendPhoto = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('photo', photo.photo)
        props.uploadPhoto(formData)
    }

    const changeValue = (e) => {
        setInfoUser({
            ...infoUser,
            [e.target.name]: e.target.value
        })
    }


    const createAccount = async (e = null, googleUser = null) => {

        e && e.preventDefault()
        console.log(infoUser)

        let user = e ? infoUser : googleUser
        if (user.user === "" || user.password === "" || user.email === "") {
            toast.error("😬 All fields must be completed")

        } else {
            const respuesta = await props.createAcount(user)
            if (photo.photo) {
                const formData = new FormData()
                formData.append('email', user.email)
                formData.append('photo', photo.photo)
                props.uploadPhoto(formData)
            }
            if (respuesta) {
                setErrores(respuesta.details)
            } else {

                toast.success("👋 Welcome", {
                    onClose: () => {
                        props.history.push('/')
                    },

                })
            }

        }
    }
    const responseGoogle = (response) => {
        const { email, imageUrl, givenName } = response.profileObj
        createAccount(null, { user: givenName, email: email, password: 'Hola1234!', urlImg: imageUrl, googleFlat: true })
    }

    useEffect(() => {
        notificacionesToast()
    }, [errores])

    const notificacionesToast = () => {

        errores.map(error => {
            toast.error(error.message, {
                position: "top-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                toastId: error.message

            });
        })
    }

    return (
        <>
            <div>menu</div>
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
                    <h3 className="titleRegisterEmail">Our use your email for registration:</h3>
                    <div className="inputCointainer">

                        <label >
                            <p>Nick Name</p>
                            <input name="user" placeholder="Nick Name" onChange={changeValue} value={infoUser.user} type="text" />
                        </label>
                    </div>
                    <div className="inputCointainer">
                        <label >
                            <p>Email</p>
                            <input name="email" placeholder="Email" onChange={changeValue} value={infoUser.email} type="text" />
                        </label>
                    </div>
                    <div className="inputCointainer">

                        <div className="upload-btn-wrapper">
                            <button className="btn">Upload a file</button>
                            <input id="foto" onChange={uploadPhoto} type="file" name="myfile" />
                        </div>
                    </div>
                    <div className="inputCointainer">
                        <label >
                            <p>Password</p>
                            <input name="password" placeholder="Password" onChange={changeValue} value={infoUser.password} type="password" />
                        </label>
                    </div>
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