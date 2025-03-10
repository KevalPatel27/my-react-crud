import React, { useState } from "react";

const EditEmployee = ({ employee, onEditEmployee, onClose }) => {
    const [name, setName] = useState(employee.name);
    const [salary, setSalary] = useState(employee.salary);
    const [position, setPosition] = useState(employee.position);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && salary && position) {
          onEditEmployee({ id: employee.id, name, salary, position });
          onClose();
        }
      };
    return (
        <div className="modalStyle">
        <div className="modalContainer">
            <h2 className="editEmployeeH2">{employee.name} Employee Data</h2>
            <form onSubmit={handleSubmit} className="editEmpForm">
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
            <button className="editEmployeebtn" type="submit">Edit</button>
            <button className="editEmployeebtn" type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
        </div>
    );
};

export default EditEmployee;
