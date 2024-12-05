---
title: "Networking"
summary: ""
draft: false
weight: 204
toc: true
seo:
  title: "Networking Concepts" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

This page will discuss the main networking concepts used in Oakestra.
With IPv4 and IPv6 addressing, the platform additionally heavily
benefits from the use of **semantic addressing**.

In the following we will briefly mention what semantic addressing is, how it is used and
how Oakestra leverages it for its networking.


## Semantic Addressing

Semantic addressing in the networking context refers to the method of accessing resources
or hosts based on an address with a defined meaning rather than a specific entity on the 
network. This means semantic addresses resolve based on a given context at runtime instead of
fixed paths.

As an example, we can reserve an address or domain name (e.g. 10.10.10.2 or `service-a.closest-instance.oakestra`)
in our platform, which instead of pointing to a host, points to the geographically closest instance of a
service the user is trying to reach.

This generally assumes the presence of a special resolver on the network,
translating this semantic address to a physical address.


### Semantic Addressing in Oakestra

We can leverage semantic addressing to enable different kinds of load balancing across a fleet of
microservices for an application hosted on the platform.
By assigning load balancing specific semantic addresses for each application microservice, 
regardless of the final microservice instance count per application, we can provide certain
connectivity guarantees throughout the lifecycle of an application.

The resolution from semantic to network address of the service instance is done in the network manager,
who fetches the necessary **live** destination information from the Oakestra backend at arrival of the request.
This information is cached locally for a very short period of time in order to assure that the address mapping
to the service instances is refreshed frequently, as rescheduling of (crashed) services can happen at any point in time.

For further reading into how exactly this is done, take a look at the 
[networking internals](/docs/manuals/networking-internals/load-balancing/).
