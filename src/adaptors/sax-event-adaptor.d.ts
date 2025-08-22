import { EventEmitter } from 'events';

/**
 * Token representing an XML attribute
 */
export interface AttributeToken {
  type: 'attribute';
  name: string;
  value: string;
}

/**
 * Token representing CDATA content
 */
export interface CDataToken {
  type: 'cdata';
  cdata: string;
}

/**
 * Token representing the end of a CDATA section
 */
export interface CloseCDataToken {
  type: 'closecdata';
}

/**
 * Token representing the closing of a namespace
 */
export interface CloseNamespaceToken {
  type: 'closenamespace';
  prefix: string;
  uri: string;
}

/**
 * Token representing a closing XML tag
 */
export interface CloseTagToken {
  type: 'closetag';
  name: string;
}

/**
 * Token representing an XML comment
 */
export interface CommentToken {
  type: 'comment';
  comment: string;
}

/**
 * Token representing a DOCTYPE declaration
 */
export interface DoctypeToken {
  type: 'doctype';
  doctype: string;
}

/**
 * Token representing the start of a CDATA section
 */
export interface OpenCDataToken {
  type: 'opencdata';
}

/**
 * Token representing an opening XML tag
 */
export interface OpenTagToken {
  type: 'opentag';
  name: string;
  isSelfClosing: boolean;
  attributes?: Record<string, string>;
}

/**
 * Token representing the start of an opening XML tag
 */
export interface OpenTagStartToken {
  type: 'opentagstart';
  name: string;
}

/**
 * Token representing the opening of a namespace
 */
export interface OpenNamespaceToken {
  type: 'opennamespace';
  prefix: string;
  uri: string;
}

/**
 * Token representing an XML processing instruction
 */
export interface ProcessingInstructionToken {
  type: 'processinginstruction';
  name: string;
  body: string;
}

/**
 * Token representing script content
 */
export interface ScriptToken {
  type: 'script';
  script: string;
}

/**
 * Token representing an SGML declaration
 */
export interface SGMLDeclarationToken {
  type: 'sgmldeclaration';
  sgmldeclaration: string;
}

/**
 * Token representing text content
 */
export interface TextToken {
  type: 'text';
  text: string;
}

/**
 * Union type of all possible SAX tokens
 */
export type SAXToken =
  | AttributeToken
  | CDataToken
  | CloseCDataToken
  | CloseNamespaceToken
  | CloseTagToken
  | CommentToken
  | DoctypeToken
  | OpenCDataToken
  | OpenTagToken
  | OpenTagStartToken
  | OpenNamespaceToken
  | ProcessingInstructionToken
  | ScriptToken
  | SGMLDeclarationToken
  | TextToken;

/**
 * EventAdaptor for SAX parser.
 *
 * The following events are piped through the stream as tokens:
 * - attribute - AttributeToken
 * - cdata - CDataToken
 * - closecdata - CloseCDataToken
 * - closenamespace - CloseNamespaceToken
 * - closetag - CloseTagToken
 * - comment - CommentToken
 * - doctype - DoctypeToken
 * - opencdata - OpenCDataToken
 * - opentag - OpenTagToken
 * - opentagstart - OpenTagStartToken
 * - opennamespace - OpenNamespaceToken
 * - processinginstruction - ProcessingInstructionToken
 * - script - ScriptToken
 * - sgmldeclaration - SGMLDeclarationToken
 * - text - TextToken
 *
 * @see https://www.npmjs.com/package/sax
 */
export default class SAXEventAdaptor extends EventEmitter {
  /**
   * @param {EventEmitter} delegate
   */
  constructor(delegate: EventEmitter);
}
