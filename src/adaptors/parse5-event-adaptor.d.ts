import { EventEmitter } from 'events';
import { Comment, Doctype, EndTag, StartTag, Text } from "parse5-sax-parser";

/**
 * Token representing a comment
 */
export interface CommentToken extends Comment {
	type: 'comment';
}

/**
 * Token representing the end of a tag
 */
export interface EndTagToken extends EndTag {
	type: 'endTag';
}

/**
 * Token representing a doctype
 */
export interface DoctypeToken extends Doctype {
	type: 'doctype';
}

/**
 * Token representing the start of a tag
 */
export interface StartTagToken extends StartTag {
	type: 'startTag';
}

/**
 * Token representing text
 */
export interface TextToken extends Text {
	type: 'text';
}

/**
 * Union type of all possible Parse5 tokens
 */
export type Parse5Token =
	CommentToken | DoctypeToken | EndTagToken | StartTagToken | TextToken;

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
	constructor(delegate: EventEmitter);
}
