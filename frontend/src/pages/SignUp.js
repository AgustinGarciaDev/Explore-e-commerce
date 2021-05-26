import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login'
import userActions from '../redux/actions/userActions'

const SignUp = (props) => {

    const [errores, setErrores] = useState([])
    const [infoUser, setInfoUser] = useState({
        user: "",
        email: "",
        password: "",
        urlImg: "",
        legalAge: true,
    })

    const changeValue = (e) => {
        setInfoUser({
            ...infoUser,
            [e.target.name]: e.target.value
        })
    }

    console.log(infoUser)
    const createAccount = async (e = null, googleUser = null) => {

        e && e.preventDefault()
        let user = e ? infoUser : googleUser
        if (user.user === "" || user.password === "" || user.email === "") {
            toast.error("😬 All fields must be completed")

        } else {
            const respuesta = await props.createAcount(user)

            if (respuesta) {
                console.log(respuesta)
                /* setErrores(respuesta.details) */
            } else {
                /*    toast.success("👋 Welcome", {
                       onClose: () => {
                           props.history.push('/')
                       },
   
                   }) */
                console.log(respuesta)
            }
        }
    }
    const responseGoogle = (response) => {
        const { email, imageUrl } = response.profileObj
        createAccount(null, { email: email, password: 'Hola1234!', urlImg: imageUrl, legalAge: true })
    }

    /*    useEffect(() => {
           notificacionesToast()
       }, [errores]) */

    return (
        <>
            <div>menu</div>
            <div className="containerForm">
                <h1 className="titleForm">Create Account</h1>
                <div>
                    <div>
                        <label >
                            <p>Nick Name</p>
                            <input name="user" onChange={changeValue} value={infoUser.user} type="text" />
                        </label>
                    </div>
                    <div>
                        <label >
                            <p>Email</p>
                            <input name="email" onChange={changeValue} value={infoUser.email} type="text" />
                        </label>
                    </div>
                    <div>
                        <label >
                            <p>Foto user</p>
                            <input name="urlImg" onChange={changeValue} value={infoUser.urlImg} type="text" />
                        </label>
                    </div>
                    <div>
                        <label >
                            <p>Acepto que soy mayor de 18</p>
                            <input required name="legalAge" id="legalAgePlus" onChange={changeValue} value={infoUser.legalAge} type="checkbox" />
                        </label>

                    </div>
                    <div>
                        <label >
                            <p>Password</p>
                            <input name="password" onChange={changeValue} value={infoUser.password} type="password" />
                        </label>
                    </div>
                    <div>
                        <button onClick={createAccount}>Create Acount</button>
                    </div>
                    <GoogleLogin
                        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />,
                </div>
            </div>
        </>
    )
}




const mapDispatchToProps = {

    createAcount: userActions.createAcount
}


export default connect(null, mapDispatchToProps)(SignUp)