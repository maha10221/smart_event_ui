import { useEffect, useState } from "react";

const EmployeeForm = ({ onSubmit, editData, loading }) => {
  /* =========================
     FORM STATE
  ========================== */
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    salary: "",
    joiningDate: "",
    gender: "",
  });

  /* =========================
     AUTO-FILL WHEN EDIT
  ========================== */
  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name || "",
        email: editData.email || "",
        department: editData.department || "",
        salary: editData.salary || "",
        joiningDate: editData.joiningDate || "",
        gender: editData.gender || "",
      });
    } else {
      // reset when switching from edit → add
      setForm({
        name: "",
        email: "",
        department: "",
        salary: "",
        joiningDate: "",
        gender: "",
      });
    }
  }, [editData]);

  /* =========================
     HANDLE CHANGE
  ========================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* =========================
     SUBMIT
  ========================== */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <input
        name="name"
        placeholder="Employee Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="salary"
        placeholder="Salary"
        value={form.salary}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="joiningDate"
        value={form.joiningDate}
        onChange={handleChange}
        required
      />

      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
        required
      >
        <option value="">Select Gender</option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
        <option value="OTHER">Other</option>
      </select>

      <button type="submit" disabled={loading}>
        {loading
          ? "Saving..."
          : editData
          ? "Update Employee"
          : "Add Employee"}
      </button>
    </form>
  );
};

export default EmployeeForm;




// import { useState, useEffect } from "react";

// const INITIAL_STATE = {
//   name: "",
//   email: "",
//   department: "",
//   salary: "",
//   joiningDate: "",
//   gender: ""
// };

// const EmployeeForm = ({
//   onSubmit,
//   editData,
//   resetTrigger,
//   errorMessage,
//   successMessage,
//   loading
// }) => {
//   const [employee, setEmployee] = useState(INITIAL_STATE);

//   // Fill form when editing
//   useEffect(() => {
//     if (editData) {
//       setEmployee(editData);
//     }
//   }, [editData]);

//   // Reset form after success
//   useEffect(() => {
//     setEmployee(INITIAL_STATE);
//   }, [resetTrigger]);

//   const handleChange = (e) => {
//     setEmployee({
//       ...employee,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(employee);
//   };

//   return (
//     <form className="employee-form" onSubmit={handleSubmit}>
//       {/* <h3>{editData ? "Update Employee" : "Add Employee"}</h3> */}

//       {/* ERROR */}
//       {/* {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} */}

//       {/* SUCCESS */}
//       {/* {successMessage && <p style={{ color: "green" }}>{successMessage}</p>} */}

//       <input
//         name="name"
//         placeholder="Name"
//         value={employee.name}
//         onChange={handleChange}
//         required
//       />

//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={employee.email}
//         onChange={handleChange}
//         required
//       />

//       <input
//         name="department"
//         placeholder="Department"
//         value={employee.department}
//         onChange={handleChange}
//         required
//       />

//       <input
//         type="number"
//         name="salary"
//         placeholder="Salary"
//         value={employee.salary}
//         onChange={handleChange}
//         required
//       />

//       <input
//         type="date"
//         name="joiningDate"
//         value={employee.joiningDate}
//         onChange={handleChange}
//         required
//       />

//       <select
//         name="gender"
//         value={employee.gender}
//         onChange={handleChange}
//         required
//       >
//         <option value="">Select Gender</option>
//         <option value="MALE">Male</option>
//         <option value="FEMALE">Female</option>
//         <option value="OTHER">Other</option>
//       </select>

//       <button type="submit" disabled={loading}>
//         {loading ? "Please wait..." : editData ? "Update" : "Add"}
//       </button>
//     </form>
//   );
// };

// export default EmployeeForm;
