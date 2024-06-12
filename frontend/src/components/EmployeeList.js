// src/components/EmployeeList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  // let cors = require("cors");
  // app.use(cors());
  // const headers = {
  //   "Content-Type": "application/json",
  //   Authorization: apiKey,
  // };

  const fetchEmployees = async () => {
    const response = await axios.get('http://localhost:9092/api/employees');
    setEmployees(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:9092/api/employees/${id}`);
    fetchEmployees();
  };

  return (
    <div className="container">
      <h2>Employee List</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setSelectedEmployee({ id: null, name: '', department: '', salary: '' })}
      >
        Add Employee
      </button>
      {selectedEmployee && (
        <EmployeeForm
          employee={selectedEmployee}
          setEmployee={setSelectedEmployee}
          fetchEmployees={fetchEmployees}
        />
      )}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.salary}</td>
              <td>
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => setSelectedEmployee(employee)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
