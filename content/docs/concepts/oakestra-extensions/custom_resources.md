---
title: "Custom Resources"
summary: ""
draft: false
weight: 212
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---


## What are Custom Resources?
Custom Resources in Oakestra extend the system’s API by enabling the dynamic addition of new data types as API endpoints. This concept is inspired by Kubernetes’ implementation of Custom Resources, which store collections of objects that extend the core API with new functionalities beyond the default installation. By allowing users to define custom data structures and manage them through the Oakestra API, Custom Resources provide a way to create specialized workflows and data handling routines tailored to specific needs.

## How Custom Resources Work
When a new Custom Resource is defined, it creates an endpoint within the Oakestra API dedicated to managing that resource. These endpoints operate similarly to native API resources, enabling users to:
- **Store and retrieve structured data** specific to the custom resource type.
- **Leverage the API** to create, update, and delete instances of the custom resource.

By defining Custom Resources, Oakestra users can dynamically extend the platform’s capabilities to support specialized data structures and operations.

## Controllers
Custom Resources operate alongside **Controllers**—separate components that monitor and manage the state of Custom Resources. A Controller observes changes in the Custom Resource data and makes adjustments to ensure the system’s state aligns with the desired configurations stored within these resources. This setup introduces a structured division of responsibility:
- **Custom Resources** handle the storage and retrieval of structured data.
- **Controllers** act on this data to manage the system’s state based on the stored configurations.

In Oakestra, a Custom Controller could be implemented as an **Addon**, allowing users to introduce automation and state management functionalities for custom data types without altering the core system.

## Use Case Example
For instance, a user might define a Custom Resource representing a specific configuration for an external service connection. A Custom Controller (implemented as an Addon) could then monitor this resource, automatically adjusting the connection parameters based on the configurations stored in the Custom Resource. By employing this setup, Oakestra can respond dynamically to external configuration changes without requiring manual intervention.

## Benefits of Custom Resources
Custom Resources offer several advantages for extending Oakestra’s functionality:
- **API Flexibility**: Users can introduce new data types and workflows as needed without modifying the core system.
- **Separation of Concerns**: By decoupling data storage from active state management, Custom Resources and Controllers provide a modular, maintainable architecture.
- **Enhanced Automation**: With Controllers managing custom resources, Oakestra can automate workflows and maintain system alignment with external configurations, streamlining operations.
