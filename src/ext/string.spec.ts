import "mocha";
import { expect } from "chai";
import * as stringx from "./string";

describe("ext/string", function(){
	describe("functions", function(){
		it("box", function(done){
			// generic box
			let options: stringx.BoxOptions = {
				content: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque placerat orci feugiat gravida. Mauris suscipit velit a orci pulvinar commodo."],
				style: stringx.BoxStyle.CLEAN,
				size: 80,
				padding: 1
			};
		
			expect(stringx.box(options)).is.equal("\
.------------------------------------------------------------------------------.\r\n\
| Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque     |\r\n\
| placerat orci feugiat gravida. Mauris suscipit velit a orci pulvinar         |\r\n\
| commodo.                                                                     |\r\n\
'------------------------------------------------------------------------------'");

			// header, orientation, and bigger padding
			options.header = "Lorem Ipsum";
			options.headerOrientation = stringx.PadSide.LEFT;
			options.padding = 2;
			expect(stringx.box(options)).is.equal("\
.---------------------------------------------------------------- Lorem Ipsum -.\r\n\
|  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque    |\r\n\
|  placerat orci feugiat gravida. Mauris suscipit velit a orci pulvinar        |\r\n\
|  commodo.                                                                    |\r\n\
'------------------------------------------------------------------------------'");

			// new paragraph
			options.content.push({
				text: "Curabitur blandit vel est vitae cursus. Sed a pulvinar enim. Ut quis tellus at neque ultrices accumsan sit amet dictum massa.",
				orientation: stringx.PadSide.CENTER
			});

			expect(stringx.box(options)).is.equal("\
.---------------------------------------------------------------- Lorem Ipsum -.\r\n\
|  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque    |\r\n\
|  placerat orci feugiat gravida. Mauris suscipit velit a orci pulvinar        |\r\n\
|  commodo.                                                                    |\r\n\
|------------------------------------------------------------------------------|\r\n\
|     Curabitur blandit vel est vitae cursus. Sed a pulvinar enim. Ut quis     |\r\n\
|           tellus at neque ultrices accumsan sit amet dictum massa.           |\r\n\
'------------------------------------------------------------------------------'");

			// computerie style
			options.style = stringx.BoxStyle.COMPUTERIE;
			expect(stringx.box(options)).is.equal("\
['''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''' Lorem Ipsum ']\r\n\
[  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque    ]\r\n\
[  placerat orci feugiat gravida. Mauris suscipit velit a orci pulvinar        ]\r\n\
[  commodo.                                                                    ]\r\n\
[||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||]\r\n\
[     Curabitur blandit vel est vitae cursus. Sed a pulvinar enim. Ut quis     ]\r\n\
[           tellus at neque ultrices accumsan sit amet dictum massa.           ]\r\n\
[..............................................................................]");

			// boxy fancy style
			options.style = stringx.BoxStyle.BOXY_FANCY;
			expect(stringx.box(options)).is.equal("\
+---------------------------------------------------------------- Lorem Ipsum -+\r\n\
|  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque    |\r\n\
|  placerat orci feugiat gravida. Mauris suscipit velit a orci pulvinar        |\r\n\
|  commodo.                                                                    |\r\n\
|------------------------------------------------------------------------------|\r\n\
|     Curabitur blandit vel est vitae cursus. Sed a pulvinar enim. Ut quis     |\r\n\
|           tellus at neque ultrices accumsan sit amet dictum massa.           |\r\n\
+------------------------------------------------------------------------------+");

			// new BoxLine with no orientation
			options.style = stringx.BoxStyle.BOXY_THICK;
			options.content.push({
				text: "Donec bibendum sapien metus, id lobortis urna sollicitudin et. Sed porttitor tellus nec lacus scelerisque, non sollicitudin quam faucibus.",
				orientation: stringx.PadSide.LEFT
			});

			expect(stringx.box(options)).is.equal("\
================================================================= Lorem Ipsum ==\r\n\
=  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque    =\r\n\
=  placerat orci feugiat gravida. Mauris suscipit velit a orci pulvinar        =\r\n\
=  commodo.                                                                    =\r\n\
================================================================================\r\n\
=     Curabitur blandit vel est vitae cursus. Sed a pulvinar enim. Ut quis     =\r\n\
=           tellus at neque ultrices accumsan sit amet dictum massa.           =\r\n\
================================================================================\r\n\
=          Donec bibendum sapien metus, id lobortis urna sollicitudin et. Sed  =\r\n\
=     porttitor tellus nec lacus scelerisque, non sollicitudin quam faucibus.  =\r\n\
================================================================================");

			// empty style
			options.style = {};
			expect(stringx.box(options)).is.equal("\
----------------------------------------------------------------- Lorem Ipsum --\r\n\
|  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque    |\r\n\
|  placerat orci feugiat gravida. Mauris suscipit velit a orci pulvinar        |\r\n\
|  commodo.                                                                    |\r\n\
|------------------------------------------------------------------------------|\r\n\
|     Curabitur blandit vel est vitae cursus. Sed a pulvinar enim. Ut quis     |\r\n\
|           tellus at neque ultrices accumsan sit amet dictum massa.           |\r\n\
|------------------------------------------------------------------------------|\r\n\
|          Donec bibendum sapien metus, id lobortis urna sollicitudin et. Sed  |\r\n\
|     porttitor tellus nec lacus scelerisque, non sollicitudin quam faucibus.  |\r\n\
--------------------------------------------------------------------------------");

			// remove header orientation
			delete options.headerOrientation;
			expect(stringx.box(options)).is.equal("\
-- Lorem Ipsum -----------------------------------------------------------------\r\n\
|  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque    |\r\n\
|  placerat orci feugiat gravida. Mauris suscipit velit a orci pulvinar        |\r\n\
|  commodo.                                                                    |\r\n\
|------------------------------------------------------------------------------|\r\n\
|     Curabitur blandit vel est vitae cursus. Sed a pulvinar enim. Ut quis     |\r\n\
|           tellus at neque ultrices accumsan sit amet dictum massa.           |\r\n\
|------------------------------------------------------------------------------|\r\n\
|          Donec bibendum sapien metus, id lobortis urna sollicitudin et. Sed  |\r\n\
|     porttitor tellus nec lacus scelerisque, non sollicitudin quam faucibus.  |\r\n\
--------------------------------------------------------------------------------");

			// boxline with clamping off and no orientation
			options.content.push({text:"Unclamped and no orientation.", clamp:false});
			expect(stringx.box(options)).is.equal("\
-- Lorem Ipsum -----------------------------------------------------------------\r\n\
|  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque    |\r\n\
|  placerat orci feugiat gravida. Mauris suscipit velit a orci pulvinar        |\r\n\
|  commodo.                                                                    |\r\n\
|------------------------------------------------------------------------------|\r\n\
|     Curabitur blandit vel est vitae cursus. Sed a pulvinar enim. Ut quis     |\r\n\
|           tellus at neque ultrices accumsan sit amet dictum massa.           |\r\n\
|------------------------------------------------------------------------------|\r\n\
|          Donec bibendum sapien metus, id lobortis urna sollicitudin et. Sed  |\r\n\
|     porttitor tellus nec lacus scelerisque, non sollicitudin quam faucibus.  |\r\n\
|------------------------------------------------------------------------------|\r\n\
|  Unclamped and no orientation.                                               |\r\n\
--------------------------------------------------------------------------------");

			// unclamped text, starry style
			options = {
				contentOrientation: stringx.PadSide.CENTER,
				style: stringx.BoxStyle.STARRY,
				size: 30,
				content: [
					{
						text: "Would you like\nto suck my dick?",
						clamp:false
					},
					"Yes"
				]
			}

			expect(stringx.box(options)).is.equal("\
******************************\r\n\
*       Would you like       *\r\n\
*      to suck my dick?      *\r\n\
******************************\r\n\
*             Yes            *\r\n\
******************************");

			// separators with headers
			options = {
				style: stringx.BoxStyle.ROUNDED,
				headerOrientation: stringx.PadSide.CENTER,
				size:40,
				padding:2,
				header: "Score",
				content: [
					{
						text: "Name:  Jack\nRace:  God\nClass: Vampire",
						clamp: false
					},
					{
						header: "Character Sheet",
						headerOrientation: stringx.PadSide.CENTER,
						text: "Str: 100      Agi: 100    Int: 100",
						clamp: false
					},
				]
			}

			expect(stringx.box(options)).is.equal("\
/---------------- Score ---------------\\\r\n\
|  Name:  Jack                         |\r\n\
|  Race:  God                          |\r\n\
|  Class: Vampire                      |\r\n\
|----------- Character Sheet ----------|\r\n\
|  Str: 100      Agi: 100    Int: 100  |\r\n\
\\--------------------------------------/");
			done();
		});

		it("clamp", function(done){
			let paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in mi convallis est mollis pharetra.";

			expect(stringx.clamp(paragraph, 80)).is.equal("\
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in mi convallis\r\n\
est mollis pharetra.");

			expect(stringx.clamp(paragraph, 40)).is.equal("\
Lorem ipsum dolor sit amet, consectetur\r\n\
adipiscing elit. Etiam in mi convallis\r\n\
est mollis pharetra.");

			expect(stringx.clamp("paragraph", 2)).is.equal("pa\r\nra\r\ngr\r\nap\r\nh");
			expect(stringx.clamp("paragraph", 9)).is.equal("paragraph");
			done();
		});

		it("pad", function(done){
			let text = "This is a test.";
			expect(stringx.pad(text, stringx.PadSide.CENTER, 20)).is.equal("   This is a test.  ");
			expect(stringx.center(text, 20)).is.equal("   This is a test.  ");
			expect(stringx.pad(text, stringx.PadSide.LEFT,   20)).is.equal("     This is a test.");
			expect(stringx.pad(text, stringx.PadSide.RIGHT,  20)).is.equal("This is a test.     ");
			expect(stringx.pad(text, stringx.PadSide.CENTER, 2)).is.equal(text);
			done();
		});

		it("compareKeywords", function(done){
			expect(stringx.compareKeywords("sword", "long sword")).is.equal(true);
			expect(stringx.compareKeywords("sw", "long sword")).is.equal(true);
			expect(stringx.compareKeywords("", "long sword")).is.equal(false);
			expect(stringx.compareKeywords("l", "long sword")).is.equal(true);
			expect(stringx.compareKeywords("sh sw", "short sword")).is.equal(true);
			expect(stringx.compareKeywords("sh sw sh sw sh sw sh sw", "short sword")).is.equal(true);
			expect(stringx.compareKeywords("sh sw sh sw sh sw sh sw l", "short sword")).is.equal(false);
			done();
		});

		it("searchList", function(done){
			type Item = {
				keywords: string;
				value: number;
			};

			let items: Item[] = [
				{keywords:"short sword", value:10},
				{keywords:"real legendary sword excalibur", value:50000},
				{keywords:"fake legendary sword excalibur", value:-5},
				{keywords:"golden ring", value:100}
			];

			function itemKeywordSearch(keywords: string, item: Item): boolean{
				if(stringx.compareKeywords(keywords, item.keywords)) return true;
				return false;
			};

			expect(stringx.searchList("real excalibur", items, itemKeywordSearch)).is.equal(items[1]);
			expect(stringx.searchList("excalibur fake", items, itemKeywordSearch)).is.equal(items[2]);
			expect(stringx.searchList("sword", items, itemKeywordSearch)).is.equal(items[0]);
			expect(stringx.searchList("g r", items, itemKeywordSearch)).is.equal(items[3]);
			expect(stringx.searchList("long sword", items, itemKeywordSearch)).is.equal(undefined);
			done();
		});
	});
});
