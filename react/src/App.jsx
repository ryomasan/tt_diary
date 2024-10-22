import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import GetAllUser from "./components/GetAllUser";
import Logout from "./components/Logout";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="post" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="get" element={<GetAllUser />} />
        <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);