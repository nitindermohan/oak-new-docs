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

## Extending the Network Capabilities

In case you want to extend the network capabilities with a new load balancing strategy, you will have to make some
changes to our network proxy and backend systems.

All the semantic routing resolution is done in the network manager's `outgoingProxy` function in the `proxy` package.
There is a special `TODO` in the code, that pinpoints where you should add your code.

Additionally, you will have to implement the detection and default handling of your new service IP in the root- and
cluster-managers, such that new services get your address assigned with the needed meta tags in order to signify the
new service IP type for later routing.

Ideally you should start in the `sla/schema.py` in the root orchestrator. There you should add specific fields in order
for the developers to allow to set their desired service IP for your routing policy.
The next stop should then be the `root-service-manager`, who handles the address reservations.
Under `operations/service_management.py` you will have to add code and add to the JSON template to be loaded into the 
database. In order to keep the code tidy, the handler functions are located in `network/subnetwork_management.py`. There
you will also find some inspiration on what the handler is supposed to do.

```JSON
[
  { 
    "IpType": "<balancing-shortname>",
    "Address": "<your-addressv4-handler>()",
    "Address_v6": "<your-addressv6-handler>()"
  },
  {
    "IpType": "...",
    "Address": "...",
    "Address_v6": "..."
  }
]
```

{{< callout context="note" title="Get your hands dirty" icon="outline/info-circle" >}}
We encourage you to dig into the code and retrace the callstack for deployments yourself. This will make it
easier for you to grasp the communication patterns between Oakestra components, as well as their distinct tasks!
{{< /callout >}}
