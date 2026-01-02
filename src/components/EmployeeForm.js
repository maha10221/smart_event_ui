// import { useState, useEffect } from "react";

// // ✅ Move outside component
// const INITIAL_STATE = {
//   name: "",
//   email: "",
//   department: "",
//   salary: "",
//   joiningDate: "",
//   gender: ""
// };

// const EmployeeForm = ({ onSubmit, editData, resetTrigger }) => {
//   const [employee, setEmployee] = useState(INITIAL_STATE);

//   // Fill form when editing
//   useEffect(() => {
//     if (editData) {
//       setEmployee(editData);
//     }
//   }, [editData]);

//   // Reset form after add/update
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
//       <input name="name" value={employee.name} onChange={handleChange} placeholder="Name" required />
//       <input name="email" value={employee.email} onChange={handleChange} placeholder="Email" required />
//       <input name="department" value={employee.department} onChange={handleChange} placeholder="Department" required />
//       <input name="salary" value={employee.salary} onChange={handleChange} placeholder="Salary" required />

//       <input
//         type="date"
//         name="joiningDate"
//         value={employee.joiningDate}
//         onChange={handleChange}
//         required
//       />

//       <select name="gender" value={employee.gender} onChange={handleChange} required>
//         <option value="">Select Gender</option>
//         <option value="MALE">Male</option>
//         <option value="FEMALE">Female</option>
//         <option value="OTHER">Other</option>
//       </select>

//       <button type="submit">
//         {editData ? "Update" : "Add"}
//       </button>
//     </form>
//   );
// };

// export default EmployeeForm;



import { useState, useEffect } from "react";

const INITIAL_STATE = {
  name: "",
  email: "",
  department: "",
  salary: "",
  joiningDate: "",
  gender: ""
};

const EmployeeForm = ({
  onSubmit,
  editData,
  resetTrigger,
  errorMessage,
  successMessage,
  loading
}) => {
  const [employee, setEmployee] = useState(INITIAL_STATE);

  // Fill form when editing
  useEffect(() => {
    if (editData) {
      setEmployee(editData);
    }
  }, [editData]);

  // Reset form after success
  useEffect(() => {
    setEmployee(INITIAL_STATE);
  }, [resetTrigger]);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(employee);
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      {/* <h3>{editData ? "Update Employee" : "Add Employee"}</h3> */}

      {/* ERROR */}
      {/* {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} */}

      {/* SUCCESS */}
      {/* {successMessage && <p style={{ color: "green" }}>{successMessage}</p>} */}

      <input
        name="name"
        placeholder="Name"
        value={employee.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={employee.email}
        onChange={handleChange}
        required
      />

      <input
        name="department"
        placeholder="Department"
        value={employee.department}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="salary"
        placeholder="Salary"
        value={employee.salary}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="joiningDate"
        value={employee.joiningDate}
        onChange={handleChange}
        required
      />

      <select
        name="gender"
        value={employee.gender}
        onChange={handleChange}
        required
      >
        <option value="">Select Gender</option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
        <option value="OTHER">Other</option>
      </select>

      <button type="submit" disabled={loading}>
        {loading ? "Please wait..." : editData ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default EmployeeForm;
