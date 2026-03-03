# WTWR (What to Wear?) - Back-end Service

This repository contains the core API and server-side logic for the WTWR application. The service is designed to manage user authentication, clothing item data, and role-based access control, providing a robust foundation for the front-end interface.

## Project Overview & Functionality

The back-end operates as a RESTful API, facilitating seamless communication between the client and the database. Key functionalities include:

- User Authentication & Authorization: Implements secure registration and login flows using industry-standard protocols.

- Session Management: Handles persistent user sessions via JSON Web Tokens (JWT).

- Resource Management: Provides full CRUD (Create, Read, Update, Delete) operations for clothing items.

- Ownership Verification: Includes server-side logic to ensure users can only modify or delete resources they personally created.

- Centralized Error Handling: Implements standardized HTTP response codes (200, 400, 401, 403, 404, 500) to ensure predictable API behavior.

## Technologies & Technical Specifications

This project was developed following software engineering best practices, focusing on security, modularity, and code maintainability.

## Tech Stack

- Runtime Environment: Node.js

- Web Framework: Express.js

- Database: MongoDB Atlas (NoSQL)

- ODM: Mongoose (Object Document Mapper)

- Security: bcryptjs for cryptographic password hashing and jsonwebtoken for secure data exchange.

## Engineering Standards & Techniques

- MVC Pattern: Organized the codebase into Models, Routes, and Controllers to separate concerns and improve scalability.

- Custom Middleware: Developed a dedicated auth middleware to intercept protected routes, validating JWTs before granting access to the controller logic.

- Schema Validation: Utilized Mongoose Schemas with built-in and custom validators to enforce data integrity at the database level.

- CORS Configuration: Integrated Cross-Origin Resource Sharing to allow secure communication with specific front-end origins.

- Code Quality (Linting): Adheres to strict coding standards using ESLint (Google configuration) to ensure consistent, bug-free, and clean code.

## Project Pitch Video

- Check out [this video](https://drive.google.com/file/d/1Mz5V0N2Ax4UIhrtX6PPSgZd3V651zFiV/view?usp=drive_link)
