import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';

const SignUp = () => {

    const [infoUser, setInfoUser] = useState({
        nickName: "",
        email: "",
        password: "",
        userPic: "",
        edad: "",
    })

    const changeValue = (e) => {
        setInfoUser({
            ...infoUser,
            [e.target.name]: e.target.value
        })
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
                            <input name="nickName" onChange={changeValue} value={infoUser.nickName} type="text" />
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
                            <input name="email" onChange={changeValue} value={infoUser.email} type="text" />
                        </label>
                    </div>
                    <div>
                        <label >
                            <p>Password</p>
                            <input name="email" onChange={changeValue} value={infoUser.email} type="text" />
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp