import "./Cart.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCart } from "../../store/actions/Cart";
import CartItems from "./CartItems";
import OrderForm from "./OrderForm";
import GiftOrderForm from "./GiftOrderForm";
const Cart = () => {
    const userId = useSelector((state) => state.LogIn._id);

    const dispatch = useDispatch();

    const [displayOrder, setDisplayOrder] = useState(false);
    const [displayOrderForm, setDisplayOrderForm] = useState(false);
    const [giftcartForm, setGiftcartForm] = useState(false);

    useEffect(() => userId && dispatch(GetCart(userId)), [dispatch]);

    return (
        <div id="cartpage">
            <CartItems />
            <button
                onClick={() => {
                    setDisplayOrder(true);
                }}
            >
                Continue to Place Order
            </button>
            <br /> <br />
            {displayOrder && (
                <div>
                    <button
                        onClick={() => {
                            setDisplayOrderForm(true);
                            setGiftcartForm(false);
                        }}
                    >
                        Place Order
                    </button>

                    <button
                        onClick={() => {
                            setGiftcartForm(true);
                            setDisplayOrderForm(false);
                        }}
                    >
                        Gift this cart to someone
                    </button>

                    {displayOrderForm && <OrderForm />}
                    {giftcartForm && <GiftOrderForm />}
                </div>
            )}
            <Link to={"/orders"}>
                <button> View All orders </button>
            </Link>
        </div>
    );
};

export default Cart;
