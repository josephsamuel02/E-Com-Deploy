import "./Cart.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePaystackPayment } from "react-paystack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VerifyPayment } from "../../store/actions/Paystack";
import { GetCart } from "../../store/actions/Cart";
import { SendOrder } from "../../store/actions/Order";
import CartItems from "./CartItems";
import OrderForm from "./OrderForm";

const GiftOrderForm = () => {
    const cartItems = useSelector((state) => state.GetCart);

    const cartSum = useSelector((state) => state.CartSumTotal[0]);
    const userId = useSelector((state) => state.LogIn._id);
    const userinfo = useSelector((state) => state.LogIn);

    const dispatch = useDispatch();

    const [cartSumStr, setCartSumStr] = useState();
    // const [accessKey, setAccessKey] = useState();

    useEffect(() => userId && dispatch(GetCart(userId)), [dispatch]);

    const settotal = () => {
        cartSum &&
            setTimeout(() => {
                cartSum && setCartSumStr(Number(cartSum.total));
            }, 5000);
    };
    settotal();
    // console.log(accessKey);
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            alternatePhone: "",
            deleveryAddress: "",
            publicKey: process.env.REACT_APP_PAYSTACK_PUB_KEY,
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .max(25, "name cannot exceed 25 characters")
                .required("required"),
            email: Yup.string().min(10, "check email ").required("required"),
            phone: Yup.string()
                .max(13, "phone cannot exceed 12 characters")
                .required("required"),
            alternatePhone: Yup.string().max(
                13,
                "phone cannot exceed 12 characters"
            ),
            deleveryAddress: Yup.string()
                .min(10, "address cannot be less than 10 characters")
                .required("required"),
        }),

        onSubmit: (formik) => {
            const thegiftConfig = {
                name: formik.name,
                reference: new Date().getTime().toString(),
                email: formik.email,
                phone: formik.phone,
                alternatePhone: formik.alternatePhone,
                amount: cartSumStr * 100,
                deleveryAddress: formik.deleveryAddress,
                publicKey: formik.publicKey,
            };
            setGiftconfig(thegiftConfig);

            initializeGiftPayment(onSuccess, onClose);
            setTimeout(() => {
                setDisplyConfirmPay(true);
            }, 4000);
        },
    });

    const [giftConfig, setGiftconfig] = useState("thegiftConfig");

    const onSuccess = (reference) => {
        dispatch(VerifyPayment(reference.reference));

        setTimeout(() => {
            dispatch(SendOrder(orderObject));
            window.location.replace("/orders");
        }, 500);
    };

    const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log("closed");
    };

    const initializeGiftPayment = usePaystackPayment(giftConfig);

    const orderObject = {
        userId: userinfo._id,
        username: userinfo.username,
        products: cartItems,
        amount: cartSumStr,
        receiversInfo: giftConfig,
    };
    const [displyConfirmPay, setDisplyConfirmPay] = useState(false);
    return (
        <div>
            <div className="OrdersFormBox">
                <form onSubmit={formik.handleSubmit}>
                    <br />
                    <input
                        type="text"
                        id="name"
                        placeholder="Beneficiary's Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <p>{formik.errors.name}</p>
                    ) : null}
                    <br /> <br />
                    <input
                        type="text"
                        id="email"
                        placeholder="Beneficiary's Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <p>{formik.errors.email}</p>
                    ) : null}
                    <br /> <br />
                    <input
                        type="number"
                        id="phone"
                        placeholder="Beneficiary's phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <p>{formik.errors.phone}</p>
                    ) : null}
                    <br /> <br />
                    <input
                        type="number"
                        id="alternatePhone"
                        placeholder="alternateive Phone Number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.alternatePhone}
                    />
                    {formik.touched.alternatePhone &&
                    formik.errors.alternatePhone ? (
                        <p>{formik.errors.alternatePhone}</p>
                    ) : null}
                    <br /> <br />
                    <input
                        type="text"
                        id="deleveryAddress"
                        placeholder="Beneficiary's Delevery Address"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.deleveryAddress}
                    />
                    {formik.touched.deleveryAddress &&
                    formik.errors.deleveryAddress ? (
                        <p>{formik.errors.deleveryAddress}</p>
                    ) : null}
                    <br /> <br />
                    <br /> <br />
                    <input type="submit" value="Send Gift" id="btn" />
                    <br /> <br />
                </form>
            </div>

            {displyConfirmPay && (
                <div className="confirmation">
                    <h1>Please confirm Giftingt to proceed</h1> <br />
                    <button
                        onClick={() => {
                            setDisplyConfirmPay(false);
                            initializeGiftPayment(onSuccess, onClose);
                        }}
                    >
                        Confirm
                    </button>
                    <br /> <br />
                    <button
                        onClick={() => {
                            setDisplyConfirmPay(false);
                        }}
                    >
                        Cancle
                    </button>
                </div>
            )}
        </div>
    );
};

export default GiftOrderForm;
