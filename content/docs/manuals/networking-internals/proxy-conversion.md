---
title: "Proxy Conversion"
summary: ""
draft: false
weight: 315
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

In order to make the service layer networking functional, a worker-level tunnel-proxy is transparently instantiated
as part of the Oakestra network component. The following picture is an example of what happens in a worker node
based on the IPv4 implementation of the Network Manager component. Note that
**IPv4 and IPv6 work identically**. For simplicity, we will stick to IPv4 addresses in this walkthrough.

## Example

Let's assume that we have two worker nodes, namely Node 1 and Node 2, each executing two containers.
The containers are instantiated and managed by the Node Engine, while
the Network Manager, creates a network namespace for each container (the cloud surrounding the container),
enabling the Virtual Layer abstraction.

{{<svg "overlay-example" >}}

The Service Layer abstraction is realized hierarchically with a mechanism of *route interest registration* and
*proxy translation*. This section details the proxy translation that allows transparent
conversion of Service IPs into Namespace IPs, therefore enabling transparent Virtual Layer &harr; Service Layer conversion.

Following the example mentioned above, suppose we deployed services X1 and X3 using the following deployment descriptor.

{{< details "Click here to view the deployment descriptor for Services X1 and X3" >}}

```yaml
{
  "sla_version" : "v2.0",
  "customerID" : "Admin",
  "applications" : [
    {
      "applicationID" : "",
      "application_name" : "X",
      "application_namespace" : "default",
      "application_desc" : "X application",
      "microservices" : [
        {
          "microserviceID": "",
          "microservice_name": "X1",
          "microservice_namespace": "default",
          "virtualization": "container",
          "code": "docker.io/X/X1",
          "addresses": {
            "rr_ip": "10.30.0.1",
            "rr_ip_v6": "fdff:2000::1"
          },
        },
        {
          "microserviceID": "",
          "microservice_name": "X3",
          "microservice_namespace": "default",
          "virtualization": "container",
          "code": "docker.io/X/X3",
          "addresses": {
            "rr_ip": "10.30.1.30",
            "rr_ip_v6": "fdff:2000::30",
          	},
        }
      ]
    }
  ]
}
```

Therefore, we register into the platform two services, `X.default.X1.default` and `X.default.X3.default`.
At deployment time, we request 2 instances of X1 (`X.default.X1.default.0` and `X.default.X1.default.1`)
and one instance of X3 (`X.default.X3.default.0`). The scheduling decision places the instances as shown in
the picture.
From the deployment descriptor, we asked the platform to provision the Service IP `10.30.1.30` to X3 with Round
Robin policy. Therefore, X1 will use this address to perform load-balanced requests toward X3.

{{< /details >}}

---

Click on different steps to see what is happening behind-the-scenes.

{{< tabs-icon "Requests" >}}
{{< tab-icon "Step 1 - GET" "_step1.png">}}


#### http://10.30.1.30:30443/api/hello

X1 performs a GET request using the Service IP `10.30.1.30`. The default gateway for the `10.0.0.0/8` subnetwork
is the ProxyTUN component of the Network Manager. The request will be directed there.
From an L4 perspective, the packet will look somewhat like this:

```
from ip: 10.19.1.3
to ip: 10.30.1.30
from port: 34278
to port: 30443
payload: ....
```

The `from ip`, is the Virtual Layer IP, the **Namespace IP** of the container. This Namespace IP is assigned to the
VETH device used to connect the container namespace to the virtual bridge in the system namespace.
{{< /tab-icon >}}

{{< tab-icon "Step 2 - Cache Miss" "_step2.png">}}

#### Cache Miss

When receiving the request packet, the proxy does not yet have an active conversion entry in its cache. This results
in a cache miss. With a cache miss, the proxy tunnel fetches the information required for the conversion to the Environment
Manager. This component keeps track of the services deployed internally in the worker node, as well as the relevant
services deployed on other worker nodes.

This is an example of the Conversion Table maintained by the Environment Manager at this moment.


##### Node Service 1 Table before X3 table query

| Appname         | X               | X               |
|-----------------|-----------------|-----------------|
| Appns           | default         | default         |
| Sname           | X1              | X1              |
| Sns             | default         | default         |
| Instance #      | 0               | 1               |
| Cluster         | 1               | 1               |
| Node IP & Port  | 131.1.0.1 50103 | 131.1.0.2 50103 |
| Ns IP           | 10.19.1.3       | 10.19.1.6       |
| Instance IP     | 10.30.0.2       | 10.30.0.3       |
| Round Robin IP  | 10.30.0.1       | 10.30.0.1       |
| ... Service IPs | ...             | ...             |


The entries of the table keep the cross-layer information of each service, including the physical layer address and
port, the virtual layer address, and all the service layer addresses. As the number of records is limited, the table
only keeps track of the services currently deployed in this machine. No interest in external services has been
recorded so far.
{{< /tab-icon >}}

{{< tab-icon "Step 3 - Table Query" "_step3.png">}}

#### Table query

When the address `10.30.1.30` must be converted using the Conversion Table, this will result in a **table miss**.
The Environment Manager is then forced to ask the cluster orchestration for an entry that enables the conversion of
this address.
This operation is called **table query** and serves a double purpose:

1. Hierarchical lookup to fetch the required information.
2. If the information exists, an interest in that information is registered.
   Therefore, any update, such as a service migration or service scaling, results in an update for that table entry.

This is one of the building blocks of the proposed abstraction, and it is detailed in the [Interest Registration section](#interest-registration).
{{< /tab-icon >}}

{{< tab-icon "Step 4 - Update" "_step4.png" >}}

#### Update

Upon completion of the table query, the internal Conversion table is updated as follows.

##### Node Service 1 Table after X3 table query

| Appname         | X               | X               | X                |
|-----------------|-----------------|-----------------|------------------|
| Appns           | default         | default         | default          |
| Sname           | X1              | X1              | X3               |
| Sns             | default         | default         | default          |
| Instance #      | 0               | 1               | 0                | 
| Cluster         | 1               | 1               | 1                |
| Node IP & Port  | 131.1.0.1 50103 | 131.1.0.2 50103 | 131.1.21.5 55301 |
| Ns IP           | 10.19.1.3       | 10.19.1.6       | 10.21.0.1        | 
| Instance IP     | 10.30.0.2       | 10.30.0.3       | 10.30.0.6        |
| Round Robin IP  | 10.30.0.1       | 10.30.0.1       | 10.30.1.30       |
| ... Service IPs | ...             | ...             | ...              |

The cluster resolved the Service IP `10.30.1.30` into a table entry describing only `X.default.X3.default.0`
(apparently, no other instances are in the system yet).

The Environment Manager can now answer the proxy with the *virtual layer* and *physical layer* addresses resolving
the previous cache miss and the balancing policy metadata associated with the address. In this case the response
will look like this:

```json
-- policy: Round Robin
instances: [
	{
		NS IP: 10.21.0.1
		Node IP: 131.1.21.5
		Node port: 55301
		Cluster: 1
		...
		... 
	}
]
``` 

{{< /tab-icon >}}

{{< tab-icon "Step 5 - Conversion" "_step5.png">}}

#### Service IP conversion - from: 10.30.1.30 to 10.21.0.1

Given the resolution details, the proxy, using the balancing policy information,
picks an instance from the instance list and adds an entry to the conversion list.

In this example, the entry will look like this:

```
                FROM              TO
                __________________________________
matching rule:  10.19.1.3:34278 - 10.30.1.30:30443
convert to:     10.30.0.2:34278 - 10.21.0.1:30443
```

Notice how the proxy also replaces the `from` address with the **Instance IP** of X1.

In abstract terms, the proxy is converting a the incoming packet from the form of

```
{
	from:<Sender Virtual Layer Address> 
	to:<Receiver Service Layer Address>
} 
```

to

```
{
	from:<Sender Service Layer Address>
	to:<Receiver Virtual Layer Address> 
}
```

The conversion just shown is the key to enabling transparent Service Layer abstraction.
{{< /tab-icon >}}

{{< tab-icon "Step 6 - UDP Request" "_step6.png" >}}

#### UDP to 131.1.21.5:55301

In this step, the proxy tunnel uses the **Physical layer** information to create a tunnel between Node 1
and Node 2 and forward the packet to the destination machine's Network Manager.
{{< /tab-icon >}}
{{< tab-icon "Step 7 - GET" "_step7.png">}}

#### http://10.21.0.1:30443/api/hello

The Network Manager does not need to translate the incoming packet as the recipient IP is a **Virtual layer** known address.

A response from X3 to X1 then follows the same steps in-order as shown in this example.

{{< /tab-icon >}}
{{< /tabs-icon >}}
<hr>

---

## Interest Registration

Here we show a sequence diagram of how a table query and an interest registration work in the worker-cluster-root
hierarchy.

{{<svg "overlay-example-sequential" >}}

* The environment manager keeps the 'interests subscriptions' for 10 seconds
* If the route is not used for more than 10 seconds, the interest is removed, and the table entry is cleared
* A cluster maintains an interest as long as at least one worker node is interested in that route
* A worker node is ALWAYS subscribed to interests regarding the instances deployed internally.