import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style/Home.css'
import './Style/admin.css'
import './Style/header.css'
import './Style/Footer.css'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Admin from './pages/Admin'
import { connect } from 'react-redux'
import userActions from "./redux/actions/userActions"

import { ToastContainer } from 'react-toastify';
import Product from "./pages/Product";
import NewProduct from "./pages/NewProduct";
import Products from "./pages/Products";
import ShoppingCart from "./pages/ShoppingCart";
import EditProducts from "./pages/EditProducts";

const App = (props) => {
  if (props.usuarioStatus) {
    var routes =
      <>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/shoppingCart" component={ShoppingCart} />
        </Switch>
      </>
  } else if (localStorage.getItem('token')) {
    props.relogin(localStorage.getItem('token'))
    return null
  } else {
    var routes =
      <>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/Admin" component={Admin} />
          <Route exact path="/add-new-product" component={NewProduct} />
          <Route exact path="/edit-products" component={EditProducts} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/shoppingCart" component={ShoppingCart} />
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

const mapStateToProps = state => {
  return {
    usuarioStatus: state.user.usuarioStatus
  }
}

const mapDispatchToProps = {
  relogin: userActions.relogin

}

export default connect(mapStateToProps, mapDispatchToProps)(App);