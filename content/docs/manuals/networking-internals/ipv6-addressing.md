---
title: "IPv6 Addressing"
summary: ""
draft: false
weight: 313
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

Oakestra makes use of the reserved private IPv6 subnet `fc00::/7` for its service addressing and uses the
following network split for IPv6 networking

| Subnet                                                  | Subnet description                    | Tag        |
|---------------------------------------------------------|---------------------------------------|------------|
| `fc00::/7`                                              | full Oakestra network                 | `all`      |
| `fc00::/120 - fdfd:ffff:ffff:ffff:ffff:ffff:ffff:0/120` | Worker subnets                        | `worker`   |
| `fdfe::/16`                                             | reserved for future use               | `reserved` |
| `fdff::/16`                                             | Service IP subnet                     | `service`  |
| `fdff:0000::/21`                                        | Instance IP subnet 1                  | `instance` |
| `fdff:1000::/21`                                        | reserved for Closest balancing policy | `balance`  |
| `fdff:2000::/21`                                        | Round Robin balancing                 | `balance`  |
| ...                                                     | ...                                   | `balance`  |
| `fdff:f000::/21`                                        | Balancing 15                          | `balance`  |
| `fdff:0800::/21`                                        | Instance IP subnet 2                  | `instance` |
| `fdff:1800::/21`                                        | Balancing 16                          | `balance`  |
| `fdff:2800::/21`                                        | Balancing 17                          | `balance`  |
| ...                                                     | ...                                   | `balance`  |
| `fdff:f800::/21`                                        | Balancing 30                          | `balance`  |

In the following we give a short meaning for each tag.

* `all` : entire Oakestra platform
* `worker` : subnet assigned to a single worker node associated with a cluster inside Oakestra
* `service` : semantic service address subnet
* `instance` : single semantic service address mapped to a service instance throughout the lifetime of the instance
* `balance` : semantic service address, addressing all multiple instance addresses of a service in order to enable
semantic addressing for balance policies

{{< callout context="danger" title="Exhausted Address Space" icon="outline/alert-triangle" >}}
Oakestra makes use of the whole IPv6 address space available.
This may cause issues with other applications requiring an IPv6 address from the `fc00::/7`
address space in order to function, as we make changes to the `iptables` local firewall,
as well as the host routing tables, that may influence any third-party application's functionality.
{{< /callout >}}

## Example Application

If we deploy an example application A with Service S and two instances (S1 and S2) on the same worker node W,
an example address configuration can be the following:

| App A    | Addresses / Subnets assigned                                |
|----------|-------------------------------------------------------------|
| Worker W | `fc00::c0:ffee:/120`                                        |
| S        | Round Robin: `fdff:2000::30`                                |
| S1       | Instance IP: `fdff::2f`<br> Namespace IP: `fc00::c0:ffee:2` |
| S2       | Instance IP: `fdff::30`<br> Namespace IP: `fc00::c0:ffee:3` | 


{{< callout context="caution" title="Limited IPv6 Capabilities" icon="outline/alert-triangle" >}}
The Oakestra platform currently only supports a very basic form of IPv6 addressing in the sense that there is a 
strict 1-to-1 mapping between IPv4 and IPv6 addresses.
The limiting factor remains the IPv4 address space and there currently is **no** support for standalone IPv6 networking.
{{< /callout >}}


## Extending the Network Capabilities

Extending the network capabilities by a new IPv6 service IP follows the same steps as in our
[IPv4 documentation](../ipv4-addressing) in general, with the need of a special database handling for each network
address space.

Since the IPv6 service address space is hard-split into their distinct networks, a reservation for such a split needs
to be done. In the best case you should create an issue for that on the official GitHub repository, in order to let
the maintainers, and everyone else know, that a part of the network split is reserved for your upcoming new routing
policy.

From an implementation standpoint, in addition to the steps described in our [IPv4 documentation](../ipv4-addressing),
special database handling is needed to be implemented in the `root-service-manager`, who does the bookkeeping of
available service IP addresses in the network.

You can base your implementation on the already existing functions in place, which you can find in the
`root-service-manager`, more specifically in `network/subnetwork_management.py`.