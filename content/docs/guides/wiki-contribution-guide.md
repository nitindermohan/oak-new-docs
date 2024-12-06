---
title: "Wiki Contribution Guide"
description: "Guides specific for this website internals"
summary: ""
date: 2023-09-07T16:04:48+02:00
lastmod: 2023-09-07T16:04:48+02:00
draft: true
weight: 810
toc: true
version: 1.0
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## Fonts

[**CMU Sans Serif**](https://online-fonts.com/fonts/cmu-sans-serif) This font is used in the diagrams and figures. Make sure to have this font installed on your machine to render the figures correctly.

## Colors

The color palette used in the Oakestra documentation is as follows:

![OakBlue](wiki-contribution-guide/oak-blue.png) Oakestra Blue Background: R:73 B:114 G:134 #497286

![OakGreen](wiki-contribution-guide/oak-green.png) Oakestra Tree Green: R:125 B:195 G:132 #7DC384

## Drawio master DB
This is the reference drawio diagram for the Oakestra project.
https://drive.google.com/file/d/1zfgXwXPI2Yb8G2N-U8Gd0xPaiQIe9R-2/view?usp=sharing

New Pictures should be added to this DB.

## Drawio files in the docs
Some pictures that are not yet present in the Drawio master DB have the corrspondign .drawio file in the docs. 

- These files should be kept up to date. 
- Make sue to always ahve the CMU Sans Serif font installed in your machine otherwise figures might no be rendered correctly. 

## Documentation versioning 

To archive the current version of the docs you need to do the following:

1. create a new folder inside the `content/version` folder with the name of the version you want to archive. E.g. `content/version/v0.4.400`
2. copy the surrent content of the `content/docs` folder to the new folder. E.g. `content/version/v0.4.400/docs`
3. Update the version index file `content/version/v0.4.400/docs/_index.md` with the new version number. E.g.

```
--
 title: "v0.4.301"
 menus: none
 linkTitle: "v0.4.301"
 weight: 200
 exclude_search: true
 toc_hide: false
 hide_summary: true
 ---
```

4. Update the versions selector `layouts/partials/versions.html` with the new version.

E.g. append the following code to the versions selector:
```
<li><a class="dropdown-item " href="/version/0.4.400/docs/getstarted/get-started-cluster/">v0.4.400</a></li>
```

This will allow users to navigate to the archived version of the docs at the location `getstarted/get-started-cluster` from the dropdown version selector menu.

## Oakestra Slides

Oakestra ATC'23 [Slides .pptx](https://docs.google.com/presentation/d/11MNDbxePS_4tSubPijuYlX0jpt6h-V4f/edit?usp=sharing&ouid=104865919160633335116&rtpof=true&sd=true)

Oak Demo University of Helsinki [SLides .pptx](https://docs.google.com/presentation/d/1SookEbwNI1giqW-C-6_L4cZS0opJmq3L/edit?usp=sharing&ouid=104865919160633335116&rtpof=true&sd=true)