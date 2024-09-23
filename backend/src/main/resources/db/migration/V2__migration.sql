-- Insert data into departmentEntity table in the application schema
INSERT INTO application.departmentEntity (name) VALUES
                                              ('ITM/FP'),
                                              ('IMM/FP'),
                                              ('INN/FG');

-- Insert data into supplierEntity table in the application schema
INSERT INTO application.supplierEntity (name, city) VALUES
                                                  ('ANDEMIS GmbH', 'Stuttgart'),
                                                  ('IMLER AG', 'Berlin');

INSERT INTO application.userEntities (email, firstname, lastname, plant, userid, department_id)
VALUES ('simonz@mail.com', 'Simon', 'Zwolfer', '096', 'ZWOELF', 1),
       ('wolfgangs@mail.com', 'Wolfgang', 'Stark', '094', 'WOLFST', 2);