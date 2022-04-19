import "./CategoryList.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { Products } from "../../store/actions/Procucts";

import { useDispatch, useSelector } from "react-redux";

import { AddToCart, GetCart } from "../../store/actions/Cart";

const CategoryList = () => {
    const theProducts = useSelector((state) => state.Products.products);
    const userId = useSelector((state) => state.LogIn._id);
    const dispatch = useDispatch();

    const search = useLocation().search;
    const category = new URLSearchParams(search).get("category");

    //GET MORE PRODUCTS PROFILES
    // const getmore = () => {
    //     let page = theProducts.page + 1;

    //     dispatch(Products(theProducts, page, 4, category));
    // };

    const [filterdObj, setFilterdObj] = useState("newest");
    const handleFilter = (e) => {
        setFilterdObj(e.target.value);
    };

    const [quantity, setQuantity] = useState(1);

    const handlechange = (e) => {
        const q = e.target.value;
        setQuantity(q);
    };

    const addtocart = (productId, title, image, price, quantity) => {
        const prod = {
            userId: userId,
            productId: productId,
            title: title,
            image: image,
            price: price,
            quantity: quantity,
        };
        dispatch(AddToCart(prod));
        setTimeout(() => userId && dispatch(GetCart(userId)), 500);
    };

    useEffect(() => {
        dispatch(Products({}, 1, 4, category, filterdObj));
        userId && dispatch(GetCart(userId));
    }, [dispatch, category, filterdObj]);

    return (
        <div className=" CategoryList">
            <h3>{category}</h3>

            <div className="filterBox">
                <h4>Sort Products:</h4>

                <select
                    name="filter"
                    defaultValue={"options"}
                    id="filter"
                    onChange={handleFilter}
                >
                    <option disabled>options</option>
                    <option value="newest">newest</option>
                    <option value="oldest">oldest</option>
                    <option value="lowestPrice">lowest Price</option>
                    <option value="highestPrice">highest Price</option>
                </select>
            </div>

            <div className="CstegoryBox">
                {theProducts
                    ? theProducts.map((item) => (
                          <div
                              className=" CstegoryCard"
                              key={item._id}
                              //   onMouseOver={() => setShowActions(true)}
                              //   onMouseLeave={() => setShowActions(false)}
                          >
                              <Link to={`/product/${item._id}`}>
                                  <img src={item.image} alt="laptop" />
                                  <div className="Details">
                                      <h2>{item.title}</h2>
                                      <p> {item.price}</p>
                                      <p>{item.category}</p>
                                  </div>
                              </Link>
                              {userId && (
                                  <div className="actions">
                                      <h3 className="quantity">
                                          <select
                                              defaultValue={item.quantity}
                                              onChange={(e) => handlechange(e)}
                                          >
                                              <option value={1}>1 </option>
                                              <option value={2}>2</option>
                                              <option value={3}>3</option>
                                              <option value={4}>4</option>
                                              <option value={5}>5</option>
                                              <option value={6}>6</option>
                                              <option value={7}>7</option>
                                              <option value={8}>8</option>
                                              <option value={9}>9</option>
                                              <option value={10}>10</option>
                                              <option value={11}>11</option>
                                              <option value={12}>12</option>
                                              <option value={13}>13</option>
                                              <option value={14}>14</option>
                                              <option value={15}>15</option>
                                              <option value={16}>16</option>
                                              <option value={17}>17</option>
                                              <option value={18}>18</option>
                                              <option value={19}>19</option>
                                              <option value={20}>20</option>
                                          </select>
                                      </h3>

                                      <button
                                          onClick={() => {
                                              addtocart(
                                                  item._id,
                                                  item.title,
                                                  item.image,
                                                  item.price,
                                                  quantity
                                              );

                                              setQuantity(1);
                                          }}
                                      >
                                          Add to cart
                                      </button>
                                  </div>
                              )}
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
};

export default CategoryList;
