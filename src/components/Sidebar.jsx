import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      {/* TOP */}
      <div className="sidebar-top">
        <div className="sidebar-title">Admin Panel</div>

        <ul className="sidebar-menu">
          <li>
            <NavLink to="/home" end className="menu-link">
              <i className="bi bi-speedometer2 menu-icon"></i>
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/home/employees" className="menu-link">
              <i className="bi bi-people menu-icon"></i>
              Employees
            </NavLink>
          </li>

          <li>
            <NavLink to="/home/attendance" className="menu-link">
              <i className="bi bi-clock-history menu-icon"></i>
              Attendance
            </NavLink>
          </li>

          <li>
            <NavLink to="/home/payroll" className="menu-link">
              <i className="bi bi-cash-stack menu-icon"></i>
              Payroll
            </NavLink>
          </li>

          <li>
            <NavLink to="/home/departments" className="menu-link">
              <i className="bi bi-building menu-icon"></i>
              Departments
            </NavLink>
          </li>

          <li>
            <NavLink to="/home/projects" className="menu-link">
              <i className="bi bi-kanban menu-icon"></i>
              Projects
            </NavLink>
          </li>

          <li>
            <NavLink to="/home/reports" className="menu-link">
              <i className="bi bi-bar-chart-line menu-icon"></i>
              Reports
            </NavLink>
          </li>
        </ul>
      </div>

      {/* BOTTOM – SETTINGS */}
      <div className="sidebar-bottom">
        <NavLink to="/home/settings" className="menu-link">
          <i className="bi bi-gear menu-icon"></i>
          Settings
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
