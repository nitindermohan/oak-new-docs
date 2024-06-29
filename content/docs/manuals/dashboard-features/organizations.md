---
title: "Organizations"
summary: ""
draft: false
weight: 321
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## Organizations

We briefly mentioned organizations previously, now let's take a closer look at them.
Organizations facilitate collaboration amongst team members by providing:
* **A collaborative Space:** All applications within an organization are visible to all team members
* **Resource Utilization:** Resources are shared within an organization
* **Access Control:** Easily grant a new team member access to your applications and resources by adding them to your organization

### The Root Organization

A user can be a member of multiple organizations, but they are all a member of the root organization. This is the default
organization that is created when a root orchestrator is started, it is also the organization that you sign in to when you do not
select *organization login*. Unlike other organizations, applications and resources are not shared and are only available to the
user that created them.

### User Management

Different team members have different tasks that require different permissions, so it makes sense to assign them roles based on
which permissions they require to do their work.

![](create-user.gif)

#### Roles
* **Admin**: Can add new users to an organization and manage their roles. This is the role of the default user
* **Organization Admin**: Can add new users to an organization and manage their roles
* **Infrastructure Provider**: Can add resources to the organization
* **Application Provider**: The default role of a user, can manage and deploy applications on organization resources

