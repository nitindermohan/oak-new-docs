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

To simplify, Oakestra refers to both plugins and extensions collectively as **addons**, a term that represents any additional component that can enhance or modify Oakestra’s capabilities.

### Plugin Example

In Oakestra, plugins provide a way to swap out components, enhancing the system’s adaptability. For example, the default scheduler could be replaced with an alternative that uses a more advanced algorithm. Consider a scheduler that accounts for environmental variables, such as energy consumption or green energy sources, when making scheduling decisions. This plugin can be enabled by users who need these advanced features, offering them a customized scheduling tool while other users retain the default, core scheduler. This approach keeps the core system minimal while catering to varied user requirements.

### Extensions Example

Extensions in Oakestra can add substantial new capabilities to the system. One example could be the introduction of federated learning on edge computing devices. Federated learning enables decentralized training across multiple devices, enhancing privacy by not requiring raw data transfer. Implementing this as an extension involves adding new components to the Orchestrator control plane for the coordination and aggregation of distributed training processes. Users can activate or deactivate this extension based on their needs, making it a flexible addition that adapts Oakestra to specialized use cases.