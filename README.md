# Foundation Backend

Backend API for Foundation — an application for tracking personal progress, habits, and objectives.

Frontend: https://github.com/Whittun/foundation-frontend

## Features

* registration and authentication using JWT stored in an HttpOnly cookie;
* password hashing with Argon2;
* user-specific data stored in PostgreSQL;
* daily ratings and yearly progress data;
* daily notes with Tiptap JSON support;
* habit and habit-level management;
* objectives graph persistence;
* validation of relationships between graph nodes;
* optimistic version checking to prevent update conflicts;
* request validation.

## Tech Stack

* NestJS
* TypeScript
* PostgreSQL
* TypeORM
* JWT
* Argon2
* class-validator
* Docker Compose
* Jest

## Local Setup

Node.js, npm, and Docker are required.

```bash
git clone https://github.com/Whittun/foundation-backend.git
cd foundation-backend
npm install
cp .env.example .env
docker compose up -d
npm run start:dev
```

The backend will be available at:

```text
http://localhost:3000
```

By default, the frontend should run at `http://localhost:3001`.

The configuration provided in `.env.example` is intended for local development only.

## Available Scripts

```bash
npm run build
npm run lint
npm run test
npm run migration:run
```

## Status

Foundation is currently under active development and is not production-ready yet. The backend module for the Task Board is currently in progress.
