"use strict";

const { TokenisingStream } = require("tokenising-stream");

const SAXEventAdaptor = require("./adaptors/sax-event-adaptor");

/**
 * See the {@link SAXEventAdaptor} documentation for token details.
 *
 * @param {Writable} parser
 * @returns TokenisingStream
 */
const newSAXStream = (parser) =>
	new TokenisingStream({
		delegate: parser,
		adaptor: new SAXEventAdaptor(parser)
	})

module.exports = {
	newSAXStream
}
