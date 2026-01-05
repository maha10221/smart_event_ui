import { useState } from "react";

const Sidebar = () => {
  const [message, setMessage] = useState("");

  const comingSoon = () => {
    setMessage("🚧 Coming Soon...");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <aside className="sidebar">
      {/* TOP SECTION */}
      <div>
        <div className="sidebar-title">Admin Panel</div>

        {/* COMING SOON MESSAGE */}
        {message && (
          <div className="coming-soon-msg">
            {message}
          </div>
        )}

        <ul className="sidebar-menu">
          <li className="active">
            <i className="bi bi-speedometer2 menu-icon"></i>
            <span>Dashboard</span>
          </li>

          <li onClick={comingSoon}>
            <i className="bi bi-people menu-icon"></i>
            <span>Employees</span>
          </li>

          <li onClick={comingSoon}>
            <i className="bi bi-clock-history menu-icon"></i>
            <span>Attendance</span>
          </li>

          <li onClick={comingSoon}>
            <i className="bi bi-cash-stack menu-icon"></i>
            <span>Payroll</span>
          </li>

          <li onClick={comingSoon}>
            <i className="bi bi-building menu-icon"></i>
            <span>Departments</span>
          </li>

          <li onClick={comingSoon}>
            <i className="bi bi-kanban menu-icon"></i>
            <span>Projects</span>
          </li>

          <li onClick={comingSoon}>
            <i className="bi bi-bar-chart-line menu-icon"></i>
            <span>Reports</span>
          </li>
        </ul>
      </div>

      {/* BOTTOM SETTINGS */}
      <div className="sidebar-bottom">
        <div className="settings-item" onClick={comingSoon}>
          <i className="bi bi-gear menu-icon"></i>
          <span>Settings</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
