
CREATE TABLE IF NOT EXISTS suppliers (
                                         id BIGSERIAL PRIMARY KEY,
                                         name VARCHAR(255) NOT NULL,
    city VARCHAR(255)
    );


CREATE TABLE IF NOT EXISTS departments (
                                           id BIGSERIAL PRIMARY KEY,
                                           name VARCHAR(255) NOT NULL
    );


CREATE TABLE IF NOT EXISTS users (
                                     id BIGSERIAL PRIMARY KEY,
                                     user_index VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    plant VARCHAR(255),
    department_id BIGINT,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id)
    );

CREATE TABLE IF NOT EXISTS certificates (
                                            id BIGSERIAL PRIMARY KEY,
                                            supplier_id BIGINT NOT NULL,
                                            certificate_type VARCHAR(50) NOT NULL,
    valid_from TIMESTAMP NOT NULL,
    valid_to TIMESTAMP NOT NULL,
    pdf_url OID,
    CONSTRAINT fk_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
    );

CREATE TABLE IF NOT EXISTS assigned_users (
                                              certificate_id BIGINT NOT NULL,
                                              user_id BIGINT NOT NULL,
                                              PRIMARY KEY (certificate_id, user_id),
    CONSTRAINT fk_certificate FOREIGN KEY (certificate_id) REFERENCES certificates(id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
    );


CREATE TABLE IF NOT EXISTS comments (
                                        id BIGSERIAL PRIMARY KEY,
                                        certificate_id BIGINT NOT NULL,
                                        user_id BIGINT NOT NULL,
                                        content TEXT NOT NULL,
                                        CONSTRAINT fk_certificate_comment FOREIGN KEY (certificate_id) REFERENCES certificates(id),
    CONSTRAINT fk_user_comment FOREIGN KEY (user_id) REFERENCES users(id)
    );