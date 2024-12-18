---
title: "Custom Resources"
summary: ""
draft: false
weight: 223
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

<span class="lead">
Custom resources in Oakestra extend the system’s API by enabling the dynamic addition of new data types as a colllection of API endpoints. 
</span>

{{< callout context="tip" icon="outline/skateboarding" >}}
Custom resources allow you to define and manage data structures via the Oakestra API, enabling specialized workflows and routines.
{{< /callout >}}

When a new custom resource is defined, it creates endpoints within the Oakestra API dedicated to managing that resource. These endpoints operate similarly to native API resources, enabling users to:
- **Store and retrieve structured data** specific to the custom resource type.
- **Leverage the API** to create, update, and delete instances of the custom resource.

## Controllers
Custom resources operate alongside **controllers**, which are separate components that monitor and manage the state of custom resources. A Controller observes changes in the custom resource data and makes adjustments to ensure the system’s state aligns with the desired configurations stored within these resources. This setup introduces a structured division of responsibility:
- **Custom Resources** handle the storage and retrieval of structured data
- **Controllers** act on this data to manage the system’s state based on the stored configurations.

In Oakestra, a custom controller could be implemented as an [addon](../addons), allowing users to introduce automation and state management functionalities for custom data types without altering the core system.


{{< callout context="tip" title="Why should you use custom resources?" icon="outline/rocket">}}
- **API Flexibility**: Users can introduce new data types and workflows as needed without modifying the core system.
- **Separation of Concerns**: By decoupling data storage from active state management, custom resources and controllers provide a modular, maintainable architecture.
- **Enhanced Automation**: With controllers managing custom resources, Oakestra can automate workflows and maintain system alignment with external configurations, streamlining operations.
{{< /callout >}}

{{< link-card
  title="Creating Custom Resources"
  description="Read more on how to use custom resources within Oakestra"
  href="../../../manuals/extending-oakestra/setting-up-hooks"
  target="_blank"
>}}