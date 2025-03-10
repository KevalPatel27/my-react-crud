import { createContext, useState, useEffect } from "react";

export const EmployeeContext = createContext();

const getEmployeesFromStorage = () => {
    const data = localStorage.getItem("employees");
    return data ? JSON.parse(data) : null;
};

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);

    // Load from LocalStorage or Fetch JSON Data
    useEffect(() => {
        const fetchData = async () => {
            const storedEmployees = getEmployeesFromStorage();

            if (storedEmployees) {
                setEmployees(storedEmployees);
            } else {
                try {
                    const response = await fetch("/db.json"); // Ensure this file exists
                    if (!response.ok) throw new Error("Failed to fetch data");

                    const data = await response.json();
                    setEmployees(data);

                    // Save only once after fetching from db.json
                    localStorage.setItem("employees", JSON.stringify(data));
                } catch (error) {
                    console.error("Error loading JSON data:", error);
                }
            }
        };

        fetchData();
    }, []); // Runs only on the first render

    // Save to LocalStorage **only when employees change**
    useEffect(() => {
        if (employees.length > 0) {
            localStorage.setItem("employees", JSON.stringify(employees));
        }
    }, [employees]); // Saves only when employees change

    const addEmployee = (employee) => {
        const newEmployee = {
            ...employee,
            id: employees.length > 0 ? employees[employees.length - 1].id + 1 : 1
        };
        setEmployees([...employees, newEmployee]);
    };

    const editEmployee = (updatedEmployee) => {
        setEmployees(
            employees.map(emp => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
        );
    };

    const deleteEmployee = (id) => {
        setEmployees(employees.filter(emp => emp.id !== id));
    };

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee, editEmployee, deleteEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
};
