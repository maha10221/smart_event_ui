import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

import "./MainLayout.css" // 👈 IMPORTANT

const MainLayout = () => {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="page-content">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
