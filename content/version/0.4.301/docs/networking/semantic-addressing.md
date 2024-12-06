---
title: "Semantic addressing"
draft: false
---

The default networking component of Oakestra envisions IP communication based on a semantic balancing policy expressed by some special IP addresses.

## What do we mean by semantic addressing?

In Oakestra, the addresses belonging to the subnetwork 10.30.0.0/16 are called **Service IPs**. Similar to a cluster IP in Kubernetes, these addresses reference all the instances(replicas) of a microservice with a single address. This address does not change when scaling up the instances or when migrating them. 
Anyway, unlike the Kubernetes cluster IP, when deploying a service in Oakestra, the platform provides as many ServiceIP addresses as the number of balancing policies supported (and active) within the platform. 
On top of that, we have a special subset of the Service IPs called **Instance IPs**. An Instance IP balances the traffic only to a specific service instance within the system. 
Let's take a look at the following example.

![NetExample](/network/NetExample.png)

A developer can communicate with any instance of Service B either with **Round Robin** balancing policy or the **Closest** balancing policy. The former balances the traffic evenly between all the instances, and the latter finds the geographically closer instance. 

Service A performs the first request <img src="/network/NetArchExample_evenlope_1.png" alt= "envelope_1" width="30"> using the ServiceIP <font style="color:red">10.30.0.1</font> representing the closest instance balancing policy.
The network components' proxy converts the address to the Namespace IP of Service B Instance 1, which looks like it is the geographically closer service. The message will be, therefore **transparently** delivered to the closest instance of Service B. Note that the Namespace IP is the real address of the instance, the one provisioned at deployment time, unique and dynamic. An application developer never sees or uses this address, as it depends on the subnetwork of the specific machine where the service is deployed. Find out more about the Namespace IP by reading the implementation details.  

Then, Service A performs a second request <img src="/network/NetArchExample_evenlope_2.png" alt= "envelope_1" width="30"> using the ServiceIP <font style="color:blue">10.30.0.2</font> representing the Round Robin balancing policy. The network components' proxy converts the address to the Namespace IP of Service B Instance 3, which is randomly chosen among all the available instances.

When Service A performs a third request <img src="/network/NetArchExample_evenlope_3.png" alt= "envelope_3" width="30"> using again the ServiceIP <font style="color:blue">10.30.0.2</font> representing the Round Robin balancing policy, this time, the network components' proxy randomly chooses Service B Instance 2.

The last request <img src="/network/NetArchExample_evenlope_4.png" alt= "envelope_4" width="30"> from Service A to Service B uses the Instance IP representing instance 3. The proxy component then automatically chooses Service B Instance 3

#### Why do we need Instance IPs?

Mainly for 2 reasons:
1. Instance IPs represent a service's instance uniquely within the platform. Even when the instance migrates toward new devices, the Instance IP always represents the instance and not the machine where the instance is deployed. The Instance IP is the foundation that enables an overlay network that abstracts services from machines. 
2. When forwarding the packet, the proxy uses the sender's Instance IP in the `from` header field of the packet. This way, any response or connection-oriented protocol can transparently work, and we guarantee the original sender receives the response.

#### Why Service IPs? Why do we need multiple balancing policies? 

At the Edge, Oakestra's net component enables flexibility in the way developers can balance the traffic without the requirement of adapting the code. Just by using a Service IP instead of a regular IP, a developer can achieve balancing by using any protocol based on UDP or TCP and can also customize the balancing behavior of each request accordingly to their need. Edge computing brings resources closer to the users, so one might need to forward some traffic with very low latency using Closest balancing policy, or one might just want to evenly balance another endpoint with Round Robin policy.


