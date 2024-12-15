---
title: "Addons"
summary: ""
draft: false
weight: 210
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

Addons in Oakestra are modular components designed to extend the core functionality of the system without modifying its foundational architecture. These components can either enhance existing capabilities or introduce entirely new features, allowing users to customize Oakestra according to their unique requirements. By utilizing addons, Oakestra achieves a flexible system architecture that empowers users to dynamically tailor the system to fit specific use cases while preserving a streamlined core.

## Plugins vs Extensions

Addons fall into two primary categories in Oakestra:
- **Plugins**: Components that replace or augment core functionalities. E.g. a scheduler that accounts for energy consumption
- **Extensions**: Components that introduce entirely new capabilities outside of the core functionalities. E.g. FLOps

This modular design enables developers to activate or deactivate features as needed, maintaining a lightweight, adaptable system suitable for diverse operational contexts.

## Addon System Design

Addons in Oakestra are modular components that extend the platforms core functionality while keeping the foundational architecture lightweight. This design ensures that Oakestra remains efficient, avoiding unnecessary bloat in edge computing environments.

Addons system is composed of two subsystems:
- **Addons Marketplace**: Consists of Marketplace Manager and MongoDB client.
- **Addons Engine**: Consists of Addons Manager, Addons Monitor, and MongoDB Client.

## Addons Marketplace

![](marketplace_light.png)

The addons marketplace allows developers to publish their addons for Oakestra as docker images. The marketplace subsystem offers API
endpoints for developers to publish their addons. Upon receiving a request for registering an addon, the marketplace asynchronously 
checks if the image is valid. Once it’s verified, the addon’s state in the database changes from `under_review` to `approved` or `failed_verification`.

## Addons Engine

![](engine_light.png)

The addons engine is composed of two main components:

- **Addons manager**: handles user requests for installing and uninstalling addons.
- **Addons monitor**: is responsible for continually monitoring and managing the state of
addons. This includes handling execution, monitoring, and reporting of addon statuses to ensure that addons are running as expected and reporting any failures to the addons manager. The Addons Monitor performs the following checks:
  - **Install check**: Retrieves all addons from the addons manager that need installing.
  - **Uninstall check**: Retrieves all addons from the addons manager that need uninstalling.
  - **Cleanup check**: Communicates with underlying container engines to retrieve
  all running addons and validates these addons with the addons manager.
  The purpose of this is to check if an addon was deleted from the database in the
  Addons Manager.

## Addon Lifecycle Management

The lifecycle of an addon, from creation to deployment, is managed by the **Addons Engine** and the **Addons Marketplace**. This design allows for **hot-swapping**, where new features can be added or swapped without disrupting core services.

When installing an addon, the Addons Engine checks if a similar core component is running. If thats the case, the core component is stopped and the addon is run in its place. In this scenario the addon inherits the port mappings and network specifications of the core component. If no core component exists than its an extension and doesn't replace any other component.