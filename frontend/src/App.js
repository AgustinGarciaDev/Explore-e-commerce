import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './Style/Home.css'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { connect } from 'react-redux'
import userActions from "./redux/actions/userActions"

import { ToastContainer } from 'react-toastify';

const App = (props) => {
  if(props.usuarioStatus){
    var routes =
    <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
    </Switch>
    </>
  }else if(localStorage.getItem('token')){
    props.relogin(localStorage.getItem('token'))      
    return null
  }else {
    var routes=
    <>
     <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
    </Switch>
    </>
  }

  return (
    <BrowserRouter>
      <Switch>
       {routes}
      </Switch>
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

const mapStateToProps = state =>{
  return {
    usuarioStatus: state.user.usuarioStatus 
  }
}

const mapDispatchToProps = {
  relogin: userActions.relogin
 
}

export default connect(mapStateToProps, mapDispatchToProps)(App);