import {  useState } from "react"
import { connect } from "react-redux"
import { toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login'
import userActions from '../redux/actions/userActions'
import axios from "axios";

const SignUp = (props) => {

    const [photo, setPhoto] = useState({photo: ''})
    const [errores, setErrores] = useState([])
    const [infoUser, setInfoUser] = useState({
        user: "",
        email: "",
        password: "",
        urlImg: "",
        legalAge: false,
    })

    const uploadPhoto= e => {
        setPhoto({photo: e.target.files[0]})
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
    const changeInput = (e) => {
        setInfoUser({
            ...infoUser,
            legalAge: !infoUser.legalAge,
        })

    }

    const createAccount = async (e = null, googleUser = null) => {
        console.log(infoUser)
        e && e.preventDefault()
        let user = e ? infoUser : googleUser
        if (user.user === "" || user.password === "" || user.email === "" || user.legalAge === false) {
            toast.error("😬 All fields must be completed")

        } else {

            if(!user.googleFlat){
                const formData = new FormData()
                formData.append('photo', photo.photo)
                props.uploadPhoto(formData)
                }
                
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
        createAccount(null, { email: email, password: 'Hola1234!', urlImg: imageUrl, legalAge: true, googleFlat: true })
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
                            <input type="file" name="foto" id="foto" onChange={uploadPhoto} />
                        </label>
                    </div>
                    <div>
                        <label >
                            <p>Acepto que soy mayor de 18</p>
                            <input checked={infoUser.legalAge} name="legal" id="legalAgePlus" onChange={changeInput} type="checkbox" />
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
                        clientId="96796139704-21kkhk4q7hqudkpvga86qprq8c61i53s.apps.googleusercontent.com"
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

    createAcount: userActions.createAcount,
    uploadPhoto: userActions.uploadPhoto,
}


export default connect(null, mapDispatchToProps)(SignUp)