import React from "react";
import { useNavigate } from "react-router-dom";

const BasicDropdown = ({ showDropdown, setShowDropdown, items, t }) => {
  let navigate = useNavigate()
  return (
    
      <div className="dropdown-wrapper">
        <button onClick={setShowDropdown} className="trigger-button">
          {t}
        </button>
        <ul className={showDropdown ? "active" : "notactive"}>
          {items.map((item) => (
            <li className={t + item}>{item}</li>
          ))}
        </ul>
      </div>
    
  );
};

export default BasicDropdown;
