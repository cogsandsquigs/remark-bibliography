import { expect, test } from "@jest/globals";
import remarkDirective from "remark-directive";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import remarkBibliography from "../index.js";

const file = `An in-text citation :cite[knuth:1984] wow!

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

const result = unified()
	.use(remarkParse)
	.use(remarkDirective)
	.use(remarkBibliography, {
		style: "apa",
		export: true,
		exportProperty: "a_random_export_key"
	})
	.use(remarkStringify)
	.processSync(file);

const expected = `An in-text citation (Knuth, 1984) wow!

Another one! (Lesk &#38; Kernighan, 1977)

## Bibliography

<div class="csl-bib-body">
  <div data-csl-entry-id="knuth:1984" class="csl-entry">Knuth, D. E. (1984). Literate Programming. <i>The Computer Journal</i>, <i>27</i>(2), 97–111.</div>
  <div data-csl-entry-id="lesk:1977" class="csl-entry">Lesk, M., &#38; Kernighan, B. (1977). Computer Typesetting of Technical Journals on UNIX. <i>Proceedings of American Federation of Information Processing Societies: 1977 National Computer Conference</i>, 879–888.</div>
</div>
`;

describe("README example", () => {
	test("The markdown is parsed correctly", () => {
		expect(result.value).toBe(expected);
	});

	let bib = result.data["a_random_export_key"];

	test("The bibliography is exported", () => {
		expect(bib).toBeDefined();
	});

	test("There are two entries", () => {
		expect(bib.data.length).toBe(2);
	});

	test("The Knuth citation exists", () => {
		expect(bib.data.find((citation) => citation.id === "knuth:1984")).toBeDefined();
	});

	test("The Lesk & Kernighan citation exists", () => {
		expect(bib.data.find((citation) => citation.id === "lesk:1977")).toBeDefined();
	});
});
