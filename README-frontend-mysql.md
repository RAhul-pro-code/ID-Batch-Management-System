This repository was updated to include a React frontend (Vite) and optional MySQL development environment.

Quick start (full stack):

1) Start MySQL via Docker Compose

```powershell
cd C:\Users\rahul\Desktop\InternBatchSystem\demo
docker compose up -d
```

2) Build frontend and backend

```powershell
cd frontend
npm install
npm run build

cd ..
.\mvnw.cmd -DskipTests clean package
java -jar target\demo-0.0.1-SNAPSHOT.jar
```

3) Open app in browser: http://localhost:9090/

Environment variables (optional):
- `JDBC_DATABASE_URL`, `JDBC_DATABASE_USERNAME`, `JDBC_DATABASE_PASSWORD` to override DB settings.

If you want Maven to automatically build the frontend during `mvn package`, the project contains the frontend-maven-plugin configuration which will install Node/npm and run `npm install` and `npm run build` in `frontend/`.
