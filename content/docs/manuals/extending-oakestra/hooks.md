---
title: "Setup Hooks"
summary: ""
draft: false
weight: 4
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## Introduction

Hooks in Oakestra provide a mechanism for listening to and reacting to system life-cycle events. By leveraging hooks, developers can decouple components and enable services to dynamically respond to events like creation, updates, or deletion of system entities. This section explains how to use hooks effectively, with step-by-step instructions for registering and implementing them.

Hooks allow developers to:
1. **Subscribe to Events**: Register services to listen for system life-cycle events such as entity creation, updates, or deletion.
2. **React to Events**: Perform specific actions when events occur, either synchronously (blocking) or asynchronously (non-blocking).

Lifecycle events in Oakestra are limited to:
- **Creation**: Triggered when a new entity is added.
- **Update**: Triggered for any state changes after creation.
- **Deletion**: Triggered when an entity is removed.

---

## How Hooks Work

Hooks are implemented using the **Resource Abstractor** component, which centralizes the management of entities. When a life-cycle event occurs, the Resource Abstractor notifies all registered subscribers via webhooks. Hooks can operate in two modes:

1. **Synchronous Hooks**:
   - Blocking: The system waits for a response from subscribers before proceeding.
   - Example: Pre-processing data before saving it to the database.
2. **Asynchronous Hooks**:
   - Non-blocking: Subscribers are notified without delaying the system’s operations.
   - Example: Logging or notifying external services about an event.

---

## Using Hooks

### Registering a Hook

To subscribe to life-cycle events, services must register their webhook URL and specify the events they want to listen to. Here’s how to do it:

#### API Request to Register a Hook
Send a `POST` request to the Resource Abstractor API with the following JSON body:

```json
{
  "hook_name": "my_hook",
  "webhook_url": "http://example.com/hook-endpoint",
  "entity": "applications",
  "events": ["pre_create", "post_update"]
}
```

- **hook_name**: A unique identifier for the hook.
- **webhook_url**: The URL to which event notifications will be sent.
- **entity**: The type of entity to monitor (e.g., `application`).
- **events**: The specific events to listen for:
  - `pre_create`: Synchronous notification before creation.
  - `post_update`: Asynchronous notification after an update.

---

### Receiving Notifications

When a life-cycle event occurs, the Resource Abstractor sends a notification to the registered `webhook_url`. The notification structure depends on the event type:

#### Example: Asynchronous Notification
For an asynchronous event, such as `post_create`, the webhook receives a JSON payload like:
```json
{
  "entity_id": "12345",
  "entity": "application",
  "event": "post_create"
}
```

#### Example: Synchronous Notification
For a synchronous event, such as `pre_create`, the webhook receives the full entity object:
```json
{
  "_id": "12345",
  "application_name": "SampleApp",
  "attribute1": "value1",
  "attribute2": "value2"
}
```

The subscriber can modify the object and return it in the response.