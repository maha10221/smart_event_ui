const Topbar = ({ onAdd }) => {
  return (
    <button
      className="btn btn-primary px-4 py-2"
      onClick={onAdd}
    >
      + Add Employee
    </button>
  );
};

export default Topbar;
