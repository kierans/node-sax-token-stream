"use strict";

import { EventEmitter } from "events";

export const waitForErrorEvent = (delegate) =>
	new Promise((resolve, _) => {
		delegate.once("error", (error) => {
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
