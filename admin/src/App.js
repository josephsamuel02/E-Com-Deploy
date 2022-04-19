import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import { useSelector } from "react-redux";

import Nav from "./components/Nav/Nav";
import HomePage from "./components/Home/HomePage";
// import User from "./components/Users/User";
import UsersList from "./components/Users/UsersList";
import Login from "./components/Login/Login";
import SingleOrder from "./components/Orders/SingleOrder";
import OrdersList from "./components/Orders/OrdersList";
import Products from "./components/Products/Products";
import ProductsList from "./components/Products/ProductsList";
import SingleProduct from "./components/Products/SingleProduct";
import Analytics from "./components/Analytics/Analytics";
import Shops from "./components/Shops/Shops";
const App = () => {
    const theuser = useSelector((state) => state.LogIn.username);

    return (
        <div className="App">
            <Router>
                <Nav />

                <br />
                <br />

                <Routes>
                    <Route
                        path="/"
                        element={
                            !theuser ? (
                                <Navigate replace to="/login" />
                            ) : (
                                <HomePage />
                            )
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            theuser ? <Navigate replace to="/" /> : <Login />
                        }
                    />

                    <Route
                        path="/analytics"
                        element={
                            !theuser ? (
                                <Navigate replace to="/login" />
                            ) : (
                                <Analytics />
                            )
                        }
                    />

                    <Route
                        path="/orders"
                        element={
                            !theuser ? (
                                <Navigate replace to="/login" />
                            ) : (
                                <OrdersList />
                            )
                        }
                    />

                    <Route
                        path="/order"
                        element={
                            !theuser ? (
                                <Navigate replace to="/login" />
                            ) : (
                                <SingleOrder />
                            )
                        }
                    />

                    <Route
                        path="/products"
                        element={
                            !theuser ? (
                                <Navigate replace to="/login" />
                            ) : (
                                <Products />
                            )
                        }
                    />

                    <Route
                        path="/productslist"
                        element={
                            !theuser ? (
                                <Navigate replace to="/login" />
                            ) : (
                                <ProductsList />
                            )
                        }
                    />

                    <Route
                        path="/product"
                        element={
                            !theuser ? (
                                <Navigate replace to="/login" />
                            ) : (
                                <SingleProduct />
                            )
                        }
                    />

                    <Route
                        path="/userslist"
                        element={
                            !theuser ? (
                                <Navigate replace to="/login" />
                            ) : (
                                <UsersList />
                            )
                        }
                    />

                    <Route
                        path="/shops"
                        element={
                            !theuser ? (
                                <Navigate replace to="/login" />
                            ) : (
                                <Shops />
                            )
                        }
                    />

                    {/* <Route path="/user" element={<User />} />*/}
                </Routes>
            </Router>
        </div>
    );
};

export default App;
