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

As an example, we can reserve an address or domain name (e.g. `10.10.10.2` or `service-a.closest-instance.oakestra`)
in our platform, which instead of pointing to a host, points to the geographically closest instance of a
service the user is trying to reach.

This generally assumes the presence of a special resolver on the network,
translating this semantic address to a physical address.

#### Example

{{<svg "semantic_network" >}}

In our example we demonstrate two small interconnected networks with semantic routing enabled routers and one
additional one without semantic routing support. 

Inside a semantic network the hosts can reach each other with their router given hostnames. Additionally, they could
then also use semantic routes, which are published and resolved by their respective semantic-routing enabled routers.

Assume that hosts [1,2,3] are each hosting an identical webserver application. Router 1 can then go ahead and
publish a hostname to router 2, which describes the fastest responding webserver in the fleet of hosts for that
application. Let's say the hostname is `fastest.webserver.in-our-cluster`, host 4 could go ahead and request the
index page of the webserver.

Since host 4's router was previously made aware, that `fastest.webserver.in-our-cluster` is pointing towards router 1, 
he would go ahead and forward the request. Router 1 would receive the request and based on his currently observed 
network state, forward the request to the fastest responding webserver in order to serve the request.

{{< callout context="note" title="Note" icon="outline/info-circle" >}}
It is important to understand, that the responding webserver at the time of request initiation can change, while the
request in traversing the network.
{{< /callout >}}

Let us also assume that someone on the network of router 3 heard of this cool new networking feature and wants to try it
out himself. He will unfortunately be out of luck, because his router is not part of the semantic network and thus his 
request will lead to a failure to resolve the hostname.

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
[networking internals](../../manuals/networking-internals/load-balancing/).
