import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './Style/Home.css'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

import { ToastContainer } from 'react-toastify';
import Product from "./pages/Product";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/product" component={Product} />
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
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

export default App