# System States & Codes Documentation

## Overview

This document defines the standardized states, codes, and meanings used across the Notification Service. It is intended to ensure consistency in:

* Business logic
* Logging and monitoring
* Flowcharts and UML diagrams
* Debugging and observability
* Communication between services

---

## 1. Notification Status

| Code    | Status     | Description                                         | Terminal | Retryable |
| ------- | ---------- | --------------------------------------------------- | -------- | --------- |
| NTF-001 | PENDING    | Notification created but not yet processed          | No       | Yes       |
| NTF-002 | PROCESSING | Notification is currently being handled by a worker | No       | No        |
| NTF-003 | SENT       | Notification successfully delivered                 | Yes      | No        |
| NTF-004 | FAILED     | Notification failed during delivery                 | No       | Yes       |
| NTF-005 | RETRYING   | Notification is being retried after failure         | No       | Yes       |
| NTF-006 | DEAD       | Notification permanently failed after max retries   | Yes      | No        |

---

## 2. Channel Types

| Code   | Channel | Description                          |
| ------ | ------- | ------------------------------------ |
| CH-001 | EMAIL   | Email notification via provider      |
| CH-002 | SMS     | SMS notification via provider        |
| CH-003 | PUSH    | Push notification via mobile service |

---

## 3. Priority Levels

| Code   | Priority | Description                                  |
| ------ | -------- | -------------------------------------------- |
| PR-001 | LOW      | Non-critical, can be delayed                 |
| PR-002 | MEDIUM   | Standard priority                            |
| PR-003 | HIGH     | High importance, should be processed quickly |
| PR-004 | CRITICAL | Must be processed immediately                |

---

## 4. Event Types

| Code    | Event Name           | Description                                      |
| ------- | -------------------- | ------------------------------------------------ |
| EVT-001 | notification.created | Triggered when a notification is created         |
| EVT-002 | notification.sent    | Triggered when notification is successfully sent |
| EVT-003 | notification.failed  | Triggered when sending fails                     |
| EVT-004 | notification.retry   | Triggered when retry is scheduled                |

---

## 5. Error Codes

| Code    | Error Type       | Description                   |
| ------- | ---------------- | ----------------------------- |
| ERR-001 | VALIDATION_ERROR | Invalid input data            |
| ERR-002 | PROVIDER_ERROR   | External provider failure     |
| ERR-003 | DATABASE_ERROR   | Persistence failure           |
| ERR-004 | NETWORK_ERROR    | Network or connectivity issue |
| ERR-005 | UNKNOWN_ERROR    | Unexpected system failure     |

---

## 6. System Flow States (High-Level)

| Code    | Stage            | Description                             |
| ------- | ---------------- | --------------------------------------- |
| SYS-001 | REQUEST_RECEIVED | API received a new notification request |
| SYS-002 | VALIDATED        | Input validated successfully            |
| SYS-003 | STORED           | Notification persisted in database      |
| SYS-004 | EVENT_PUBLISHED  | Event sent to message broker (Redis)    |
| SYS-005 | CONSUMED         | Worker consumed the event               |
| SYS-006 | DISPATCHED       | Sent to external provider               |
| SYS-007 | COMPLETED        | Notification lifecycle finished         |

---

## 7. Retry Policy

| Code   | Policy      | Description                          |
| ------ | ----------- | ------------------------------------ |
| RT-001 | IMMEDIATE   | Retry instantly                      |
| RT-002 | BACKOFF     | Retry with exponential delay         |
| RT-003 | LIMITED     | Retry up to max attempts             |
| RT-004 | DEAD_LETTER | Move to dead queue after max retries |

---

## 8. Observability Tags

| Code    | Tag            | Description                     |
| ------- | -------------- | ------------------------------- |
| OBS-001 | TRACE_ID       | Unique request trace identifier |
| OBS-002 | CORRELATION_ID | Links events across services    |
| OBS-003 | SPAN_ID        | Identifies specific operation   |
| OBS-004 | SERVICE_NAME   | Originating service             |

---

## Usage Guidelines

* Always reference **codes** (e.g., `NTF-003`) in logs and metrics
* Use **statuses** in domain logic
* Use **event codes** in messaging systems
* Include **observability tags** in all logs/events
* Align flowcharts and UML diagrams with these definitions

---

## Example

```json
{
  "notificationId": "123",
  "status": "FAILED",
  "statusCode": "NTF-004",
  "errorCode": "ERR-002",
  "event": "notification.failed",
  "eventCode": "EVT-003",
  "traceId": "abc-123"
}
```

---

## Notes

This document should be considered the single source of truth for:

* State management
* Event naming
* Error handling
* System observability

Keep it updated as the system evolves.
