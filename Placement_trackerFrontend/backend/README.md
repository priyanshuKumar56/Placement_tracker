# Career Hub Backend (Express + MongoDB)

- Folders:
  - src/server.js: start server
  - src/app.js: express app and routes
  - src/models: User (roles: student, recruiter, tpo), Job, Profile
  - src/routes: /api/auth, /api/jobs, /api/profiles
  - src/middleware: JWT auth and role guard

Quick start:
1) Create .env with:
   MONGO_URL=mongodb://127.0.0.1:27017/career_hub
   JWT_SECRET=replace-with-strong-secret
   PORT=4000
2) Install deps and run:
   npm install
   npm run dev

Endpoints:
- POST /api/auth/register { name, email, password, role, companyName? }
- POST /api/auth/login { email, password }
- GET  /api/jobs (public)
- POST /api/jobs (recruiter only, Bearer token)
- POST /api/jobs/:jobId/apply (student only)
- GET  /api/profiles/user/:userId (public)
- GET  /api/profiles/me (auth)
- PUT  /api/profiles/me (auth)
