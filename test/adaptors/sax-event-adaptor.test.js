"use strict";

import { isFulfilledWith, promiseThat } from "hamjest";

import SAXEventAdaptor from "../../src/adaptors/sax-event-adaptor.js";
import { Delegate, waitForErrorEvent } from "./delegate.js";

describe("SAXEventAdaptor", function() {
	it("should emit error event", async function() {
		const delegate = new Delegate();
		const parser = new SAXEventAdaptor(delegate);
		const error = new Error("Fake error");

		delegate.scheduleErrorEvent(error);

		await promiseThat(waitForErrorEvent(parser), isFulfilledWith(error));
	});
});
