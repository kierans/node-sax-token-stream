"use strict";

const { assertThat, equalTo } = require("hamjest");
const { add } = require("../index");

describe("index", function() {
	it("should add two numbers", function() {
		assertThat(add(1, 2), equalTo(3))
	})
});
