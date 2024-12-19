---
title: "Debugging Running Applications"
summary: ""
draft: false
weight: 394
toc: true
seo:
  title: "Monitoring and Debugging Options for Running Containers" 
  description: "This guide will show you how, after a deployment, you can attatch yourself to a running container and execute commands"
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## How to access a running container?

To interact with a running container on a worker node, use the `ctr` utility. This CLI tool is part of `containerd`, the runtime Oakestra uses for deploying containers. All Oakestra containers are placed in a custom namespace called `oakestra`.

In `containerd`, there are two key concepts:

- **Containers:** Represent the filesystem, environment, and associated metadata.
- **Tasks:** Represent the processes running inside those containers.

### Listing Containers and Tasks

```bash
sudo ctr -n oakestra container ls
```

To check all running tasks you can use the following: 

```bash
sudo ctr -n oakestra task ls
```

### Executing Commands Inside a Running Container

To attach to a running container and execute commands inside it:


```bash
sudo ctr -n oakestra task exec --exec-id tty <your task name here> <the command you wish to execute>
```

>For example, to use a shell inside the container x.y.z we can use
> ```bash
> sudo ctr -n oakestra task exec --exec-id tty x.y.z /bin/sh
> ```
>![Screenshot 2024-06-05 at 09.47.05](running-containers-debug.png)

## Where are the logfiles stored?

The `stdout` and `stderr` of each container or unikernel is stored under `/tmp/<appname>.<appns>.<servicename>.<servicens>.<instancenumber>` of the worker node running the instance.

> For example, to access the latest logs of instance 0 of `x.y.z.y` in my worker node I can run `tail /tmp/x.y.z.y.0`

## What about Unikernels?

You cannot attach directly to a running unikernel, but their logs are stored in the same way as containers. Check the `/tmp` directory structure as described above to access and review their logs.

