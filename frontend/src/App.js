import io from 'socket.io-client'
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style/Home.css'
import './Style/SignIn.css'
import './Style/SignUp.css'
import "./Style/munoz.css"
import './Style/admin.css'
import './Style/header.css'
import './Style/Footer.css'
import './Style/sexToyCategory.css'
import './Style/accesories.css'
import "./Style/cart.css"
import './Style/paymentSucessFull.css'
import 'react-credit-cards/es/styles-compiled.css';
import "./Style/CreditCard.css"
import './Style/listProduct.css'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import getRoutesByRole from './helpers/rutes'
import cartActions from "./redux/actions/cartActions";
import userActions from "./redux/actions/userActions"



const App = (props) => {


  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io('https://explore-2021.herokuapp.com'))
    if (localStorage.getItem("cart")) {
      const response = JSON.parse(localStorage.getItem("cart"))
      props.localStorage(response)
    }
    if (localStorage.getItem("num")) {
      const response = JSON.parse(localStorage.getItem("num"))
      props.localStorageNum(response)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!props.usuarioStatus && localStorage.getItem('token')) {
    const userData = JSON.parse(localStorage.getItem('userLogged'))
    const userLoggedForzed = {
      token: localStorage.getItem('token'),
      ...userData
    }
    props.relogin(userLoggedForzed)
  }

  let role = "notLogged"
  if (props.usuarioStatus) {
    if (props.usuarioStatus.admin) {
      role = "admin"
    } else {
      role = "common"
    }
  }

  return (
    <BrowserRouter>
      {getRoutesByRole(role, socket)}
      < ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>

  )
}

const mapStateToProps = state => {
  return {
    usuarioStatus: state.user.usuarioStatus
  }
}

const mapDispatchToProps = {
  relogin: userActions.relogin,
  localStorage: cartActions.localStorage,
  localStorageNum: cartActions.localStorageNum,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);