---
title: "ML Data Management"
summary: ""
draft: false
weight: 370
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

One noticeable trend in FL is the focus on virtual simulations with already existing data sets.
In real scenarios, FL works on previously unseen heterogeneous data.
FLOps aims to make FL more practical and application-oriented.
To emphasize this, FLOps requires real data from edge devices or "mocked" data provided in such a way that it could have originated from real devices.

{{< link-card
  title="Mock Data Providers"
  description="Find out how to easily 'mock' real devices and data if you don't have access to such devices or want to simply try out FLOps on a single machine."
  href="/docs/manuals/flops-addon/internals/mock-data-providers/"
>}}

## Architecture

Lightweight edge devices tend to lack the computational capabilities to perform machine learning.
Instead, they can send their aggregated data to a more powerful learner node nearby.
This learner node will collect and store data from different sources.

{{<svg "data-management-architecture">}}

Once training starts, the deployed leaner service will request data that matches the data tags that were part of its SLA.
The matching data partitions will be fetched, squashed into a single dataset, and delegated to the user-specified data preprocessing.
Lastly, the data will be forwarded to the ML model for training.

{{< link-card
  title="Why does FLOps use Arrow Flight?"
  href="/docs/concepts/flops/overview/#apaches-data-suite"
>}}

## Workflow

{{<svg "data-management-workflow">}}
