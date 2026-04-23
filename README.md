# Notification Service

## Overview

Notification Service is a scalable, resilient, and production-ready communication system designed to handle multi-channel notifications (Email, SMS, Push). It follows Domain-Driven Design (DDD) principles and clean architecture, making it modular, testable, and extensible.

The system is built to simulate real-world distributed architectures similar to those used in high-scale environments (e.g., FAANG-level systems), with a strong focus on reliability, observability, and asynchronous processing.

---

## Key Features

* Multi-channel notification support (Email, SMS, Push)
* Clean Architecture (Domain, Application, Infrastructure, Interfaces)
* Event-driven design with Redis-based messaging
* MySQL persistence using Prisma ORM
* In-memory repositories for fast unit testing
* Fully tested (unit + integration)
* Dockerized infrastructure
* Extensible provider system (SendGrid, Twilio, Firebase)
* Retry mechanism for failed notifications

---

## Architecture

The project follows a layered architecture:

```
src/
├── domain          # Core business logic (entities, value objects, events)
├── application     # Use cases and orchestration
├── infrastructure  # External systems (DB, Redis, providers)
├── interfaces      # HTTP layer (controllers, routes)
├── workers         # Background processing
└── shared          # Utilities, errors, constants
```

### Layers Description

* **Domain Layer**

  * Contains pure business logic
  * No external dependencies
  * Includes Entities, Value Objects, Domain Events

* **Application Layer**

  * Orchestrates use cases
  * Coordinates domain + infrastructure

* **Infrastructure Layer**

  * Database (Prisma + MySQL)
  * Messaging (Redis)
  * External providers (SendGrid, Twilio, Firebase)

* **Interfaces Layer**

  * REST API (Express)
  * Controllers and routes

* **Workers**

  * Async processing (queue consumers, retries)

---

## Tech Stack

* Node.js (ES Modules)
* Express
* Prisma ORM
* MySQL
* Redis
* Jest (testing)
* Docker / Docker Compose

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd notification-service
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start infrastructure (MySQL)

```bash
docker-compose -f docker/docker-compose.yml up -d
```

### 4. Setup environment variables

Create `.env`:

```
PORT=3000

DATABASE_URL="mysql://app:apppassword@localhost:3306/notification_dev"

REDIS_HOST=localhost
REDIS_PORT=6379
```

### 5. Run Prisma migrations

```bash
npx prisma migrate dev
npx prisma generate
```

### 6. Start the server

```bash
npm run dev
```

Server will run at:

```
http://localhost:3000
```

---

## API

### Create Notification

**POST /notifications**

```json
{
  "recipient": "user@example.com",
  "message": "Hello World",
  "channel": "EMAIL",
  "priority": "HIGH"
}
```

### Response

```json
{
  "id": "uuid",
  "status": "PENDING"
}
```

---

## Testing

### Run all tests

```bash
npm test
```

### Test types

* Unit tests (Domain, Application)
* Integration tests (Repositories, API)
* In-memory testing for fast feedback

---

## Event Flow

1. API receives request
2. Use case creates Notification entity
3. Notification is persisted (MySQL)
4. Event is published (Redis)
5. Worker consumes event
6. Provider sends notification
7. Status is updated (SENT / FAILED)
8. Retry logic triggers if needed

---

## Design Principles

* Separation of concerns
* Dependency injection
* Testability first
* Event-driven communication
* Idempotency in processing
* Fail-safe mechanisms

---

## Scalability Strategy

* Horizontal scaling via stateless services
* Message queue (Redis) decoupling
* Worker-based processing
* Retry queues for failure handling

---

## Resilience Strategy

* Retry mechanism for failed notifications
* Isolation of external providers
* Graceful degradation
* Error boundaries at each layer

---

## Observability

Future improvements include:

* Structured logging
* Distributed tracing
* Metrics collection (Prometheus)
* Centralized logging (ELK stack)

---

## Roadmap

* API rate limiting
* Authentication & authorization
* Dead-letter queues
* Notification templates
* Scheduling (delayed notifications)
* Circuit breaker for providers
* Full observability stack

---

## Contributing

This project is intended as a curriculum-level system design and backend engineering showcase.

Contributions should follow:

* Clean architecture principles
* High test coverage
* Consistent coding standards

---

## License

MIT License
