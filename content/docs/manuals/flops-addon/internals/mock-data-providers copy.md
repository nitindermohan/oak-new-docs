---
title: "Mock Data Providers"
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

{{< callout context="caution" title="Requirements" icon="outline/alert-triangle">}}
  "Mocking" data for training requires a basic understanding of how FLOps manages ML data on learner nodes.
  Ensure you have read the [respective documentation](/docs/manuals/flops-addon/internals/ml-data-management/).
{{< /callout >}}

FLOps provides a mock data provider (**MDP**) service *(container image)* that helps newcomers or those without access to edge devices to get started quickly and use FLOps, e.g., on a single machine.
The MDP is an example implementation for your edge devices to follow to ensure they can correctly send their data to the orchestrated learner nodes.

{{< callout context="caution" title="Requirements" icon="outline/alert-triangle">}}
  An MDP has to be deployed as an Oakestra service on the same worker node where later training should occur.
  These worker nodes must have the FLOps-learner addon activated.

  The MDP and any FLOps project require data tags in their SLAs.
  These tags have to match; otherwise, the learner will not find the data, and training will fail.

  You must ensure that the dataset you are requesting can be correctly transformed by the ML Git repository to use for training.
  I.e., always double-check if the dataset is compatible with your specified ML training code.
{{< /callout >}}


## MDP SLA Format

Here is an SLA example for the [cifar10](https://huggingface.co/datasets/uoft-cs/cifar10/viewer/plain_text/train) dataset that the MDP will split into three partitions.

```json
{  % The ID has to match the user’s orchestrator ID.
  "customerID": "Admin",
  "mock_data_configuration": {
    % This value can be any dataset name available in Hugging Face.
    "dataset_name": "cifar10",
    "number_of_partitions": 3,
    % This tag must match the one for your FLOps project,
    % otherwise the learner will not find the data and training will fail.
    "data_tag": "my_tag"
  }
}
```

To deploy an MDP you have to send an API request to the FLOps manager with a fitting SLA.
The POST endpoint is: `/api/flops/mocks`

{{< callout context="note" title="Make mocking data easy" icon="outline/info-circle" >}}
  The `oak-cli` provides predefined MDP SLAs and can deploy them for you with a single [command](/docs/manuals/cli/features/flops-addon/#oak-addon-flops-mock-data-m).
{{< /callout >}}

## Architecture

{{<svg "mock-data-provider">}}

The MDP uses [Flower Datasets](https://flower.ai/docs/datasets/) to fetch monolithic datasets from [Hugging Face](https://huggingface.com/) and split them into heterogeneous partitions.
Each partition is sent (via [Arrow Flight](https://arrow.apache.org/docs/format/Flight.html)) to the ML Data Server located on the same worker node, just as if multiple edge devices had sent their data to the data server.

Once training starts *(assuming the data tags match)*, the learner service will fetch the stored data and merge it back together.

{{< link-card
  title="Mock Data Provider Implementation"
  description="Look at the source code that powers the mock data providers"
  href="https://github.com/oakestra/addon-FLOps/tree/main/mock_data_provider_package"
>}}
