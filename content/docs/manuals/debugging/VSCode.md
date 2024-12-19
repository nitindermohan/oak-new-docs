---
title: "VSCode Debugging"
summary: ""
draft: true
weight: 395
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## How do I debug the NodeEngine from Visual Studio Code? 

If you're using VSCode, you can use the following [launch.json](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations) configuration to execute the NodeEngine in your local machine or a remote one in debug mode. 

```json
{ 
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug Node Engine locally - Unikraft Support",
            "type": "go",
            "request": "launch",
            "mode": "auto",
            "program": "${workspaceRoot}/go_node_engine/pkg/nodeengined.go",
            "console": "integratedTerminal",
            "asRoot": true,
            "args": ["-u"],
            "env": {
                "PATH": "${env:PATH}:/usr/local/go/bin" 
            }
        },
        {
            "name": "Debug Node Engine locally - Container Only",
            "type": "go",
            "request": "launch",
            "mode": "auto",
            "program": "${workspaceRoot}/go_node_engine/pkg/nodeengined.go",
            "console": "integratedTerminal",
            "asRoot": true,
            "args": [],
            "env": {
                "PATH": "${env:PATH}:/usr/local/go/bin" 
            }
        },
        {
            "name": "Debug Node Engine remotely - Cluster Container Only",
            "type": "go",
            "request": "launch",
            "mode": "auto",
            "program": "${workspaceRoot}/go_node_engine/pkg/nodeengined.go",
            "console": "integratedTerminal",
            "asRoot": true,
            "args": ["-a","${input:enterClusterIp}"],
            "env": {
                "PATH": "${env:PATH}:/usr/local/go/bin" 
            }
        },
        {
            "name": "Debug Node Engine remotely - Cluster Unikernel support",
            "type": "go",
            "request": "launch",
            "mode": "auto",
            "program": "${workspaceRoot}/go_node_engine/pkg/nodeengined.go",
            "console": "integratedTerminal",
            "asRoot": true,
            "args": ["-a","${input:enterClusterIp}","-u"],
            "env": {
                "PATH": "${env:PATH}:/usr/local/go/bin" 
            }
        }
    ],
    "inputs": [
        {
          "id": "enterClusterIp",
          "type": "promptString",
          "description": "Cluster Orchestrator IP",
          "default": "0.0.0.0"
        }
      ]
}
```
This configuration file provides 4 different modes. 

You can now run the NodeEngine in Debug mode by choosing one of the 4 different profiles. 
![](VSCode-debugger.png)

#### Debug Node Engine locally - Unikraft Support

>This configuration starts the Node Engine in debug mode with the `-u` flag for unikernel compatibility. 
>- ⚠️ This configuration expects the cluster orchestrator to run locally on the same machine.
>- ⚠️ This configuration expects the NetManager to be already up and running. Either use `systemctl start netmanager` or check [How do I debug the NetManager?](#how-do-i-debug-the-netmanager). If you're not interested in networking, you can also disable the networking from the NodeEngine config file.

#### Debug Node Engine locally - Container Only

>This configuration starts the Node Engine in debug mode wihout unikernel support. 
>- ⚠️ This configuration expects the cluster orchestrator to run locally on the same machine.
>- ⚠️ This configuration expects the NetManager to be already up and running. Either use `systemctl start netmanager` or check [How do I debug the NetManager?](#how-do-i-debug-the-netmanager). If you're not interested in networking, you can also disable the networking from the NodeEngine config file.

#### Debug Node Engine remotely - Cluster Container Only

>This configuration starts the Node Engine in debug mode wihout unikernel support and with support for a remote cluster orchestrator.
>- 🟠 You'll be prompted to neter the URL of a running Cluster Orchestrator
>- ⚠️ This configuration expects the NetManager to be already up and running. Either use `systemctl start netmanager` or check [How do I debug the NetManager?](#how-do-i-debug-the-netmanager). If you're not interested in networking, you can also disable the networking from the NodeEngine config file.

#### Debug Node Engine remotely - Cluster Unikernel support

>This configuration starts the Node Engine in debug mode  with the `-u` flag for unikernel support and with support for a remote cluster orchestrator.
>- 🟠 You'll be prompted to neter the URL of a running Cluster Orchestrator
>- ⚠️ This configuration expects the NetManager to be already up and running. Either use `systemctl start netmanager` or check [How do I debug the NetManager?](#how-do-i-debug-the-netmanager). If you're not interested in networking, you can also disable the networking from the NodeEngine config file.


## How do I debug the NetManager on VSCode? 

Similarly as the NodeEngine, here a sample [launch.json](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations) config file for your NetManager 

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug Net Manager",
            "type": "go",
            "request": "launch",
            "mode": "auto",
            "program": "${workspaceRoot}/node-net-manager/NetManager.go",
            "console": "integratedTerminal",
            "asRoot": true,
            "args": [],
            "env": {
                "PATH": "${env:PATH}:/usr/local/go/bin" 
            }
        }
    ]
}
```

** The NetManager still expects your netconfig file to be correctly placed and configured under `/etc/netmanager/netcfg.json`. **






