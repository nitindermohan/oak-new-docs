---
title: "Install an Addon"
summary: ""
draft: false
weight: 2
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## Introduction

Addons in Oakestra allow developers to extend the platform by adding new features or enhancing existing ones. This guide focuses on the installation process for addons, enabling you to integrate published addons into your Oakestra environment seamlessly.


## Install an Addon

{{< callout context="note" title="Note" icon="outline/info-circle" >}}
Before installing an Addon make sure that the Addons System is running and that the Addon to be installed is published in the Marketplace.

- Verify that the Addon is published in the Marketplace. This can be done by sending a `GET` request to `/api/v1/marketplace/addons/{addon_marketplace_id}`.
- Also verify that the Addons Engine component is running inside your orchestrator.

{{< /callout >}}

Installing an addon is a simple step involving sending a `POST` request to the Addons Engine - `/api/v1/addons`. Example of the body of the request could be:
```json
{
  "marketplace_id": "{addon_marketplace_id}"
}
```

## Verify Installation
The Addons Manager will:
- Retrieve the addon from the marketplace.
- Pull the Docker image associated with the addon.
- Deploy and integrate the addon into the Oakestra environment.

You can verify the installation by checking the addon’s status using the Addons Manager API - `[GET] /api/v1/addons/{addons_id}`


## Uninstall an Addon

Simply send a `DELETE` request to the Addons Manager - `/api/v1/addons/{addons_id}`