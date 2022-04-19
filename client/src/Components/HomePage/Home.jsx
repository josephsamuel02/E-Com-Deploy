import "./Home.css";

import Categories from "./Categories.jsx";
import HomePageProducts from "./HomePageProducts";
const Home = () => {
    let dateNow = new Date().getTime();
    let LoginDate = Number(localStorage.getItem("iROkloginExp"));
    if (!LoginDate) {
        console.log("process");
    } else if (LoginDate < dateNow) {
        localStorage.removeItem("iROkloginExp");
        localStorage.removeItem("persist:root");
        window.location.replace("/login");
    } else {
        console.log("process");
    }

    return (
        <div className="home">
            <div className="ctegorylist">
                <span>Find by: </span>

                <select name="filter" id="category" defaultValue={"categories"}>
                    <option disabled>categories</option>
                    <option value="foodStuffs">Food Ftuffs </option>
                    <option value="vegitsblesandspices">
                        Vegitsbles and Spices
                    </option>
                    <option value="packaged foods">Groceries</option>
                    <option value="baked foods">Baked Foods</option>
                    <option value="Accessories">Computers </option>
                    <option value="oldest">Accessories</option>
                    <option value="Wears">Wears</option>
                    <option value="pets">Pets</option>
                </select>
            </div>
            <Categories />
            <HomePageProducts />
        </div>
    );
};

export default Home;
