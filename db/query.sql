SELECT * AND not(id) FROM departments
JOIN roles ON roles.department_id = departments.id;