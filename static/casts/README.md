# How to asciinema

## Motivation
asciinema is a great way to record terminal sessions - perfect to show the CLI
- https://asciinema.org/
- https://github.com/asciinema/asciinema

### Benefits of using asciinema
- Very easy process of recording footage
  - No need for third-party tools, editing software, etc.
  - Simply install via apt/pip
- Simply run `asciinema rec my_recording.cast`
- Very lightweight (especially compared with regular .gif or .mp4 files)
- One can select/copy directly from the recording
- "Easy" customization/modification afterwards
  - A mp3/gif can hardly be changed
  - A asciinema recording can be modified by changing tags/settings in the code 
    ```html
    {{< asciinema key="cli_create_default_app_demo" poster="0:10" autoPlay="true" loop="true" startAt="0:5" idleTimeLimit="2" ... >}}
    ```
## Necessary Modifications
Many people use asciinema's public online server for hosting their recordings.
### Issues with this approach for our documentation:
- The recordings are decoupled from the documentation page
- Doks/Hugo seem to struggle to embed/use those external recordings properly - i.e. embed the external asciinema player

### "Local" Player
Instead of using the external server and player we can add the asciinema player directly into our documentation and use local recordings without the need to upload anything. Everything stays in our hands.

## How to add/use asciinema in your documentation pages
Activate asciinema support in your md header:

```md
---
title: "Your Title"
description: "..."
...
asciinema: true
---
```

After recording your clip locally place it into the `static/casts` folder.

You can embed this clip like this:
```md
{{< asciinema key="your_clip" optional_property_a=X >}}
```

You can augment each recorded clip by providing a set of different optional properties to it.

All currently supported properties and their default values are available in the `layouts/shortcodes/asciinema.html` file.

ALl possible properties supported by the asciinema player can be found here: https://docs.asciinema.org/manual/player/options/.
