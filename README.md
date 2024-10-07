*Certificate Management Application*

This application is a comprehensive certificate management system built with React (TypeScript) for the frontend and
Quarkus (Java) for the backend.

*Table of Contents*

* Features
* Technology Stack
* Prerequisites
* Setup and Installation
* Running the Application
* Project Structure

*Features*

1. User-friendly interface for managing certificates
2. CRUD operations for certificates (Create, Read, Update, Delete)
3. Supplier lookup functionality
4. User assignment to certificates
5. Multi-language support (English and German)
6. User switching capability
7. Comment system for certificates

*Technology Stack*

* Frontend: React (TypeScript)
* Backend: Quarkus (Java)
* Database: POSTGRES

*Prerequisites*

Before you begin, ensure you have the following installed:

* Node.js (version 20.11.0 or higher)
* Java Development Kit (JDK) 17 or higher
* Maven (version 21 or higher)

*Setup and Installation*

1.Clone the repository

git clone git@github.com:KelliaKamikazi/certificate-manager-kellia.git
cd certificate_app

2.Install frontend dependencies

cd frontend/
npm install

3.Install backend dependencies

cd ../backend
mvn clean install

*Running the application*

cd backend/
mvn quarkus:dev

Running on port: http://localhost:8080

*Project structure*

certificate-app/
│
├── backend/
│ └── src/
│ ├── main/
│ │ ├── java/
│ │ │ ├── docker/
│ │ │ ├── data/
│ │ │ │ ├── entities/
│ │ │ │ │ └── Certificate.java
│ │ │ │ └── repositories/
│ │ │ │ └── CertificateRepository.java
│ │ │ ├── services/
│ │ │ │ └── CertificateService.java
│ │ │ └── web/
│ │ │ ├── dtos/
│ │ │ │ └── CertificateDto.java
│ │ │ ├── mappers/
│ │ │ │ └── CertificateMapper.java
│ │ │ └── resources/
│ │ │ └── CertificateResource.java
│ │ └── resources/
│ │ ├── db/
│ │ │ ├── changeLog.xml
│ │ │ ├── create_tables.sql
│ │ │ └── seed_data.sql
│ │ └── application.properties
│
└── frontend/
└── src/
├── components/
│ ├── base/
│ ├── data/
│ ├── helpers/
│ │ └── CertificateTypeDisplay.ts
│ ├── icons/
│ ├── inputs/
│ └── views/
│ ├── CertificateForm.tsx
│ ├── Header.tsx
│ ├── Home.tsx
│ └── Sidebar.tsx
├── locale/
│ ├── de.json
│ └── en.json
└── styles/
└── items/