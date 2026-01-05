import { useState, useRef, useEffect } from "react";

const Header = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  /* =========================
     CLOSE ON OUTSIDE CLICK
  ========================== */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="app-header">
      <div className="header-title"> </div>

      <div className="profile-wrapper" ref={dropdownRef}>
        <img
          src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
          alt="Admin"
          className="profile-img"
          onClick={() => setOpen((prev) => !prev)}
        />

        {open && (
          <div className="profile-dropdown">
            <p className="profile-name">Admin</p>

            <button
              onClick={() => {
                setOpen(false);
                onLogout && onLogout();
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
