import { expect, test } from "@jest/globals";
import remarkDirective from "remark-directive";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import remarkBibliographyPlugin from "./index.js";

let file = `
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
:::`;

let processor = unified()
	// Parse the Markdown into an AST
	.use(remarkParse)
	// Parse directives
	.use(remarkDirective)
	// Add bibliography
	.use(remarkBibliographyPlugin)
	// Stringify the AST back to Markdown
	.use(remarkStringify);

test("should export the expected markdown", async () => {
	let { value: markdown } = await processor.process(file);

	console.log(markdown);

	expect(markdown).toBe(3);
});
