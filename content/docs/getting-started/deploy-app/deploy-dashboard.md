---
title: "With the Dashboard"
description: "Deploy your app using the Oakestra Dashboard"
summary: ""
date: 2023-09-07T16:06:50+02:00
lastmod: 2023-09-07T16:06:50+02:00
draft: false
weight: 112
toc: false
sidebar:
  collapsed: false
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## The Dashboard

Now that you have familiarized yourself with the API, you can try out the dashboard. The dashboard is the front-end component to cluster management.

It allows the user to:
- View the applications currently running on the cluster
- Create and modify individual services
- Check the status of running services
- Configure service-level agreements (SLAs)

## Deployment

{{< callout context="caution" title="Requirements" icon="outline/alert-triangle">}}
- You have a running Root Orchestrator.
- You can access the APIs at `<IP_OF_CLUSTER_ORCHESTRATOR>:10000`
{{< /callout >}}

If you deployed your cluster with one of the provided docker-compose files, this has already been done for you and you can simply head over to `<http://IP_OF_CLUSTER_ORCHESTRATOR>`. Otherwise follow the instructions below.

### Manual deployment:

**0)** Clone the repository

```bash
git clone https://github.com/oakestra/dashboard.git && cd dashboard
```

**1)** Create a file that contains the environment variables

```bash
echo "API_ADDRESS=<IP_OF_CLUSTER_ORCHESTRATOR>:10000" > .env
```

**2)** Run the dashboard

```bash
sudo docker-compose up
```

### Running the Oakestra Framework

To be able to log into the dashboard, the System Manager and MongoDB must be started. 
How this can be done is described in the [getting started](../deploy-your-first-oakestra-cluster/) section.

If these components were not started or improperly configured, the login screen can be reached, but you cannot log in to the dashboard.

## Accessing the dashboard

Now that the dashboard is up and running, let's log in and explore its functionality.
Upon launching the system for the first time, an administrative user is automatically created.
This user can create and manage other users and organizations within the system, more on [User Management](../organizations/#user-management) later.

> **Admin Credentials**\
> Username: `Admin`\
> Password: `Admin`

{{< callout context="danger" title="Change the Password" icon="outline/alert-triangle">}}
After setting up the cluster manager immediately change the password of the admin user!
{{< /callout >}}

## Organization Login

To log in to an organization check the *Organization login* box and enter the organization name. If the box is not checked or the organization
name is left empty, then you will logged in to the default root organization.

{{< link-card
  title="Organizations"
  description="More on organizations"
  href="../organizations/#organizations"
  target="_blank"
>}}

Here you can see the login to the **sampleOrga**:

![](orga-login.gif)

<!-- Todo: Move somewhere else -->
## Applications, Services, Namespaces

In Oakestra there are applications, services and namespaces. One Application can encompass multiple services and one user can create
multiple applications on one system. Namespaces allow you to create applications and services by the same name in different namespaces,
e.g. `production` and `development`.

### Creating an Application

First you will have to create an application. Choose a concise name, the namespace and optionally a description.

![](add-app.gif)

### Creating a Service

In the section [Deploy your first Application](../../getting-started/deploy-your-first-application/) we discussed registering
deployment descriptors via the API. This is great for automated deployments, but the SLAs were not designed with human readability in mind.
While the dashboard still allows you to upload SLAs as a JSON file, it also provides you with an interactive form.

Once you have created an application you can create services. Once again you will have to choose a concise name, a namespace and optionally a description.
However this is far from it; system requirements, environmental variables, connection details and much more can be specified here.

You will have to choose a virtualization method (Container or Unikernel) and tell Oakestra where it can find your code.
Hit save and your service is ready for deployment!

![](create-service.gif)

### Service Details

Once a service has been created and deployed, you can check on it's status and other details. Choose a service from the *Service List* and from the drop-down
menu, choose an instance and click on *View Instance Details*. 


{{< callout context="note" title="Something Missing?" icon="outline/rocket">}}
If you have any new feature ideas or if you find any bugs please open an issue in the [GitHub repository](https://github.com/oakestra/dashboard).
{{< /callout >}}