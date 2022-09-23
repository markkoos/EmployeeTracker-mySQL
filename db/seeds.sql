INSERT INTO departments (name)
VALUES  (`Sales`),
        (`Engineering`),
        (`Finances`),
        (`Legal`);

INSERT INTO roles (title, salary, department_id)
VALUES  (`Sales Lead`, 100000, 1),
        (`Salesperson`, 80000, 1),
        (`Lead Engineer`, 150000, 2),
        (`Software Engineer`, 120000, 2),
        (`Account Manager`, 160000, 3),
        (`Accountant`, 125000, 3),
        (`Legal Team Lead`, 250000, 4),
        (`Lawyer`, 190000, 4);

INSERT INTO employees (first_name, last_name, role_id)
VALUES  (`Markus`,`Mercado`, 1),
        (`Bob`,`Johnson`, 2),
        (`Steven`,`Bonelli`, 3),
        (`Anthony`,`Davis`, 4 ),
        (`Charles`,`Barkley`, 5),
        (`Lily`,`Ki`, 6),
        (`Taylor`,`Low`, 7),
        (`LeBron`,`James`, 8);
