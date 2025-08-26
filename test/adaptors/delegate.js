"use strict";

import { EventEmitter } from "events";
import { TokenisingStream } from "tokenising-stream";

export const waitForErrorEvent = (delegate) =>
	new Promise((resolve, _) => {
		delegate.once(TokenisingStream.ERROR_EVENT_NAME, (error) => {
			resolve(error);
		});
	});

export class Delegate extends EventEmitter {
	constructor() {
		super();
	}

	scheduleErrorEvent(error, event = "error") {
		process.nextTick(() => { this.emit(event, error); })
	}
}
