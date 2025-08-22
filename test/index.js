"use strict";

import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import { Writable } from "stream";
import { pipeline } from "node:stream/promises";

import { allOf, assertThat, hasItem, hasProperties } from "hamjest";

import sax from "sax";

import { newSAXStream } from "../src/index.js";

describe("streams", function() {
	describe("newSAXStream", function() {
		const events = [
			{
				type: 'attribute',
				value: {
					name: "title",
					value: "More than 100 million copies sold"
				}
			},
			{
				type: 'cdata',
				value: {
					cdata: "> 200 million"
				}
			},
			{
				type: 'closecdata',
				value: {}
			},
			{
				type: 'closenamespace',
				value: {
					prefix: "test",
					uri: "http://example.org/test"
				}
			},
			{
				type: 'closetag',
				value: {
					name: "sales-volume"
				}
			},
			{
				type: 'comment',
				value: {
					comment: " This is a comment "
				}
			},
			{
				type: 'doctype',
				value: {
					doctype: " books SYSTEM \"books.dtd\""
				}
			},
			{
				type: 'opencdata',
				value: {}
			},
			{
				type: 'opentag',
				value: {
					name: "book",
					isSelfClosing: false
				}
			},
			{
				type: 'opentagstart',
				value: {
					name: "book"
				}
			},
			{
				type: 'opennamespace',
				value: {
					prefix: "test",
					uri: "http://example.org/test"
				}
			},
			{
				type: 'processinginstruction',
				value: {
					name: "xml",
					body: "version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\""
				}
			},
			{
				type: 'text',
				value: {
					text: "200 million"
				}
			}
		]

		let tokens;

		before(async function() {
			tokens = await parseXML();
		});

		events.forEach((event) => {
			it(`should capture ${event.type} event`, async function() {
				assertThat(tokens, hasItem(allOf(
					hasProperties({ type: event.type }),
					hasProperties(event.value))
				));
			});
		});

		const parseXML = () =>
			parse(
				newSAXStream(sax.createStream(true, { xmlns: true })),
				readFileStream("data/sax.xml")
			)
	});
});

class CollectorStream extends Writable {
	constructor(opts) {
		super(Object.assign({}, opts, {
			objectMode: true
		}));

		this.events = [];
	}

	_write(chunk, encoding, callback) {
		this.events.push(chunk);

		callback();
	}
}

// readFileStream :: String -> ReadStream
const readFileStream = (file) =>
	fs.createReadStream(
		path.join(path.dirname(url.fileURLToPath(import.meta.url)), file),
		{ encoding: "utf8" }
	);

const parse = async (parser, input) => {
	const collector = new CollectorStream()

	await pipeline(
		input,
		parser,
		collector
	);

	return collector.events
}
