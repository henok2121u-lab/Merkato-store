import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password);

    if (email === "admin@kemerkato.com") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A192F] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[#112240] p-8 rounded-xl w-full max-w-md"
      >
        <h1 className="text-3xl text-yellow-400 mb-6">
          Sign In
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded bg-[#0A192F]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded bg-[#0A192F]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-yellow-500 text-black py-3 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}