---
title: "Hooks"
summary: ""
draft: false
weight: 211
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

Hooks are a mechanism in Oakestra designed to enhance system flexibility by allowing components to react to specific lifecycle events within the system. Unlike addons, which extend functionality by adding components, hooks enable services to listen and respond to the dynamic state changes of entities like applications or services within Oakestra.

## Life-Cycle Events
Life-cycle events refer to different stages in the existence of entities managed by Oakestra. Hooks focus on three primary event types for entities:
- **Creation**: Triggered when a new entity, such as an application or service, is created within Oakestra.
- **Update**: Encompasses all state changes for an entity after its initial creation, providing flexibility for services to retrieve additional state details if required.
- **Deletion**: Triggered when an entity is removed from the system.

When an event is triggered, all registered subscribers are notified, allowing them to take necessary actions based on the entity’s current lifecycle stage. 

## Trigger Modes

Hooks can be triggered in two modes:
- **Synchronous Mode**: The triggering component waits for a response from the subscriber(s) before proceeding. This is useful when subsequent steps depend on the outcome of the subscriber’s response, such as when the "Root Network" component needs to assign a network address before deployment.
- **Asynchronous Mode**: The triggering component does not wait for the subscriber(s) to respond, allowing the system to continue without delay. This mode is appropriate for non-blocking actions, like logging or notifying external systems.


## Benefits of Hooks
Hooks in Oakestra improve modularity by decoupling services, promoting a more dynamic and flexible system architecture. Some key benefits include:
- **Reduced Coupling**: Hooks allow components to interact without direct dependencies, enabling a cleaner architecture. For instance, the Root Network can receive deployment notifications without hard-coded calls from the System Manager.
- **Dynamic Reactivity**: Hooks enable services to adapt dynamically based on lifecycle changes, maintaining an up-to-date environment.
- **Improved System Flow**: By offering asynchronous and synchronous modes, Hooks provide a flexible mechanism that suits both immediate and non-blocking response needs, enhancing system performance and modularity.
