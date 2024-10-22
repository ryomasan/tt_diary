import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    user_type: ''
  })
  const createUser = async () => {
    await axios
      .post("http://localhost:8000/api/users/register",
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
    if (e.target.name === 'name') {
      setUser({ ...user, name: e.target.value });
    } else if (e.target.name === 'email') {
      setUser({ ...user, email: e.target.value });
    } else if (e.target.name === 'password') {
      setUser({ ...user, password: e.target.value });
    } else if (e.target.name === 'password_confirmation') {
      setUser({ ...user, password_confirmation: e.target.value });
    }
    else if (e.target.name === 'user_type') {
      setUser({ ...user, user_type: e.target.value });
    }
  }
  return (
    <div>
      <h1>アカウント作成</h1>
      <form>
        <div>
          <div>
            <input
              type="text"
              value={user.name}
              onChange={(e) => onChangeForm(e)}
              name="name"
              id="name"
              placeholder="ユーザー名"
            />
          </div>
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
        <div>
          <label htmlFor="exampleInputPassword">User type</label>
          <input type="radio" id="player" name="user_type" value="1" onChange={(e) => onChangeForm(e)} checked={user.user_type === "1"} />
          <label htmlFor="player">選手</label>
          <input type="radio" id="coach" name="user_type" value="2" onChange={(e) => onChangeForm(e)} checked={user.user_type === "2"} />
          <label htmlFor="coach">監督</label>
        </div>
        <button type="button" onClick={() => createUser()}>作成</button>
      </form>
    </div>
  );
};

export default Signup;