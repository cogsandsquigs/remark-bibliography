import { Root } from "mdast";
import { Plugin } from "unified";

/**
 * The core plugin for remark-bibliography.
 * @param {Options}  options The options for the plugin.
 * @type {Plugin<[Options?]|[], Root>}
 */
export default function remarkBibliography(
	options?: Options
): Plugin<[Options?] | [], import("mdast").Root>;

/**
 * The options for the plugin.
 */
export interface Options {
	/**
	 * The style to use for the bibliography, both in-text and reference citations. This is the `style` option
	 * for `@citation-js/core` in the `Cite.format` function. See that for more information.
	 * @see https://citation.js.org/api/tutorial-output_formats.html
	 * @default "apa"
	 */
	style: string;
}
