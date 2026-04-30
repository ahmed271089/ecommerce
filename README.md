# Full-Stack Project — Student Guidelines

## Overview

You will design, build, and present a full-stack web application of your choice. The subject of the app is up to you, but every technical requirement listed in this document is **mandatory**. Extra features beyond the minimum are appreciated and will be rewarded.

---

## Tech Stack

| Layer    | Technology                         |
|----------|------------------------------------|
| Frontend | React, React Router, Axios         |
| Backend  | Node.js, Express.js                |
| Auth     | JWT (JSON Web Tokens) + bcrypt     |
| Database | MySQL                              |
| ORM      | Sequelize                          |

---

## Mandatory Requirements

### 1. Authentication — JWT

Your app must have a complete authentication system.

**Backend**
- `POST /api/auth/register` — accept name, email, password; hash the password with `bcrypt`; save the user
- `POST /api/auth/login` — verify credentials; return a signed JWT on success
- A middleware function `authenticateToken` that reads and verifies the JWT from the `Authorization: Bearer <token>` header and protects all non-public routes
- Set a token expiration (e.g. `expiresIn: '24h'`)

**Frontend**
- Register page and Login page with forms
- Save the JWT to `localStorage` after a successful login

- A `ProtectedRoute` component that redirects unauthenticated users to `/login`
- A logout action that clears the token and redirects to `/login`

---

### 2. CRUD Operations

Your app must implement full **Create, Read, Update, and Delete** on at least one resource.

| Operation | What is expected |
|-----------|-----------------|
| Create    | A form that sends a POST request and adds a new record |
| Read      | A page that fetches and displays a list of records |
| Update    | A form (inline or modal) that edits an existing record |
| Delete    | A button that removes a record, with a confirmation step |

All operations must hit your Express API, pass through `authenticateToken`, and persist data in MySQL through Sequelize.

---

### 3. Search & Filter

Your list view must include both a search bar and at least one filter control.

- **Search** — a text input that finds records matching a keyword in one or more fields
- **Filter** — a dropdown, set of checkboxes, or date range that narrows results by a specific category or value
- Both must work at the same time (a search with an active filter should apply both)
- Server-side implementation is strongly preferred: pass query params to the backend and use a Sequelize `where` clause

---

### 4. Routing

Use **React Router** to handle navigation. Minimum required routes:

```
/login           → Login page          (public)
/register        → Register page       (public)
/dashboard       → Main list view      (protected)
/resource/:id    → Detail or edit view (protected)
```

Any route marked protected must redirect to `/login` when no valid token is found.

---

### 5. Folder Structure & Separation of Concerns

Code must be organized by responsibility.

**Rules that will be checked:**
- Routes must only call controller functions — no logic inside route files
- Controllers must use Sequelize models — no raw SQL strings


---



## Extra Features (Appreciated)

Any additional feature you choose to implement is appreciated — if it doesn't work, do not include it in your code or demo.



---

## Presentation Requirements

You must present your project with a **PowerPoint (.pptx) slide deck** alongside a live demo.


