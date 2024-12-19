---
title: "Wiki Contribution Guide"
description: "Guides specific for this website internals"
summary: ""
date: 2023-09-07T16:04:48+02:00
lastmod: 2023-09-07T16:04:48+02:00
draft: true
weight: 800
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

## Drawio files in the docs
For each picture `xyz.png`/`xyz.svg` in the wiki we MUST have a `xyz.drawio` source file. This ensures pictures versioning and source availability. In every folder containing a picture we MUST always be able to find its source file.

- These files should be kept up to date. 
- Make sure to always have the CMU Sans Serif font installed on your machine otherwise, figures might not be rendered correctly. 

### Working with SVGs
Please follow this structure to ensure uniformity.

Let's say you are working on `my-wiki.md` located in `content/docs/concepts/`.
You want to add a figure called my-fig to this guide.
Create the figure in drawio.
Safe the drawio file to be able to modify it easily in the future.
Export your figure as SVG in dark and light mode with transparent background.
Make sure to use the font from above.

The final file structure has to look like this:
```
.
├── ...
├── my-wiki.md
└── svgs
    └── my-fig
        ├── .drawio
        ├── dark.svg
        └── light.svg
```

You can use this SVG in your `.md` file like this:
```
{{<svg "my-fig">}}
```

Let`s say you have many figures in your doc and the svgs folder gets crowded because it gets shared with other pages in the same directory.

Do this:
```
.
├── ...
├── my-wiki.md
└── svgs
    ├── ...
    └── my-wiki
        ├── my-fig-1
        │   ├── .drawio
        │   ├── dark.svg
        │   └── light.svg
        └── my-fig-2
            ├── .drawio
            ├── dark.svg
            └── light.svg
```
```
{{<svg "my-wiki/my-fig-1">}}
...
{{<svg "my-wiki/my-fig-2">}}
```

## Documentation versioning 

To archive the current version of the docs you need to do the following:

1. create a new folder inside the `content/version` folder with the name of the version you want to archive. E.g. `content/version/v0.4.400`
2. copy the current content of the `content/docs` folder to the new folder. E.g., `content/version/v0.4.400/docs`
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
