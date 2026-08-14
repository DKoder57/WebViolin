# 📘 WebViolin — Project Standards

This document defines architectural, coding and collaboration standards adopted in the WebViolin project.

---

# 📁 Project Structure
```
webviolin/
 ├── apps/
 │    ├── web/ → Front-end (Vite + React + TypeScript)
 │    └── api/ → Back-end (Node + Express) — ainda não implementado
 ├── docs/
 ├── .gitignore
 └── README.md
```
Each application inside `/apps` is independent and contains its own:

- package.json
- node_modules
- environment variables
- configuration files

---

# 🏗️ Layer Separation

Backend follows a layered structure:

api/src/
 ├── controllers/  → HTTP layer (request/response handling)
 ├── services/     → Business rules
 ├── routes/       → Route definitions
 ├── middlewares/  → Auth & validation
 ├── utils/        → Helper functions
 └── server.ts

Rules:

- Controllers must not contain business logic.
- Services must not depend on Express objects.
- Database access must occur only inside services.

---

# 🔐 Security Standards

- All sensitive data must be stored in `.env` files.
- `.env` files must never be committed.
- A `.env.example` file must be maintained.

Authentication:

- JWT-based authentication
- Passwords hashed with bcrypt
- Protected routes must validate token via middleware

---

# 🌎 Environment Configuration

Development:
- Frontend: http://localhost:5173 (padrão do Vite)
- Backend: http://localhost:3001 (quando implementado)

Production:
- Environment variables provided by hosting provider
- HTTPS required
- CORS restricted to frontend domain

---

# 🔄 API Standards

## REST Conventions

GET     → Retrieve data  
POST    → Create resource  
PUT     → Update resource  
DELETE  → Remove resource  

---

## Standard API Response Format

Success:

{
  "success": true,
  "data": {}
}

Error:

{
  "success": false,
  "error": {
    "message": "Description of error",
    "code": "ERROR_CODE"
  }
}

All routes must follow this structure.

---

# ❗ Error Handling Strategy

- Centralized error middleware
- No stack traces exposed in production
- Validation errors must return HTTP 400
- Unauthorized access must return HTTP 401
- Forbidden actions must return HTTP 403
- Server errors must return HTTP 500

---

# 🗄️ Database Standards

- Prisma ORM must be used for all database interactions.
- Raw SQL is allowed only if strictly necessary.
- Ranking must be calculated dynamically via ORDER BY totalPoints DESC.
- Pagination must be implemented for ranking endpoints.

---

# 🧪 Testing (Future Implementation)

Planned:

- Unit tests for services
- Integration tests for API routes
- Coverage target: 70% minimum

---

# 🧹 Code Quality

- ESLint enabled
- Prettier enabled
- No unused variables
- No console.log in production code
- Functions must be single-responsibility

Naming Conventions:

- camelCase → variables & functions
- PascalCase → classes & components
- UPPER_CASE → environment variables

---

# 🌿 Git Standards

## Branch Strategy

main → production-ready  
develop → active development  

Feature branches:

feature/tuner-system  
feature/ranking  
fix/login-validation  

---

## Commit Pattern (Conventional Commits)

feat: add tuning validation  
fix: correct ranking calculation  
docs: update architecture  
refactor: separate business logic  

---

# 🎨 Styling Standards

- TailwindCSS é o padrão de estilização adotado para o frontend.
- CSS solto por componente (ex: arquivos `.css` individuais) deve ser migrado para classes utilitárias do Tailwind conforme o componente for revisado.

---

# 📦 Dependency Management

- No unused dependencies
- Major updates must be reviewed
- Avoid unnecessary heavy libraries

---

# 📈 Scalability Guidelines

The project must remain:

- Stateless at API level
- Easily deployable separately (frontend/backend)
- Cloud-ready
- Database normalized

---

# 🎯 Architectural Principles

- Separation of Concerns
- Single Responsibility Principle
- Stateless REST API
- Security by Default
- Clean Code Practices
