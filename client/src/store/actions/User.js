import axios from "axios";
const apiBaseUrl = process.env.REACT_APP_API_URL;

// GET CART SUMTOTAL
// export const token = `Bearer ${
//     JSON.parse(JSON.parse(localStorage.getItem("persist:root")).LogIn)
//         .accesstoken
// }`;

export const userId = "Guest";

const login = async (userin) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/auth/login`, userin);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const LogIn = (userin) => ({
    type: "GET_USER",
    payload: login(userin),
});

const register = async (user) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/auth/register`, user);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const RegisterUser = (user) => ({
    type: "REGISTER_USER",
    payload: register(user),
});
