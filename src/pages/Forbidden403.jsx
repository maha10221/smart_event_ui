import { Link } from "react-router-dom";
import "../App.css";

const Forbidden403 = () => {
  return (
    <div className="error-page">
      <h1>403</h1>
      <h2>Access Denied</h2>
      <p>You are not authorized to access this page.</p>

      <Link to="http://localhost:3000/">
        <button className="error-btn">Go to Login</button>
      </Link>
    </div>
  );
};

export default Forbidden403;
