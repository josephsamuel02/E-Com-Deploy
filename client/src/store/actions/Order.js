import axios from "axios";
const apiBaseUrl = process.env.REACT_APP_API_URL;

const sendOrder = async (order) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/order`, order, {
            headers: {
                token: `Bearer ${
                    JSON.parse(
                        JSON.parse(localStorage.getItem("persist:root")).LogIn
                    ).accesstoken
                }`,
            },
        });

        return response.data;
    } catch (err) {
        throw err;
    }
};

export const SendOrder = (order) => ({
    type: "SEND_ORDER",
    payload: sendOrder(order),
});

//get user orders
const getOrders = async (userId) => {
    try {
        const response = await axios.get(
            `${apiBaseUrl}/order/${userId}`,

            {
                headers: {
                    token: `Bearer ${
                        JSON.parse(
                            JSON.parse(localStorage.getItem("persist:root"))
                                .LogIn
                        ).accesstoken
                    }`,
                },
            }
        );

        return response.data;
    } catch (err) {
        throw err;
    }
};

export const GetOrders = (userId) => ({
    type: "GET_ORDER",
    payload: getOrders(userId),
});
