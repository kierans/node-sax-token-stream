import { Writable } from 'stream';
import { TokenisingStream } from "tokenising-stream";

/**
 * See the {@link SAXEventAdaptor} documentation for token details.
 *
 * @param {Writable} parser
 * @return {TokenisingStream}
 */
export function newSAXStream(parser: Writable): TokenisingStream;
