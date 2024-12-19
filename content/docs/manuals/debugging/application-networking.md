---
title: "Debugging Application Network"
summary: ""
draft: false
weight: 393
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## How do I access the network namespace of a container in my worker node?

When `containerd` generates the network namespace for your container it does not show up out of the box in the network namespace list. In fact, when running:

```bash
sudo ip netns list
```

You'll get an empty list, even if using 

```bash
sudo ctr -n oakestra container ls 
```

will give you a list of running containers. 

#### So... what do we do? 

When a container is deployed, and a network namespace is created, the symlink of the net namespace is not automatically created inside the `/var/run/netns` directory. So we just need to do that! 

First, let's retrieve the `PID` of the container:

```bash
sudo ctr -n oakestra task ls
```

![image](networking-netns.png)


In this example, the `PID` is `222432`

{{< callout context="caution" title="Caution" icon="outline/alert-triangle" >}}Create the `/var/run/netns/` directory with `mkdir -p /var/run/netns/` if not already present.{{< /callout >}}

Then, create the symlink using the command:

```bash
ln -sfT /proc/<container PID>/ns/net /var/run/netns/<container name>
```

In this example, the command will look like:

```bash
ln -sfT /proc/222432/ns/net /var/run/netns/test.test.nginx.test.instance.0
```

Now if we run the command 

```bash
sudo ip netns list
```

You will see the `test.test.nginx.test.instance.0` namespace. 


## How to debug the network?

Once the namespace is accessible via the `netns` command, you can enter inside it and debug your environment using the classic utilities such as `tcpdump`/`tshark`, and you can check the interfaces using the `ip` utils or execute any command you fancy. You can even create new interfaces inside and play around with them. 

Simply use

```bash
ip netns exec <containername> <your command>
```

E.g. to show the interfaces inside the namespace of the previous example, we can run:

```bash
sudo ip netns exec test.test.nginx.test.instance.0 sudo ip a s`
```

## What about the debugging network of my unikernel-based applications?

If you're running unikernels using Oakestra native unikernel virtualization, you'll automatically find the namepsace in `ip netns list`.

If you're using `runu` runtime attached to containerd, you can still use the procedure described above for containerd. 

{{< link-card
  description="Read Unikraft debugging guide for more information"
  href="https://unikraft.org/guides/debugging"
  target="_blank"
>}}