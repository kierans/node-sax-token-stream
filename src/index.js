"use strict";

import { TokenisingStream } from "tokenising-stream";

import SAXEventAdaptor from "./adaptors/sax-event-adaptor.js";

/**
 * See the {@link SAXEventAdaptor} documentation for token details.
 *
 * @param {Writable} parser
 * @returns TokenisingStream
 */
export const newSAXStream = (parser) =>
	new TokenisingStream({
		delegate: parser,
		adaptor: new SAXEventAdaptor(parser)
	})
