---
title: "Example Applications"
summary: ""
draft: false
weight: 331
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---
You can run a wide variety of applications in your Oakestra cluster.
Here, you'll find some examples applications with their respective SLA template that you can use right away to test out Oakestra. You can also use these examples as a starting point to build your own applications.

![header](header.png)


## I. Nginx Client-Server with Load Balancing
![Minecraft Preview](balancing.png)

To test out the balancing capabilities of Oakestra, you can deploy a simple Nginx server and a client that sends requests to a **Round-Robin** balanced semantic IP assigned to the server. This means that when scaling up your Nginx service, the client requests will automatically be balanced across the service's instances without you having to change anything in application code.

{{< link-card
 title="Nginx Client-Server Example"
 description="Read more about how to create load-balanced microservices"
 href="../nginx-client-server-with-load-balancing/"
 target="_blank"
>}}

## II. Cloud/Edge Gaming: Minecraft 
![Minecraft Preview](minecraft-full.png)

**Features**:
- 🎮 Play Minecraft from a browser, no client installation needed (thanks to [WebMC](https://github.com/michaljaz/webmc))
- 👭 Play multiplayer locally or remotely 
- 🖥️ Host your Minecraft server ([Openhack](https://github.com/noelbundick/minecraft-server)) and proxy. 
- ⚙️ Scale your server instances to handle more users
- 🛠️ Customize your deployment 

{{< link-card
 title="Self-hosted Minecraft Demo"
 description="See GitHub repository for installation details."
 href="https://github.com/oakestra/minecraft-client-server-example"
 target="_blank"
>}}

## III. Augmented Reality (AR)
![Object Detection Preview](ar-demo.gif)

You can try out our custom distributed AR application, which is composed of three microservices. 

**1. Preprocessing**: The preprocessing microservice collects the frames and adapts them for the model.

**2. Object Detection**: This service detects the bounding boxes inside the image. If Object Recognition is up and running, it forwards the frames there. Otherwise, it sends the bounding boxes back to the client.

**3. Object Recognition**: This service receives the frames from object detection. For each bounding box of type "Person" it detects the face features and sends them back to the client.

{{< inline-svg src="svgs/app-catalog/pipeline-light.svg" class="svg-inline-custom svg-lightmode" width="600px" height="250px" >}}
{{< inline-svg src="svgs/app-catalog/pipeline-dark.svg" class="svg-inline-custom svg-darkmode" width="600px" height="250px">}}

{{< link-card
 title="Augmented Reality Pipeline Setup"
 description="See GitHub repository for installation details."
 href="https://github.com/oakestra/app-ar-pipeline/tree/main"
 target="_blank"
>}}

{{< callout context="note" title="Good to know" icon="outline/info-circle" >}}
Read our research on how Augmented Reality and video analytics applications can be accelerated using Oakestra here. 
{{< /callout >}}

## IV. Unikraft Web Server

Similarly to the regular Nginx deployment in Oakestra, we can deploy nginx using [Unikraft](https://unikraft.org) Unikernels. This will allow us to have a more lightweight and isolated version of nginx for the machines supporting unikernel virtualization.

{{< link-card
 title="Nginx Unikernel Deployment"
 description="Read more to learn how to create unikernel microservices."
 href="../nginx-unikernel-deployment/"
 target="_blank"
>}}

