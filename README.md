Task Management Application - Backend
This is the backend service for the Task Management Application. It is a Spring Boot application designed to provide APIs for user authentication (signup/signin) and task management features. The backend interacts with a MySQL database and uses JWT for authentication. The frontend is hosted separately on Vercel.

Features
User Authentication:

Sign up new users.
Sign in existing users with JWT-based authentication.
Task Management:

Create, read, update, and delete tasks for authenticated users.
Manage to-do lists with individual tasks.
API Documentation:

Swagger UI is available for exploring the API endpoints.
Tech Stack
Spring Boot 2.7.5
Java 17
Spring Security (JWT Authentication)
Spring Data JPA (MySQL Database)
Swagger for API documentation
Railway for backend deployment
MySQL for the database
Getting Started
Prerequisites
Make sure you have the following installed on your system:

Java 17
Maven
MySQL (or a Railway MySQL instance)
Docker (for containerized deployment)
Setup
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/taskmanagement-backend.git
cd taskmanagement-backend
Configure the MySQL Database:

Create a MySQL database and update the following properties in the application.properties file:

properties
Copy code
spring.datasource.url=jdbc:mysql://localhost:3306/task_management
spring.datasource.username=<your-mysql-username>
spring.datasource.password=<your-mysql-password>

# Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
Alternatively, if you're using Railway for MySQL, use the provided database credentials from your Railway instance.
