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
VALUES  ("Markus","Mercado", 1, 1),
        ("Bob","Johnson", 2, null),
        ("Steven","Bonelli", 3, 2),
        ("Anthony","Davis", 4, null ),
        ("Charles","Barkley", 5, 3),
        ("Lily","Ki", 6, null),
        ("Taylor","Low", 7, 4),
        ("LeBron","James", 8, null);
