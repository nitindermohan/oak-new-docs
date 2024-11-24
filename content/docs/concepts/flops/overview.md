---
title: "Overview"
summary: ""
draft: false
weight: 221
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---
## Federated Learning
Federated Learning (FL) distributes the computational load of machine learning while preserving privacy by keeping sensitive data on the client devices instead of a centralized server.

{{< link-card
  title="FL Basics"
  description="Explore fundamental concepts of Federated Learning"
  href="/docs/concepts/flops/fl-basics"
  target="_blank"
>}}

## FL with Oakestra
The main target group for (cross-device) FL is heterogeneous edge devices.
Oakestra specializes in handling such resource-constrained devices spread across various geographical areas.
Infrastructure providers can have their own isolated cluster and cluster orchestrator - (ideal for cross-silo FL).
Cluster orchestrators can only access detailed information about workers from their cluster.
The metrics they share with the root are distilled and no longer contain sensitive individual metadata.
This is an ideal environment for FL because this layout supports privacy on a structural level.
Oakestra's slim open-source code base allows for easy extension, further development, and experimentation with FL features.

## FLOps
FLOps is an [Oakestra Addon](TODO) that enables streamlined and accelerated practical FL workflows via:
{{< details "Automated Orchestration of FL Components and Auxiliaries" >}}
  TODO
{{< /details >}}
{{< details "Automated FL Augmentation/Containerization" >}}
  TODO
{{< /details >}}
{{< details "Elevated Observability & Tracking via MLOps" >}}
  TODO
{{< /details >}}

{{< details "Combine latest Frameworks & Tools" >}}
  FLOps combines state of the art solutions from different fields in novel ways instead of reinventing custom subpar solution from scratch.
  Every third-party component and dependency has been carefully analyzed and compared with possible alternatives.
  The following is a selection of tools and frameworks that power FLOps.

  ### [Flower](https://flower.ai/) 
  Flower is the leading research-backed open-source FL framework on the market.
  Due to Flower's high flexibility and cutomization FLOps was able to combine it with other tools and its own components to achieve novel features.
  FL implements and handles core FL components but it does not handle many other necessary aspects such as deployment, orchestraton, dependency management, containerization, or advanced tracking and observability tools seen in MLOps.

  ### [mlflow](https://mlflow.org/)
  MLflow is a mature open-source MLOps tool that powers the runtime observability and tracking features of FLOps.
  MLflow augments and supports the entire ML life-cycle, starting from conception, to code and dependency archivation and unification to tracking and tagging ML models and artifacts to re-redeployments. 

  ### Apache's 'Data Suite'
  FLOps works with real data on learner devices.
  To receive, store, and retrieve such data efficiently it employs several technologies provided by [Apache](https://www.apache.org/).
  - [Arrow](https://arrow.apache.org/docs/format/Columnar.html) columnar format for working with data in memory.
  - [Parquet](https://parquet.apache.org/) columnar file format for working with data stored on disk.
  - [Arrow Flight](https://arrow.apache.org/docs/format/Flight.html) a gRPC-based framework to transport Apache formatted data over the network.

  ### [Buildah](https://buildah.io/)
  Buildah helps FLOps to build containerized FL images inside running containers.
  Therefore distributing the computational load of image building across devices.

  ### [Anaconda Suite](https://docs.anaconda.com/)
  FLOps uses the Anaconda Suite to resolve dependencies to provide equal ML training across devices.
  To be more specific:
   - [Miniconda](https://docs.anaconda.com/miniconda/) for lightweight (base) images
   - [Mamba](https://www.anaconda.com/blog/a-faster-conda-for-a-growing-community) for fast dependency resolving

{{< /details >}}
{{< details "Convenient Installation & native CLI" >}}
  FLOps can be easily set up via (TODO repo - or addon).
  See the [FLOps Manuals](/docs/manuals/flops) for concrete instructions.

  The [Oakestra CLI](/docs/getting-started/deploy-app/with-the-cli/#the-oak-cli) supports a [set of commands](/docs/manuals/cli/features/flops-addon/#oak-addon-flops) to work with FLOps.
{{< /details >}}


As a result individual with different levels of expertize in the areas of FL, automation, DevOps, containerization, and orchestration can benefit from these techniques and perform FL.

// Place the entire architecture & steck 

{{< callout context="note" title="Naming Explained" icon="outline/info-circle" >}}
  **FLOps** stands for *Federated Learning Operations*.
  It is inspired by the field of *MLOps* that enhances ML with DevOps practices.

  We do not claim any ownership of this term or name - in contrary, we want to spread awareness of benefiting from applying DevOps and other techniques to FL/ML to improve the onboarding, usage, and development of the entire field.  
{{< /callout >}}



---

{{< link-card
  title="FLOps Manuals"
  description="Explore how to set up and use FLOps yourself"
  href="/docs/manuals/flops"
  target="_blank"
>}}

---

{{< callout context="note" title="Want to know more about FLOps?" icon="outline/school" >}}
  The Oakestra Addon FLOps was developed as part of this [Master's Thesis](https://www.nitindermohan.com/documents/student-thesis/AlexanderMalyuk_MT.pdf).
  This thesis provides a comprehensive look and analysis of:
  - The need and use-cases for Federated Learning
  - The history and state of FL research and frameworks (2024)
  - FLOps motivation, requirements, architecture, workflows, and limitations
{{< /callout >}}
