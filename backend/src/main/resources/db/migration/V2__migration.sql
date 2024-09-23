-- Insert data into department table in the application schema
INSERT INTO application.department (name) VALUES
                                              ('ITM/FP'),
                                              ('IMM/FP'),
                                              ('INN/FG');

-- Insert data into supplier table in the application schema
INSERT INTO application.supplier (name, city) VALUES
                                                  ('ANDEMIS GmbH', 'Stuttgart'),
                                                  ('IMLER AG', 'Berlin');

INSERT INTO application.users (email, firstname, lastname, plant, userid, department_id)
VALUES ('simonz@mail.com', 'Simon', 'Zwolfer', '096', 'ZWOELF', 1),
       ('wolfgangs@mail.com', 'Wolfgang', 'Stark', '094', 'WOLFST', 2);