---
title: "Installing Addons"
summary: ""
draft: false
weight: 352
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

{{< callout context="caution" title="Requirements" icon="outline/alert-triangle" >}}

- The addons engine is running. Visit the [setup section](../setting-up) for more details.
- The addon has been [published](../creating-addons) to the marketplace. This can be verified by sending a `GET` request to `/api/v1/marketplace/addons/{addon_marketplace_id}`.
{{< /callout >}}

## Installation

To install an addon, simply send a `POST` request to the addons engine - `/api/v1/addons`. The request body should have the following form:
```json
{
  "marketplace_id": "{addon_marketplace_id}"
}
```

{{< callout context="note" title="API Docs" icon="outline/info-circle" >}}

You can find a detailed outline of all the API endpoints at:
```bash
<marketplace-ip>:11102/api/docs
```
{{< /callout >}}

{{< link-card
  title="Oakestra API"
  description="Learn more about the Oakestra API"
  href="../../../getting-started/deploy-app/with-the-api"
  target="_blank"
>}}

## Verify Installation
The Addons Manager will:
- Retrieve the addon from the marketplace.
- Pull the Docker image associated with the addon.
- Deploy and integrate the addon into the Oakestra environment.

You can verify the installation by checking the addon’s status using the addons manager API - `[GET] /api/v1/addons/{addons_id}`


## Uninstall an Addon

Simply send a `DELETE` request to the addons manager - `/api/v1/addons/{addons_id}`

