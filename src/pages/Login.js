import { useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  /* =========================
     HANDLE LOGIN
  ========================== */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/admin/login", {
        email,
        password,
      });

      const token = res.data.token || res.data.jwt;

      if (!token) {
        throw new Error("Token not received from backend");
      }

      // Save token
      login(token);

      // Redirect
      navigate("/home", { replace: true });

    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Login</h2>
        <p className="login-sub">
          Sign in to access the admin dashboard
        </p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* ✅ BOOTSTRAP SPINNER BUTTON */}
          <button
            type="submit"
            className="btn btn-primary w-100 mt-3"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
