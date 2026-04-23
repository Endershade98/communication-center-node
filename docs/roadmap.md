# Communication Center Node

## Overview

Questo progetto è sviluppato seguendo un approccio **incrementale e enterprise-grade**, basato su:

- Domain-Driven Design (DDD)
- Event-Driven Architecture
- Polyglot Persistence
- Test-first mindset (Unit / Integration / E2E)

Ogni Epic introduce nuove capacità mantenendo il sistema sempre testato e funzionante.

---

# EPIC 1 — Core Domain & Persistence

## Obiettivo
Definire il dominio e salvare notifiche in modo consistente.

## Feature
- Entity: Notification
- Value Objects: Channel, Priority, Status
- Repository pattern
- Implementazioni:
  - InMemory
  - MySQL (Prisma)
- Use Case: CreateNotification

## Test
- Unit → Domain + Use Case
- Integration → Repository (MySQL / InMemory)

## Deliverable
- Dominio stabile
- Persistenza funzionante

---

# EPIC 2 — API Layer

## Obiettivo
Esporre un'interfaccia REST per interagire con il sistema.

## Feature
- POST /notifications
- GET /notifications/:id
- Controller + DTO
- Error handling middleware

## Test
- Unit → Controller (mock use case)
- Integration → API + repository
- E2E → API + DB reale

## Deliverable
- API funzionante e testata
- Supporto Postman / debugging

---

# EPIC 3 — Event Publishing (Redis)

## Obiettivo
Rendere il sistema asincrono e disaccoppiato.

## Feature
- RedisPublisher
- Event: notification.created
- Integrazione con Use Case

## Test
- Unit → Publisher (mock)
- Integration → Redis
- E2E → API → Redis

## Deliverable
- Sistema event-driven

---

# 🚀 EPIC 4 — Worker Processing

## Obiettivo
Processare notifiche asincrone.

## Feature
- notificationWorker
- Consumo eventi da Redis
- Invio tramite provider (Email/SMS/Push)
- Update stato (PROCESSING → SENT/FAILED)

## Test
- Unit → Worker logic
- Integration → Redis + worker
- E2E → API → Redis → Worker → DB

## Deliverable
- Pipeline completa di invio

---

# EPIC 5 — Retry & Failure Handling

## Obiettivo
Gestire errori e retry in modo robusto.

## Feature
- retryWorker
- Retry policy (maxRetries, backoff)
- Stati:
  - FAILED
  - RETRYING
  - DEAD

## Test
- Unit → Retry logic
- Integration → Retry flow
- E2E → Failure → Retry → Outcome

## Deliverable
- Sistema resiliente

---

# EPIC 6 — Observability (MongoDB)

## Obiettivo
Aggiungere audit trail e tracciabilità.

## Feature
- Event Store (MongoDB)
- Notification logs
- Tracking eventi:
  - created
  - sent
  - failed

## Test
- Unit → Event repository
- Integration → MongoDB
- E2E → Eventi salvati correttamente

## Deliverable
- Audit completo
- Debug avanzato

---

# EPIC 7 — Multi-Provider Strategy

## Obiettivo
Supportare diversi provider di notifica.

## Feature
- Email (SendGrid)
- SMS (Twilio)
- Push (Firebase)
- Strategy pattern

## Test
- Unit → Provider selection
- Integration → Provider mock
- E2E → Simulazione invio

## Deliverable
- Sistema estendibile

---

# EPIC 8 — Priority & Rate Limiting

## Obiettivo
Gestire carico e priorità.

## Feature
- Priority queue (HIGH, LOW)
- Throttling
- Rate limiting

## Test
- Priorità esecuzione
- Gestione carico

## Deliverable
- Sistema scalabile

---

# EPIC 9 — Security & Validation

## Obiettivo
Rendere l’API sicura e robusta.

## Feature
- Input validation (Joi/Zod)
- Sanitizzazione
- Rate limiting API

## Test
- Input invalidi
- Edge cases

## Deliverable
- API production-ready

---

# EPIC 10 — Full End-to-End System

## Obiettivo
Validare l’intero sistema.


## Deliverable
- Sistema completamente testato

---

# Test Strategy

| Tipo | Scopo |
|------|------|
| Unit | Logica isolata |
| Integration | Integrazione componenti |
| E2E | Flusso completo |

---

# Architettura finale

- MySQL → Source of truth
- Redis → Messaging / Queue
- MongoDB → Event store / Logs

---

# Obiettivo finale

Costruire un sistema:

- scalabile
- resiliente
- osservabile
- pronto per produzione

---