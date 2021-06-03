import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Admin from '../pages/Admin'
import Product from "../pages/Product";
import NewProduct from "../pages/NewProduct";
import Products from "../pages/Products";
import ShoppingCart from "../pages/ShoppingCart";
import EditProducts from "../pages/EditProducts";
import SexToyCategory from "../pages/SexToyCategory";
import Accesories from "../pages/Accesories"
import Checkout from "../pages/Checkout"
import PaymentSuccesfull from "../pages/PaymentSuccesfull"
import ProductEdit from "../components/ProductEdit";
import { Route, Switch, Redirect } from "react-router-dom";

const routesProtected = {
    routerUserDontLogged: (socket) => {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/products" component={Products} />
                <Route exact path="/shoppingCart" component={ShoppingCart} />
                <Route exact path="/sextoy" component={SexToyCategory} />
                <Route exact path="/accesories" component={Accesories} />
                <Route exact path="/checkout" component={Checkout} />
                <Route exact path="/payment" component={PaymentSuccesfull} />
                <Route exact path="/product/:id" render={(props) => <Product {...props} socket={socket} />} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/signin" component={SignIn} />
                <Redirect to="/" />
            </Switch>
        )
    },
    routerUserLoggedCommon: (socket) => {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/products" component={Products} />
                <Route exact path="/shoppingCart" component={ShoppingCart} />
                <Route exact path="/sextoy" component={SexToyCategory} />
                <Route exact path="/accesories" component={Accesories} />
                <Route exact path="/checkout" component={Checkout} />
                <Route exact path="/payment" component={PaymentSuccesfull} />
                <Route exact path="/product/:id" render={(props) => <Product {...props} socket={socket} />} />
                <Redirect to="/" />
            </Switch>
        )
    },

    routerUserLoggedAdmin: (socket) => {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/products" component={Products} />
                <Route exact path="/shoppingCart" component={ShoppingCart} />
                <Route exact path="/sextoy" component={SexToyCategory} />
                <Route exact path="/accesories" component={Accesories} />
                <Route exact path="/checkout" component={Checkout} />
                <Route exact path="/payment" component={PaymentSuccesfull} />
                <Route exact path="/product/:id" render={(props) => <Product {...props} socket={socket} />} />
                <Route exact path="/Admin" component={Admin} />
                <Route exact path="/add-new-product" component={NewProduct} />
                <Route exact path="/edit-products" component={EditProducts} />
                <Route exact path="/edit/prodcut/:_id" component={ProductEdit} />
                <Redirect to="/" />
            </Switch>
        )
    }
}

const getRoutesByRole = (role,socket) => {
    if (role === "notLogged")
        return routesProtected.routerUserDontLogged(socket);
    if (role === "common")
        return routesProtected.routerUserLoggedCommon(socket);
    if (role === "admin")
        return routesProtected.routerUserLoggedAdmin(socket);
}


export default getRoutesByRole;
