import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const handleRegister = async () => {
    try {
      setLoading(true);
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      //const user = res.data.user;
      alert("Registered successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white w-80 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">Sign up</h2>
        <input
          className="w-full p-2 mb-3 border rounded"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          className="w-full p-2 mb-3 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="w-full p-2 mb-3 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className={`w-full py-2 rounded-lg text-white transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={handleRegister}
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Signing up...
            </div>
          ) : (
            "Sign up"
          )}
        </button>
      </div>
    </div>
  );
}

export default Register;
