import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import EmployeeForm from "../components/EmployeeForm";
import { AuthContext } from "../auth/AuthContext";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [editEmp, setEditEmp] = useState(null);
  const [resetTrigger, setResetTrigger] = useState(0);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
     PAGINATION + SORTING
  ========================== */
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("name");
  const [direction, setDirection] = useState("ASC");

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  /* =========================
     AUTO HIDE TOAST (5 sec)
  ========================== */
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, success]);

  /* =========================
     LOAD EMPLOYEES (PAGEABLE)
  ========================== */
  const loadEmployees = async () => {
    try {
      const res = await api.get(
        `/emp/page?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`
      );
      setEmployees(res.data.data || []);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [page, size, sortBy, direction]);

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
        setEditEmp(null);
      } else {
        await api.post("/emp/add", emp);
        setSuccess("Employee added successfully");
      }

      loadEmployees();
      setResetTrigger((prev) => prev + 1);
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
      console.error(err);
    }
  };

  /* =========================
     LOGOUT
  ========================== */
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard">

      {/* ================= TOAST NOTIFICATION ================= */}
      {(error || success) && (
        <div className={`toast ${error ? "toast-error" : "toast-success"}`}>
          {error || success}
        </div>
      )}

      {/* ================= HEADER ================= */}
      <div className="dashboard-header">
        <h2
          className="dashboard-title"
          onClick={() => navigate("/dashboard")}
        >
          Admin Dashboard
        </h2>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* ================= FORM ================= */}
      <EmployeeForm
        onSubmit={addOrUpdate}
        editData={editEmp}
        resetTrigger={resetTrigger}
        errorMessage={error}
        successMessage={success}
        loading={loading}
      />

      {/* ================= SORT + PAGE CONTROLS ================= */}
      <div className="sort-bar employee-form">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="salary">Sort by Salary</option>
          <option value="joiningDate">Sort by Joining Date</option>
        </select>

        <select value={direction} onChange={(e) => setDirection(e.target.value)}>
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>

        <select value={size} onChange={(e) => setSize(Number(e.target.value))}>
          <option value={5}>5 Rows</option>
          <option value={10}>10 Rows</option>
          <option value={20}>20 Rows</option>
        </select>
      </div>

      {/* ================= TABLE ================= */}
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Joining Date</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
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
                <td>
                  <button
                    className="action-btn edit-btn"
                    onClick={() => setEditEmp(e)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => deleteEmp(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ================= PAGINATION ================= */}
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "center",
          gap: "14px",
        }}
      >
        <button
          className="action-btn edit-btn"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>
          Page <b>{page + 1}</b> of <b>{totalPages}</b>
        </span>

        <button
          className="action-btn edit-btn"
          disabled={page === totalPages - 1}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;















// import { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/api";
// import EmployeeForm from "../components/EmployeeForm";
// import { AuthContext } from "../auth/AuthContext";

// const Dashboard = () => {
//   const [employees, setEmployees] = useState([]);
//   const [editEmp, setEditEmp] = useState(null);
//   const [resetTrigger, setResetTrigger] = useState(0);

//   const { logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   /* =========================
//      LOAD EMPLOYEES
//   ========================== */
//   const loadEmployees = async () => {
//     try {
//       const res = await api.get("/emp/getAllEmployees");
//       setEmployees(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     loadEmployees();
//   }, []);

//   /* =========================
//      ADD OR UPDATE EMPLOYEE
//   ========================== */
//   const addOrUpdate = async (emp) => {
//     try {
//       if (editEmp) {
//         await api.put(`/emp/updateEmp/${editEmp.id}`, emp);
//         setEditEmp(null); // exit edit mode
//       } else {
//         await api.post("/emp/add", emp);
//       }

//       await loadEmployees();
//       setResetTrigger((prev) => prev + 1); // reset form
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   /* =========================
//      DELETE EMPLOYEE
//   ========================== */
//   const deleteEmp = async (id) => {
//     try {
//       await api.delete(`/emp/deleteById/${id}`);
//       loadEmployees();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   /* =========================
//      LOGOUT
//   ========================== */
//   const handleLogout = () => {
//     logout();           // remove JWT
//     navigate("/");      // redirect to login
//   };

//   return (
//     <div className="dashboard">
//       {/* ================= HEADER ================= */}
//       <div className="dashboard-header">
//         <h2>Admin Dashboard</h2>
//         <button className="logout-btn" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>

//       {/* ================= FORM ================= */}
//       <EmployeeForm
//         onSubmit={addOrUpdate}
//         editData={editEmp}
//         resetTrigger={resetTrigger}
//       />

//       {/* ================= TABLE ================= */}
//       <table className="employee-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Department</th>
//             <th>Salary</th>
//             <th>Joining Date</th>
//             <th>Gender</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {employees.length === 0 ? (
//             <tr>
//               <td colSpan="7" style={{ textAlign: "center" }}>
//                 No Employees Found
//               </td>
//             </tr>
//           ) : (
//             employees.map((e) => (
//               <tr key={e.id}>
//                 <td>{e.name}</td>
//                 <td>{e.email}</td>
//                 <td>{e.department}</td>
//                 <td>{e.salary}</td>
//                 <td>{e.joiningDate}</td>
//                 <td>{e.gender}</td>
//                 <td>
//                   <button
//                     className="action-btn edit-btn"
//                     onClick={() => setEditEmp(e)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="action-btn delete-btn"
//                     onClick={() => deleteEmp(e.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Dashboard;
