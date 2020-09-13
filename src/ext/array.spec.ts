import "mocha";
import { expect } from "chai";
import * as arrayx from "./array";

describe("ext/array", function(){
	describe("functions", function(){
		it("pick", function(done){
			let tracking: {[key: string]: number} = {a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0,i:0,j:0};
			let trials: number = 10000;
			let keys: any[] = Object.keys(tracking);
			let expectation: number = (1/keys.length);
			for(let i=0;i<trials/2;i++) tracking[arrayx.pick(keys)]++;
			for(let i=0;i<trials/2;i++) tracking[arrayx.pick.apply(null, keys)]++;
			for(let key of keys) expect(tracking[key]/trials).is.within(expectation*0.9, expectation*1.1);
			done();
		});
	});
});