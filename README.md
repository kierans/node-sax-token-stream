# node-sax-token-stream

A Node.js [Transform stream][1] that pipes tokens from a SAX style parser.

A widespread pattern with streaming parsers is to emit events when tokens are parsed from an
input string. Examples include [SAX][2] libraries, [parse5][3] (HTML), and other streaming 
parsers on NPM. The parser is often wrapped in a `Writable` stream to allow input strings to 
be streamed from a source and piped into the parser. For example, a file stream or an HTTP 
request stream. The parser stream forwards events from the wrapped parser to listeners 
registered on the stream; as streams are `EventEmitter`s.

While the input to the parser stream respects [back-pressure][4], the token events are not
streamed but merely emitted synchronously, without any kind of flow control. A typical reason
for choosing an event-driven parser is to avoid buffering the entire output, which in
Javascript typically means something needs to be done with the tokens, such as streaming
them elsewhere. However, simply writing the events to a stream ignores the back-pressure
mechanism; many events could be emitted, which could overflow a downstream listener in a
stream flow if data is flowing slowly, with no way to limit the fire hose upstream.

If an error occurs during parsing, the input stream needs to be destroyed to stop
reading more data.

Streams provide a standard pattern in Node.js to handle back-pressure and errors. What is
required is to have events from a parser stream respect back-pressure in a flow.

This module provides utility functions to create a stream that wraps a `Writable` stream 
representing a parser. Events are captured and written to the stream in a manner which respects
back-pressure.

Supports:
 - [sax][2]

[1]: https://nodejs.org/docs/latest-v18.x/api/stream.html#class-streamtransform
[2]: https://www.npmjs.com/package/sax
[3]: https://www.npmjs.com/package/parse5-sax-parser
[4]: https://nodejs.org/en/learn/modules/backpressuring-in-streams

## Usage

```shell
$ npm install sax-token-stream
$ npm install <parser-library>
```

```javascript
// TODO
```

## Tests

```shell
$ npm run test
```
