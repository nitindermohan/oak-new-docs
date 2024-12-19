---
title: "Creating Custom Resources"
summary: ""
draft: false
weight: 355
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---
<span class="lead">
Custom resources in Oakestra provide a mechanism to extend the system’s API dynamically by introducing new resource types. Similar to Kubernetes’ Custom Resources, this feature allows developers to define and manage tailored data structures to meet specific needs, enabling Oakestra to adapt to a wide range of scenarios.
</span>


{{< callout context="tip" title="Why should developers use custom resources?" icon="outline/rocket" >}}

Custom resources in Oakestra enable:
1. **Dynamic API Extensions**: Add new resource types to the system beyond the default ones.
2. **Declarative Management**: Store and retrieve structured data through API endpoints.
3. **Custom Logic**: Use controllers to act on the data defined by the custom resources, enabling automation and state management.

{{< /callout >}}


## How Custom Resources Work

Custom resources operate via the **resource abstractor**, which centralizes entity management in Oakestra. When a new resource is created:
- The system automatically generates an API endpoint for managing the resource.
- The resource's data schema is stored in the system database (e.g., MongoDB).
- Optionally, custom controllers can monitor and act upon these resources, aligning the system’s state with the desired configuration.


## Using Custom Resources

Custom resources are defined by specifying their type and schema. The schema determines the structure of the data the resource can hold.

#### API Request to Create a Custom Resource
Send a `POST` request to the resource abstractor API with the following JSON body:
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
Where:
- **resource_type**: Defines the name of the new resource type (e.g., `custom_type`).
- **schema**: Defines the structure of the resource using an OpenAPI-compliant format.

### Accessing the Custom Resource

Once created, the custom resource is accessible through its API endpoint:
- Endpoint: `/custom-resources/{resource_type}`
- Methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`

#### Adding a Resource Instance
To add an instance of the resource, send a `POST` request to the resource’s endpoint:
```json
{
  "field1": "example value",
  "field2": 42,
  "field3": ["item1", "item2"]
}
```


### Using Controllers with Custom Resources

Controllers enable automation and state management for custom resources. When a custom resource is updated, controllers can monitor the changes and perform corresponding actions. These controllers can be implemented as Oakestra addons.


### Hook Integration
Custom resources can leverage hooks to trigger synchronous or asynchronous notifications for life-cycle events:


## Example: Custom Resource Workflow

### Defining a Custom Resource
Create a custom resource for managing configurations of edge devices:
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