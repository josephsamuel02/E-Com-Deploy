// import { Link } from "react-router-dom";

import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { RegisterUser } from "../store/actions/User";
const Register = () => {
    const RegisterUserState = useSelector((state) => state.RegisterUser);
    const USER = useSelector((state) => state.LogIn);
    const dispatch = useDispatch();

    const [invUser, setInvUser] = useState(false);

    const [pass, setConfirmpass] = useState();
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .max(15, "name cannot exceed 25 characters")
                .required("required"),
            email: Yup.string().min(10, "check email ").required("required"),
            phone: Yup.string()
                .max(12, "phone cannot exceed 12 characters")
                .required("required"),
            password: Yup.string()
                .min(8, "password cannot be less than 10 characters")
                .required("required"),
        }),

        onSubmit: (formik) => {
            const newUser = {
                username: formik.name,
                email: formik.email,
                phone: formik.phone,
                password: formik.password,
            };
            if (pass === formik.password) {
                dispatch(RegisterUser(newUser));

                if ((USER.status = 500)) {
                    setTimeout(() => {
                        setInvUser(true);
                        console.log(USER.status);
                    }, 500);
                } else {
                    setTimeout(() => {
                        window.location.href = "/login";
                        console.log("Processing");
                    }, 500);
                }
            }
        },
    });

    return (
        <div>
            <br /> <br />
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    id="name"
                    placeholder="Name"
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
                    placeholder="Email"
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
                    placeholder="phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone ? (
                    <p>{formik.errors.phone}</p>
                ) : null}
                <br /> <br />
                <input
                    type="text"
                    id="password"
                    placeholder="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                    <p>{formik.errors.password}</p>
                ) : null}
                <br /> <br />
                <input
                    type="text"
                    id="confirmpassword"
                    placeholder="confirm password"
                    onChange={(e) => setConfirmpass(e.target.value)}
                />
                <br /> <br />
                <input type="submit" value="Save" id="btn" />
                <br /> <br />
            </form>
            {RegisterUserState === "user already exist, use another info" && (
                <h5>User already exist</h5>
            )}
            {invUser && <p>usernam , email or phone number is in use </p>}
            {invUser && (
                <Link to={"/login"}>
                    <button> Login </button>
                </Link>
            )}
        </div>
    );
};

export default Register;
