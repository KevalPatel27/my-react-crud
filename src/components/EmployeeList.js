import React, { useState, useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import { FaPlus, FaCaretUp, FaCaretDown } from "react-icons/fa";
import ConformModal from "./ConformModel";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";

const EmployeeList = () => {
    const { employees, deleteEmployee, addEmployee, editEmployee } = useContext(EmployeeContext);

    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalOpenDelete, setModalOpenDelete] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [isModalOpenEdit, setModalOpenEdit] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState(null);

    const [sortConfig, setSortConfig] = useState({ key: "id", order: "asc" });

    const toggleSortOrder = ((key) => {
        setSortConfig((prev) => ({
            key,
            order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc',
        }))
    } )

    const sortedEmployees = [...employees].sort((a ,b) =>{
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.order === "asc" ? -1: 1;
        if(a[sortConfig.key] > b[sortConfig.key]) return sortConfig.order === "asc" ? 1:-1;
        return 0;
    });
    const handleDeleteClick = (employeeId) => {
        setEmployeeToDelete(employeeId);
        setModalOpenDelete(true);
    };

    const handleAddEmployee = (newEmployee) => {
        addEmployee(newEmployee);
    };

    const handleConfirmDelete = () => {
        if (employeeToDelete) {
            deleteEmployee(employeeToDelete);
            setEmployeeToDelete(null);
        }
        setModalOpenDelete(false);
    };

    const handleCancelDelete = () => {
        setModalOpenDelete(false);
        setEmployeeToDelete(null);
    };

    const handleEditClick = (employee) => {
        setEmployeeToEdit(employee);
        setModalOpenEdit(true);
    };

    const handleEditEmployee = (employeeEdited) => {
        editEmployee(employeeEdited);
    };

    return (
        <>
            <button className="addEmployeeBtn" onClick={() => setModalOpen(true)}>
                <FaPlus size={20} color="white" />
            </button>

            <table>
                <thead>
                    <tr>
                        <th onClick={() => toggleSortOrder("id") }>
                           <span style={{ display:"flex", justifyContent:"center",columnGap:'5px' }}>
                                ID {sortConfig.key === "id" ? (sortConfig.order === "asc" ? <FaCaretUp /> : <FaCaretDown />) : ""}
                            </span> 
                        </th>
                        <th onClick={() => toggleSortOrder("name")}>
                            <span style={{ display:"flex", justifyContent:"center",columnGap:'5px' }}>   
                                Name {sortConfig.key === "name" ? (sortConfig.order === "asc" ?<FaCaretUp /> : <FaCaretDown />) : ""}
                            </span>    
                        </th>
                        <th>Position</th>
                        <th onClick={() => toggleSortOrder("salary")}>
                            <span style={{ display:"flex", justifyContent:"center",columnGap:'5px' }}>
                                Salary {sortConfig.key === "salary" ? (sortConfig.order === "asc" ?<FaCaretUp /> : <FaCaretDown />) : ""}
                            </span>
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedEmployees.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center", padding: "30px", fontSize: "30px" }}>
                                Employee Data Found :- N/A
                            </td>
                        </tr>
                    ) : (
                        sortedEmployees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.position}</td>
                                <td>{employee.salary}</td>
                                <td style={{ display: "flex", flexDirection: "column" }}>
                                    <button className="inFieldBtn" onClick={() => handleEditClick(employee)}>
                                        Edit
                                    </button>
                                    <button className="inFieldBtn" onClick={() => handleDeleteClick(employee.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <AddEmployee isOpen={isModalOpen} onClose={() => setModalOpen(false)} onAddEmployee={handleAddEmployee} />
            <ConformModal isOpen={isModalOpenDelete} onClose={handleCancelDelete} onConfirm={handleConfirmDelete} />
            {isModalOpenEdit && (
                <EditEmployee
                    isOpen={isModalOpenEdit}
                    employee={employeeToEdit}
                    onEditEmployee={handleEditEmployee}
                    onClose={() => setModalOpenEdit(false)}
                />
            )}
        </>
    );
};

export default EmployeeList;
