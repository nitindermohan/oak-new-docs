---
title: "Custom Resources"
summary: ""
draft: false
weight: 333
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## Introduction to Custom Resources

Custom Resources in Oakestra provide a mechanism to extend the system’s API dynamically by introducing new resource types. Inspired by Kubernetes’ Custom Resources, this feature allows developers to define and manage tailored data structures to meet specific needs, enabling Oakestra to adapt to a wide range of scenarios.

This section demonstrates how to create, manage, and utilize Custom Resources within Oakestra.

Custom Resources in Oakestra enable:
1. **Dynamic API Extensions**: Add new resource types to the system beyond the default ones.
2. **Declarative Management**: Store and retrieve structured data through API endpoints.
3. **Custom Logic**: Use controllers to act on the data defined by the Custom Resources, enabling automation and state management.

---

## How Custom Resources Work

Custom Resources operate via the **Resource Abstractor**, which centralizes entity management in Oakestra. When a new resource is created:
- The system automatically generates an API endpoint for managing the resource.
- The resource's data schema is stored in the system database (e.g., MongoDB).
- Optionally, custom controllers can monitor and act upon these resources, aligning the system’s state with the desired configuration.

---

## Using Custom Resources

### Step 1: Defining a Custom Resource

Custom Resources are defined by specifying their type and schema. The schema determines the structure of the data the resource can hold.

#### API Request to Create a Custom Resource
Send a `POST` request to the Resource Abstractor API with the following JSON body:
```json
{
  "resource_type": "custom_type",
  "schema": {
    "type": "object",
    "properties": {
      "field1": {"type": "string"},
      "field2": {"type": "integer"},
      "field3": {
        "type": "array",
        "items": {"type": "string"}
      }
    },
    "required": ["field1", "field2"]
  }
}
```

- **resource_type**: The name of the new resource type (e.g., `custom_type`).
- **schema**: Defines the structure of the resource using an OpenAPI-compliant format.

### Step 2: Accessing the Custom Resource

Once created, the Custom Resource is accessible through its API endpoint:
- Endpoint: `/custom-resources/{resource_type}`
- Methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`

#### Example: Adding a Resource Instance
To add an instance of the resource, send a `POST` request to the resource’s endpoint:
```json
{
  "field1": "example value",
  "field2": 42,
  "field3": ["item1", "item2"]
}
```

---

### Step 3: Using Controllers with Custom Resources

Controllers enable automation and state management for Custom Resources. When a Custom Resource is updated, controllers can monitor the changes and perform corresponding actions. These controllers can be implemented as Oakestra addons.

#### Example Controller Logic
For instance, if a Custom Resource defines configurations for a database cluster, a controller can:
- Create or update the database cluster based on the resource's current state.
- Remove resources when the Custom Resource is deleted.

#### Hook Integration
Custom Resources can leverage hooks to trigger synchronous or asynchronous notifications for life-cycle events:
- **Example Hook**: Notify an external service whenever a resource is created or updated.

---

## Example: Custom Resource Workflow

### Defining a Custom Resource
Create a Custom Resource for managing configurations of edge devices:
```json
{
  "resource_type": "device_config",
  "schema": {
    "type": "object",
    "properties": {
      "device_id": {"type": "string"},
      "config": {
        "type": "object",
        "properties": {
          "cpu_limit": {"type": "integer"},
          "memory_limit": {"type": "integer"}
        }
      }
    }
  }
}
```

### Adding Resource Instances
Add a configuration for a specific device:
```json
{
  "device_id": "edge123",
  "config": {
    "cpu_limit": 2,
    "memory_limit": 4096
  }
}
```

### Automating with a Controller
A controller addon can:
1. Monitor changes to `device_config`.
2. Apply the configurations to the respective edge devices dynamically.