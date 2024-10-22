// Logout.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                await axios.post("http://localhost:8000/api/users/logout"); // サーバー側でクッキー無効化などの処理
                document.cookie = "jwt=; Max-Age=0"; // クライアント側でクッキー削除
                navigate("/login"); // ログイン画面にリダイレクト
            } catch (error) {
                console.error("Logout failed", error);
            }
        };
        logoutUser();
    }, [navigate]);

    return <p>Logging out...</p>;
}

export default Logout