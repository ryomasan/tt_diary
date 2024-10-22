import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">投稿一覧</Link>
          </li>
          <li>
            <Link to="/post">新規登録</Link>
          </li>
          <li>
            <Link to="/get">登録済みユーザー</Link>
          </li>
          <li>
            <Link to="/login">ログイン</Link>
          </li>
          <li>
            <Link to="/reset-password">パスワード再設定</Link>
          </li>
          <li>
            <Link to="/password-reset-mail">パスワードをお忘れですか？</Link>
          </li>
          <li>
            <Link to="/logout">ログアウト</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
};
export default Layout;