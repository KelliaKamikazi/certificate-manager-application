INSERT INTO departments (name)
VALUES ('ITM/FP'),
       ('IMM/FP'),
       ('HR'),
       ('Finance');

INSERT INTO suppliers (name, city)
VALUES ('ANDEMIS GmbH', 'Stuttgart'),
       ('DIMLER AG', 'Berlin');

-- Seed USERS
INSERT INTO users (user_index, first_name, last_name, email, plant, department_id)
VALUES ('ZWOELF', 'Simon', 'Zwolfer', 'simonz@mail.com', '096', 1),
       ('WOLFST', 'Wolfgang', 'Stark', 'wolfgangs@mail.com', '094', 2),
       ('KAMI', 'Kellia', 'Kamikazi', 'kelliakamikazi@mail.com', 'L094', 3),
       ('TAYLOR', 'Taylor', 'Swift', 'taylorswift@mail.com', '094', 4);