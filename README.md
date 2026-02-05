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

Base URL: `http://localhost:9090`

Batches:
- `POST /api/batches` — create batch
- `GET /api/batches` — list batches
- `GET /api/batches/{id}` — get one batch
- `PUT /api/batches/{id}` — update batch
- `DELETE /api/batches/{id}` — delete batch

Interns:
- `POST /api/interns` — create intern
- `GET /api/interns` — list interns
- `GET /api/interns/{id}` — get one intern
- `PUT /api/interns/{id}` — update intern
- `DELETE /api/interns/{id}` — delete intern
- `PUT /api/interns/{id}/performance?performanceScore=X` — update performance score

Health:
- `GET /health` — simple health check (returns status `UP` if running)

H2 console:
- `http://localhost:9090/h2-console` (JDBC URL: `jdbc:h2:mem:testdb`, user `sa`, no password)

---

## Example cURL requests (copy and run in terminal)

Create a batch:

```bash
curl -X POST http://localhost:9090/api/batches \
  -H "Content-Type: application/json" \
  -d '{
    "batchName": "Java Batch 2024",
    "startDate": "2024-02-01",
    "endDate": "2024-04-30",
    "technology": "Java Spring Boot",
    "capacity": 30,
    "description": "Learn Java with Spring Boot"
  }'
```

Create an intern (replace `batch.id` with a real batch id):

```bash
curl -X POST http://localhost:9090/api/interns \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Rahul",
    "lastName": "Kumar",
    "email": "rahul.kumar@example.com",
    "phoneNumber": "9876543210",
    "college": "Delhi University",
    "degree": "B.Tech",
    "specialization": "Computer Science",
    "dateOfBirth": "2002-05-15",
    "address": "123 Main Street",
    "enrollmentDate": "2024-02-01",
    "batch": { "id": 1 }
  }'
```

Get all batches:

```bash
curl http://localhost:9090/api/batches
```

---

## H2 Database console

1. Open `http://localhost:9090/h2-console` in your browser.
2. Use JDBC URL `jdbc:h2:mem:testdb`, user `sa`, password blank, then click Connect.
3. You can run SQL queries such as `SELECT * FROM batches;` or `SELECT * FROM interns;`.

Note: The H2 database is in-memory. When you stop the app the data is lost. For persistent storage use a file-based or external database such as PostgreSQL.

---

## Common problems and fixes

- "Connection refused" when opening `http://localhost:9090`:
  - Check the app is running in the terminal where you started it.
  - Make sure no other process is using port 9090. To change the port edit `src/main/resources/application.properties` (`server.port`) or set `--server.port=XXXX` when starting.

- `400 Bad Request` when creating batches or interns:
  - Make sure `Content-Type: application/json` header is present.
  - Check required fields are present and the JSON is valid (dates use `YYYY-MM-DD`, `capacity` is a number).

- Port already in use:
  - Stop the other app using that port or change this app's port in `application.properties`.

---

## How to push this project to GitHub (if you want to keep a copy online)

1. Create a new repository on GitHub (for example `ID-Batch-Management-System`).
2. From project root run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/ID-Batch-Management-System.git
git push -u origin main
```

Replace `<your-username>` with your GitHub username.

Note: This project has already been pushed to `https://github.com/RAhul-pro-code/ID-Batch-Management-System`.

---

## Next ideas (optional improvements)

- Replace the static UI with a React or Angular frontend for a better user experience.
- Add server-side validation and DTOs to prevent invalid data.
- Switch to PostgreSQL or MySQL for persistent data storage.
- Add authentication (Spring Security) to protect the API.

---

## Need help?

If anything is unclear or you want me to implement an improvement (for example, add a dropdown that lists batches in the intern form or scaffold a React app), tell me which feature and I'll implement it.

Happy coding! 👩‍💻👨‍💻
# ID-Batch-Management-System