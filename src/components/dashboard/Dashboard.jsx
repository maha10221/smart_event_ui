import { useEffect, useState } from "react";
import api from "../../api/api";
import "./Dashboard.css";

/* UI Components */
import StatCard from "../statcard/StatCard";
import EmployeeForm from "../EmployeeForm";

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

  /* =========================
     PAGINATION + SORTING
  ========================== */
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("name");
  const [direction, setDirection] = useState("ASC");

  /* =========================
     AUTO HIDE TOAST
  ========================== */
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  /* =========================
     LOAD EMPLOYEES
  ========================== */
  const loadEmployees = async () => {
    try {
      const res = await api.get(
        `/emp/page?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`
      );
      setEmployees(res.data.data || []);
      setTotalPages(res.data.totalPages || 0);
      setTotalEmployees(res.data.totalItems || 0);
    } catch {
      setError("Failed to load employees");
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [page, sortBy, direction]);

  /* =========================
     SORT HANDLER
  ========================== */
  const handleSort = (column) => {
    if (sortBy === column) {
      setDirection((prev) => (prev === "ASC" ? "DESC" : "ASC"));
    } else {
      setSortBy(column);
      setDirection("ASC");
    }
  };

  const renderSortIcon = (column) => {
    if (sortBy !== column) return null;
    return direction === "ASC" ? " ▲" : " ▼";
  };

  /* =========================
     ADD / UPDATE
  ========================== */
  const addOrUpdate = async (emp) => {
    setLoading(true);
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
    } catch {
      setError("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     DELETE
  ========================== */
  const deleteEmp = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await api.delete(`/emp/deleteById/${id}`);
      setSuccess("Employee deleted successfully");
      loadEmployees();
    } catch {
      setError("Delete failed");
    }
  };

  return (
    <>
      {/* TOAST */}
      {(error || success) && (
        <div className={`app-toast ${error ? "toast-error" : "toast-success"}`}>
          {error || success}
        </div>
      )}

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-start mb-3">
        <h2>Admin Dashboard</h2>
        

        <button
          className="btn btn-primary px-4"
          onClick={() => {
            setEditEmp(null);
            setDrawerOpen(true);
          }}
        >
          + Add Employee
        </button>
      </div>

      {/* STATS */}
      <div className="stats">
        <StatCard title="Total Employees" value={totalEmployees} icon="bi-people" />
        <StatCard title="Departments" value="5" icon="bi-building" />
        <StatCard title="Page Size" value={size} icon="bi-list-ol" />
        <StatCard title="Current Page" value={page + 1} icon="bi-bookmark" />
      </div>

      {/* TABLE */}
      <div className="employee-table-wrapper">
        <table className="table table-hover align-middle employee-table">
          <thead className="table-light">
            <tr>
              <th className="sortable text-start" onClick={() => handleSort("name")}>
                Name {renderSortIcon("name")}
              </th>
              <th className="text-start">Email</th>
              <th className="text-start">Department</th>
              <th className="sortable text-center" onClick={() => handleSort("salary")}>
                Salary {renderSortIcon("salary")}
              </th>
              <th
                className="sortable text-center"
                onClick={() => handleSort("joiningDate")}
              >
                Joining Date {renderSortIcon("joiningDate")}
              </th>
              <th className="text-center">Gender</th>
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
                  <td className="text-start">{e.name}</td>
                  <td className="text-start">{e.email}</td>
                  <td className="text-start">{e.department}</td>
                  <td className="text-center">{e.salary}</td>
                  <td className="text-center">{e.joiningDate}</td>
                  <td className="text-center">{e.gender}</td>

                  {/* ✅ FIXED ACTION BUTTONS */}
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-warning me-2"
                      onClick={() => {
                        setEditEmp(e);
                        setDrawerOpen(true);
                      }}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteEmp(e.id)}
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

      {/* DRAWER */}
      {drawerOpen && (
        <div className="drawer-overlay">
          <div className="drawer">
            <h3 className="text-center mb-3">
              {editEmp ? "Update Employee" : "Add Employee"}
            </h3>

            <EmployeeForm
              onSubmit={addOrUpdate}
              editData={editEmp}
              loading={loading}
            />

            <div className="text-end mt-3">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setDrawerOpen(false);
                  setEditEmp(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
