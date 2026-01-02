import { useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/login", { email, password });
      login(res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

// import { useState, useContext } from "react";
// import api from "../api/api";
// import { AuthContext } from "../auth/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     localStorage.removeItem("token"); // 🧹 clear stale token

//     try {
//       const res = await api.post("/admin/login", {
//         email: email.trim(),
//         password: password.trim(),
//       });

//       login(res.data.token);
//       navigate("/dashboard");

//     } catch (err) {
//       console.error(err);
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2>Admin Login</h2>

//         {error && <p style={{ color: "red" }}>{error}</p>}

//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
