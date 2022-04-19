import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogIn } from "../store/actions/User";

const Login = () => {
    const USER = useSelector((state) => state.LogIn);
    const dispatch = useDispatch();

    const [user, setUser] = useState();
    const [password, setPassword] = useState();
    const [invUser, setInvUser] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userInfo = {
            user,
            password,
        };
        // let expDate = ;

        localStorage.setItem(
            "iROkloginExp",
            new Date().setMinutes(new Date().getMinutes() + 7200)
        );
        dispatch(LogIn(userInfo));

        if (USER.message) {
            setTimeout(() => {
                setInvUser(true);
            }, 500);
        } else {
            setTimeout(() => {
                console.log("Processing");
            }, 500);
        }
    };
    return (
        <div>
            <br /> <br /> <br />
            <form>
                <input
                    type="text"
                    placeholder="e-mail or phone"
                    onChange={(e) => setUser(e.target.value)}
                />
                <br /> <br />
                <input
                    // type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {invUser && <p>incorrect username or password</p>}
                <br /> <br />
                <button type="submit" onClick={handleSubmit}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
