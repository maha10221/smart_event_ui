import { useEffect, useState } from "react";
import "./EmployeeForm.css";

const EmployeeForm = ({ onSubmit, onCancel, editData, loading }) => {
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

      <select
        name="department"
        value={form.department}
        onChange={handleChange}
        required
      >
        <option value="">Select Department</option>
        <option value="Development">Development</option>
        <option value="HR">HR</option>
        <option value="Administration">Administration</option>
        <option value="Testing">Testing</option>
        <option value="Marketing">Marketing</option>
      </select>

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

      {/* ACTION BUTTONS */}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading
            ? "Saving..."
            : editData
            ? "Update Employee"
            : "Add Employee"}
        </button>

      </div>
    </form>
  );
};

export default EmployeeForm;
