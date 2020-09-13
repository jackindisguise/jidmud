import "mocha";
import { expect } from "chai";
import * as mathx from "./math";

describe("ext/math", function(){
	describe("functions", function(){
		it("lerp", function(done){
			expect(mathx.lerp(0,100,0.5)).is.equal(50);
			expect(mathx.lerp(0,1000,0.5)).is.equal(500);
			done();
		});

		it("rangeInt", function(done){
			let trials: number = 100;
			for(let i=0;i<trials;i++){
				expect(mathx.rangeInt(1,100)).is.within(1,100);
				expect(mathx.rangeInt(50,100)).is.within(50,100);
				expect(mathx.rangeInt(9349834,999999999)).is.within(9349834,999999999);
			}

			done();
		});

		it("probability", function(done){
			let trials: number = 500000;
			let success: number = 0;
			let prob: number = 0.05;
			for(let i=0;i<trials;i++) if(mathx.probability(prob)) success++;
			expect(success/trials).is.within(prob*0.9, prob*1.1);

			success = 0;
			prob = 0;
			for(let i=0;i<trials;i++) if(mathx.probability(prob)) success++;
			expect(success).is.equal(0);

			success = 0;
			prob = 1;
			for(let i=0;i<trials;i++) if(mathx.probability(prob)) success++;
			expect(success).is.equal(trials);
			done();
		});

		it("roll", function(done){
			let trials: number = 100;
			for(let i=0;i<trials;i++){
				expect(mathx.roll(2,6)).is.within(2,12);
				expect(mathx.roll(2,10)).is.within(2,20);
				expect(mathx.roll(5,50)).is.within(5,250);
				expect(mathx.roll(5,50,10)).is.within(15,260);
				expect(mathx.roll(2,10,25)).is.within(27,45);
				expect(mathx.rollString("2d6+5")).is.within(7,17);
				expect(mathx.rollString("2d6+pie")).is.within(2,12);
				expect(mathx.rollString("2d6-10")).is.within(-8,2);
			}

			expect(mathx.rollString("invalid")).is.equal(0);
			done();
		});
	});
});