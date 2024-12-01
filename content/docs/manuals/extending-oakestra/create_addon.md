---
title: "Create an Addon"
summary: ""
draft: false
weight: 1
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

To create an addon, follow these steps:

### Define Addon Functionality
Decide on the addon’s purpose: does it replace an existing component in Oakestra such as the scheduler or is it something new.
Next implement the necessary code to achieve this functionality and containerize it. 

### Dockerize the Addon
Package your code into a Docker image by creating a `Dockerfile`. For example:
```dockerfile
FROM python:3.9-alpine

RUN pip install -r requirements.txt
COPY . /addon

ENTRYPOINT ["python", "/addon/main.py"]
```

Build and push the Docker image to a container registry, such as Docker Hub:
```bash
docker build -t your-username/addon-name:latest .
docker push your-username/addon-name:latest
```

### Publish the Addon to the Marketplace
Define the addon configuration.</br> 
Here is an example:
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

- **name**: The addon’s identifier.
- **services**: Defines the service(s) required by the addon.
- **volumes/networks**: Optional configurations for data persistence or connectivity.


To make the addon available for others in the Oakestra ecosystem, publish it to the Addons Marketplace by sending a `POST` request with the JSON descriptor to the Addons Marketplace API `/api/v1/marketplace/addons`.

The Addons Marketplace will validate the descriptor. Once approved, the addon will be marked as `approved` and become available for installation.