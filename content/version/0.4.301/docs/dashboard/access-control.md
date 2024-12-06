---
title: "Access Control"
draft: false
---

## Access control

Upon successful installation and accessibility of the Dashboard, our attention can shift to configuring 
access control to resources for various users.

Upon launching the framework for the first time, an administrative user is automatically generated. 
This administrative user can then be leveraged to create additional users and organizations within the system.

Credentials for the admin user: 

**Username:** Admin

**Password:** Admin

It is important to note that after the initial launch of the System Manager, 
it is imperative to change the password for the Admin user as an added measure of security.

## Introduction

Oakestra supports currently only one way of authenticating and authorizing users.
Authorization is handled by the Root Orchestrator (System Manager) API server.
The Dashboard only acts as a proxy and passes all auth information to it. 
In case of forbidden access corresponding warnings will be displayed in the Dashboard.

## Authentication

Oakestra Dashboard currently supports only the following method for authenticating users:

- **Username/password** that can be used on the Dashboard login view.

Once a user has successfully logged in, tokens in the authorization header are leveraged to authenticate the user.

### Authorization Header

Using the authorization header is the only way to make Dashboard function as a specific user. However, it is worth noting that if plain HTTP is used, the traffic is vulnerable to [MITM attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack), which could result in potential security risks.

To enable Dashboard to utilize the authorization header, simply pass `Authorization: Bearer <token>` with every request made to Dashboard. Currently, this is automatically executed with an HTTP interceptor.

To test this feature swiftly, try out the [Requestly](https://chrome.google.com/webstore/detail/requestly-redirect-url-mo/mdnleldcmiljblolnjhpnblkcekpdkpa) Chrome browser plugin that enables manual modification of request headers.


## Organization Login

If you want to log in to an organization you have to enter the organization name if there is no organization yet or if no organization is entered, you will be automatically logged in to the ROOT organization.

Here you can see the login to the **sampleOrga:**

![](/dashboard/orga-login.gif)
