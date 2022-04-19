import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetOrders } from "../store/actions/Order";
const Orderspage = () => {
    const userId = useSelector((state) => state.LogIn._id);
    const Orders = useSelector((state) => state.GetOrders);
    const dispatch = useDispatch();
    useEffect(() => dispatch(GetOrders(userId)), [dispatch]);
    // useEffect(() => userId && dispatch(GetCart(userId)), [dispatch]);

    return (
        <div>
            <br /> <br /> <br />
            <div>
                {Orders &&
                    Orders.map((item) => (
                        <div key={item._id}>
                            <div>
                                {item.products.map((i) => (
                                    <h3 key={i._id}>
                                        {/* <img src={i.image} image alt="" /> */}
                                        <p>{i.title}</p>
                                        <p>price: NGN {i.price}</p>
                                        <p>{i.quantity}</p>
                                    </h3>
                                ))}
                            </div>
                            <p>Total: NGN {item.amount}</p>
                            <p>{item.createdAt}</p>
                            <h3>Delevery information</h3>
                            <p>{item.receiversInfo.name}</p>
                            <p>{item.receiversInfo.deleveryAddress}</p>
                            <p>{item.receiversInfo.phone}</p>
                            <p>{item.receiversInfo.email}</p>
                            <hr />
                        </div>
                    ))}
            </div>
            <Link to={"/cart"}>
                <button>Go to Cart</button>
            </Link>
        </div>
    );
};

export default Orderspage;
