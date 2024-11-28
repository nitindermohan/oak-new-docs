---
title: "Start your Dashboard"
draft: false
weight: -99
---

The Dashboard is a sophisticated web-based user interface for the Oakestra system. 
It is designed to provide users with a comprehensive set of tools to deploy applications to a 
Oakestra cluster, effectively manage cluster resources, and troubleshoot any issues that may arise.

With the Dashboard, users can gain an insightful overview of the applications currently running on 
their cluster. It allows them to create and modify individual services, 
view the status of running services, and configure service-level agreements (SLAs) with an intuitive form. 
This feature-rich interface also enables users to monitor the state of Oakestra resources within 
their cluster and track any errors that may have occurred.

In essence, the Dashboard empowers users to harness the full potential of the Oakestra system with 
ease and efficiency, enabling them to achieve their goals and objectives in a 
seamless and hassle-free manner.

## Requirements

- You have a running Root Orchestrator.
- You can access the APIs at `<root-orch-ip>:10000`


## Preparation

Make sure the following software is installed:

* Git 2.13.2+ ([installation manual](https://git-scm.com/downloads))
* Docker 1.13.1+ ([installation manual](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/))


## Deployment

**0)** Clone the repository

```shell
git clone https://github.com/oakestra/dashboard.git && cd dashboard
```

**1)** Create a file that contains the environment variables

```Shell
echo "API_ADDRESS=<IP_of_the_system_manager_api>:10000" > .env
```

**2)** Run the dashboard

```Shell
sudo docker-compose up
```

### Running the Okakestra Framework

To be able to log into the dashboard and test all functions, at least the System Manager and 
MongoDB must be started. 
How to start them is described in this WIKI [here](../../getstarted/get-started-cluster).

If these components were not started or the wrong IP address was configured, the login screen can be reached, but you cannot log in to the dashboard.

