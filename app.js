const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const Query = require('./queries');

const start = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'EmployeeBase'
    });
    
    const query = new Query(connection);

    while (true) {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        });

        if (action === 'View all departments') {
            const departments = await query.getAllDepartments();
            console.table(departments);
        } else if (action === 'View all roles') {
            const roles = await query.getAllRoles();
            console.table(roles);
        } else if (action === 'View all employees') {
            const employees = await query.getAllEmployees();
            console.table(employees);
        } else if (action === 'Add a department') {
            const { name } = await inquirer.prompt({
                type: 'input',
                name: 'name',
                message: 'Enter the name of the new department:',
            });
            await query.addDepartment(name);
        } else if (action === 'Add a role') {
            const departments = await query.getAllDepartments();
            const departmentChoices = departments.map(department => ({
                name: department.name,
                value: department.id
            }));
            const { title, salary, department_id } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the title of the new role:',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the salary of the new role:',
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Select the department this role belongs to:',
                    choices: departmentChoices
                },
            ]);
            await query.addRole(title, salary, department_id);
        } else if (action === 'Add an employee') {
            const roles = await query.getAllRoles();
            const roleChoices = roles.map(role => ({
                name: role.title,
                value: role.id
            }));
            const employees = await query.getAllEmployees();
            const managerChoices = employees.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }));
            managerChoices.unshift({ name: 'None', value: null });

            const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'Enter the first name of the new employee:',
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Enter the last name of the new employee:',
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Select the role for the new employee:',
                    choices: roleChoices,
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Select the manager for the new employee:',
                    choices: managerChoices,
                }
            ]);
            await query.addEmployee(first_name, last_name, role_id, manager_id);
        } else if (action === 'Update an employee role') {
            const employees = await query.getAllEmployees();
            const employeeChoices = employees.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }));
            const roles = await query.getAllRoles();
            const roleChoices = roles.map(role => ({
                name: role.title,
                value: role.id
            }));

            const { employee_id, new_role_id } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'Select the employee you want to update:',
                    choices: employeeChoices,
                },
                {
                    type: 'list',
                    name: 'new_role_id',
                    message: 'Select the new role for the employee:',
                    choices: roleChoices,
                }
            ]);
            await query.updateEmployeeRole(employee_id, new_role_id);
        } else if (action === 'Exit') {
            connection.end();
            return;
        }
    }
};

start().catch(err => {
    console.error('An error occurred:', err);
});
