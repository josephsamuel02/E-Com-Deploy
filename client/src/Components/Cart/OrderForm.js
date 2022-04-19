import "./Cart.css";

import { usePaystackPayment } from "react-paystack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VerifyPayment } from "../../store/actions/Paystack";
import { GetCart } from "../../store/actions/Cart";
import { SendOrder } from "../../store/actions/Order";

const OrderForm = () => {
    const cartItems = useSelector((state) => state.GetCart);

    const cartSum = useSelector((state) => state.CartSumTotal[0].total);
    const userId = useSelector((state) => state.LogIn._id);
    const userinfo = useSelector((state) => state.LogIn);

    const dispatch = useDispatch();

    const [cartSumStr, setCartSumStr] = useState();

    useEffect(() => userId && dispatch(GetCart(userId)), [dispatch]);

    const [delvAdd, setDelvAdd] = useState();

    const settotal = () => {
        cartSum &&
            setTimeout(() => {
                cartSum && setCartSumStr(Number(cartSum));
            }, 5000);
    };
    settotal();

    const config = {
        name: userinfo.username,
        reference: new Date().getTime().toString(),
        email: userinfo.email,
        phone: userinfo.phone,
        amount: cartSum * 100,
        deleveryAddress: delvAdd,
        publicKey: process.env.REACT_APP_PAYSTACK_PUB_KEY,
    };
    // const [orderdelvAdd, setOrderdelvAdd] = useState(config);

    const onSuccess = (reference) => {
        dispatch(VerifyPayment(reference.reference));
        setTimeout(() => {
            dispatch(SendOrder(orderObject));
        }, 500);
        setTimeout(() => {
            window.location.replace("/orders");
        }, 1000);
    };

    const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log("closed");
    };

    const initializePayment = usePaystackPayment(config);

    const orderObject = {
        userId: userinfo._id,
        username: userinfo.username,
        products: cartItems,
        amount: cartSumStr,
        receiversInfo: config,
    };

    return (
        <div>
            <div>
                <ul>
                    <li> {userinfo.username} </li>
                    <li>Email Address: {userinfo.email}</li>
                    <li>Phone: {userinfo.phone}</li>
                    {cartSum && <li>Total: NGN {cartSum}</li>}

                    <p>Delevery adress</p>
                    <input
                        required
                        type="text"
                        id="first-name"
                        onChange={(e) => setDelvAdd(e.target.value)}
                    />
                    <br />
                    {delvAdd ? (
                        <button
                            onClick={() => {
                                // setCartSumStr(Number(cartSum));
                                setTimeout(() => {
                                    initializePayment(onSuccess, onClose);
                                }, 2000);
                            }}
                        >
                            make payment
                        </button>
                    ) : (
                        <button disabled>make payment</button>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default OrderForm;
