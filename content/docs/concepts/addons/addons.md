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


## What are Addons
Addons in Oakestra are modular components designed to extend the core functionality of the system without modifying its foundational architecture. These components can either enhance existing capabilities or introduce entirely new features, allowing users to customize Oakestra according to their unique requirements. By utilizing addons, Oakestra achieves a flexible system architecture that empowers users to dynamically tailor the system to fit specific use cases while preserving a streamlined core.

Addons fall into two primary categories in Oakestra:
- **Plugins**: Components that replace or augment core functionalities.
- **Extensions**: Components that introduce new capabilities outside of the core functionalities.

This modular design enables developers to activate or deactivate features as needed, maintaining a lightweight, adaptable system suitable for diverse operational contexts.

## Plugins vs Extensions

Although *plugins* and *extensions* are often used interchangeably to describe system extensibility, in Oakestra, they serve distinct roles:
- A **plugin** is a component that integrates directly with a core functionality, often replacing or augmenting an essential system module.
- An **extension**, on the other hand, enhances the system capabilities by adding optional features without altering any core component.

To simplify, Oakestra refers to both plugins and extensions collectively as **addons**, a term that represents any additional component that can enhance or modify Oakestras capabilities.

### Plugin Example

In Oakestra, plugins provide a way to swap out components, enhancing the systems adaptability. For example, the default scheduler could be replaced with an alternative that uses a more advanced algorithm. Consider a scheduler that accounts for environmental variables, such as energy consumption or green energy sources, when making scheduling decisions. This plugin can be enabled by users who need these advanced features, offering them a customized scheduling tool while other users retain the default, core scheduler. This approach keeps the core system minimal while catering to varied user requirements.

### Extensions Example

Extensions in Oakestra can add substantial new capabilities to the system. One example could be the introduction of federated learning on edge computing devices. Federated learning enables decentralized training across multiple devices, enhancing privacy by not requiring raw data transfer. Implementing this as an extension involves adding new components to the Orchestrator control plane for the coordination and aggregation of distributed training processes. Users can activate or deactivate this extension based on their needs, making it a flexible addition that adapts Oakestra to specialized use cases.

## Addon Lifecycle Management
The lifecycle of an addon—from creation to deployment—is managed by the **Addons Engine** and the **Addons Marketplace**. This design allows for **hot-swapping**, where new features can be added or swapped without disrupting core services.

## Addon System Design

Addons in Oakestra are modular components that extend the platforms core functionality while keeping the foundational architecture lightweight. This design ensures that Oakestra remains efficient, avoiding unnecessary bloat in edge computing environments.

Addons system is composed of two subsystems:
- **Addons Marketplace**: Consists of Marketplace Manager and MongoDB client.
- **Addons Engine**: Consists of Addons Manager, Addons Monitor, and MongoDB Client.

#### Addons Marketplace:

The marketplace allows developers to publish their add-ons for Oakestra. To create
an addon, users must package their code and convert it into an OCI-compliant image that is
publicly accessible. Currently, only docker images are supported, but it should be possible to
use any OCI-compliant image in the future. The Addons Marketplace subsystem offers API
endpoints for developers to publish their addons to Oakestra. Upon receiving a request for
registering an Addon, the marketplace asynchronously checks if the image is valid. Once
it’s verified, the addon’s state in the database changes from ‘under_review‘ to `approved`. If
invalid, the status becomes `failed_verification`.


#### Addons Engine:

The addons engine is composed of two main components:

- **Addons manager**: handles user requests for installing and uninstalling addons.
- **Addons Monitor**: is responsible for continually monitoring and managing the state of
addons. It uses a pull-based mechanism to regularly fetch addon-related tasks from the Addons Manager. It also interacts with the underlying container management engine,
such as Docker, to manage the life cycle of addons. This includes handling execution,
monitoring, and reporting of addon statuses to ensure that addons are running as
expected and reporting any failures to the addons manager. The Addons Monitor
performs the following checks:
- **Install check**: Retrieves all addons from the Addons Manager that need installing.
- **Uninstall check**: Retrieves all addons from the Addons Manager that need unin-
stalling.
- **Cleanup check**: Communicates with underlying containers engines to retrieve
all running addons and validates that these addons exist in Addons Manager.
The purpose of this is to check if an addon was deleted from the database in the
Addons Manager.