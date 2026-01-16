import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";
import ComingSoon from "./pages/ComingSoon";
import Login from "./pages/Login";
import Dashboard from "./components/dashboard/Dashboard";
import MainLayout from "./layout/MainLayout";
import Attendance from "./components/attendance/Attendance";
import Documents from "./components/documents/Documents";
import Payroll from "./components/payroll/Payroll";

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
              <Route path="documents" element={<Documents />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="payroll" element={<Payroll />} />
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
