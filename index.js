import "@citation-js/plugin-bibtex";
import Cite from "citation-js";
import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";

/**
 * The core plugin for remark-bibliography.
 * @param {import("../index.d.ts").Options}  options The options for the plugin.
 * @type {import('unified').Plugin<[import("../index.d.ts").Options?]|[], import('mdast').Root>}
 */
export const remarkBibliographyPlugin =
	(
		options = {
			style: "apa"
		}
	) =>
	(tree, _) => {
		// Parse the bibliography
		let bib = parseBibliography(options, tree);

		// Parse citations
		parseCitations(bib, options, tree);
	};

/**
 * Runs phase 1 of the plugin - parsing the bibliography. This is the first
 * phase because it needs to be run before all other citation directives can
 * be parsed/filled out.
 * @param {import("../index").Options} options The options for the plugin.
 * @param {import('unified').Plugin<[], import('mdast').Root>} tree The tree to
 * run the plugin on.
 * @returns {import('citation-js').Cite} The parsed bibliography, as a `Cite` object.
 */
const parseBibliography = (options, tree) => {
	let bib = new Cite();

	visit(tree, "containerDirective", async (node, index, parent) => {
		// Early exit if this isn't a bibliography directive
		if (node.name !== "bib") {
			return;
		}

		// Get the raw BibTeX
		let rawBib = toString(node);

		// Add the BibTeX to the bibliography
		bib = Cite(rawBib);

		let replacementNode = {
			type: "html",
			value: bib.format("bibliography", {
				format: "html",
				type: "string",
				style: options.style
			}),

			// The position of the bibliography is the same as the directive.
			position: node.position
		};

		// Replace the node with the formatted bibliography
		let nodeIndex = parent.children.indexOf(node);

		// Remove the directive, and replace it with the formatted bibliography
		parent.children.splice(nodeIndex, 1, replacementNode);
	});

	return bib;
};

/**
 * Runs phase 2 of the plugin - parsing citations. This is the second phase
 * because it needs to be run after the bibliography has been parsed.
 * @param {import("citation-js").Cite} bib The parsed bibliography.
 * @param {import("../index").Options} options The options for the plugin.
 * @param {import('unified').Plugin<[], import('mdast').Root>} tree The tree to
 * run the plugin on.
 */
const parseCitations = (bib, options, tree) => {
	// Visit every citation directive
	visit(tree, "textDirective", (node, index, parent) => {
		// Early exit if this isn't a citation directive
		if (node.name !== "cite") {
			return;
		}

		// Get the raw citation
		let rawCitation = toString(node);

		// Make a new citation object from the raw citation
		let citation = Cite(bib.data.find((citation) => citation.id === rawCitation));

		let replacementNode = {
			type: "html",
			value: citation.format("citation", {
				format: "html",
				template: options.style
			}),

			// The position of the citation is the same as the directive.
			position: node.position
		};

		// Replace the node with the formatted bibliography
		let nodeIndex = parent.children.indexOf(node);

		// Remove the directive, and replace it with the formatted citation
		parent.children.splice(nodeIndex, 1, replacementNode);
	});
};

export default remarkBibliographyPlugin;
