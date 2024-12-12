---
title: "IPv4 Addressing"
summary: ""
draft: false
weight: 312
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## Network Split

Oakestra uses the reserved private IPv4 subnet `10.0.0.0/8` for its service addressing.

The detailed network partition can be taken from the table below.

| Subnet         | Subnet description             | Tag                  |
|----------------|--------------------------------|----------------------|
| `10.18.0.0/16` | Worker subnet                  | `worker`             |
| `10.30.0.0/16` | Service and Instance IP subnet | `service` `instance` |

In the following we give a short meaning for each tag.

* `worker` : subnet assigned to a single worker node associated with a cluster inside Oakestra. Worker subnet has a `/26` bitmask
* `service` : semantic service address subnet
* `instance` : single semantic service address mapped to a service instance throughout the lifetime of the instance

## Example Application Assignment

If we deploy an example application `A` with two instances of microservice `S` (i.e. {{< math >}}$S_1${{< /math >}} and {{< math >}}$S_2${{< /math >}}) on the worker node W, an example address configuration can be the following:

| App A    | Addresses / Subnets assigned                             |
|----------|----------------------------------------------------------|
| Worker W | `10.18.30.64/26`                                         |
| S        | Round Robin: `10.30.0.1`                                 |
| S1       | Instance IP: `10.30.0.2`<br> Namespace IP: `10.18.30.65` |
| S2       | Instance IP: `10.30.0.3`<br> Namespace IP: `10.18.30.66` |

Oakestra also has IPv6 support, which you can read in the next page [IPv6 address partitioning](../ipv6-addressing/).