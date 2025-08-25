"use strict";

import EventEmitter from "node:events";

import { TokenisingStream } from "tokenising-stream";

import { assign2 } from "./utils.js";

/**
 * @typedef {Object} Parse5EventAdaptor~CommentToken
 * @extends {parse5-sax-parser~Comment}
 * @property {'comment'} type - Token type
 */

/**
 * @typedef {Object} Parse5EventAdaptor~DoctypeToken
 * @extends {parse5-sax-parser~Doctype}
 * @property {'doctype'} type - Token type
 */

/**
 * @typedef {Object} Parse5EventAdaptor~EndTagToken
 * @extends {parse5-sax-parser~EndTag}
 * @property {'endTag'} type - Token type
 */

/**
* @typedef {Object} Parse5EventAdaptor~StartTagToken
* @extends {parse5-sax-parser~StartTag}
* @property {'startTag'} type - Token type
*/

/**
 * @typedef {Object} Parse5EventAdaptor~TextToken
 * @extends {parse5-sax-parser~Text}
 * @property {'text'} type - Token type
 */

/**
 * @typedef {Parse5EventAdaptor~CommentToken|Parse5EventAdaptor~DoctypeToken|Parse5EventAdaptor~EndTagToken|Parse5EventAdaptor~StartTagToken|Parse5EventAdaptor~TextToken} Parse5EventAdaptor~Parse5Token
 */

/**
 * EventAdaptor for Parse5 SAX parser.
 *
 * The following events are piped through the stream as tokens
 *
 * <ul>
 *   <li><b>comment</b> - {@link Parse5EventAdaptor~CommentToken}</li>
 *   <li><b>doctype</b> - {@link Parse5EventAdaptor~DoctypeToken}</li>
 *   <li><b>endTag</b> - {@link Parse5EventAdaptor~EndTagToken}</li>
 *   <li><b>startTag</b> - {@link Parse5EventAdaptor~StartTagToken}</li>
 *   <li><b>text</b> - {@link Parse5EventAdaptor~TextToken}</li>
 * </ul>
 *
 * Tokens extend the base types as defined in the `parse5-sax-parser` module. For example,
 * a `StartTagToken` will extend the `StartTag` type.
 *
 * See the Parse5 documentation for more details.
 *
 * @implements {EventAdaptor}
 * @see https://www.npmjs.com/package/parse5-sax-parser
 * @see https://parse5.js.org/modules/parse5-sax-parser.html
 */
export default class Parse5EventAdaptor extends EventEmitter {
	/**
	 * @param {EventEmitter} delegate
	 */
	constructor(delegate) {
		super();

		delegate.on("comment", (token) => {
			this.emit(TokenisingStream.TOKEN_EVENT_NAME, assign2(token, {
				type: "comment"
			}));
		});

		delegate.on("doctype", (token) => {
			this.emit(TokenisingStream.TOKEN_EVENT_NAME, assign2(token, {
				type: "doctype"
			}));
		});

		delegate.on("endTag", (token) => {
			this.emit(TokenisingStream.TOKEN_EVENT_NAME, assign2(token, {
				type: "endTag"
			}));
		});

		delegate.on("startTag", (token) => {
			this.emit(TokenisingStream.TOKEN_EVENT_NAME, assign2(token, {
				type: "startTag"
			}));
		});

		delegate.on("text", (token) => {
			this.emit(TokenisingStream.TOKEN_EVENT_NAME, assign2(token, {
				type: "text"
			}));
		});

		delegate.on("error", (error) => {
			this.emit(TokenisingStream.ERROR_EVENT_NAME, error);
		});
	}
}
