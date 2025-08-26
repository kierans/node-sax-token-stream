"use strict";

import { isFulfilledWith, promiseThat } from "hamjest";

import Parse5EventAdaptor from "../../src/adaptors/parse5-event-adaptor.js";
import { Delegate, waitForErrorEvent } from "./delegate.js";

describe("Parse5EventAdaptor", function() {
	it("should emit error event", async function() {
		const delegate = new Delegate();
		const parser = new Parse5EventAdaptor(delegate);
		const error = new Error("Fake error");

		delegate.scheduleErrorEvent(error);

		await promiseThat(waitForErrorEvent(parser), isFulfilledWith(error));
	});
});
