import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogIn } from "../../store/actions/User";

const Login = () => {
    // const USER = useSelector((state) => state.LogIn);
    const dispatch = useDispatch();

    const [user, setUser] = useState();
    const [password, setPassword] = useState();
    const [invUser, setInvUser] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userInfo = {
            user,
            password,
        };
        // let expDate = ;

        dispatch(LogIn(userInfo));
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
                    type="password"
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
