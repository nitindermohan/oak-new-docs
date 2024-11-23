---
title: "FL Basics"
summary: ""
draft: false
weight: 222
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

Before looking at Federated Learning (FL) in detail, it is helpful to remind ourselves of how classic centralized machine learning works and its downsides.

## Classic Machine Learning

{{<svg "flops/centralized_ml/">}}

The classic centralized ML model training process can be represented as follows:
Initially, each client has its data (D) (1). 
The centralized server holds an untrained (gray) ML model (M).
Data is required to enable model training, which clients must send to the server (2). 
After/during training, the client's data remains on the server and is exposed to potential exploitation and privacy breaches (3). 
*(The pink/purple model color symbolizes that different data sources have been used during training.)*

## Federated Learning

The basic FL training loop can be split up into six stages.

In FL, the server/aggregator coordinates the FL processes but does not train the model.
Each client/learner does the training locally, which requires setting up an environment to handle training.
All FL components must know and possess the local ML model, which is initially untrained. (1)

{{<svg "flops/classic_fl/part1">}}

{{< callout context="note" title="Naming Conventions" icon="outline/info-circle" >}}
  In FL, the server is frequently called an *aggregator*.
  Clients are called *learners*. Using the terms *server* and *clients* in FL is still common.
  We use various components, including non-FL servers and clients.
  Thus, we prefer to highlight FL components using *aggregators* and *learners*.
{{< /callout >}}

The aggregator starts the first FL training cycle.
Each selected learner starts training its model copy exclusively using its local data (2). 
After the local training concludes, each learner possesses a uniquely trained local model (3). 

{{< callout context="note" title="Composition of ML Models" icon="outline/info-circle" >}}
  Most ML models (especially DNNs) consist of two parts.

  The first part is (usually) a static lightweight model architecture.
  It includes layer specification, training configuration, and hyperparameters like learning step sizes, loss, and activation functions.
  Model architecture is typically static and lightweight in classic ML/FL.  

  The second dynamic part is model weights and biases that get changed/optimized during training.
  They allow the model to fulfill its intended use, such as prediction, inference, or generation tasks.
  These weights and biases significantly contribute to a trained model’s overall size (space utilization).
{{< /callout >}}

FL components can transmit and share weights and biases instead of the entire trained model.
We call model relevant data sent between the learners and aggregators (model) parameters and depict it with (P).

{{<svg "flops/classic_fl/part2">}}

The learners extract their model parameters and sent them to the aggregator.
The aggregator now has access to these parameters but not the sensitive data used to train them.
That is how FL can profit from sensitive data while maintaining its privacy. (4)

The server aggregates these collected parameters into new global parameters and applies them to its model instance.
Learners might possess varying amounts of data that lead to differently impactful updates.
Learners typically also send the number of data samples they used for training to the aggregator to help it prioritize its received updates proportionally.
In classic FL aggregation, the mean of the parameters is used for the global model.
The result is a global model that was trained for one FL cycle. (5)

The aggregator sends its global parameters back to the learners.
The learners apply these parameters to their local model instance to make it identical to the aggregator’s global model.
The FL training loop could terminate, and the learners or servers could use their global model copy for inference.
Otherwise, another FL training cycle begins.
There can be arbitrarily many FL cycles, similar to conventional training rounds in classic ML.
FL training eventually terminates due to time/resource constraints or a failure to reach a satisfying performance.
If not terminated, the accuracy and loss will worsen due to overfitting, assuming the available training data is finite and unchanging. (6)

## Diving deeper into FL

FL emerged in 2016 and continues to expand rapidly - be it its research or industrial frameworks and applications.
Many different algorithms and strategies exist for FL - even more are envisioned yearly.
The section above only depicts the simplest base case FL algorithm called FedAvg.
FL specializes in securely distributing computational ML workloads onto a vast and highly flexible fleet of heterogeneous devices.
Possible attack vectors and matching countermeasures do exist.
FL features a growing variety of use cases and architectures.

To learn more about FL, we recommend looking at the [Master's Thesis](https://www.nitindermohan.com/documents/student-thesis/AlexanderMalyuk_MT.pdf) that enabled FL via Oakestra and the book 'Federated Learning - A Comprehensive Overview of Methods and Applications' by H. Ludwig and N. Baracaldo. 
