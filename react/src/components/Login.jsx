import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const loginUser = async () => {
        await axios
            .post("http://localhost:8000/api/users/login",
                user,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
            .then((response) => {
                setUser({
                    email: '',
                    password: '',
                })
                navigate('/');
                return alert("Login successfully: " + `${JSON.stringify(response.data, null, 4)}`);
            })
            .catch((err) => {
                return alert(err);
            });
    }
    const onChangeForm = (e) => {
        if (e.target.name === 'email') {
            setUser({ ...user, email: e.target.value });
        } else if (e.target.name === 'password') {
            setUser({ ...user, password: e.target.value });
        }
    }
    return (
        <div>
            <h1>ログイン</h1>
            <form>
                <div>
                    <div>
                        <input
                            type="text"
                            value={user.email}
                            onChange={(e) => onChangeForm(e)}
                            name="email"
                            id="email"
                            placeholder="メールアドレス"
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <input
                            type="password"
                            value={user.password}
                            onChange={(e) => onChangeForm(e)}
                            name="password" id="password"
                            placeholder="パスワード"
                        />
                    </div>
                </div>
                <button type="button" onClick={() => loginUser()}>ログイン</button>
            </form>
        </div>
    );
};

export default Login;