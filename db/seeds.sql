INSERT INTO departments (name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finances"),
        ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Sales Lead", 100000, 1),
        ("Salesperson", 80000, 1),
        ("Lead Engineer", 150000, 2),
        ("Software Engineer", 120000, 2),
        ("Account Manager", 160000, 3),
        ("Accountant", 125000, 3),
        ("Legal Team Lead", 250000, 4),
        ("Lawyer", 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Markus","Mercado", 1, null),
        ("Bob","Johnson", 2, 1),
        ("Steven","Bonelli", 3, null),
        ("Anthony","Davis", 4, 3 ),
        ("Charles","Barkley", 5, null),
        ("Lily","Ki", 6, 5),
        ("Taylor","Low", 7, null),
        ("LeBron","James", 8, 7);
