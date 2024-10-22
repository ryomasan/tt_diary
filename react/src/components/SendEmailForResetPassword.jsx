import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SendEmailForResetPassword = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    user_type: ''
  })

  const sendPasswordResetMail = async () => {
    await axios
      .post("http://localhost:8000/api/users/send-reset-password-mail",
        user,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
      .then((response) => {
        setUser({
          name: '',
          email: '',
          password: '',
          user_type: ''
        })
        navigate('/email-verification');
        return alert("User Created: " + `${JSON.stringify(response.data, null, 4)}`);
      })
      .catch((err) => {
        return alert(err);
      });
  }
  const onChangeForm = (e) => {
    if (e.target.name === 'email') {
      setUser({ ...user, email: e.target.value });
    }
  }

  return (
    <div>
      <h1>パスワード再設定メールを送信</h1>
      <form>
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
        <button type="button" onClick={() => sendPasswordResetMail()}>送信</button>
      </form>
      <div><a href="#">ログインページに戻る</a></div>

    </div>
  )
}

export default SendEmailForResetPassword