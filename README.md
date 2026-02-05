# IDMS — Intern & Batch Data Management System

A simple, beginner-friendly Java Spring Boot application to manage internship batches and interns.
It provides REST APIs for CRUD operations, an in-memory H2 database for storage (for testing),
and a minimal static frontend to perform basic create/read/update/delete tasks from your browser.

This README explains how to build, run, and use the project step by step in plain words.

---

## Quick Summary
- Start the app with Maven or run the packaged JAR.
- Open the UI at `http://localhost:9090/app/index.html` and use forms to manage batches and interns.
- Use the H2 console at `http://localhost:9090/h2-console` to inspect the database.

---

## Tech stack
- Java 17
- Spring Boot (Web + Data JPA)
- H2 (in-memory database for testing)
- Maven (build)
- Plain HTML/CSS/JavaScript static frontend (served by Spring Boot)

---

## Prerequisites (what you need installed)
- Java JDK 17+ installed and `java` available on PATH
- Git (optional, for source control)
- Internet access to clone or push to GitHub (optional)

If you don't have Java installed, download and install an appropriate JDK for your OS.

---

## Project structure (important files)
- Main application: [src/main/java/com/example/demo/DemoApplication.java](src/main/java/com/example/demo/DemoApplication.java)
- Batch & Intern entities: [src/main/java/com/example/demo/entity/Batch.java](src/main/java/com/example/demo/entity/Batch.java), [src/main/java/com/example/demo/entity/Intern.java](src/main/java/com/example/demo/entity/Intern.java)
- Controllers: [src/main/java/com/example/demo/controller/BatchController.java](src/main/java/com/example/demo/controller/BatchController.java), [src/main/java/com/example/demo/controller/InternController.java](src/main/java/com/example/demo/controller/InternController.java), [src/main/java/com/example/demo/controller/HomeController.java](src/main/java/com/example/demo/controller/HomeController.java)
- Services: [src/main/java/com/example/demo/service/BatchService.java](src/main/java/com/example/demo/service/BatchService.java), [src/main/java/com/example/demo/service/InternService.java](src/main/java/com/example/demo/service/InternService.java)
- Repositories: [src/main/java/com/example/demo/repository/BatchRepository.java](src/main/java/com/example/demo/repository/BatchRepository.java), [src/main/java/com/example/demo/repository/InternRepository.java](src/main/java/com/example/demo/repository/InternRepository.java)
- Frontend files: [src/main/resources/static/app/index.html](src/main/resources/static/app/index.html), [src/main/resources/static/app/app.js](src/main/resources/static/app/app.js), [src/main/resources/static/app/styles.css](src/main/resources/static/app/styles.css)
- Configuration: [src/main/resources/application.properties](src/main/resources/application.properties)

---

## How to build and run (step-by-step)

1. Open a terminal (PowerShell on Windows) and go to the project root folder:

```powershell
cd C:\Users\rahul\Desktop\InternBatchSystem\demo
```

2. To build the project with Maven and create an executable JAR:

```powershell
.\mvnw.cmd clean package
```

This creates the JAR in `target/demo-0.0.1-SNAPSHOT.jar`.

3. To run the application from the JAR:

```powershell
cd target
java -jar demo-0.0.1-SNAPSHOT.jar
```

Or run directly from the project root (no JAR):

```powershell
.\mvnw.cmd spring-boot:run
```

When the app starts it listens on port `9090` (default in this project). If that port is busy you will see an error.

---

## Open the UI (easy way to do CRUD)

1. In your browser open:

```
http://localhost:9090/app/index.html
```

2. The UI has two tabs: **Batches** and **Interns**. Use the forms to create or edit records. The tables show the current records.

Notes:
- When creating an intern, enter the `Batch ID` of an existing batch (you can get it from the Batches table).
- After creating or updating, the UI refreshes the lists automatically.

---

## API Endpoints (for automated calls or Postman)

# IDMS — Intern & Batch Data Management System

This repository contains a Spring Boot backend and a modern React (Vite) frontend to manage internship batches and interns.
The project supports running with an embedded H2 database for quick testing, or with MySQL for persistent storage. The Maven build is configured to optionally build the React frontend and package it inside the Spring Boot app.

Contents & quick links
- Backend: Spring Boot (Java 17) — source in `src/main/java`
- REST API controllers, services, repositories under `com.example.demo`
- React frontend (Vite) scaffold under `frontend/` (build output is written into Spring Boot static resources)
- Docker Compose file `docker-compose.yml` to start a local MySQL for development
- Configuration: `src/main/resources/application.properties`

Quick status
- Static JS UI (legacy) kept under `src/main/resources/static/app` for reference.
- React frontend scaffold added under `frontend/` (recommended UI).
- MySQL connector added to `pom.xml` and `application.properties` updated to support MySQL via environment variables.

Prerequisites
- Java 17+
- Maven (wrapper `./mvnw.cmd` included)
- Node.js (for local frontend dev/build) — recommended v18+
- Docker (optional, to run MySQL via `docker-compose`)

Run options (recommended for full-stack local dev)

1) Start MySQL (optional) — either use your existing MySQL or Docker Compose included here.

Using Docker Compose (recommended if you don't have a local MySQL configured):

```powershell
cd C:\Users\rahul\Desktop\InternBatchSystem\demo
docker compose up -d
```

The compose file creates a MySQL 8 container. Defaults in the compose file:
- MYSQL_ROOT_PASSWORD: `change_me`
- MYSQL_DATABASE: `idms_db`
- MYSQL_USER: `idms_user`
- MYSQL_PASSWORD: `idms_pass`

If you already have MySQL (you said you do) you can skip Docker. By default this project is configured with environment-driven credentials. The app defaults were set to:

- JDBC URL: `jdbc:mysql://localhost:3306/idms_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC`
- Username: `root`
- Password: `Rahulbh@3123`

You can override these by setting environment variables before startup:

- `JDBC_DATABASE_URL`
- `JDBC_DATABASE_USERNAME`
- `JDBC_DATABASE_PASSWORD`

For example (PowerShell):

```powershell
$env:JDBC_DATABASE_USERNAME='root'
$env:JDBC_DATABASE_PASSWORD='Rahulbh@3123'
# optional: $env:JDBC_DATABASE_URL='jdbc:mysql://host:3306/idms_db?createDatabaseIfNotExist=true'
```

2) Build frontend (if you want the React app inside Spring Boot static folder)

You can build the React app manually or let Maven do it automatically during `mvn package`.

Manual build (recommended if developing frontend):

```powershell
cd frontend
npm install
npm run build

# The Vite build is configured to output into src/main/resources/static
```

Automatic build via Maven (already configured):

When you run `mvn package`, the `frontend-maven-plugin` will install Node/npm (if necessary) and run `npm install` and `npm run build` in `frontend/`. The built static files are placed under `src/main/resources/static` so Spring Boot serves them.

3) Build and run the Spring Boot backend

```powershell
cd C:\Users\rahul\Desktop\InternBatchSystem\demo
.\mvnw.cmd -DskipTests clean package
java -jar target\demo-0.0.1-SNAPSHOT.jar
```

Or run in dev mode:

```powershell
.\mvnw.cmd spring-boot:run
```

Open the UI in your browser:

- React build served by Spring Boot: `http://localhost:9090/` (index from frontend build)
- Legacy static UI: `http://localhost:9090/app/index.html` (kept for quick testing)

API and usage

All endpoints are served under `/api`.

Batches: `POST /api/batches`, `GET /api/batches`, `GET /api/batches/{id}`, `PUT /api/batches/{id}`, `DELETE /api/batches/{id}`

Interns: `POST /api/interns`, `GET /api/interns`, `GET /api/interns/{id}`, `PUT /api/interns/{id}`, `DELETE /api/interns/{id}`

Example cURL requests and Postman collections are available in the repository (you can import or use the UI directly).

Security & configuration notes
- The repository currently contains example defaults for local development; do not store production credentials in plaintext. Prefer environment variables or a secrets manager for production.
- The app reads DB configuration from environment variables (`JDBC_DATABASE_*`). Update your CI/CD or local environment accordingly.

Development notes
- React dev server: from `frontend/` run `npm run dev` for fast iteration (it runs on Vite's dev server). If you run the React dev server, it serves on a different port — either proxy API calls or use the packaged static build for a single origin.
- Maven frontend plugin: building with Maven will automatically run the frontend build during `generate-resources` phase (see `pom.xml`).

Files of interest
- `frontend/` — React source and build config (Vite)
- `src/main/resources/static/app` — legacy static UI (HTML/CSS/JS)
- `src/main/resources/application.properties` — environment-driven DB config
- `docker-compose.yml` — optional MySQL for local development

Troubleshooting
- If Spring Boot fails to start, check logs for DB connection errors and verify MySQL is reachable with the credentials you provided.
- If port 9090 is in use, change `server.port` in `application.properties` or stop the other process.

Contributing / next steps
- I can: wire Docker Compose to also bring up the app service, add migrations (Flyway/Liquibase), or improve the React UI (modals, validation, icons). Tell me which one you'd like next.

Repository pushed

All changes (React scaffold, frontend integration, MySQL support, Docker Compose) are committed and pushed to the repository `origin/main`.

---

If you want, I can now start your local MySQL connection and run the app here to verify everything end-to-end — say "run now" and I'll start the app and run a quick create→list flow.
