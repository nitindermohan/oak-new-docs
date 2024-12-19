---
title: "FL Basics"
summary: ""
draft: false
weight: 232
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---
Before we discuss Federated Learning (FL) in detail, let's recall how classic centralized machine learning (ML) works.

## Classic Machine Learning

{{< svg-paragraph svg="centralized_ml/part1" alignment="right">}}
  The classic centralized ML model training process can be represented as follows:
  Initially, each client has its data (D). 
  The centralized server holds an untrained (gray) ML model (M).
{{< /svg-paragraph >}}

{{< svg-paragraph svg="centralized_ml/part2" alignment="left">}}
Data is required to enable model training, which clients must send to the server. 
{{< /svg-paragraph >}}

{{< svg-paragraph svg="centralized_ml/part3" alignment="right">}}
After/during training, the client's data remains on the server and is exposed to potential exploitation and privacy breaches.
<br><br>
<i>( The pink/purple model color symbolizes different data sources used during training. )</i>
{{< /svg-paragraph >}}

## Federated Learning Overview

{{< svg-paragraph svg="classic_fl/part1" alignment="right">}}
  In FL, the server/aggregator coordinates the FL processes but does not train the model.
  Each client/learner does the training locally, which requires setting up an environment to handle training.
  All FL components must know and possess the local ML model, which is initially untrained.
{{< /svg-paragraph >}}

{{< svg-paragraph svg="classic_fl/part2" alignment="left">}}
  The aggregator starts the first FL training cycle.
  Each selected learner starts training its model copy exclusively using local data.
{{< /svg-paragraph >}}

{{< callout context="note" title="Naming Conventions" icon="outline/info-circle" >}}
  In FL, the server is frequently called an *aggregator*, and clients are called *learners*.
  Using the terms *server* and *client* in FL is still common.
  We use various components, including non-FL servers and clients.
  Thus, we prefer to highlight FL components using *aggregators* and *learners*.
{{< /callout >}}

{{< svg-paragraph svg="classic_fl/part3" alignment="right">}}
  After the local training concludes, each learner possesses a uniquely trained local model. 
{{< /svg-paragraph >}}

{{< callout context="tip" title="Did you know?" icon="outline/info-circle" >}}
  Most ML models (especially DNNs) consist of two parts.

  The first part is (usually) a static lightweight model architecture.
  It includes layer specification, training configuration, and hyperparameters like learning step sizes, loss, and activation functions.
  Model architecture is typically static and lightweight in classic ML/FL.  

  The second dynamic part is model weights and biases that get changed/optimized during training.
  They allow the model to fulfill its intended use, such as prediction, inference, or generation tasks.
  These weights and biases significantly contribute to a trained model’s overall size (space utilization).
{{< /callout >}}



{{< svg-paragraph svg="classic_fl/part4" alignment="left">}}
  FL components can transmit and share weights and biases instead of the entire trained model.
  We call model relevant data sent between the learners and aggregators (model) parameters and depict it with (P).
  <br><br>
  The learners extract their model parameters and sent them to the aggregator.
  The aggregator now has access to these parameters but not the sensitive data used to train them.
  That is how FL can profit from sensitive data while maintaining its privacy.
{{< /svg-paragraph >}}

{{< svg-paragraph svg="classic_fl/part5" alignment="right">}}
  The server aggregates these collected parameters into new global parameters and applies them to its model instance.
  In classic FL aggregation, the mean of the parameters is used for the global model.
  The result is a global model that was trained for one FL cycle.
{{< /svg-paragraph >}}

{{< svg-paragraph svg="classic_fl/part6" alignment="left">}}
  The aggregator sends its global parameters back to the learners.
  The learners apply these parameters to their local model instance to make it identical to the aggregator’s global model.
  <br><br>
  The FL training loop could terminate, and the learners or servers could use their global model copy for inference.
  Otherwise, another FL training cycle begins.
  There can be arbitrarily many FL cycles, similar to conventional training rounds in classic ML.
  FL training eventually terminates due to time/resource constraints or a failure to reach a satisfying performance.
{{< /svg-paragraph >}}

{{< link-card
  title="Find out how you can do FL via Oakestra" 
  href="/docs/concepts/flops/overview/#fl-with-oakestra"
  target="_blank"
>}}
