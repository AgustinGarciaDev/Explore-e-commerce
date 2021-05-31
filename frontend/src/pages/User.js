import {  useState } from "react"
import { connect } from "react-redux"
import { toast } from 'react-toastify';
import userActions from '../redux/actions/userActions'

const User = (props) => {
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
   
    const changeAccount = async (dateToChange) => {
        dateToChange.preventDefault()
        if (!dateToChange) {
            toast.error("😬 All fields must be completed")

        } else {
            const respuesta = await props.createAcount(dateToChange)

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
                        <button onClick={changeAccount(infoUser.user)}>Change Nick Name</button>
                    </div>
                    <div>
                        <label >
                            <p>Email</p>
                            <input name="email" onChange={changeValue} value={infoUser.email} type="text" />
                            <button onClick={changeAccount(infoUser.email)}>Change email</button>
                        </label>
                    </div>
                    <div>
                        <label >
                            <p>Foto user</p>
                            <input type="file" name="foto" id="foto" onChange={uploadPhoto} />
                            <button onClick={sendPhoto}>Change photo</button>
                        </label>
                    </div>
                    <div>
                        <label >
                            <p>Password</p>
                            <input name="password" onChange={changeValue} value={infoUser.password} type="password" />
                            <button onClick={changeAccount(infoUser.password)}>Change password</button>
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}
const mapDispatchToProps = {

    createAcount: userActions.createAcount,
    uploadPhoto: userActions.uploadPhoto,
}


export default connect(null, mapDispatchToProps)(User)