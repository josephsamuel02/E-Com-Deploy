import axios from "axios";
const apiBaseUrl = process.env.REACT_APP_API_URL;

const products = async (prevstate, page = 1, limit, category, filterdObj) => {
    try {
        const response = await axios.get(
            `${apiBaseUrl}/products?page=${page}&limit=${limit}&category=${category}&sort=${filterdObj}`
        );
        return {
            products: prevstate.products
                ? [...prevstate.products, ...response.data]
                : response.data,
            page: page,
            limit: limit,
            category: category,
            filterdObj: filterdObj,
            end: response.data.length === 0 ? true : false,
        };
    } catch (err) {
        throw err;
    }
};

export const Products = (
    prevstate,
    page,
    limit,
    category,
    filterdObj,
    end
) => ({
    type: "PRODUCS_LIST",

    payload: products(prevstate, page, limit, category, filterdObj, end),

    // payload: productsItem,
});