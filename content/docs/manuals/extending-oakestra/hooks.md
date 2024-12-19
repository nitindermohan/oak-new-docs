---
title: "Setting up Hooks"
summary: ""
draft: false
weight: 354
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

<span class="lead">
Hooks in Oakestra provide a mechanism for listening to and reacting to system lifecycle events. By leveraging hooks, developers can decouple components and enable services to dynamically respond to events like creation, updates, or deletion of system entities.
</span>

{{< callout context="tip" title="Why should developers use hooks?" icon="outline/rocket" >}}
1. **Subscribe to Events**: Register services to listen for system lifecycle events such as entity creation, updates, or deletion.
2. **React to Events**: Perform specific actions when events occur, either synchronously (blocking) or asynchronously (non-blocking).
{{< /callout >}}

Lifecycle events in Oakestra are limited to:
- **Creation**: Triggered when a new entity is added.
- **Update**: Triggered for any state changes after creation.
- **Deletion**: Triggered when an entity is removed.


## How Hooks Work

Hooks are implemented using the **resource abstractor** component, which centralizes the management of entities. When a lifecycle event occurs, the resource abstractor notifies all registered subscribers via webhooks. Hooks can operate in two modes:

1. **Synchronous Hooks**:
   - Blocking: The system waits for a response from subscribers before proceeding.
   - Example: Pre-processing data before saving it to the database.
2. **Asynchronous Hooks**:
   - Non-blocking: Subscribers are notified without delaying the system’s operations.
   - Example: Logging or notifying external services about an event.


## Using Hooks

To subscribe to lifecycle events, services must register their webhook URL and specify the events they want to listen to. Here’s how to do it:

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
Where:
- **hook_name**: Uniquely identifies the hook
- **webhook_url**: Specifies the URL to which event notifications will be sent.
- **entity**: Specifies the type of entity to monitor (e.g., `application`).
- **events**: Specifies the events to listen for:
  - `pre_create`: Synchronous notification before creation.
  - `post_update`: Asynchronous notification after an update.


### Receiving Notifications

When a lifecycle event occurs, the Resource Abstractor sends a notification to the registered `webhook_url`. The notification structure depends on the event type:

##### Asynchronous Notification
For an asynchronous event, such as `post_create`, the webhook receives a JSON payload like:
```json
{
  "entity_id": "12345",
  "entity": "application",
  "event": "post_create"
}
```

##### Synchronous Notification
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