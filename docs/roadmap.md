# Communication Center Node

## Overview

Communication Center Node è un sistema distribuito per la gestione e consegna asincrona di notifiche.

Il progetto segue un approccio incrementale enterprise-grade basato su:

* Domain-Driven Design (DDD)
* Event-Driven Architecture
* Redis Streams
* Consumer Groups
* Polyglot Persistence
* Hexagonal / Clean Architecture
* Test-first mindset (Unit / Integration / E2E)

L'obiettivo è costruire un sistema di notifiche:

* scalabile
* resiliente
* estendibile
* provider agnostic
* pronto per produzione

Ogni Epic mantiene il sistema funzionante e incrementa le capacità senza rompere i core business già implementati.

---

# EPIC 1 — Core Domain & Persistence

## Obiettivo

Definire il modello di dominio e garantire la persistenza delle notifiche.

## Feature

* Entity:

  * Notification

* Value Objects:

  * Channel
  * Priority
  * NotificationStatus

* State Machine:

  * PENDING
  * PROCESSING
  * SENT
  * FAILED
  * RETRYING
  * DEAD

* Repository Pattern

Implementazioni:

* InMemory Repository
* MySQL Repository (Prisma)

Use Case:

* CreateNotification

## Test

Unit:

* Domain Entity
* Value Objects
* Domain Rules
* Use Case

Integration:

* Repository MySQL
* Repository InMemory

## Deliverable

* Dominio stabile
* Persistenza funzionante
* Base per sistemi distribuiti

---

# EPIC 2 — API Layer

## Obiettivo

Esporre il sistema tramite API REST.

## Feature

Endpoint:

```
POST /notifications

GET /notifications/:id

GET /notifications/:id/status
```

Componenti:

* Controller
* DTO
* Middleware error handling
* Request validation

## Test

Unit:

* Controller
* DTO mapping

Integration:

* API + Repository

E2E:

* HTTP → Database

## Deliverable

API pubblica funzionante.

---

# EPIC 3 — Event Driven Architecture con Redis Streams

## Obiettivo

Disaccoppiare la creazione delle notifiche dal processo di invio.

Il sistema passa da una comunicazione sincrona ad un modello basato su eventi.

## Feature

Messaging Layer:

* Redis Streams Publisher
* Event Dispatcher

Stream principali:

```
notifications:created
```

Eventi:

* NotificationCreated

Payload:

```json
{
 id,
 recipient,
 message,
 channel,
 priority
}
```

Consumer Group:

```
notification-workers
```

## Test

Unit:

* Event Dispatcher
* Publisher

Integration:

* Redis Stream
* Consumer Group bootstrap

E2E:

```
API
 |
 v
CreateNotificationUseCase
 |
 v
Redis Stream
```

## Deliverable

Sistema event-driven funzionante.

---

# EPIC 4 — Distributed Notification Worker

## Obiettivo

Creare il motore distribuito di processamento notifiche.

## Feature

Worker:

```
notificationWorker
```

Basato su:

* Redis Streams Consumer Group
* Message acknowledgement
* Consumer identity

Pipeline:

```
Redis Stream

      |
      v

Worker

      |
      v

ProcessNotificationUseCase

      |
      v

Provider

      |
      v

Update Status
```

## Provider abstraction

Supporto tramite interfaccia:

```
NotificationProvider
```

Canali:

* EMAIL
* SMS
* PUSH

Implementazioni iniziali:

* Fake Provider
* Provider adapters

## Stati

Successo:

```
PROCESSING
     |
     v
 SENT
```

Errore:

```
PROCESSING
     |
     v
 FAILED
```

## Test

Unit:

* ProcessNotificationUseCase
* Provider selection

Integration:

* Redis Stream
* Worker
* Database

E2E:

```
API
 |
Redis Stream
 |
Worker
 |
Database
```

## Deliverable

Prima pipeline distribuita di invio notifiche.

---

# EPIC 5 — Production Ready Notification Engine

## Obiettivo

Rilasciare la prima versione stabile del sistema distribuito.

A fine Epic 5 il sistema deve essere utilizzabile come notification service base.

## Feature

## Retry Engine

Implementazione:

* RetryNotification Use Case
* Retry policy
* Max retry attempts

Configurazione:

```
maxRetries
backoffStrategy
retryDelay
```

Flusso:

```
FAILED

 |

retry available?

 |

YES

 |

RETRYING

 |

PROCESSING
```

---

## Dead Letter Queue

Nuovo stream:

```
notifications:dead
```

Quando:

```
retryCount >= maxRetries
```

la notifica viene spostata in DLQ.

---

## Reliability

Implementare:

* idempotency
* duplicate event protection
* message acknowledgement
* consumer recovery

---

## Test

Unit:

* RetryNotification
* Retry policy
* State transitions

Integration:

* Retry flow
* DLQ flow
* Worker recovery

E2E:

Scenario completo:

```
CREATE

 |

REDIS STREAM

 |

WORKER

 |

PROVIDER FAILURE

 |

RETRY

 |

SUCCESS / DEAD
```

---

## Deliverable

Release 1.0 del sistema notifiche distribuito:

* API
* Persistence
* Redis Streams
* Worker
* Retry
* DLQ
* Provider abstraction

Il sistema è funzionante e deployabile.

---

# EPIC 6 — Observability & Audit Trail

## Obiettivo

Aggiungere tracciabilità completa del sistema.

## Feature

Event Store:

MongoDB

Salvataggio:

* NotificationCreated
* NotificationSent
* NotificationFailed
* NotificationRetryScheduled

Audit:

* timestamp
* status changes
* provider response
* errors

## Test

Unit:

* Event repository

Integration:

* MongoDB persistence

E2E:

* Event history completa

## Deliverable

Sistema osservabile e debuggabile.

---

# EPIC 7 — Real Provider Integration

## Obiettivo

Collegare provider reali.

## Feature

Email:

* SMTP
* SendGrid
* AWS SES

SMS:

* Twilio

Push:

* Firebase Cloud Messaging

Implementazione tramite Adapter Pattern.

## Test

Unit:

* Provider selection

Integration:

* Provider mock

E2E:

* Delivery simulation

## Deliverable

Sistema multi-canale reale.

---

# EPIC 8 — Scalability & Performance

## Obiettivo

Gestire carichi elevati.

## Feature

Priority processing:

```
HIGH
NORMAL
LOW
```

Rate limiting.

Throttling.

Worker scaling:

* multiple consumers
* horizontal scaling

Redis Stream tuning:

* batch consume
* pending messages recovery

## Test

* Load simulation
* Concurrency tests

## Deliverable

Sistema scalabile.

---

# EPIC 9 — Security & API Hardening

## Obiettivo

Preparare il servizio ad ambienti enterprise.

## Feature

Validation:

* Joi / Zod

Security:

* authentication
* authorization

API protection:

* rate limiting
* sanitization

## Test

* Invalid payload
* Unauthorized access
* Security edge cases

## Deliverable

API production ready.

---

# EPIC 10 — Deployment & Operations

## Obiettivo

Rendere il sistema operativo in ambiente reale.

## Feature

Docker:

Services:

```
notification-api

notification-worker

mysql

redis

mongodb
```

CI/CD:

* automated tests
* migrations
* deployment pipeline

Monitoring:

* logs
* metrics
* health checks

## Deliverable

Sistema completo pronto al rilascio.

---

# Final Architecture

```
                 Client

                   |

                   v

            Notification API

                   |

                   v

        CreateNotificationUseCase

                   |

                   v

              MySQL

                   |

                   v

          Domain Event Dispatcher

                   |

                   v

            Redis Streams

                   |

          +--------+--------+

          |                 |

          v                 v

 Notification Worker     Retry Worker

          |

          v

 ProcessNotificationUseCase

          |

          v

 Provider Factory

     |       |       |

   Email    SMS    Push


          |

          v

      Notification Status


          |

          v

       MongoDB Audit
```

---

# Technology Roles

| Tecnologia    | Responsabilità         |
| ------------- | ---------------------- |
| MySQL         | Source of truth        |
| Redis Streams | Event backbone / queue |
| MongoDB       | Audit e storico eventi |
| Prisma        | Persistence layer      |
| Docker        | Runtime environment    |
| Jest          | Test strategy          |

---

# Obiettivo finale

Costruire un notification service:

* event-driven
* distribuito
* resiliente
* osservabile
* provider independent
* pronto per produzione
