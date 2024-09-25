-- Create schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS application;

-- Set search path
SET search_path TO application;


-- Create SUPPLIERS table
CREATE TABLE IF NOT EXISTS suppliers (
                                         id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                         name VARCHAR(255) NOT NULL,
    city VARCHAR(255)
    );

-- Create DEPARTMENTS table
CREATE TABLE IF NOT EXISTS departments (
                                           id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                           name VARCHAR(255) NOT NULL
    );

-- Create USERS table
CREATE TABLE IF NOT EXISTS users (
                                     id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                     user_id VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    department_id BIGINT,
    plant VARCHAR(255),
    CONSTRAINT fk_department
    FOREIGN KEY(department_id)
    REFERENCES departments(id)
    );

-- Create CERTIFICATES table
CREATE TABLE IF NOT EXISTS certificates (
                                            id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                            supplier_id BIGINT NOT NULL,
                                            certificate_type VARCHAR(50) NOT NULL,
    valid_from DATE NOT NULL,
    valid_to DATE NOT NULL,
    pdf_url TEXT,
    CONSTRAINT fk_supplier
    FOREIGN KEY(supplier_id)
    REFERENCES suppliers(id)
    );

-- Create ASSIGNED_USERS junction table
CREATE TABLE IF NOT EXISTS assigned_users (
                                              certificate_id BIGINT NOT NULL,
                                              user_id BIGINT NOT NULL,
                                              PRIMARY KEY (certificate_id, user_id),
    CONSTRAINT fk_certificate
    FOREIGN KEY(certificate_id)
    REFERENCES certificates(id),
    CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES users(id)
    );

-- Create COMMENTS table
CREATE TABLE IF NOT EXISTS comments (
                                        id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                        certificate_id BIGINT NOT NULL,
                                        user_id BIGINT NOT NULL,
                                        content TEXT NOT NULL,
                                        CONSTRAINT fk_certificate_comment
                                        FOREIGN KEY(certificate_id)
    REFERENCES certificates(id),
    CONSTRAINT fk_user_comment
    FOREIGN KEY(user_id)
    REFERENCES users(id)
    );