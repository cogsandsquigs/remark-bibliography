# remark-bibliography

A bibliography plugin for Markdown.

## Usage

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

It does look ugly, but don't worry: the plugin will take care of that for you. It will all be rendered as a nice, formatted bibliography.

The bibliography **only** accepts BibTeX for the time being, so each entry must be in BibTeX format.

Each in-text citation must be in the form of `:cite[<key>]`, where `<key>` is the key of the citation in the bibliography. This will be replaced with an in-text citation in the style of your choice (APA, MLA, etc. See below).

## Options

### `style`

The style of the bibliography. This can be any of the following:

- `apa`
- `mla`
- `chicago`
- etc.

See the `citation-js` [docs](https://citation.js.org/api/tutorial-output_formats.html) for more information.

## Notes

- This requires the usage of [`remark-directive`](https://github.com/remarkjs/remark-directive). Make sure to add this plugin before adding this one!
- If your markdown parser freaks out because of BibTeX's curly braces (say, if you're using MDX), then you can wrap the BibTeX in a code block. Hacky, but it works! Unfortunately, this is an error due to the markdown parser, and not this plugin. So it's out of my control. :(

- Do **not** have more than one bibliography in a markdown file. This will cause the plugin to break. Put everything in one `bib` directive, and it will work fine.

## TODO

- Get tests with Jest working.
- Add more supported types for the bibliography.

```

```
