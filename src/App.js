import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";
import ComingSoon from "./pages/ComingSoon";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* PROTECTED + LAYOUT */}
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<MainLayout />}>
              {/* ✅ DASHBOARD INSIDE LAYOUT */}
              <Route index element={<Dashboard />} />
               {/* SIDEBAR PAGES */}
              <Route path="employees" element={<ComingSoon />} />
              <Route path="attendance" element={<ComingSoon />} />
              <Route path="payroll" element={<ComingSoon />} />
              <Route path="departments" element={<ComingSoon />} />
              <Route path="projects" element={<ComingSoon />} />
              <Route path="reports" element={<ComingSoon />} />
              <Route path="settings" element={<ComingSoon />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
