import React from "react";
import "./StatCard.css";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="stat-card d-flex align-items-center justify-content-between">
      <div>
        <h4 className="mb-1">{title}</h4>
        <p className="mb-0">{value}</p>
      </div>

      {/* BOOTSTRAP ICON */}
      <i className={`bi ${icon} stat-icon`}></i>
    </div>
  );
};

export default StatCard;
