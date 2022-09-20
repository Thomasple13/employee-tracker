INSERT INTO department (department_name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Manager", 90000, 1),
        ("Sales Lead", 80000, 1),
        ("Salesperson", 70000, 1),
        ("Lead Engineer", 150000, 2),
        ("Software Engineer", 120000, 2),
        ("Account Manager", 160000, 3),
        ("Accountant", 125000, 3),
        ("Legal Team Lead", 250000, 4),
        ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Timmy", "Pak", 1, NULL),
        ("Sarah", "Rodriguez", 2, 1),
        ("Billy", "Wilson", 3, 1),
        ("John", "Doe", 4, NULL),
        ("Thomas", "Le", 5, 4),
        ("Ashley", "Johnson", 6, NULL),
        ("Steve", "Brown", 7, 6),
        ("James", "Rodgers", 8, NULL),
        ("Michelle", "Chan", 9, 8);