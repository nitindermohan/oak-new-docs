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

![header](header.png)
Here you'll find some examples of applications with their respective SLA template that you can use right away to test out Oakestra.

## Nginx Client-Server with Load Balancing
![Minecraft Preview](balancing.png)

To test out the balancing capabilities of Oakestra, we can deploy a simple Nginx server with a client that sends requests to the server. By assigning a Round-Robin balanced semantic IP to a Nginx service. When scaling up the Nginx service, the client requests will automatically be balanced across the service's instances.

{{< link-card
  title="Nginx Client-Server Example"
  description="create load-balanced nginx servers"
  href="../nginx-client-server-with-load-balancing/"
  target="_blank"
>}}

## Minecraft Server(s) and Browser Client
![Minecraft Preview](minecraft-full.png)

Features:
- 🎮 Play Minecraft from a browser, no client installation needed (thanks to [WebMC](https://github.com/michaljaz/webmc))
- 👭 Play multiplayer locally or remotely 
- 🖥️ Host your Minecraft server ([Openhack](https://github.com/noelbundick/minecraft-server)) and proxy. 
- ⚙️ Scale your server instances to handle more users
- 🛠️ Customize your deployment 

{{< link-card
  title="Minecraft Demo Repository"
  description="github.com/oakestra/minecraft-client-server-example"
  href="https://github.com/oakestra/minecraft-client-server-example"
  target="_blank"
>}}

## Object Detection Pipeline
![Object Detection Preview](ar-demo.gif)

You can try out this AR Pipeline composed of three services: 

**Preprocessing**: preprocessing microservice, collects the frames and adapts them for the model.

**Object Detection**: detects the bounding boxes inside the image. If Object Recognition is up and running, it forwards the frames there. Otherwise, it sends the bounding boxes back to the client.

**Object Recognitions**: it receives the frames from object detection. For each bounding box of type "Person" it detects the face features and sends them back to the client.

![pipeline](https://github.com/oakestra/app-ar-pipeline/blob/main/img/pipeline.png?raw=true)

{{< link-card
  title="AR Pipeline Repository"
  description="github.com/oakestra/app-ar-pipeline"
  href="https://github.com/oakestra/app-ar-pipeline/tree/main"
  target="_blank"
>}}
