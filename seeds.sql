-- Populate department table
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('HR');
INSERT INTO department (name) VALUES ('Finance');

-- Populate role table
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 90000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('HR Manager', 80000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Accountant', 70000, 3);

-- Populate employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Smith', 2, 1);
