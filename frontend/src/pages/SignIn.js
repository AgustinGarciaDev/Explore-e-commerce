import {  useState } from "react"
import { connect } from "react-redux"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from 'react-google-login'
import userActions from '../redux/actions/userActions'
const SignIn = (props) => {

    const [infoUser, setInfoUser] = useState({
        email: "",
        password: "",
    })

    const changeValue = (e) => {
        setInfoUser({
            ...infoUser,
            [e.target.name]: e.target.value
        })
    }
    const loginUser = async (e = null, googleUser = null) => {

        e && e.preventDefault()
        let user = e ? infoUser : googleUser
        if (user.password === "" || user.email === "") {
            toast.error("😬 All fields must be completed")

        } else {
            const respuesta = await props.signInUser(user)

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
        const { email } = response.profileObj
        loginUser(null, { email: email, password: 'Hola1234!' })
    }

    return (
        <>
            <div>menu</div>
            {  props.usuarioStatus? <h1 className="titleForm">Logueado</h1> : <h1 className="titleForm">NO logueado</h1> }
            
            <div className="containerForm">
                <h1 className="titleForm">Login</h1>
                <div>
                    <div>
                        <label >
                            <p>Email</p>
                            <input name="email" onChange={changeValue} value={infoUser.email} type="text" />
                        </label>
                    </div>

                    <div>
                        <label >
                            <p>Password</p>
                            <input name="password" onChange={changeValue} value={infoUser.password} type="password" />
                        </label>
                    </div>
                    <div>
                        <button onClick={loginUser}>login</button>
                    </div>
                    <GoogleLogin
                        clientId="96796139704-21kkhk4q7hqudkpvga86qprq8c61i53s.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />,
                </div>
                <button onClick={() =>console.log(props.usuarioStatus)}>console.log</button>
            </div>
        </>
    )
}


const mapStateToProps= state =>{
    return{
        usuarioStatus: state.user.usuarioStatus 
    }
}

const mapDispatchToProps = {

    signInUser: userActions.signInUser
}


export default connect(mapStateToProps, mapDispatchToProps)(SignIn)