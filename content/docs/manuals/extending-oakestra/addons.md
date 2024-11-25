---
title: "Addons"
summary: ""
draft: false
weight: 331
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

Addons in Oakestra provide a powerful way to extend and customize the platform by adding new features or enhancing existing functionality. This guide walks you through the process of creating, publishing, and installing addons in Oakestra.

To get started with addons, follow these high-level steps:

1. **Create the Addon**: Package your functionality into a Docker image and define it using an addon descriptor (`addon.json`).
2. **Publish the Addon**: Submit the addon descriptor to Oakestra's Addons Marketplace.
3. **Install the Addon**: Use the Addons Manager to install the addon in your Oakestra environment.

The following sections provide a detailed walkthrough of each step.

---

## Step 1: Creating an Addon

To create an addon, follow these steps:

### 1.1 Define Addon Functionality
Decide on the addon’s purpose, such as introducing a new scheduler or monitoring tool, and implement the necessary code to achieve this functionality.

### 1.2 Dockerize the Addon
Package your code into a Docker image by creating a `Dockerfile`. For example:
```dockerfile
# Use a base image
FROM python:3.9-alpine

# Install dependencies
RUN pip install -r requirements.txt

# Add your code
COPY . /addon

# Define the entry point
ENTRYPOINT ["python", "/addon/main.py"]
```

Build and push the Docker image to a container registry, such as Docker Hub:
```bash
docker build -t your-username/addon-name:latest .
docker push your-username/addon-name:latest
```

### 1.3 Create the Addon Descriptor
Define the addon configuration using a JSON descriptor file (`addon.json`). For example:
```json
{
  "name": "addon-name",
  "networks": [],
  "volumes": [{
    "name": "myvolume",
    "driver": "bridge"
  }],
  "services": [{
    "image": "your-username/addon-name:latest",
    "service_name": "my_service",
    "networks": [],
    "volumes": ["myvolume:/somevolume"],
    "ports": {"10007":"10007"}
  }]
}
```
This descriptor specifies the addon’s name, required networks, volumes, services, and any necessary configurations.

---

## Step 2: Publishing the Addon

To make the addon available for others in the Oakestra ecosystem, publish it to the Addons Marketplace.

### 2.1 Submit the Addon Descriptor
Send a `POST` request with the JSON descriptor to the Addons Marketplace API:
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d @addon.json \
  http://oakestra-marketplace/api/addons
```

The Addons Marketplace will validate the descriptor. Once approved, the addon will be marked as `approved` and become available for installation.

---

## Step 3: Installing an Addon to the Cluster

Once an addon is approved in the marketplace, it can be installed in your Oakestra environment:

### 3.1 Browse Available Addons
Explore the addons available in the marketplace. Currently, the marketplace is accessible via a RESTful API, allowing users to query available addons programmatically.

### 3.2 Send an Installation Request
Use the Addons Manager API to install the addon by sending a `POST` request with the marketplace ID of the desired addon:
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"marketplace_id": "unique-addon-id"}' \
  http://oakestra/api/addons/install
```

### 3.3 Verify the Installation
The Addons Manager will:
- Retrieve the addon from the marketplace.
- Pull the Docker image associated with the addon.
- Deploy and integrate the addon into the Oakestra environment.

You can verify the installation by checking the addon’s status using the Addons Manager API.