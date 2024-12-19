---
title: "Load Balancing"
summary: ""
draft: false
weight: 314
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

The load balancing in Oakestra consists of a multistep address conversion protocol using semantic addresses as part
of an overlay network.

### Semantic Addressing

The semantic addressing happens on the service layer.
Similar to a cluster IP in Kubernetes, these addresses reference all the instances (replicas) of a microservice
with a single address. This address does not change when scaling up the instances or when migrating them.
Unlike the Kubernetes cluster IP, when deploying a service in Oakestra, the platform provides as many Service IP
addresses as the number of balancing policies supported (and active) within the platform.

#### Example

{{<svg "network-example-dual-stack" >}}

A developer can communicate with any instance of Service B either with **Round Robin** balancing policy or
the **Closest** balancing policy. The former balances the traffic evenly between all the instances, and the
latter finds the geographically closer instance.

Click on the following tabs to see how every request is handled.

{{< tabs-icon "Requests" >}}
{{< tab-icon "First" "_envelope_1.png">}}
Service A performs the first request using the ServiceIP `fdff:1000::1` representing the closest instance balancing policy.
The network components' proxy converts the address to the Namespace IP of Service B Instance 1, which looks like it is
the geographically closer service. The message will be, therefore **transparently** delivered to the closest instance
of Service B. Note that the Namespace IP is the real address of the instance, the one provisioned at deployment time,
unique and dynamic. An application developer never sees or uses this address, as it depends on the subnetwork of the
specific machine where the service is deployed.
{{< /tab-icon >}}

{{< tab-icon "Second" "_envelope_2.png">}}
Service A performs a second request using the ServiceIP `fdff:2000::1` representing the Round Robin balancing
policy. The network components' proxy converts the address to the Namespace IP of Service B Instance 3, which is
randomly chosen among all the available instances.
{{< /tab-icon >}}

{{< tab-icon "Third" "_envelope_3.png">}}
When Service A performs a third request using again the ServiceIP `fdff:2000::1` representing the Round Robin balancing
policy, this time, the network components' proxy randomly chooses Service B Instance 2.
{{< /tab-icon >}}

{{< tab-icon "Fourth" "_envelope_4.png">}}
The fourth request from Service A to Service B uses the Instance IP representing instance 3.

The proxy component then automatically chooses Service B Instance 3.
{{< /tab-icon >}}

{{< tab-icon "Fifth" "_envelope_5.png">}}
The last request demonstrates how the requests using the IPv4 Round Robin semantic address works exactly the same way as
the IPv6 Round Robin semantic address used in the first request.
{{< /tab-icon >}}

{{< /tabs-icon >}}

---

{{< callout context="note" title="Reminder" icon="outline/info-circle" >}}
Currently the **IPv6 Closest** balancing strategy IP addresses (reserved, but not implemented)
are in the `fdff:1000::/21` subnet, and **IPv6 Round Robin** in `fdff:2000::/21`. In IPv4, both balancing
strategies take their IPs from the `10.30.0.0/16` subnet. For further information, take a look at the
[IPv4](../ipv4-addressing/) or [IPv6](../ipv6-addressing/) address space documentation pages.
{{< /callout >}}

{{< callout context="note" title="Mixing IP protocols" icon="outline/info-circle">}}
6to4 or 4to6 service translation is not supported (yet).
{{< /callout >}}
{{< callout context="caution" title="Why do we need Instance IPs?" icon="outline/help-circle" >}}
Instance IPs represent a service's instance uniquely within the platform. Even when the instance migrates toward
new devices, the Instance IP always represents the instance and not the machine where the instance is deployed.
The Instance IP is the foundation that enables an overlay network that abstracts services from machines.

When forwarding the packet, the proxy uses the sender's Instance IP in the `from` header field of the packet.
This way, any response or connection-oriented protocol can transparently work, and we guarantee the original
sender receives the response.
{{< /callout >}}

{{< callout context="caution" title="Why Service IPs? Why do we need multiple balancing policies?" icon="outline/help-circle" >}}
At the Edge, Oakestra's net component enables flexibility in the way developers can balance the traffic without 
the requirement of adapting the code. Just by using a Service IP instead of a regular IP, a developer can achieve
balancing by using any protocol based on UDP or TCP and can also customize the balancing behavior of each request
accordingly to their need. Edge computing brings resources closer to the users, so one might need to forward some 
traffic with very low latency using Closest balancing policy, or one might just want to evenly balance another
endpoint with Round Robin policy.
{{< /callout >}}
