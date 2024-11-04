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

Addons in Oakestra provide a flexible way to extend and customize the platform by adding new features or enhancing existing functionality. This guide demonstrates how to create an addon, publish it to the marketplace, and install it from the marketplace.

## Creating an Addon

To create an addon, developers must package their addon functionality into a Docker-compatible image. Here’s a step-by-step guide for building a basic addon:

1. **Define Addon Functionality**: Decide on the addon’s purpose, such as a new scheduler or monitoring tool, and write the code to support this functionality.

2. **Dockerize the Addon**: Package the code into a Docker image by creating a `Dockerfile` that specifies the environment and dependencies needed. For example:
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
3. **Push the Image to a Container Registry**: Publish the Docker image to a container registry, such as Docker Hub, to make it accessible by Oakestra’s marketplace.
    ```bash
    docker build -t your-username/addon-name:latest .
    docker push your-username/addon-name:latest
    ```

4. **Create the Addon Descriptor**: Define a JSON file (`addon.json`) to describe your addon. This file includes metadata like the addon name, version, container image, and any configuration parameters:
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

5. **Submit the Addon to the Marketplace**: 
    - Send a `POST` request with the descriptor file to Oakestra’s Addons Marketplace API.
    - The marketplace will validate the descriptor, and upon successful validation, your addon will be published for others to use.

## Publishing the Addon

To publish an addon to Oakestra’s Addons Marketplace, developers must submit the addon descriptor to the marketplace API.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d @addon.json \
  http://oakestra-marketplace/api/addons
```

Upon submission, the marketplace will review the addon for compatibility and mark it as “approved” once verified.

## Installing an Addon from the Marketplace

Once an addon is available in the marketplace, users can install it into their Oakestra environment:

1. **Browse Available Addons**: Visit the marketplace to view available addons and select the desired one.

2. **Send Installation Request**: Use the `Addons Manager API` to send a `POST` request for the addon installation:
    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{"marketplace_id": "unique-addon-id"}' \
      http://oakestra/api/addons/install
    ```

3. **Verify Installation**: The Addons Manager will pull the specified addon and make it available within the Oakestra environment, integrating seamlessly with the core system.