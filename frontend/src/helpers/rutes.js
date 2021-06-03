import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import User from '../pages/User'
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
    routerUserDontLogged: () => {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/products" component={Products} />
                <Route exact path="/shoppingCart" component={ShoppingCart} />
                <Route exact path="/sextoy" component={SexToyCategory} />
                <Route exact path="/accesories" component={Accesories} />
                <Route exact path="/checkout" component={Checkout} />
                <Route exact path="/payment" component={PaymentSuccesfull} />
                <Route exact path="/product/:id" component={Product} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/signin" component={SignIn} />
                <Redirect to="/" />
            </Switch>
        )
    },
    routerUserLoggedCommon: () => {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/products" component={Products} />
                <Route exact path="/shoppingCart" component={ShoppingCart} />
                <Route exact path="/sextoy" component={SexToyCategory} />
                <Route exact path="/accesories" component={Accesories} />
                <Route exact path="/checkout" component={Checkout} />
                <Route exact path="/payment" component={PaymentSuccesfull} />
                <Route exact path="/product/:id" component={Product} />
                <Redirect to="/" />
            </Switch>
        )
    },

    routerUserLoggedAdmin: () => {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/products" component={Products} />
                <Route exact path="/shoppingCart" component={ShoppingCart} />
                <Route exact path="/sextoy" component={SexToyCategory} />
                <Route exact path="/accesories" component={Accesories} />
                <Route exact path="/checkout" component={Checkout} />
                <Route exact path="/payment" component={PaymentSuccesfull} />
                <Route exact path="/product/:id" component={Product} />
                <Route exact path="/Admin" component={Admin} />
                <Route exact path="/add-new-product" component={NewProduct} />
                <Route exact path="/edit-products" component={EditProducts} />
                <Route exact path="/edit/prodcut/:_id" component={ProductEdit} />
                <Redirect to="/" />
            </Switch>
        )
    }
}

const getRoutesByRole = (role) => {
    if (role === "notLogged")
        return routesProtected.routerUserDontLogged();
    if (role === "common")
        return routesProtected.routerUserLoggedCommon();
    if (role === "admin")
        return routesProtected.routerUserLoggedAdmin();
}


export default getRoutesByRole;
