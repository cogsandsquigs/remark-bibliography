# remark-gemoji

TODO: Add badges

A bibliography plugin for Markdown.

## Contents

- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [Use](#use)
- [API](#api)
  - [`unified().use(remarkBibliography)`](#unifieduseremarkbibliography)
  - [Options](#options)
    - [`style`](#style)
- [Syntax](#syntax)
- [Types](#types)
- [Compatibility](#compatibility)
- [Security](#security)
- [Notes](#notes)
- [Related](#related)
- [Contribute](#contribute)
- [License](#license)

## What is this?

This plugin adds a bibliography to your Markdown document using [citation-js](https://citation.js.org/) and [remark-directive](https://github.com/remarkjs/remark-directive). The bibliography is rendered in the style of your choice (APA, MLA, etc.), and the in-text citations are rendered in the same style as well.

## When should I use this?

If you want to add a bibliography to your Markdown document, this plugin is for you. It's easy to use, and it's easy to add citations to your document. It achieves this through the markdown directives format, which is a nice way to add extra functionality to Markdown. Parsing citations is done through [citation-js](https://citation.js.org/), which is a powerful library for parsing and manipulating citations. For now, only BibTeX is supported, but hopefully more formats will be supported in the future.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install @cogsandsquigs/remark-bibliography
```

In Deno with [`esm.sh`][esmsh]:

```js
import remarkBibliography from "https://esm.sh/@cogsandsquigs/remark-bibliography";
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
	import remarkBibliography from "https://esm.sh/@cogsandsquigs/remark-bibliography?bundle";
</script>
```

## Use

Let's look at an example:

```md
An in-text citation :cite[knuth:1984] wow!

Another one! :cite[lesk:1977]

## Bibliography

:::bib
@article{knuth:1984,
title={Literate Programming},
author={Donald E. Knuth},
journal={The Computer Journal},
volume={27},
number={2},
pages={97--111},
year={1984},
publisher={Oxford University Press}
}

@inproceedings{lesk:1977,
title={Computer Typesetting of Technical Journals on {UNIX}},
author={Michael Lesk and Brian Kernighan},
booktitle={Proceedings of American Federation of
Information Processing Societies: 1977
National Computer Conference},
pages={879--888},
year={1977},
address={Dallas, Texas}
}
:::
```

To process this, use this plugin as you would for any other remark plugin. However, note that [`remark-directive`](https://github.com/remarkjs/remark-directive) **_must_** be added before this plugin, otherwise it will not work.

```js
import { readFileSync, writeFileSync } from "fs";
import { unified } from "unified";
import remarkDirective from "remark-directive";
import remarkBibliography from "@cogsandsquigs/remark-bibliography";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";

const file = readFileSync("path/to/file.md");
const result = unified()
	.use(remarkParse)
	.use(remarkDirective)
	.use(remarkBibliography)
	.use(remarkStringify)
	.processSync(file);

writeFileSync("path/to/output.md", result);
```

The output looks like this:

```md
An in-text citation (Knuth, 1984) wow!

Another one! (Lesk & Kernighan, 1977)

## Bibliography

<div class="csl-bib-body">
  <div data-csl-entry-id="knuth:1984" class="csl-entry">Knuth, D. E. (1984). Literate Programming. <i>The Computer Journal</i>, <i>27</i>(2), 97–111.</div>
  <div data-csl-entry-id="lesk:1977" class="csl-entry">Lesk, M., &#38; Kernighan, B. (1977). Computer Typesetting of Technical Journals on UNIX. <i>Proceedings of American Federation of Information Processing Societies: 1977 National Computer Conference</i>, 879–888.</div>
</div>
```

Note that the bibliography has the style `csl-bib-body` and each entry has the style `csl-entry`. This is so that you can style the bibliography however you want. For example, you can use the following CSS to style the bibliography in APA style:

```css
/** 
 * This targets every entry in the bibliography, and indents it by 2em. This is aligned with APA
 * style, which requires the second and subsequent lines of each entry to be indented.
 */
.csl-entry {
	text-indent: -2em;
	margin-left: 2em;
}
```

## API

This package exports no identifiers. The default export is `remarkBibliography`.

### `unified().use(remarkBibliography[, options])`

Plugin to add a bibliography to your Markdown document.

### Options

#### `style`

A string setting the style of the bibliography. This can be any of the following:

- `"apa"`
- `"mla"`
- `"chicago"`
- `"vancouver"`
- etc.

See the `citation-js` [docs](https://citation.js.org/api/tutorial-output_formats.html) for more information.

Defaults to `"apa"`.

#### `export`

A boolean detailing if the Cite object should be added to the `data` property of the `VFile` being processed.

Defaults to `false`.

#### `exportProperty`

A string detailing the property of the `data` object to add the Cite object to.

Defaults to `"bibliography"`.

## Syntax

The bibliography is delimited by `:::bib` and `:::`, and each entry is a source in BibTeX format. The bibliography **only** accepts BibTeX for the time being, however that may change in the future.

Each in-text citation must be in the form of `:cite[<key>]`, where `<key>` is the key of the citation in the bibliography. This will be replaced with an in-text citation in the style of your choice (APA, MLA, etc. See below).

## Types

This package is fully typed with TypeScript.
There are no extra exported types.

## Compatibility

This plugin has been tested with `node` version 19+.

This plugin has been tested with `unified` version 10+ and `remark` version 10+.

Note however that this plugin is not tested against all historic versions of these packages, and probably will work with older versions.

## Security

So long as [citation-js](https://citation.js.org/) is safe, this plugin should be safe as well.

## Notes

- This requires the usage of [`remark-directive`](https://github.com/remarkjs/remark-directive). Make sure to add this plugin before adding this one!
- If your markdown parser freaks out because of BibTeX's curly braces (say, if you're using MDX), then you can wrap the BibTeX in a code block. Hacky, but it works! Unfortunately, this is an error due to the markdown parser, and not this plugin. So it's out of my control. :(
- Do **not** have more than one bibliography in a markdown file. This will cause the plugin to break. Put everything in one `bib` directive, and it will work fine.

## Related

- [`remark-bibliography`](https://github.com/Symbitic/remark-plugins/blob/master/packages/remark-bibliography/README.md) - Remark plugin for adding citations and bibliographies to Markdown documents through external files.
- [`remark-cite`](https://github.com/benrbray/remark-cite) - Remark plugin for citations and bibliographies, `pandoc`-style.

## Contribute

Open an issue or pull request for anything you’d like to see!

## License

[MIT](LICENSE) © [Ian Pratt](https://github.com/cogsandsquigs)
