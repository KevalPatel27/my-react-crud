import React, { useState } from "react";

const AddEmployee = ({ isOpen, onAddEmployee, onClose }) => {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [position, setPosition] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && salary && position) {
      console.log("first step")
      onAddEmployee({ name, salary, position });
      setName("");
      setPosition("");
      setSalary("");
      onClose();
    }
  };

  if (!isOpen) return null;
  return (
    <div className="modalStyle">
      <div className="modalContainer">
        <h2 className="addEmployeeH2">Add Employee Data</h2>
        <form onSubmit={handleSubmit} className="addEmpForm">
          <input
            className="input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="input"
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
          <input
            className="input"
            type="number"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
          <button className="addEmployeebtn" type="submit">Add</button>
          <button className="addEmployeebtn" type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
