---
title: "Overlay Network"
summary: ""
draft: false
weight: 311
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

Let's first understand the different network abstraction layers within Oakestra, as well as the associated address space
reservations, before we discuss with [semantic addressing](../load-balancing/).

## Layers

{{<svg-smaller "overlay-layers">}}

The network abstraction enabling service-to-service communication within Oakestra spans *three* different layers.

### Physical layer
At the very bottom of the hierarchy, we have the physical layer, where we address machines rather than microservices
or containers.
In this layer, an IP address is an address that can be used to **uniquely identify a machine** to reach it. In Oakestra,
we keep track of physical layer by pairing each service with a **Node IP** and **Port**. This `IP:PORT` pair allows us to
reach multiple devices sharing the same IP address (e.g. behind a NAT).
Each worker node exposes the network stack required to enable the upper layers of the overlay at the assigned port.

### Virtual layer

Each physical machine is provisioned with a **virtual subnetwork**. This subnetwork is assigned by the root orchestrator.
When instantiating a container, the system provides a so-called **Namespace IP**, which is an address provisioned from
the virtual subnetwork of the node. This address is used to *route the traffic within the platform to the running
containers*. The current implementation uses a default fixed network mask of 26 bits in IPv4 / 120 bits in IPv6,
for the node subnetwork from the private `10.18.0.0/16` / `fc00::/7` network, allowing over 1000+ devices,
each supporting 64 containers, for a maximum of 65536 containers.

Support for more devices and bigger subnetworks can be achieved by
changing the default subnetwork to, i.e., 10.0.0.0/8 or even further transitioning to full virtual IPv6 networking.

{{< link-card
  title="IPv6 Addressing in Oakestra"
  href="/docs/manuals/networking-internals/ipv6-addressing"
  target="_blank"
>}}

### Service layer

The service layer does not take into consideration the physical positioning of services, the number of instances of
each service, the subnetworks, or the routing. The top-most layer provides service-level abstractions that allow the developers to forget
about the underlying implementation and just address the service required for the business logic of the application.
This abstraction is enabled by the **Service IPs**. These are a set of addresses that **identify services and all their
instances** and that can be used to **transparently pick the right instance and establish a connection**. A Service IP
expresses an inherent balancing policy, and, for each service, we have as many Service IPs as the implemented system
balancing policies.

A subset of the Service IPs are the **Instance IPs**. They *route the traffic always to a specific instance of
a service*. Therefore, when deploying a service, the system will provision the following addresses:

* 1x load balanced Service IP for each balancing policy implemented in the system
* 1x Instance IP for each new instance of the service that has been deployed.

{{< callout context="note" title="What's the difference between an Instance IP and a Namespace IP?" icon="outline/help-circle">}}
They operate on two different abstraction layers. The Namespace IP depends on the virtualized subnetwork
of a worker node and changes when migrating an application from one node to another. It cannot be provisioned
beforehand and must not be used by developers. The Instance IP is part of the Service layer abstraction.
Therefore, it identifies an instance regardless of migration operations, scales up, scales down, and can be
provisioned even before the deployment of a service instance.
{{< /callout >}}

Now that you know what types of different addresses there are in Oakestra, continue with how we actually use those 
in [IPv4 addressing](../ipv4-addressing/).