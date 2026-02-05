React frontend (Vite)

How to set up and build the React frontend:

1. Install Node.js (>=18) and npm.
2. From project root run:

   cd frontend
   npm install
   npm run build

3. The Vite build is configured to output into `src/main/resources/static` so Spring Boot will serve it at `/` (index available at `/index.html`).

In development, run `npm run dev` and open the dev server shown by Vite (proxy is not set up by default).

Notes:
- After `npm run build`, start Spring Boot and open http://localhost:9090/ (or /app/index.html if you prefer previous app path).
- Update `vite.config.js` `build.outDir` if you want a different output location.
