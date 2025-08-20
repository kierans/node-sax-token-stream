"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { Writable } = require("stream");
const { pipeline } = require("node:stream/promises");

const { allOf, assertThat, hasItem, hasProperties } = require("hamjest");

const sax = require("sax");

const { newSAXStream } = require("../src");

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
	fs.createReadStream(path.join(__dirname, file), { encoding: "utf8" });

const parse = async (parser, input) => {
	const collector = new CollectorStream()

	await pipeline(
		input,
		parser,
		collector
	);

	return collector.events
}
