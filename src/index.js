"use strict";

import { TokenisingStream } from "tokenising-stream";

import Parse5EventAdaptor from "./adaptors/parse5-event-adaptor.js";
import SAXEventAdaptor from "./adaptors/sax-event-adaptor.js";

/**
 * See the {@link Parse5EventAdaptor} documentation for token details.
 *
 * @param {Writable} parser
 * @return {TokenisingStream}
 */
export const newParse5Stream = (parser) =>
	new TokenisingStream({
		delegate: parser,
		adaptor: new Parse5EventAdaptor(parser),

		// parse5 parser Writable can only work with strings not Buffers.
		decodeStrings: false
	})

/**
 * See the {@link SAXEventAdaptor} documentation for token details.
 *
 * @param {Writable} parser
 * @return {TokenisingStream}
 */
export const newSAXStream = (parser) =>
	new TokenisingStream({
		delegate: parser,
		adaptor: new SAXEventAdaptor(parser)
	})
