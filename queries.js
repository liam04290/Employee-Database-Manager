const mysql = require('mysql2/promise');

class Query {
    constructor(connection) {
        this.connection = connection;
    }

    async getAllDepartments() {
        const [results] = await this.connection.query('SELECT * FROM department');
        return results;
    }

    async getAllRoles() {
        const [results] = await this.connection.query('SELECT * FROM role');
        return results;
    }

    async getAllEmployees() {
        const [results] = await this.connection.query('SELECT * FROM employee');
        return results;
    }

    async addDepartment(name) {
        await this.connection.query('INSERT INTO department (name) VALUES (?)', [name]);
    }

    async addRole(title, salary, department_id) {
        try {
            await this.connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]);
        } catch (error) {
            console.error('Error while adding role:', error);
        }
    }

    async addEmployee(first_name, last_name, role_id, manager_id) {
        try {
            await this.connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id]);
        } catch (error) {
            console.error('Error while adding employee:', error);
        }
    }

    async updateEmployeeRole(employee_id, role_id) {
        try {
            await this.connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [role_id, employee_id]);
        } catch (error) {
            console.error('Error while updating employee role:', error);
        }
    }
}

module.exports = Query;
