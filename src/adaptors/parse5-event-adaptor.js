"use strict";

import EventEmitter from "node:events";

import { TokenisingStream } from "tokenising-stream";

import { assign2 } from "./utils.js";

export default class Parse5EventAdaptor extends EventEmitter {
	/**
	 * @param {EventEmitter} delegate
	 */
	constructor(delegate) {
		super();
	}
}
