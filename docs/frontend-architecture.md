# 🎻 Frontend Architecture – Web Violin Platform

---

## 1. Purpose

Define the architectural structure and responsibility boundaries of the frontend application.

The system is responsible for:

- Real-time pitch detection
- Violin tuning feedback
- Learning progress tracking
- Ranking visualization

### Architectural Priorities

- Scalability
- Clear separation of concerns
- Low-latency audio processing
- Explicit domain boundaries

---

## 2. Stack

### Core

- **Vite** — Build tool and dev server
- **React** — UI library
- **TypeScript** — Static typing

### State Management

- **Zustand** — Client-side state
- **TanStack React Query** — Server state and caching

### Infrastructure

- **Axios** — HTTP client abstraction
- **Web Audio API** — Microphone access and audio stream handling
- **Pitchfinder** — Frequency detection algorithm

### UI & Presentation

- **TailwindCSS** — Styling system
- **Recharts** — Data visualization
- **Sonner** — Notification system
- **Framer Motion** — Animations

---

## 3. Architectural Model

The application follows a **feature-oriented architecture** with explicit infrastructure separation.

### Design Principles

- High cohesion within feature modules
- Side effects isolated from UI components
- Predictable state management
- Clear dependency direction
- Scalability through modular growth

---

## 4. Folder Structure

```text
src/
 ├── app/        # Application bootstrap and global providers
 ├── components/ # Reusable UI components (presentation only)
 ├── features/   # Domain modules (tuner, ranking, practice)
 ├── services/   # External integrations and side effects
 ├── stores/     # Shared client-side state
 ├── hooks/      # Reusable logic abstractions
 ├── lib/        # Utilities and configuration
 └── types/      # Shared TypeScript definitions
```

## 5. State Strategy

The application separates client state from server state to maintain predictability and scalability.

### Client State — Zustand

Responsible for UI-driven and real-time data, including:

- Current detected frequency
- Target musical note
- Microphone status
- UI control flags

**Data Flow**

Audio Service → Store → UI

The store acts as the single source of truth for reactive audio data.

---

### Server State — React Query

Responsible for asynchronous and persistent data, including:

- Ranking data
- Practice history
- User progress

**Data Flow**

Component → Query Hook → Backend API

Server state is cached and synchronized through React Query.

---

## 6. Rules & Constraints

To maintain architectural consistency:

- UI components must not directly access services.
- All side effects must be isolated in the `services/` layer.
- Stores must remain minimal and predictable.
- Business logic must not live inside presentation components.
- Features should avoid tight coupling with other features.
- Cross-feature communication should occur only through stores or controlled abstractions.

These constraints ensure scalability and maintainability as the project grows.

---