# Automobile Garage Management System

A full-stack web application developed to manage the day-to-day operations of an automobile garage through a centralized and organized system.

The application allows garage staff to manage customers, vehicles, appointments, service records, invoices, and payments while providing a dashboard for an overall view of garage activities.

## Features

- Dashboard – View key information such as total customers, vehicles, appointments, service records, invoices, and revenue.
- Customer Management – Add, view, update, and delete customer records.
- Vehicle Management – Manage vehicle details and associate vehicles with customers.
- Appointment Management – Create and manage service appointments, including date, time, description, and status.
- Service Record Management – Maintain service history with service type, description, service date, labor cost, parts cost, and status.
- Invoice Management – Create and manage invoices associated with service records.
- Payment Management – Record payment details, payment method, payment status, and transaction reference.
- Validation & Exception Handling – Includes request validation and backend exception handling for reliable API operations.

## Technology Stack

### Frontend

- React
- JavaScript
- HTML
- CSS
- Vite

### Backend

- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- REST APIs
- Maven

### Database

- MySQL

### Tools

- Visual Studio Code
- Git
- GitHub

## Application Workflow

Customer
↓
Vehicle
↓
Appointment
↓
Service Record
↓
Invoice
↓
Payment

The workflow connects the major operations of a garage, allowing customer and vehicle information to be maintained throughout the service and billing process.

## Project Architecture

The backend follows a layered architecture:

Controller
↓
Service
↓
Repository
↓
Database

The React frontend communicates with the Spring Boot backend through REST APIs.

## Project Structure

Automobile-Garage-Management-System
│
├── backend
│   └── garage-backend
│       ├── src
│       │   └── main
│       │       └── java
│       │           └── com.gokul.garage
│       │               ├── config
│       │               ├── controller
│       │               ├── entity
│       │               ├── exception
│       │               ├── repository
│       │               └── service
│       │
│       ├── pom.xml
│       └── mvnw.cmd
│
└── frontend
    ├── src
    │   ├── components
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    │
    ├── package.json
    └── vite.config.js

## REST API

| Module | Endpoint |
|---|---|
| Customers | /customers |
| Vehicles | /vehicles |
| Appointments | /appointments |
| Service Records | /service-records |
| Invoices | /invoices |
| Payments | /payments |
| Dashboard | /dashboard |

The backend provides CRUD operations for the main application modules and uses DTOs, validation, service classes, repositories, and entity relationships to manage the data.

## Running the Project Locally

### Prerequisites

- Java
- MySQL
- Node.js and npm
- Git

### Backend

Create the MySQL database:

CREATE DATABASE garage_db;

Configure your local database credentials in application.properties.

Run the backend:

cd backend/garage-backend
.\mvnw.cmd spring-boot:run

Backend: http://localhost:8080

### Frontend

Open another terminal:

cd frontend
npm install
npm run dev

Frontend: http://localhost:5173

## Security

Database credentials and other sensitive configuration values should not be committed to the repository.

Local configuration should be maintained separately from the source code.

## Learning Outcomes

This project provided practical experience in:

- Developing REST APIs using Spring Boot
- Implementing layered backend architecture
- Working with Spring Data JPA and Hibernate
- Connecting Java applications with MySQL
- Designing relationships between database entities
- Implementing CRUD operations
- Using DTOs and request validation
- Handling backend exceptions
- Building a React frontend
- Integrating React with REST APIs
- Managing a full-stack application using Git and GitHub

## Future Enhancements

- User authentication and role-based access
- Garage staff management
- Advanced search and filtering
- Service reminders and notifications
- Invoice PDF generation
- Online payment integration
- Advanced reporting and analytics
- Cloud deployment

## Author

Gokul Krishna N

Full-stack project developed using Java, Spring Boot, React, and MySQL.