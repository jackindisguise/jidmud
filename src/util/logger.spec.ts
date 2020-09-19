import "mocha";
import { logger } from "./logger";

describe("util/logger", function(){
	it("log", function(done){
		logger.silly("spec test");
		done();
	});
});