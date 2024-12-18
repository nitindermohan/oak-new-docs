---
title: "Hooks"
summary: ""
draft: false
weight: 222
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

<span class="lead">
Hooks are a mechanism in Oakestra designed to enhance system flexibility by allowing components to react to specific lifecycle events within the system. 
</span>

{{< callout context="note" icon="outline/info-square-rounded" >}}
Unlike addons, which extend functionality by adding components, hooks enable services to listen and respond to the dynamic state changes of entities like applications or services within Oakestra.
{{< /callout >}}

## Lifecycle Events
Lifecycle events refer to different stages in the existence of entities managed by Oakestra. Hooks focus on three primary event types for entities:
- **Creation**: Triggered when a new entity, such as an application or service, is created within Oakestra.
- **Update**: Encompasses all state changes for an entity after its initial creation, providing flexibility for services to retrieve additional state details if required.
- **Deletion**: Triggered when an entity is removed from the system.

When an event is triggered, all registered subscribers are notified, allowing them to take necessary actions based on the entity’s current lifecycle stage. 

## Trigger Modes

Hooks can be triggered in two modes:
- **Synchronous Mode**: The triggering component waits for a response from the subscriber(s) before proceeding. This is useful when subsequent steps depend on the outcome of the subscriber’s response, such as when network address must be assigned before deployment.
- **Asynchronous Mode**: The triggering component does not wait for the subscriber(s) to respond, allowing the system to continue without delay. This mode is appropriate for non-blocking actions, like logging or notifying external systems.


{{< callout context="tip" title="Why should you use hooks?" icon="outline/rocket">}}
- **Reduced Coupling**: Hooks allow components to interact without direct dependencies, enabling a cleaner architecture. For instance, the Root Network can receive deployment notifications without hard-coded calls from the System Manager.
- **Dynamic Reactivity**: Hooks enable services to adapt dynamically based on lifecycle changes, maintaining an up-to-date environment.
- **Improved System Flow**: By offering asynchronous and synchronous modes, hooks provide a flexible mechanism that suits both immediate and non-blocking response needs, enhancing system performance and modularity.
{{< /callout >}}

{{< link-card
  title="Setting up Hooks"
  description="Read up on how to set up hooks within Oakestra"
  href="../../../manuals/extending-oakestra/setting-up-hooks"
  target="_blank"
>}}