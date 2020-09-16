import "mocha";
import { expect } from "chai";
import { logger } from "./logger";
import * as winston from "winston";

describe("util/logger", function(){
	it("log", function(done){
		logger.silly("spec test");
		done();
	});
});