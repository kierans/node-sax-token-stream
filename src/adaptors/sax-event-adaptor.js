"use strict";

const EventEmitter = require("node:events");

const { TokenisingStream } = require("tokenising-stream");

const { assign2 } = require("./utils");

/**
 * @typedef {Object} AttributeToken
 * @property {'attribute'} type - Token type
 * @property {string} name - Attribute name
 * @property {string} value - Attribute value
 */

/**
 * @typedef {Object} CDataToken
 * @property {'cdata'} type - Token type
 * @property {string} cdata - CDATA content
 */

/**
 * @typedef {Object} CloseCDataToken
 * @property {'closecdata'} type - Token type
 */

/**
 * @typedef {Object} CloseNamespaceToken
 * @property {'closenamespace'} type - Token type
 * @property {string} prefix - Namespace prefix
 * @property {string} uri - Namespace URI
 */

/**
 * @typedef {Object} CloseTagToken
 * @property {'closetag'} type - Token type
 * @property {string} name - Tag name
 */

/**
 * @typedef {Object} CommentToken
 * @property {'comment'} type - Token type
 * @property {string} comment - Comment content
 */

/**
 * @typedef {Object} DoctypeToken
 * @property {'doctype'} type - Token type
 * @property {string} doctype - DOCTYPE declaration
 */

/**
 * @typedef {Object} OpenCDataToken
 * @property {'opencdata'} type - Token type
 */

/**
 * @typedef {Object} OpenTagToken
 * @property {'opentag'} type - Token type
 * @property {string} name - Tag name
 * @property {boolean} isSelfClosing - Whether the tag is self-closing
 */

/**
 * @typedef {Object} OpenTagStartToken
 * @property {'opentagstart'} type - Token type
 * @property {string} name - Tag name
 */

/**
 * @typedef {Object} OpenNamespaceToken
 * @property {'opennamespace'} type - Token type
 * @property {string} prefix - Namespace prefix
 * @property {string} uri - Namespace URI
 */

/**
 * @typedef {Object} ProcessingInstructionToken
 * @property {'processinginstruction'} type - Token type
 * @property {string} name - Processing instruction name
 * @property {string} body - Processing instruction body
 */

/**
 * @typedef {Object} ScriptToken
 * @property {'script'} type - Token type
 * @property {string} script - Script content
 */

/**
 * @typedef {Object} SGMLDeclarationToken
 * @property {'sgmldeclaration'} type - Token type
 * @property {string} sgmldeclaration - Declaration content
 */

/**
 * @typedef {Object} TextToken
 * @property {'text'} type - Token type
 * @property {string} text - Text content
 */

/**
 * @typedef {AttributeToken|CDataToken|CloseCDataToken|CloseNamespaceToken|CloseTagToken|CommentToken|DoctypeToken|OpenCDataToken|OpenTagToken|OpenTagStartToken|OpenNamespaceToken|ProcessingInstructionToken|ScriptToken|SGMLDeclarationToken|TextToken} SAXToken
 */

/**
 * EventAdaptor for SAX parser.
 *
 * The following events are piped through the stream as tokens
 *
 * <ul>
 *   <li><b>attribute</b> - {@link AttributeToken}</li>
 *   <li><b>cdata</b> - {@link CDataToken}</li>
 *   <li><b>closecdata</b> - {@link CloseCDataToken}</li>
 *   <li><b>closenamespace</b> - {@link CloseNamespaceToken}</li>
 *   <li><b>closetag</b> - {@link CloseTagToken}</li>
 *   <li><b>comment</b> - {@link CommentToken}</li>
 *   <li><b>doctype</b> - {@link DoctypeToken}</li>
 *   <li><b>opencdata</b> - {@link OpenCDataToken}</li>
 *   <li><b>opentag</b> - {@link OpenTagToken}</li>
 *   <li><b>opentagstart</b> - {@link OpenTagStartToken}</li>
 *   <li><b>opennamespace</b> - {@link OpenNamespaceToken}</li>
 *   <li><b>processinginstruction</b> - {@link ProcessingInstructionToken}</li>
 *   <li><b>script</b> - {@link ScriptToken}</li>
 *   <li><b>sgmldeclaration</b> - {@link SGMLDeclarationToken}</li>
 *   <li><b>text</b> - {@link TextToken}</li>
 * </ul>
 *
 * @implements EventAdaptor
 * @see https://www.npmjs.com/package/sax
 */
class SAXEventAdaptor extends EventEmitter {
	/**
	 * @param {Writable} delegate
	 */
	constructor(delegate) {
		super();

		delegate.on("attribute", (token) => {
			this.emit(TokenisingStream.TOKEN_EVENT_NAME, assign2(token, {
				type: "attribute"
			}));
		});

		delegate.on("cdata", (text) => {
			this.emit(TokenisingStream.TOKEN_EVENT_NAME, {
				type: "cdata",
				cdata: text
			});
		});

		delegate.on("closecdata", () => {
			this.emit(TokenisingStream.TOKEN_EVENT_NAME, {
				type: "closecdata"
			});
		});

		delegate.on("closenamespace", (ns) => {
			this.emit(TokenisingStream.TOKEN_EVENT_NAME, assign2(ns, {
				type: "closenamespace",
			}));
		});

		delegate.on("closetag", (name) => {
			this.emit(TokenisingStream.TOKEN_EVENT_NAME, {
				type: "closetag",
				name
			});
		});

		delegate.on("comment", (comment) => {
			this.emit(TokenisingStream.TOKEN_EVENT_NAME, {
				type: "comment",
				comment: comment
			});
		});

		delegate.on("doctype", (doctype) => {
			this.emit(TokenisingStream.TOKEN_EVENT_NAME, {
				type: "doctype",
				doctype
			});
		});

		delegate.on("opencdata", () => {
			this.emit(TokenisingStream.TOKEN_EVENT_NAME, {
				type: "opencdata"
			});
		});

		delegate.on("opennamespace", (ns) => {
			this.emit(TokenisingStream.TOKEN_EVENT_NAME, assign2(ns, {
				type: "opennamespace",
			}));
		});

		delegate.on("opentag", (node) => {
			this.emit(TokenisingStream.TOKEN_EVENT_NAME, assign2(node, {
				type: "opentag",
			}));
		});

		delegate.on("opentagstart", (node) => {
			this.emit(TokenisingStream.TOKEN_EVENT_NAME, assign2(node, {
				type: "opentagstart",
			}));
		});

		delegate.on("processinginstruction", (instruction) => {
			this.emit(TokenisingStream.TOKEN_EVENT_NAME, assign2(instruction, {
				type: "processinginstruction",
			}));
		});

		delegate.on("script", (script) => {
			this.emit(TokenisingStream.TOKEN_EVENT_NAME, {
				type: "script",
				script: script
			});
		});

		delegate.on("sgmldeclaration", (sgmldeclaration) => {
			this.emit(TokenisingStream.TOKEN_EVENT_NAME, {
				type: "sgmldeclaration",
				sgmldeclaration: sgmldeclaration
			});
		});

		delegate.on("text", (text) => {
			this.emit(TokenisingStream.TOKEN_EVENT_NAME, {
				type: "text",
				text: text
			});
		});

		delegate.on("error", (error) => {
			this.emit(TokenisingStream.ERROR_EVENT_NAME, error);
		})
	}
}

module.exports = SAXEventAdaptor;
