---
title: "Supported Virtualization Runtimes"
summary: ""
draft: false
weight: 361
toc: true
seo:
  title: "Supported Virtualization Runtimes" # custom title (optional)
  description: "Supported Runtimes within Oakestra" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

<span class="lead">
Oakestra aims to streamline how different virtualization technologies are managed and orchestrated. Instead of limiting you to one type of runtime, Oakestra lets you mix and match different virtualizations for different microservices of your application. This gives you the freedom to choose the best environment for each workload.
</span>
{{< callout context="note" title="What is virtualization?" icon="outline/settings-question" >}}
Modern computing environments often combine different types of runtimes. For example, some applications run best in containers for faster startup times, while others need the strong security boundaries of unikernels. Developers package their applications in these runtimes to take advantage of their unique benefits and deploy them on supported hardware.
{{< /callout >}}

{{< callout context="tip" title="How is multi-virtualization support relevant to my application?" icon="outline/rocket" >}}
You are no longer limited to a single runtime for your applications. With Oakestra, you can use fully isolated unikernels for maximizing your Nginx operations and a Docker container for deploying your machine learning models; and have them work together!

This unique functionality allows you to:
- *Optimize Performance*: Pick the runtime that meets your specific speed and resource requirements.
- *Enhance Security and Isolation*: Run sensitive workloads in more secure, isolated environments when needed.
- *Maintain Flexibility*: Easily switch runtimes as your needs evolve.
{{< /callout >}}

### Supported Runtimes

Currently, Oakestra supports the following virtualization runtimes.

| **Technology**    | **Type** |  **Description** |
| --------- | ----------- | ----------- |
| Containerd    | Container Execution Runtime | Ideal for deploying applications that require easy portability and management. |
| Unikraft | Unikernel Execution Runtime |  Specialized, lightweight virtual machines that are optimized for high performance and security. |

### How to Choose a Runtime

Picking the right runtime depends on your workload’s priorities. Are you looking for the fastest startup times? Then unikernels might be best suited for your service. Do you need to support complex applications with multiple dependencies? Containers like Docker might be a good choice.

With Oakestra, you can easily switch between runtimes to find the best fit for your workload. *Or* you can package different virtualizations for different microservices of your application to truly unlock the **hybrid virtualization of edge computing**. Oakestra makes it easy to manage and orchestrate different runtimes, so you can focus on building and deploying your applications.

{{< link-card
  description="Learn more about deploying container-based applications with Oakestra"
  href="/docs/getting-started/deploy-app"
  target="_blank"
>}}

Or continue reading to deploy your unikernel applications with Oakestra.