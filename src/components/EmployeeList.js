import React, { useState, useContext } from 'react';
import { EmployeeContext } from "../context/EmployeeContext";
import { FaPlus } from "react-icons/fa";
import ConformModal from "./ConformModel";
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee'

const EmployeeList = () => {
    const { employees, deleteEmployee, addEmployee, editEmployee } = useContext(EmployeeContext);
    
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalOpenDelete, setModalOpenDelete] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(false);
    const [isModalOpenEdit, setModalOpenEdit] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState(null);

    const handleDeleteClick = (employeeId) => {
        setEmployeeToDelete(employeeId);
        setModalOpenDelete(true); // Open the modal
    };
    
    const handleAddEmployee = (newEmployee) => {
        console.log(newEmployee)
        addEmployee(newEmployee);
    }

    const handleConfirmDelete = () => {
        if (employeeToDelete) {
            deleteEmployee(employeeToDelete);
            setEmployeeToDelete(null);
        }
        setModalOpenDelete(false); // Close the modal
    };

    const handleCancelDelete = () => {
        setModalOpenDelete(false); // Close the modal
        setEmployeeToDelete(null); // Reset the employee to delete
    };

    const handleEditClick = (employee) => {
        setEmployeeToEdit(employee); // Set the employee to edit
        setModalOpenEdit(true); // Open the edit modal
    };

    const handleEditEmployee = (employeeEdited) => {
        editEmployee(employeeEdited);
    }
    
    return (
        <>    
            <button 
                className="addEmployeeBtn"
                onClick={() => setModalOpen(true)}
            >
                <FaPlus size={20} color="white" />
            </button>
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { employees.length === 0 ? (
                        <>
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center",  padding: "30px" ,fontSize:"30px"}}>
                                    Employee Data Found :- N/A 
                                </td>
                            </tr>
                        </>
                    )  
                    :(
                           employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.position}</td>
                                <td>{employee.salary}</td>
                                <td  style={{ display: "flex", flexDirection: "column" }}>
                                    <button className ="inFieldBtn" onClick={() => handleEditClick(employee)}>Edit</button>
                                    <button className ="inFieldBtn" onClick={() => handleDeleteClick(employee.id)  }>
                                        Delete
                                    </button>
                                </td>   
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <AddEmployee
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onAddEmployee={handleAddEmployee}
            />        
            <ConformModal
                isOpen={isModalOpenDelete}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
            {isModalOpenEdit && (
                <EditEmployee 
                    isOpen={isModalOpenEdit}
                    employee={employeeToEdit} // Pass the employee to edit
                    onEditEmployee={handleEditEmployee} // Pass the edit function
                    onClose={() => setModalOpenEdit(false)}
                />
            )}
        </>
    );
};

export default EmployeeList; // Default export