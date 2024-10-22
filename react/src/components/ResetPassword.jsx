import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        password: '',
        // password_confirmation: '',
    })

    const sendResetPassword = async () => {
        await axios
            .post("http://localhost:8000/api/users/reset-password",
                user,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
            .then((response) => {
                setUser({
                    password: ''
                })
                navigate('/login');
                return alert("User Created: " + `${JSON.stringify(response.data, null, 4)}`);
            })
            .catch((err) => {
                return alert(err);
            });
    }
    const onChangeForm = (e) => {
        if (e.target.name === 'password') {
            setUser({ ...user, password: e.target.value });
        } else if (e.target.name === 'password_confirmation') {
            setUser({ ...user, password_confirmation: e.target.value });
        }
    }

    return (
        <div>
            <h1>パスワード再設定</h1>
            <form>
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
                <div>
                    <div>
                        <input
                            type="password"
                            value={user.password_confirmation}
                            onChange={(e) => onChangeForm(e)}
                            name="password_confirmation" id="password_confirmation"
                            placeholder="確認用パスワード"
                        />
                    </div>
                </div>
                <button type="button" onClick={() => sendResetPassword()}>送信</button>
            </form>
            <div><a href="#">ログインページに戻る</a></div>

        </div>
    )
}

export default ResetPassword