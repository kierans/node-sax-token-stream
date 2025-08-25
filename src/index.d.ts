import { Writable } from 'stream';
import { TokenisingStream } from "tokenising-stream";

/**
 * Creates a new TokenisingStream for a Parse5 SAX style parser
 *
 * @param {Writable} parser The SAX parser stream to wrap
 * @returns A {@link TokenisingStream}
 */
export function newParse5Stream(parser: Writable): TokenisingStream;

/**
 * Creates a new TokenisingStream for a SAX parser
 *
 * @param {Writable} parser The SAX parser stream to wrap
 * @returns A {@link TokenisingStream}
 */
export function newSAXStream(parser: Writable): TokenisingStream;
