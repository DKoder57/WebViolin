# WebViolin – Architecture Documentation (Advanced Version)

## 1. Architectural Overview

WebViolin is a full-stack web application designed to support violin practice through real-time pitch detection, audio comparison, and gamified performance tracking.

The system is structured as a modular monorepo with a clear separation between presentation, application logic, and data layers. The architecture prioritizes maintainability, clarity of responsibility, and professional engineering standards suitable for production-oriented environments.

Primary architectural goals:

* Clear separation of concerns
* Predictable data flow
* Layered backend structure
* Strong typing across the stack
* Maintainable and testable modules

---

## 2. High-Level System Architecture

### Logical Flow

User → Frontend (Client Application) → REST API → Database

### Responsibility Flow

1. The client handles UI rendering and real-time audio processing.
2. The backend handles business rules, validation, authentication, and persistence.
3. The database stores structured domain entities.

The frontend is responsible for real-time pitch detection using browser capabilities. The backend is responsible for persistence, scoring logic validation, and user progression tracking.

---

## 3. Monorepo Structure

```
webviolin/
 ├── apps/
 │    ├── web/   # Frontend application
 │    └── api/   # Backend application
 ├── docs/
 ├── .gitignore
 └── README.md
```

### Architectural Separation

#### Frontend (apps/web)

* Presentation layer
* Audio capture and frequency analysis
* Real-time validation feedback
* API communication

#### Backend (apps/api)

* Application layer (business logic)
* Authentication and authorization
* Scoring validation
* Data persistence

---

## 4. Domain Modeling

The application is divided into clear domain entities:

### Core Entities

* **User**

  * id
  * email
  * passwordHash
  * totalPoints

* **ScoreRecord**

  * id
  * userId
  * accuracy
  * pointsAwarded
  * timestamp

* **PracticeSession (Future)**

  * id
  * userId
  * sessionDuration
  * averageAccuracy

These entities define the persistence layer and guide API contract design.

---

## 5. Backend Architecture Pattern

The backend follows a layered architecture pattern:

```
src/
 ├── routes/
 ├── controllers/
 ├── services/
 ├── prisma/
 ├── middleware/
 └── utils/
```

### Layer Responsibilities

**Routes**

* Define HTTP endpoints
* Attach middleware

**Controllers**

* Handle request parsing
* Call services
* Format responses

**Services**

* Contain business logic
* Enforce domain rules
* Communicate with database layer

**Prisma Layer**

* Database access abstraction
* Type-safe queries

**Middleware**

* Authentication validation
* Error handling
* Request validation

This separation ensures that business logic is isolated from transport and framework-specific concerns.

---

## 6. API Design Strategy

The API follows REST principles with predictable naming and consistent response formatting.

### Design Principles

* Resource-oriented endpoints
* Stateless authentication using JWT
* Centralized error handling middleware
* Standardized JSON response structure

### Example Response Pattern

Success:

```
{
  "success": true,
  "data": { ... }
}
```

Error:

```
{
  "success": false,
  "error": "Error message"
}
```

---

## 7. Audio Processing Strategy

Real-time frequency detection occurs entirely in the client to reduce server load and latency.

The backend does not process raw audio. Instead, it validates scoring data received from the client and applies business rules before persisting results.

This design:

* Minimizes server computational overhead
* Keeps real-time feedback responsive
* Maintains clean separation of concerns

---

## 8. Security Architecture

Security considerations include:

* Environment-based configuration
* Password hashing
* Token-based authentication
* Protected routes via middleware
* Input validation before service execution

Sensitive logic is never handled directly in route definitions.

---

## 9. Error Handling Strategy

The backend uses centralized error-handling middleware to:

* Normalize error responses
* Prevent unhandled exceptions
* Separate business errors from system errors

This improves maintainability and debugging clarity.

---

## 10. Code Quality and Maintainability

* TypeScript enforced across frontend and backend
* Clear folder structure by responsibility
* Minimal cross-layer coupling
* Documentation maintained in /docs
* Modular and extensible service structure

---

## 11. Architectural Philosophy

The WebViolin architecture is intentionally structured to reflect professional backend and frontend separation standards while avoiding premature complexity.

It demonstrates:

* Domain-driven thinking at a simplified level
* Layered backend architecture
* Clean API design principles
* Practical full-stack engineering discipline

The system is built to be understandable, maintainable, and extensible without introducing unnecessary architectural patterns.
