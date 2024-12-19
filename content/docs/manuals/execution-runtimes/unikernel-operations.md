---
title: "Unikernel Deployment"
summary: ""
draft: false
weight: 362
toc: true
seo:
  title: "Unikernel Deployment" # custom title (optional)
  description: "Deployment of Unikraft Unikernels in Oakestra" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---
<span class="lead">
Oakestra supports unikernel executions for applications built using Unikraft. 
</span>

{{< callout context="tip" title="What do you need?" icon="outline/rocket" >}}
It's simple. All you need to start deploying unikernels is:

1. A unikernel .tar.gz hosted in a repository accessible to the Oakestra
2. A service deployment descriptor 
3. A worker machine with KVM Runtime enabled
{{< /callout >}}

### Packaging your first Unikraft image 


Once you build your first Unikernel using [Unikraft](http://unikraft.org), you can create a tarball of the kernel image and the necessary files.

```bash {frame="none"}
myunikernel.tar.gz
|-- kernel
`--files1/
      |--...
 `--...
```

Your unikernel tarball MUST contain a file named `kernel`, which is the unikernel image itself. Additionally, it CAN contain a `files1` folder, which is mounted by Oakestra as a kernel filesystem at runtime. This folder contains all the additional files required by the unikernel to run.

{{< link-card
  title="Looking for an example?"
  description="Check out the Unikraft Nginx walkthrough in the Application Catalogue"
  href="/docs/manuals/app-catalog/nginx-unikernel-deployment/"
  target="_blank"
>}}

Once you've packaged your unikernel, you can upload it to a location accessible to Oakestra, such as a web server or a cloud storage service.

### Creating a Service Deployment Descriptor for your Unikernel

Unikernels can be deployed to Oakestra like any other service. You need to create a service deployment descriptor that describes the unikernel service you want to deploy.

{{< details "Here is an example of an Nginx server using Unikraft" open >}}
```json {title="unikernel-nginx.json"}
 {
   "sla_version": "v2.0",
   "customerID": "Admin",
   "applications": [
 {
       "applicationID": "",
       "application_name": "nginx",
       "application_namespace": "test",
       "application_desc": "Simple demo of a Unikraft Nginx server",
       "microservices": [
 {
           "microserviceID": "",
           "microservice_name": "nginx",
           "microservice_namespace": "nginx",
           "virtualization": "unikernel",
           "cmd": [
             ""
 ],
           "memory": 400,
           "vcpus": 1,
           "vgpus": 0,
           "vtpus": 0,
           "bandwidth_in": 0,
           "bandwidth_out": 0,
           "port": "9000:80",
           "storage": 0,
           "code": "https://github.com/oakestra/oakestra/releases/download/alpha-v0.4.301/nginx_amd64.tar.gz",
           "arch": [
             "amd64"
 ],
           "state": "",
           "added_files": []
 }
 ]
 }
 ```
 {{< /details >}}

**What's important to note in this SLA?**

- The `virtualization` field is set to `unikernel`
- The `code` field contains the URL to the unikernel tarball. This URL must be accessible to the Oakestra worker nodes. We're using the Oakestra release page as an example here to host the tarball file.
- The `arch` field specifies the architecture of the unikernel. In this case, it's `amd64`.

The rest of the fields are similar to the ones used for container services.
You can then deploy the application as usual using the Oakestra Dashboard, the Oakestra CLI, or the Oakestra APIs.

{{< callout context="caution" title="Caution" icon="outline/alert-triangle" >}}
You need at least one worker node in one of your clusters with a unikernel runtime enabled to deploy your unikernels. 
{{< /callout >}}

### Enable a KVM Runtime for an Oakestra Worker Node

If your node supports nested virtualization and you have KVM installed, you can enable the KVM runtime for your Oakestra worker node.


{{< callout context="tip" title="How to install KVM?" icon="outline/rocket" >}}
E.g., If your worker node uses an Ubuntu distro, you can follow [this](https://phoenixnap.com/kb/ubuntu-install-kvm) guide to install KVM.
{{< /callout >}}

If your infrastrcuture fulfills all the requirements, all you need to do is:

**1: Stop your worker node (if already running)**
```bash
sudo NodeEngine stop
```
**2: Enable unikernel runtime**
```bash
sudo NodeEngine config virtualization unikernel on
```
**3: Restart your worker node**
```bash
sudo NodeEngine -a <Cluster Orchestrator IP> -d
```

{{< callout context="note" title="Did you know?" icon="outline/info-circle" >}}

You can check the list of enabled runtimes using:
```bash
sudo NodeEngine config virtualization
```

You can turn off any virtualization runtime using:
```bash
sudo NodeEngine config virtualization <unikernel/container> off
```
{{< /callout >}}



