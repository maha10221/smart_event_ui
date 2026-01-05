import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../App.css";
import { AuthContext } from "../auth/AuthContext";

/* UI Components */
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import EmployeeForm from "../components/EmployeeForm";
import Footer from "../components/Footer";

const Dashboard = () => {
  /* =========================
     STATE
  ========================== */
  const [employees, setEmployees] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [editEmp, setEditEmp] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  /* =========================
     PAGINATION + SORTING
  ========================== */
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("name");
  const [direction, setDirection] = useState("ASC");

  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  /* =========================
     AUTO HIDE TOAST
  ========================== */
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  /* =========================
     LOAD EMPLOYEES
  ========================== */
  const loadEmployees = async () => {
    try {
      const res = await api.get(
        `/emp/page?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}&search=${search}`
      );

      setEmployees(res.data.data || []);
      setTotalPages(res.data.totalPages || 0);
      setTotalEmployees(res.data.totalItems || 0);
    } catch (err) {
      console.error(err);
      setError("Failed to load employees");
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [page, size, sortBy, direction, search]);

  /* =========================
     ADD / UPDATE EMPLOYEE
  ========================== */
  const addOrUpdate = async (emp) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (editEmp) {
        await api.put(`/emp/updateEmp/${editEmp.id}`, emp);
        setSuccess("Employee updated successfully");
      } else {
        await api.post("/emp/add", emp);
        setSuccess("Employee added successfully");
      }

      setDrawerOpen(false);
      setEditEmp(null);
      loadEmployees();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     DELETE EMPLOYEE
  ========================== */
  const deleteEmp = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await api.delete(`/emp/deleteById/${id}`);
      setSuccess("Employee deleted successfully");
      loadEmployees();
    } catch (err) {
      setError("Delete failed");
    }
  };

  /* =========================
     DRAWER HANDLERS
  ========================== */
  const openAddDrawer = () => {
    setEditEmp(null);
    setDrawerOpen(true);
  };

  const openEditDrawer = (emp) => {
    setEditEmp(emp);
    setDrawerOpen(true);
  };

  /* =========================
     LOGOUT
  ========================== */
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="layout">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="main">
        <Header onLogout={handleLogout} />

        {/* TOAST */}
        {(error || success) && (
          <div className={`toast ${error ? "toast-error" : "toast-success"}`}>
            {error || success}
          </div>
        )}

        {/* PAGE HEADER */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h2 className="mb-1">Admin Dashboard</h2>
            <p className="text-muted mb-0">
              Employee Management Overview
            </p>
          </div>

          <button
            className="btn btn-primary px-4 py-2"
            onClick={openAddDrawer}
          >
            + Add Employee
          </button>
        </div>

        {/* STATS */}
        <div className="stats">
          <StatCard title="Total Employees" value={totalEmployees} />
          <StatCard title="Departments" value="5" />
          <StatCard title="Page Size" value={size} />
          <StatCard title="Current Page" value={page + 1} />
        </div>

        {/* SORT BAR */}
        <div className="sort-bar d-flex align-items-center gap-2 mb-3">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="salary">Sort by Salary</option>
            <option value="joiningDate">Sort by Joining Date</option>
          </select>

          <select
            className="form-select"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>

          <select
            className="form-select"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          >
            <option value={10}>10 Rows</option>
            <option value={20}>20 Rows</option>
            <option value={30}>30 Rows</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Joining Date</th>
                <th>Gender</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">
                    No Employees Found
                  </td>
                </tr>
              ) : (
                employees.map((e) => (
                  <tr key={e.id}>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.department}</td>
                    <td>{e.salary}</td>
                    <td>{e.joiningDate}</td>
                    <td>{e.gender}</td>

                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-warning me-2"
                        onClick={() => openEditDrawer(e)}
                        title="Edit"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteEmp(e.id)}
                        title="Delete"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="pagination">
          <button disabled={page === 0} onClick={() => setPage(page - 1)}>
            Prev
          </button>

          <span>
            Page <b>{page + 1}</b> of <b>{totalPages}</b>
          </span>

          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>

        <Footer />
      </div>

      {/* ADD / EDIT DRAWER */}
      {drawerOpen && (
        <div className="drawer-overlay">
          <div className="drawer">
            <h3>{editEmp ? "Update Employee" : "Add Employee"}</h3>

            <EmployeeForm
              onSubmit={addOrUpdate}
              editData={editEmp}
              loading={loading}
            />

            <button
              className="cancel-btn"
              onClick={() => {
                setDrawerOpen(false);
                setEditEmp(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
