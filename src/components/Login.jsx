import { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../api/axios";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom"; 
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
 const navigate = useNavigate(); 
  const loginUser = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/user/login", { email, password });
    console.log(res.data);

    dispatch(
      loginSuccess({
        token: res.data.token,
        user: res.data.user,
      })
    );
    navigate("/profile")
  } catch (err) {
    console.log(err.response.data);
    alert(err.response.data.message);
  }
};

  return (
    <form onSubmit={loginUser}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
}

export default Login;
