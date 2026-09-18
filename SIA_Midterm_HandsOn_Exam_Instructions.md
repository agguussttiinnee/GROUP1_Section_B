# Systems Integration and Architecture (SIA)
## Midterm Hands-On Examination: Introduction to REST APIs & Modular Routing

---

### **General Assessment Information**
* **Course:** Systems Integration and Architecture (SIA)
* **Assessment Type:** Midterm Hands-On Practical Examination
* **Total Weight:** 100% (80% Group System Integration | 20% Individual Route Delivery & Git Contribution)
* **Team Structure:** 3 or 4 members per group (1 distinct resource router per student)
* **Technology Stack:** Node.js, Express.js (v5.x), CommonJS, Git, GitHub
* **Baseline Configuration:** Port `1234`, Host `http://localhost:1234`, Main entry `index.js`

---

## 1. Examination Scenario & Architecture Overview
In Systems Integration and Architecture, Application Programming Interfaces (APIs) serve as standardized software contracts that allow heterogeneous subsystems to communicate, share data, and trigger workflows seamlessly without exposing internal data structures or implementation mechanics.

Your team has been commissioned to build a modular RESTful API gateway for an organizational management system. Starting from the classroom baseline server (`index.js` configured on port `1234`), your team will decouple and extend the application by organizing domain resources into dedicated router files using Express Router (`express.Router()`).

### **Starter Baseline Code (`index.js`)**
```javascript
// Package imports
const express = require('express')

const app = express()

app.use('/', require('./routes/users.routes'))
app.use('/api/users', require('./routes/users.routes'))
app.use('/api/me', require('./routes/users.routes'))

app.listen(1234, () => {
	console.log('Server is running on http://localhost:1234')
})
```

---

## 2. Project Specifications

### **Part 1: Group System Architecture & Integration (80% Total Weight)**
The group must collaborate within a single public GitHub repository to configure a maintainable, enterprise-aligned REST API architecture.

#### **A. Team Domain Allocation (3-Member vs. 4-Member Groups)**
Every member in the group must be designated as the sole author and owner of **one distinct domain resource router**. No duplicate resources are allowed within the same group:
* **For 3-Member Teams:** Implement 3 distinct resource routers:
  1. `users.routes.js` (e.g., User management: accounts, roles, profiles)
  2. `products.routes.js` (e.g., Catalog/Inventory: items, pricing, stock)
  3. `orders.routes.js` (e.g., Transactions: checkout, order history, billing)
* **For 4-Member Teams:** Implement 4 distinct resource routers:
  1. `users.routes.js` (User management)
  2. `products.routes.js` (Catalog/Inventory)
  3. `orders.routes.js` (Transactions/Orders)
  4. One additional organizational domain chosen by the group:
     * `categories.routes.js` (Classification and taxonomies)
     * `reviews.routes.js` (Feedback, ratings, customer experience)
     * `suppliers.routes.js` (External vendor and procurement data)
     * `notifications.routes.js` (Alerts and audit messaging)

#### **B. Repository Configuration & Environment Hygiene**
1. **Package Initialization:** Maintain a valid `package.json` with `"type": "commonjs"` and `"express": "^5.2.1"` listed under runtime dependencies.
2. **Execution Scripts:** Configure the `"scripts"` section with:
   * `"dev": "node index.js"` (or `"nodemon index.js"` if using hot reload).
3. **Version Control Protection:** Configure `.gitignore` to prevent tracking of:
   * `node_modules/`
   * Environment files (`.env`, `.env.local`)
   * OS/IDE metadata (`.DS_Store`, `.vscode/`, `.idea/`)
   * **Strict Policy:** Committing `node_modules` into the Git tree history at any point results in an immediate automatic deduction for the entire group.

#### **C. Entry Point & Global Middleware Setup**
1. **Body Parsing Middleware:** Register built-in `express.json()` at the application level in `index.js` **before** mounting any router files so incoming JSON payloads are properly parsed onto `req.body`.
2. **Server Binding:** Ensure the server listens on port `1234` and prints `Server is running on http://localhost:1234` upon boot.
3. **Route Mounting:** Mount all resource routers cleanly inside `index.js` using plural, noun-based resource paths:
   * `/api/users`
   * `/api/products`
   * `/api/orders`
   * `/api/categories` (or chosen 4th domain for 4-member groups)

#### **D. Modular File Structure**
The repository must adhere strictly to the following directory layout:

```text
activity_sia/
├── .gitignore                      # Explicitly excludes node_modules/ and temp files
├── package.json                    # Contains metadata, scripts, and express dependency
├── package-lock.json
├── README.md                       # Documentation, member matrix, and run instructions
├── index.js                        # Express server entry point (Port 1234)
└── routes/
    ├── users.routes.js             # Subsystem 1: Member 1
    ├── products.routes.js          # Subsystem 2: Member 2
    ├── orders.routes.js            # Subsystem 3: Member 3
    └── <resource>.routes.js        # Subsystem 4: Member 4 (Required for 4-member teams)
```

#### **E. REST API Standards & Response Formatting**
1. **Predictable Envelope Pattern:** All endpoints across all routers must return JSON responses wrapped in a uniform response envelope:
   ```json
   {
     "success": true,
     "data": [ ... ],
     "meta": {
       "timestamp": "2026-09-17T18:45:00.000Z",
       "count": 1
     }
   }
   ```
2. **HTTP Status Code Precision:**
   * `200 OK`: Successful resource retrieval (`GET`) or update.
   * `201 Created`: Successful creation of a new resource (`POST`).
   * `204 No Content`: Successful deletion (`DELETE`) with an empty body.
   * `400 Bad Request`: Missing mandatory fields or malformed payload.
   * `404 Not Found`: Target resource or endpoint does not exist.
3. **Catch-All 404 Route Handler:** Place a fallback route handler at the very bottom of `index.js` (after all routers) to return a structured JSON 404 response for unmatched routes:
   ```json
   {
     "success": false,
     "error": {
       "code": "NOT_FOUND",
       "message": "The requested endpoint does not exist on this server."
     }
   }
   ```

---

### **Part 2: Individual Contribution & Route Delivery (20% Total Weight)**
Each student is evaluated independently based on their branch discipline, semantic commits, and assigned resource router implementation.

#### **A. Git Branching Model**
* Direct commits pushed to `main` are strictly prohibited.
* Each member must develop exclusively on their designated feature branch:  
  `feature/<firstname>-<resource>` (e.g., `feature/franc-users`, `feature/alex-products`).
* Code must be integrated into `main` via a formal GitHub Pull Request (PR) containing testing evidence (e.g., sample curl or Postman response outputs).

#### **B. Semantic Commit Standards**
* Each member must contribute a minimum of **3 atomic commits** following standard conventional commit syntax:
  * `feat:` (e.g., `feat: implement product retrieval and query filtering`)
  * `fix:` (e.g., `fix: handle 404 status when product id is missing`)
  * `refactor:` (e.g., `refactor: clean up response envelope formatting`)
  * `chore:` (e.g., `chore: configure initial router export`)

#### **C. Individual Subsystem Endpoint Implementation**
Using in-memory arrays (mock data collections), each member must implement the following operations inside their designated router file (`express.Router()`):
1. **`GET /api/<resource>`:** Returns the full collection; must support query string filtering via `req.query` (e.g., `?category=tech` or `?role=admin`).
2. **`GET /api/<resource>/:id`:** Retrieves a single item using route parameters (`req.params.id`); returns `404 Not Found` if the item is missing.
3. **`POST /api/<resource>`:** Reads incoming payload from `req.body` using `express.json()`, validates required fields, generates a unique ID, appends the record, and returns `201 Created` with the new resource envelope.
4. **`DELETE /api/<resource>/:id`:** Removes the record matching `req.params.id` from the array and returns status `204 No Content`.

---

## 3. Grading Rubrics

### **A. Group System Evaluation (80 Points / 80%)**

| Assessment Category | Criteria & Performance Indicators | Max Points |
| :--- | :--- | :---: |
| **Project Setup & Environment** | Valid `package.json` with working `"dev"` script; `.gitignore` properly active; zero committed `node_modules` in repository history. | 15 |
| **Server & Middleware Setup** | Server boots on `http://localhost:1234`; `express.json()` registered before routes; all member routers (3 or 4) cleanly mounted in `index.js`. | 25 |
| **REST Design & URL Modeling** | Plural noun URIs (no verbs in paths); functional query filtering; catch-all 404 handler active. | 20 |
| **Standardized Response Envelope** | All endpoints consistently deliver the standardized JSON envelope (`success`, `data`, `meta`/`error`) with accurate HTTP status codes (200, 201, 204, 400, 404). | 20 |
| **Total Group Score** | | **80 Points** |

---

### **B. Individual Contribution Evaluation (20 Points / 20%)**

| Assessment Category | Criteria & Performance Indicators | Max Points |
| :--- | :--- | :---: |
| **Branching & PR Workflow** | Worked inside dedicated `feature/<name>-<resource>` branch; merged to `main` via documented Pull Request with testing proof. | 8 |
| **Commit Quality & Semantics** | Minimum of 3 atomic commits using proper semantic prefixes (`feat:`, `fix:`, `refactor:`) reflecting actual feature iteration. | 6 |
| **Endpoint Logic & Implementation** | Assigned router implements GET (list & by ID), POST, and DELETE using `req.params`, `req.query`, and `req.body` correctly. | 6 |
| **Total Individual Score** | | **20 Points** |

---

## 4. Submission Requirements

1. **Repository URL:** The Group Leader must submit the public GitHub repository link.
2. **README Documentation:** The root `README.md` must include:
   * **Project Title & Team Name**
   * **Team Member Task Allocation Matrix:**
     | Member Name | Assigned Resource Router | Feature Branch | Merged Pull Request Link |
     | :--- | :--- | :--- | :--- |
     | Student 1 | `routes/users.routes.js` | `feature/name-users` | PR #1 |
     | Student 2 | `routes/products.routes.js` | `feature/name-products` | PR #2 |
     | Student 3 | `routes/orders.routes.js` | `feature/name-orders` | PR #3 |
     | Student 4 *(if 4-member group)* | `routes/<resource>.routes.js` | `feature/name-<resource>` | PR #4 |
   * **Execution Instructions:** Clear step-by-step commands to clone, install dependencies, and run the project locally (`npm install`, `npm run dev`).
3. **Commit History Audit:** Individual grades will be cross-referenced against the repository's GitHub Insights contributor graph and commit logs. Missing individual feature branches or commits will result in zero points for the individual 20% portion.
