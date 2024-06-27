---
title: "Explore its Features"
description: "Explore the functionality offered by the dashboard"
summary: ""
draft: false
weight: 810
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

{{< callout context="note" title="Something Missing?" icon="outline/rocket">}}
If you have any new feature ideas or if you find any bugs please open an issue in the [GitHub repository](https://github.com/oakestra/dashboard).
{{< /callout >}}

<!-- Todo: Move somewhere else -->
## Applications, Services, Namespaces

In Oakestra there are applications, services and namespaces. One Application can encompass multiple services and one user can create
multiple applications on one system. Namespaces allow you to create applications and services by the same name in different namespaces,
e.g. `production` and `development`.

### Creating an Application

First you will have to create an application. Choose a concise name, the namespace and optionally a description.

![](add-app.gif)

### Creating a Service

In the section [Deploy your first Application](../../getting-started/deploy-your-first-application/) we discussed registering
deployment descriptors via the API. This is great for automated deployments, but the SLAs were not designed with human readability in mind.
While the dashboard still allows you to upload SLAs as a JSON file, it also provides you with an interactive form.

Once you have created an application you can create services. Once again you will have to choose a concise name, a namespace and optionally a description.
However this is far from it; system requirements, environmental variables, connection details and much more can be specified here.

You will have to choose a virtualization method (Container or Unikernel) and tell Oakestra where it can find your code.
Hit save and your service is ready for deployment!

![](create-service.gif)

### Service Details

Once a service has been created and deployed, you can check on it's status and other details. Choose a service from the *Service List* and from the drop-down
menu, choose an instance and click on *View Instance Details*. 