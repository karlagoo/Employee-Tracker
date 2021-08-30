USE employee_tracker_db;

INSERT INTO department
(name)
VALUES 
('Engineering'),
('Sales'),
('Legal'),
('Finance');

INSERT INTO role
(title, salary, department_id)
VALUES
('Engineer', 100000, 1),
('Engineer Manager', 150000, 1),
('Salesman', 100000, 1),
('Sales Manager', 150000, 1),
('Laywer', 200000, 1),
('Legal Manager', 500000, 1),
('Finance', 100000, 1),
('Finance Manager', 150000, 1);

INSERT INTO employee 
(first_name, last_name, role_id, manager_id)
VALUES
('Jack', 'Daniels', 2, NULL),
('Jill', 'Hill', 1, 1),