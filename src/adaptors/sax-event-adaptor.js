"use strict";

const EventEmitter = require("node:events");

const { TokenisingStream } = require("tokenising-stream");

const { assign2 } = require("./utils");

/**
 * @typedef {Object} SAXEventAdaptor~AttributeToken
 * @property {'attribute'} type - Token type
 * @property {string} name - Attribute name
 * @property {string} value - Attribute value
 */

/**
 * @typedef {Object} SAXEventAdaptor~CDataToken
 * @property {'cdata'} type - Token type
 * @property {string} cdata - CDATA content
 */

/**
 * @typedef {Object} SAXEventAdaptor~CloseCDataToken
 * @property {'closecdata'} type - Token type
 */

/**
 * @typedef {Object} SAXEventAdaptor~CloseNamespaceToken
 * @property {'closenamespace'} type - Token type
 * @property {string} prefix - Namespace prefix
 * @property {string} uri - Namespace URI
 */

/**
 * @typedef {Object} SAXEventAdaptor~CloseTagToken
 * @property {'closetag'} type - Token type
 * @property {string} name - Tag name
 */

/**
 * @typedef {Object} SAXEventAdaptor~CommentToken
 * @property {'comment'} type - Token type
 * @property {string} comment - Comment content
 */

/**
 * @typedef {Object} SAXEventAdaptor~DoctypeToken
 * @property {'doctype'} type - Token type
 * @property {string} doctype - DOCTYPE declaration
 */

/**
 * @typedef {Object} SAXEventAdaptor~OpenCDataToken
 * @property {'opencdata'} type - Token type
 */

/**
 * @typedef {Object} SAXEventAdaptor~OpenTagToken
 * @property {'opentag'} type - Token type
 * @property {string} name - Tag name
 * @property {boolean} isSelfClosing - Whether the tag is self-closing
 */

/**
 * @typedef {Object} SAXEventAdaptor~OpenTagStartToken
 * @property {'opentagstart'} type - Token type
 * @property {string} name - Tag name
 */

/**
 * @typedef {Object} SAXEventAdaptor~OpenNamespaceToken
 * @property {'opennamespace'} type - Token type
 * @property {string} prefix - Namespace prefix
 * @property {string} uri - Namespace URI
 */

/**
 * @typedef {Object} SAXEventAdaptor~ProcessingInstructionToken
 * @property {'processinginstruction'} type - Token type
 * @property {string} name - Processing instruction name
 * @property {string} body - Processing instruction body
 */

/**
 * @typedef {Object} SAXEventAdaptor~ScriptToken
 * @property {'script'} type - Token type
 * @property {string} script - Script content
 */

/**
 * @typedef {Object} SAXEventAdaptor~SGMLDeclarationToken
 * @property {'sgmldeclaration'} type - Token type
 * @property {string} sgmldeclaration - Declaration content
 */

/**
 * @typedef {Object} SAXEventAdaptor~TextToken
 * @property {'text'} type - Token type
 * @property {string} text - Text content
 */

/**
 * @typedef {SAXEventAdaptor~AttributeToken|SAXEventAdaptor~CDataToken|SAXEventAdaptor~CloseCDataToken|SAXEventAdaptor~CloseNamespaceToken|SAXEventAdaptor~CloseTagToken|SAXEventAdaptor~CommentToken|SAXEventAdaptor~DoctypeToken|SAXEventAdaptor~OpenCDataToken|SAXEventAdaptor~OpenTagToken|SAXEventAdaptor~OpenTagStartToken|SAXEventAdaptor~OpenNamespaceToken|SAXEventAdaptor~ProcessingInstructionToken|SAXEventAdaptor~ScriptToken|SAXEventAdaptor~SGMLDeclarationToken|SAXEventAdaptor~TextToken} SAXEventAdaptor~SAXToken
 */

/**
 * EventAdaptor for SAX parser.
 *
 * The following events are piped through the stream as tokens
 *
 * <ul>
 *   <li><b>attribute</b> - {@link SAXEventAdaptor~AttributeToken}</li>
 *   <li><b>cdata</b> - {@link SAXEventAdaptor~CDataToken}</li>
 *   <li><b>closecdata</b> - {@link SAXEventAdaptor~CloseCDataToken}</li>
 *   <li><b>closenamespace</b> - {@link SAXEventAdaptor~CloseNamespaceToken}</li>
 *   <li><b>closetag</b> - {@link SAXEventAdaptor~CloseTagToken}</li>
 *   <li><b>comment</b> - {@link SAXEventAdaptor~CommentToken}</li>
 *   <li><b>doctype</b> - {@link SAXEventAdaptor~DoctypeToken}</li>
 *   <li><b>opencdata</b> - {@link SAXEventAdaptor~OpenCDataToken}</li>
 *   <li><b>opentag</b> - {@link SAXEventAdaptor~OpenTagToken}</li>
 *   <li><b>opentagstart</b> - {@link SAXEventAdaptor~OpenTagStartToken}</li>
 *   <li><b>opennamespace</b> - {@link SAXEventAdaptor~OpenNamespaceToken}</li>
 *   <li><b>processinginstruction</b> - {@link SAXEventAdaptor~ProcessingInstructionToken}</li>
 *   <li><b>script</b> - {@link SAXEventAdaptor~ScriptToken}</li>
 *   <li><b>sgmldeclaration</b> - {@link SAXEventAdaptor~SGMLDeclarationToken}</li>
 *   <li><b>text</b> - {@link SAXEventAdaptor~TextToken}</li>
 * </ul>
 *
 * @implements EventAdaptor
 * @see https://www.npmjs.com/package/sax
 */
class SAXEventAdaptor extends EventEmitter {
	/**
	 * @param {EventEmitter} delegate
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
