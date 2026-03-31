import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await api.post("/api/auth/login", { email, password });
      const token = res.data.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };
  return (
    <div
      style={{
        padding: "50px",
        maxWidth: "400px",
        margin: "auto",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          console.log(password);
        }}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <button style={{ width: "100%" }} onClick={handleLogin}>
        {" "}
        Login
      </button>
    </div>
  );
}

export default Login;
