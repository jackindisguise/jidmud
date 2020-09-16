// mocha and chai
import "mocha";
import { expect } from "chai";

// local includes
import * as color from "./color";

describe("color", function(){
	it("Color stripping.", function(done){
		expect(color.strip("{rt{Rh{gi{Gs {bi{Bs {ya {Yt{pe{Ps{ct{C!{x")).is.equal("this is a test!");
		expect(color.strip("{{brackets}")).is.equal("{brackets}");
		expect(color.strip("the end{")).is.equal("the end");
		done();
	});

	it("Uniform behavior.", function(done){
		expect(color.color("{{}", color.ColorReplace.Telnet)).is.equal("{}");
		expect(color.color("{}", color.ColorReplace.Telnet)).is.equal("");
		done();
	});

	it("Telnet color.", function(done){
		let characters = color.ColorCodeMap.Telnet.entries();
		for(let values of characters){
			let char = color.Color2Character.get(values[0]);
			if(!char) continue;
			let pre = `{${char}this is a test{x`;
			let colored = color.color(pre, color.ColorReplace.Telnet);
			let expected = `${values[1]}this is a test${color.ColorCodeMap.Telnet.get(color.Color.CLEAR)}`;
			expect(colored).is.equal(expected);
		}

		let pre = "{zno color{x";
		let colored = color.color(pre, color.ColorReplace.Telnet);
		expect(colored).is.equal(`no color${color.ColorCodeMap.Telnet.get(color.Color.CLEAR)}`);
		done();
	});
});