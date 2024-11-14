---
title: "Nginx Client-Server with Load Balancing"
summary: ""
draft: false
weight: 331
toc: false
hidden: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

![Nginx Balancing](balancing.png)

To test out the balancing capabilities of Oakestra, we can deploy a simple Nginx server and a client that sends requests to a Round-Robin balanced semantic IP assigned to the server. When scaling up the Nginx service, the client requests will automatically be balanced across the service's instances.

{{< callout context="note" title="OAK CLI" icon="outline/rocket">}}

In this guide we'll use the Oakestra CLI tool to interact with the Oakestra platform. To find out more about the CLI tool, please refer to the CLI section of the manuals.

 {{< /callout >}}

#### SLA Template

For this example, we create a service named `curlv4` using a `curlimages/curl:7.82.0` docker image. This service performs a curl request to an Okestra semantic IP address of our choice (`10.30.55.55`), then fails. After failure, Oakestra will re-deploy the instance indefinitely.

Together with the `curlv4` service, we deploy a Nginx service named `nginx` using the `nginx:latest` docker image. This service will be assigned a Round-Robin semantic IPv4 address,`10.30.55.55` (as well as a Round-Robin semantic IPv6 address `fdff:2000::55:55`, but this is optional).

{{< callout context="caution" title="Oakestra Networking" icon="outline/alert-triangle">}}
To find out more about networking, please refer to the [Networking](/docs/manuals/networking-internals) section.
{{< /callout >}}

Refer to the following SLA template to deploy the services.

```json {title="~/oak_cli/SLAs/nginx-client-server.json"}
{
  "sla_version": "v2.0",
  "customerID": "Admin",
  "applications": [
    {
      "applicationID": "",
      "application_name": "clientsrvr",
      "application_namespace": "test",
      "application_desc": "Simple demo with curl client and Nginx server",
      "microservices": [
        {
          "microserviceID": "",
          "microservice_name": "curlv4",
          "microservice_namespace": "test",
          "virtualization": "container",
          "cmd": [
            "sh",
            "-c",
            "curl 10.30.55.55 ; sleep 5"
          ],
          "memory": 100,
          "vcpus": 1,
          "vgpus": 0,
          "vtpus": 0,
          "bandwidth_in": 0,
          "bandwidth_out": 0,
          "storage": 0,
          "code": "docker.io/curlimages/curl:7.82.0",
          "state": "",
          "port": "",
          "added_files": []
        },
        {
          "microserviceID": "",
          "microservice_name": "nginx",
          "microservice_namespace": "test",
          "virtualization": "container",
          "cmd": [],
          "memory": 100,
          "vcpus": 1,
          "vgpus": 0,
          "vtpus": 0,
          "bandwidth_in": 0,
          "bandwidth_out": 0,
          "storage": 0,
          "code": "docker.io/library/nginx:latest",
          "state": "",
          "port": "",
          "addresses": {
            "rr_ip": "10.30.55.55",
            "rr_ip_v6": "fdff:2000::55:55"
          },
          "added_files": []
        }
      ]
    }
  ]
}
```

#### Let's deploy the services
```bash
 oak a c --sla-file-name nginx-client-server.json -d
```

{{< callout context="note" title="Did you know?" icon="outline/rocket">}} If your SLA file is not in the ~/oak_cli/SLAs directory you can use the following command instead:

```bash
 oak a c --sla-file-name $(pwd)/nginx-client-server.json -d
```

 {{< /callout >}}

Now the `curlv4` will perform a `curl` request to `nginx`, then it will fail. Oakestra will re-deploy a new `curlv4` instance, so the cycle will continue.

#### Scale up the Nginx service
Let's fetch the Nginx's Service ID using 
```bash
oak s s
```

Then let's deploy a second Nginx instance using:
```bash
oak s d <Nginx Service's ID>
```

By running `oak s s` you should now see two instances of the Nginx service running.
```bash
╭──────────────┬──────────────────────────┬────────────────┬────────────┬──────────────────────────╮
│ Service Name │ Service ID               │ Instances      │ App Name   │ App ID                   │
├──────────────┼──────────────────────────┼────────────────┼────────────┼──────────────────────────┤
│ curlv4       │ 672cf97ff7728660d15a584d │  0 RUNNING ●   │ clientsrvr │ 672cf97fa3ba9aac11ea11af │
├──────────────┼──────────────────────────┼────────────────┼────────────┼──────────────────────────┤
│              │                          │  0 RUNNING ●   │            │                          │
│ nginx        │ 672cf97ff7728660d15a5852 │                │ clientsrvr │ 672cf97fa3ba9aac11ea11af │
│              │                          │  1 RUNNING ●   │            │                          │
╰──────────────┴──────────────────────────┴────────────────┴────────────┴──────────────────────────╯
```
#### Sit down, relax, and watch the magic happen
Use the following command to check the instance's logs:
```bash
oak s i <Nginx Service ID>
```
You'll see the nginx logs of both instances and the effects of the resulting balancing.
For this example, we used the command `oak s i 672cf97ff7728660d15a5852`

```bash
╭───────────────────────────────────────────────────────────────────────────────────────────────╮
│ name: nginx | NODE_SCHEDULED    | app name: clientsrvr | app ID: 672cf97fa3ba9aac11ea11af     │
├───────────────────────────────────────────────────────────────────────────────────────────────┤
│ 0 | RUNNING ●  | public IP: 131.159.24.51 | cluster ID: 672cf976f7728660d15a583e | Logs :     │
├───────────────────────────────────────────────────────────────────────────────────────────────┤
│ 10.30.0.2 - - [07/Nov/2024:17:41:04 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.82.0-DEV" "-" │
│ 10.30.0.2 - - [07/Nov/2024:17:41:34 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.82.0-DEV" "-" │
├───────────────────────────────────────────────────────────────────────────────────────────────┤
│ 1 | RUNNING ●  | public IP: 131.159.24.51 | cluster ID: 672cf976f7728660d15a583e | Logs :     │
├───────────────────────────────────────────────────────────────────────────────────────────────┤
│ 10.30.0.2 - - [07/Nov/2024:17:37:34 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.82.0-DEV" "-" │
│ 10.30.0.2 - - [07/Nov/2024:17:41:19 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.82.0-DEV" "-" │
╰───────────────────────────────────────────────────────────────────────────────────────────────╯
```

As you can see both instances got requests from the single client we have, even is the client is always using the same IP address. 