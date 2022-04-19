import "./Nav.css";
import { MdShoppingCart } from "react-icons/md";
import { useEffect } from "react";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GetCart } from "../../store/actions/Cart";
const Nav = () => {
    const theCount = useSelector((state) => state.GetCart.length);
    const changeAlart = useSelector((state) => state.AddToCart);
    const userId = useSelector((state) => state.LogIn._id);

    const dispatch = useDispatch();

    useEffect(() => userId && dispatch(GetCart(userId)), [dispatch]);

    const logUserOut = () => {
        localStorage.removeItem("persist:root");
        window.location.replace("/login");
    };

    return (
        <div className="nav">
            <IconContext.Provider
                value={{
                    color: "dodgerblue",
                    size: "20px",
                }}
            >
                <Link to="/">
                    <div className="header">AMROK</div>
                </Link>

                <div className="search">
                    <input type="text" className="searchInput" />

                    <input type="button" value="search" className="searchBtn" />
                </div>

                <div id="logANDregisterBTN">
                    {!userId && (
                        <Link to="/login">
                            <button id="login" className="userbtn">
                                Login
                            </button>
                        </Link>
                    )}
                    {!userId && (
                        <Link to="/register">
                            <button id="register" className="userbtn">
                                Register
                            </button>
                        </Link>
                    )}
                    {userId && (
                        <button
                            id="logOut"
                            className="userbtn"
                            onClick={() => logUserOut()}
                        >
                            LoggOut
                        </button>
                    )}
                </div>

                {userId && (
                    <Link to="/cart">
                        <h1 id="CartIcon">
                            <MdShoppingCart />
                            {theCount
                                ? theCount > 0 && <span>{theCount}</span>
                                : null}
                        </h1>
                    </Link>
                )}
            </IconContext.Provider>
        </div>
    );
};

export default Nav;
