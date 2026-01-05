import EmployeeForm from "./EmployeeForm";

const EmployeeDrawer = ({ open, onClose, onSubmit, editData, loading }) => {
  if (!open) return null;

  return (
    <div className="drawer-overlay">
      <div className="drawer">
        <h3>{editData ? "Update Employee" : "Add Employee"}</h3>

        <EmployeeForm
          onSubmit={onSubmit}
          editData={editData}
          loading={loading}
        />

        <div className="drawer-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDrawer;
