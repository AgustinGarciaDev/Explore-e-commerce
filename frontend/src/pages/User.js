import {  useState } from "react"
import { connect } from "react-redux"
import { toast } from 'react-toastify';
import userActions from '../redux/actions/userActions'

const User = (props) => {
    const [photo, setPhoto] = useState({photo: ''})
    const [infoUser, setInfoUser] = useState({
        user: "",
        email: "",
        password: "",
        urlImg: "",
        legalAge: false,
    })

    const addPhoto= e => {
        setPhoto({photo: e.target.files[0]})
    }

    const sendPhoto = async () => {
        console.log(props.usuarioStatus.email)
        if( photo.photo){
            console.log("hola2")
            

            const formData = new FormData()
            formData.append('email', props.usuarioStatus.email)
            formData.append('photo', photo.photo)
            props.uploadPhoto(formData)
        } else {
            toast.error("😬 The field must be completed")
        }
    }

    const changeValue = (e) => {
        setInfoUser({
            ...infoUser,
            [e.target.name]: e.target.value
        })
    }
   
    const changeAccount = async (dateToChange,e) => {
       
        if (!dateToChange) {
            toast.error("😬 The field must be completed")

        } else {
            const respuesta = await props.modifyUser(dateToChange,localStorage.getItem('token'))

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
                <h1 className="titleForm">User</h1>
                <div>
                    <div>
                        <label >
                            <p>Nick Name</p>
                            <input name="user" onChange={changeValue} value={infoUser.user} type="text" />
                        </label>
                        <button onClick={()=>changeAccount({user: infoUser.user})}>Change Nick Name</button>
                    </div>
                    <div>
                        <label >
                            <p>Email</p>
                            <input name="email" onChange={changeValue} value={infoUser.email} type="text" />
                            <button onClick={()=>changeAccount({email: infoUser.email})}>Change email</button>
                        </label>
                    </div>
                    <div>
                        <label >
                            <p>Foto user</p>
                            <input type="file" name="foto" id="foto" onChange={addPhoto} />
                            <button onClick={()=>sendPhoto()}>Change photo</button>
                        </label>
                    </div>
                    <div>
                        <label >
                            <p>Password</p>
                            <input name="password" onChange={changeValue} value={infoUser.password} type="password" />
                            <button onClick={()=>changeAccount({password: infoUser.password})}>Change password</button>
                        </label>
                    </div>
                </div>
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

    modifyUser: userActions.modifyUser,
    uploadPhoto: userActions.uploadPhoto,
}


export default connect(mapStateToProps, mapDispatchToProps)(User)