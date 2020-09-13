import "mocha";
import { expect } from "chai";
import * as stringx from "./string";

describe("ext/string", function(){
	describe("functions", function(){
		it("box", function(done){
			// generic box
			let options: stringx.BoxOptions = {
				content: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque placerat orci feugiat gravida. Mauris suscipit velit a orci pulvinar commodo. Ut blandit lorem eu massa vehicula, at hendrerit est egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla ac tellus urna. Vestibulum elementum venenatis dolor eu finibus. Sed vehicula tellus eget velit porta scelerisque. Integer convallis nibh eget justo commodo euismod. Donec non mauris odio. Praesent in ante laoreet, maximus lectus semper, cursus nisl. Phasellus vel gravida eros. Curabitur porttitor mi quis urna porttitor, in varius nulla sollicitudin. Nulla pretium sit amet augue sed pellentesque."],
				style: stringx.BoxStyle.CLEAN,
				size: 80,
				padding: 1
			};
		
			expect(stringx.box(options)).is.equal(".------------------------------------------------------------------------------.\r\n| Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque     |\r\n| placerat orci feugiat gravida. Mauris suscipit velit a orci pulvinar         |\r\n| commodo. Ut blandit lorem eu massa vehicula, at hendrerit est egestas. Orci  |\r\n| varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus |\r\n| mus. Nulla ac tellus urna. Vestibulum elementum venenatis dolor eu finibus.  |\r\n| Sed vehicula tellus eget velit porta scelerisque. Integer convallis nibh     |\r\n| eget justo commodo euismod. Donec non mauris odio. Praesent in ante laoreet, |\r\n| maximus lectus semper, cursus nisl. Phasellus vel gravida eros. Curabitur    |\r\n| porttitor mi quis urna porttitor, in varius nulla sollicitudin. Nulla        |\r\n| pretium sit amet augue sed pellentesque.                                     |\r\n\'------------------------------------------------------------------------------\'");

			// header, orientation, and bigger padding
			options.header = "Lorem Ipsum";
			options.headerOrientation = stringx.PadSide.RIGHT;
			options.padding = 2;
			expect(stringx.box(options)).is.equal(".- Lorem Ipsum ----------------------------------------------------------------.\r\n|  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque    |\r\n|  placerat orci feugiat gravida. Mauris suscipit velit a orci pulvinar        |\r\n|  commodo. Ut blandit lorem eu massa vehicula, at hendrerit est egestas.      |\r\n|  Orci varius natoque penatibus et magnis dis parturient montes, nascetur     |\r\n|  ridiculus mus. Nulla ac tellus urna. Vestibulum elementum venenatis dolor   |\r\n|  eu finibus. Sed vehicula tellus eget velit porta scelerisque. Integer       |\r\n|  convallis nibh eget justo commodo euismod. Donec non mauris odio. Praesent  |\r\n|  in ante laoreet, maximus lectus semper, cursus nisl. Phasellus vel gravida  |\r\n|  eros. Curabitur porttitor mi quis urna porttitor, in varius nulla           |\r\n|  sollicitudin. Nulla pretium sit amet augue sed pellentesque.                |\r\n\'------------------------------------------------------------------------------\'");

			// new paragraph
			options.content.push({
				text: "Curabitur blandit vel est vitae cursus. Sed a pulvinar enim. Ut quis tellus at neque ultrices accumsan sit amet dictum massa. Donec ac ultrices arcu, ut ultricies lorem. Suspendisse nulla ante, bibendum nec felis et, rhoncus dapibus nisl. Donec sodales tincidunt nibh at consequat. Cras dapibus posuere neque, at ultricies ex gravida a. Fusce et tellus elit. Nullam id viverra lectus. Nunc scelerisque, tellus vel condimentum porta, sem lacus fringilla lectus, eget posuere mi mi rhoncus odio. Cras ac vehicula mauris. Proin feugiat faucibus magna at tincidunt. Donec a eleifend dui. Sed in vestibulum risus. Duis nibh turpis, cursus sed ipsum nec, posuere ullamcorper augue.",
				orientation: stringx.PadSide.CENTER
			});

			expect(stringx.box(options)).is.equal(".- Lorem Ipsum ----------------------------------------------------------------.\r\n|  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque    |\r\n|  placerat orci feugiat gravida. Mauris suscipit velit a orci pulvinar        |\r\n|  commodo. Ut blandit lorem eu massa vehicula, at hendrerit est egestas.      |\r\n|  Orci varius natoque penatibus et magnis dis parturient montes, nascetur     |\r\n|  ridiculus mus. Nulla ac tellus urna. Vestibulum elementum venenatis dolor   |\r\n|  eu finibus. Sed vehicula tellus eget velit porta scelerisque. Integer       |\r\n|  convallis nibh eget justo commodo euismod. Donec non mauris odio. Praesent  |\r\n|  in ante laoreet, maximus lectus semper, cursus nisl. Phasellus vel gravida  |\r\n|  eros. Curabitur porttitor mi quis urna porttitor, in varius nulla           |\r\n|  sollicitudin. Nulla pretium sit amet augue sed pellentesque.                |\r\n|------------------------------------------------------------------------------|\r\n|     Curabitur blandit vel est vitae cursus. Sed a pulvinar enim. Ut quis     |\r\n|  tellus at neque ultrices accumsan sit amet dictum massa. Donec ac ultrices  |\r\n|   arcu, ut ultricies lorem. Suspendisse nulla ante, bibendum nec felis et,   |\r\n|     rhoncus dapibus nisl. Donec sodales tincidunt nibh at consequat. Cras    |\r\n|    dapibus posuere neque, at ultricies ex gravida a. Fusce et tellus elit.   |\r\n|   Nullam id viverra lectus. Nunc scelerisque, tellus vel condimentum porta,  |\r\n|     sem lacus fringilla lectus, eget posuere mi mi rhoncus odio. Cras ac     |\r\n|      vehicula mauris. Proin feugiat faucibus magna at tincidunt. Donec a     |\r\n|   eleifend dui. Sed in vestibulum risus. Duis nibh turpis, cursus sed ipsum  |\r\n|                        nec, posuere ullamcorper augue.                       |\r\n\'------------------------------------------------------------------------------\'");

			// computerie style
			options.style = stringx.BoxStyle.COMPUTERIE;
			expect(stringx.box(options)).is.equal("[\' Lorem Ipsum \'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\']\r\n[  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque    ]\r\n[  placerat orci feugiat gravida. Mauris suscipit velit a orci pulvinar        ]\r\n[  commodo. Ut blandit lorem eu massa vehicula, at hendrerit est egestas.      ]\r\n[  Orci varius natoque penatibus et magnis dis parturient montes, nascetur     ]\r\n[  ridiculus mus. Nulla ac tellus urna. Vestibulum elementum venenatis dolor   ]\r\n[  eu finibus. Sed vehicula tellus eget velit porta scelerisque. Integer       ]\r\n[  convallis nibh eget justo commodo euismod. Donec non mauris odio. Praesent  ]\r\n[  in ante laoreet, maximus lectus semper, cursus nisl. Phasellus vel gravida  ]\r\n[  eros. Curabitur porttitor mi quis urna porttitor, in varius nulla           ]\r\n[  sollicitudin. Nulla pretium sit amet augue sed pellentesque.                ]\r\n[||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||]\r\n[     Curabitur blandit vel est vitae cursus. Sed a pulvinar enim. Ut quis     ]\r\n[  tellus at neque ultrices accumsan sit amet dictum massa. Donec ac ultrices  ]\r\n[   arcu, ut ultricies lorem. Suspendisse nulla ante, bibendum nec felis et,   ]\r\n[     rhoncus dapibus nisl. Donec sodales tincidunt nibh at consequat. Cras    ]\r\n[    dapibus posuere neque, at ultricies ex gravida a. Fusce et tellus elit.   ]\r\n[   Nullam id viverra lectus. Nunc scelerisque, tellus vel condimentum porta,  ]\r\n[     sem lacus fringilla lectus, eget posuere mi mi rhoncus odio. Cras ac     ]\r\n[      vehicula mauris. Proin feugiat faucibus magna at tincidunt. Donec a     ]\r\n[   eleifend dui. Sed in vestibulum risus. Duis nibh turpis, cursus sed ipsum  ]\r\n[                        nec, posuere ullamcorper augue.                       ]\r\n[..............................................................................]");

			// boxy fancy style
			options.style = stringx.BoxStyle.BOXY_FANCY;
			expect(stringx.box(options)).is.equal("+- Lorem Ipsum ----------------------------------------------------------------+\r\n|  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque    |\r\n|  placerat orci feugiat gravida. Mauris suscipit velit a orci pulvinar        |\r\n|  commodo. Ut blandit lorem eu massa vehicula, at hendrerit est egestas.      |\r\n|  Orci varius natoque penatibus et magnis dis parturient montes, nascetur     |\r\n|  ridiculus mus. Nulla ac tellus urna. Vestibulum elementum venenatis dolor   |\r\n|  eu finibus. Sed vehicula tellus eget velit porta scelerisque. Integer       |\r\n|  convallis nibh eget justo commodo euismod. Donec non mauris odio. Praesent  |\r\n|  in ante laoreet, maximus lectus semper, cursus nisl. Phasellus vel gravida  |\r\n|  eros. Curabitur porttitor mi quis urna porttitor, in varius nulla           |\r\n|  sollicitudin. Nulla pretium sit amet augue sed pellentesque.                |\r\n|------------------------------------------------------------------------------|\r\n|     Curabitur blandit vel est vitae cursus. Sed a pulvinar enim. Ut quis     |\r\n|  tellus at neque ultrices accumsan sit amet dictum massa. Donec ac ultrices  |\r\n|   arcu, ut ultricies lorem. Suspendisse nulla ante, bibendum nec felis et,   |\r\n|     rhoncus dapibus nisl. Donec sodales tincidunt nibh at consequat. Cras    |\r\n|    dapibus posuere neque, at ultricies ex gravida a. Fusce et tellus elit.   |\r\n|   Nullam id viverra lectus. Nunc scelerisque, tellus vel condimentum porta,  |\r\n|     sem lacus fringilla lectus, eget posuere mi mi rhoncus odio. Cras ac     |\r\n|      vehicula mauris. Proin feugiat faucibus magna at tincidunt. Donec a     |\r\n|   eleifend dui. Sed in vestibulum risus. Duis nibh turpis, cursus sed ipsum  |\r\n|                        nec, posuere ullamcorper augue.                       |\r\n+------------------------------------------------------------------------------+");

			// new BoxLine with no orientation
			options.style = stringx.BoxStyle.BOXY_THICK;
			options.content.push({
				text: "Donec bibendum sapien metus, id lobortis urna sollicitudin et. Sed porttitor tellus nec lacus scelerisque, non sollicitudin quam faucibus. Integer finibus metus in ipsum imperdiet, et gravida leo pharetra. Aliquam non augue rhoncus, dictum mauris id, sagittis arcu. Vestibulum dolor sem, rutrum eget gravida et, pulvinar quis metus. Phasellus porta molestie erat nec sagittis. Cras ullamcorper ullamcorper nibh, non dictum arcu fermentum et. Aenean quis vestibulum dui. Nulla at quam nunc. Cras purus erat, aliquet id ligula et, porta euismod augue."
			});

			expect(stringx.box(options)).is.equal("== Lorem Ipsum =================================================================\r\n=  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque    =\r\n=  placerat orci feugiat gravida. Mauris suscipit velit a orci pulvinar        =\r\n=  commodo. Ut blandit lorem eu massa vehicula, at hendrerit est egestas.      =\r\n=  Orci varius natoque penatibus et magnis dis parturient montes, nascetur     =\r\n=  ridiculus mus. Nulla ac tellus urna. Vestibulum elementum venenatis dolor   =\r\n=  eu finibus. Sed vehicula tellus eget velit porta scelerisque. Integer       =\r\n=  convallis nibh eget justo commodo euismod. Donec non mauris odio. Praesent  =\r\n=  in ante laoreet, maximus lectus semper, cursus nisl. Phasellus vel gravida  =\r\n=  eros. Curabitur porttitor mi quis urna porttitor, in varius nulla           =\r\n=  sollicitudin. Nulla pretium sit amet augue sed pellentesque.                =\r\n================================================================================\r\n=     Curabitur blandit vel est vitae cursus. Sed a pulvinar enim. Ut quis     =\r\n=  tellus at neque ultrices accumsan sit amet dictum massa. Donec ac ultrices  =\r\n=   arcu, ut ultricies lorem. Suspendisse nulla ante, bibendum nec felis et,   =\r\n=     rhoncus dapibus nisl. Donec sodales tincidunt nibh at consequat. Cras    =\r\n=    dapibus posuere neque, at ultricies ex gravida a. Fusce et tellus elit.   =\r\n=   Nullam id viverra lectus. Nunc scelerisque, tellus vel condimentum porta,  =\r\n=     sem lacus fringilla lectus, eget posuere mi mi rhoncus odio. Cras ac     =\r\n=      vehicula mauris. Proin feugiat faucibus magna at tincidunt. Donec a     =\r\n=   eleifend dui. Sed in vestibulum risus. Duis nibh turpis, cursus sed ipsum  =\r\n=                        nec, posuere ullamcorper augue.                       =\r\n================================================================================\r\n=  Donec bibendum sapien metus, id lobortis urna sollicitudin et. Sed          =\r\n=  porttitor tellus nec lacus scelerisque, non sollicitudin quam faucibus.     =\r\n=  Integer finibus metus in ipsum imperdiet, et gravida leo pharetra. Aliquam  =\r\n=  non augue rhoncus, dictum mauris id, sagittis arcu. Vestibulum dolor sem,   =\r\n=  rutrum eget gravida et, pulvinar quis metus. Phasellus porta molestie erat  =\r\n=  nec sagittis. Cras ullamcorper ullamcorper nibh, non dictum arcu fermentum  =\r\n=  et. Aenean quis vestibulum dui. Nulla at quam nunc. Cras purus erat,        =\r\n=  aliquet id ligula et, porta euismod augue.                                  =\r\n================================================================================");

			// empty style
			options.style = {};
			expect(stringx.box(options)).is.equal("-- Lorem Ipsum -----------------------------------------------------------------\r\n|  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque    |\r\n|  placerat orci feugiat gravida. Mauris suscipit velit a orci pulvinar        |\r\n|  commodo. Ut blandit lorem eu massa vehicula, at hendrerit est egestas.      |\r\n|  Orci varius natoque penatibus et magnis dis parturient montes, nascetur     |\r\n|  ridiculus mus. Nulla ac tellus urna. Vestibulum elementum venenatis dolor   |\r\n|  eu finibus. Sed vehicula tellus eget velit porta scelerisque. Integer       |\r\n|  convallis nibh eget justo commodo euismod. Donec non mauris odio. Praesent  |\r\n|  in ante laoreet, maximus lectus semper, cursus nisl. Phasellus vel gravida  |\r\n|  eros. Curabitur porttitor mi quis urna porttitor, in varius nulla           |\r\n|  sollicitudin. Nulla pretium sit amet augue sed pellentesque.                |\r\n|------------------------------------------------------------------------------|\r\n|     Curabitur blandit vel est vitae cursus. Sed a pulvinar enim. Ut quis     |\r\n|  tellus at neque ultrices accumsan sit amet dictum massa. Donec ac ultrices  |\r\n|   arcu, ut ultricies lorem. Suspendisse nulla ante, bibendum nec felis et,   |\r\n|     rhoncus dapibus nisl. Donec sodales tincidunt nibh at consequat. Cras    |\r\n|    dapibus posuere neque, at ultricies ex gravida a. Fusce et tellus elit.   |\r\n|   Nullam id viverra lectus. Nunc scelerisque, tellus vel condimentum porta,  |\r\n|     sem lacus fringilla lectus, eget posuere mi mi rhoncus odio. Cras ac     |\r\n|      vehicula mauris. Proin feugiat faucibus magna at tincidunt. Donec a     |\r\n|   eleifend dui. Sed in vestibulum risus. Duis nibh turpis, cursus sed ipsum  |\r\n|                        nec, posuere ullamcorper augue.                       |\r\n|------------------------------------------------------------------------------|\r\n|  Donec bibendum sapien metus, id lobortis urna sollicitudin et. Sed          |\r\n|  porttitor tellus nec lacus scelerisque, non sollicitudin quam faucibus.     |\r\n|  Integer finibus metus in ipsum imperdiet, et gravida leo pharetra. Aliquam  |\r\n|  non augue rhoncus, dictum mauris id, sagittis arcu. Vestibulum dolor sem,   |\r\n|  rutrum eget gravida et, pulvinar quis metus. Phasellus porta molestie erat  |\r\n|  nec sagittis. Cras ullamcorper ullamcorper nibh, non dictum arcu fermentum  |\r\n|  et. Aenean quis vestibulum dui. Nulla at quam nunc. Cras purus erat,        |\r\n|  aliquet id ligula et, porta euismod augue.                                  |\r\n--------------------------------------------------------------------------------");

			// remove header orientation
			delete options.headerOrientation;
			expect(stringx.box(options)).is.equal("-- Lorem Ipsum -----------------------------------------------------------------\r\n|  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque    |\r\n|  placerat orci feugiat gravida. Mauris suscipit velit a orci pulvinar        |\r\n|  commodo. Ut blandit lorem eu massa vehicula, at hendrerit est egestas.      |\r\n|  Orci varius natoque penatibus et magnis dis parturient montes, nascetur     |\r\n|  ridiculus mus. Nulla ac tellus urna. Vestibulum elementum venenatis dolor   |\r\n|  eu finibus. Sed vehicula tellus eget velit porta scelerisque. Integer       |\r\n|  convallis nibh eget justo commodo euismod. Donec non mauris odio. Praesent  |\r\n|  in ante laoreet, maximus lectus semper, cursus nisl. Phasellus vel gravida  |\r\n|  eros. Curabitur porttitor mi quis urna porttitor, in varius nulla           |\r\n|  sollicitudin. Nulla pretium sit amet augue sed pellentesque.                |\r\n|------------------------------------------------------------------------------|\r\n|     Curabitur blandit vel est vitae cursus. Sed a pulvinar enim. Ut quis     |\r\n|  tellus at neque ultrices accumsan sit amet dictum massa. Donec ac ultrices  |\r\n|   arcu, ut ultricies lorem. Suspendisse nulla ante, bibendum nec felis et,   |\r\n|     rhoncus dapibus nisl. Donec sodales tincidunt nibh at consequat. Cras    |\r\n|    dapibus posuere neque, at ultricies ex gravida a. Fusce et tellus elit.   |\r\n|   Nullam id viverra lectus. Nunc scelerisque, tellus vel condimentum porta,  |\r\n|     sem lacus fringilla lectus, eget posuere mi mi rhoncus odio. Cras ac     |\r\n|      vehicula mauris. Proin feugiat faucibus magna at tincidunt. Donec a     |\r\n|   eleifend dui. Sed in vestibulum risus. Duis nibh turpis, cursus sed ipsum  |\r\n|                        nec, posuere ullamcorper augue.                       |\r\n|------------------------------------------------------------------------------|\r\n|  Donec bibendum sapien metus, id lobortis urna sollicitudin et. Sed          |\r\n|  porttitor tellus nec lacus scelerisque, non sollicitudin quam faucibus.     |\r\n|  Integer finibus metus in ipsum imperdiet, et gravida leo pharetra. Aliquam  |\r\n|  non augue rhoncus, dictum mauris id, sagittis arcu. Vestibulum dolor sem,   |\r\n|  rutrum eget gravida et, pulvinar quis metus. Phasellus porta molestie erat  |\r\n|  nec sagittis. Cras ullamcorper ullamcorper nibh, non dictum arcu fermentum  |\r\n|  et. Aenean quis vestibulum dui. Nulla at quam nunc. Cras purus erat,        |\r\n|  aliquet id ligula et, porta euismod augue.                                  |\r\n--------------------------------------------------------------------------------");

			// boxline with clamping off and no orientation
			options.content.push({text:"Unclamped and no orientation.", clamp:false});
			expect(stringx.box(options)).is.equal("-- Lorem Ipsum -----------------------------------------------------------------\r\n|  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque    |\r\n|  placerat orci feugiat gravida. Mauris suscipit velit a orci pulvinar        |\r\n|  commodo. Ut blandit lorem eu massa vehicula, at hendrerit est egestas.      |\r\n|  Orci varius natoque penatibus et magnis dis parturient montes, nascetur     |\r\n|  ridiculus mus. Nulla ac tellus urna. Vestibulum elementum venenatis dolor   |\r\n|  eu finibus. Sed vehicula tellus eget velit porta scelerisque. Integer       |\r\n|  convallis nibh eget justo commodo euismod. Donec non mauris odio. Praesent  |\r\n|  in ante laoreet, maximus lectus semper, cursus nisl. Phasellus vel gravida  |\r\n|  eros. Curabitur porttitor mi quis urna porttitor, in varius nulla           |\r\n|  sollicitudin. Nulla pretium sit amet augue sed pellentesque.                |\r\n|------------------------------------------------------------------------------|\r\n|     Curabitur blandit vel est vitae cursus. Sed a pulvinar enim. Ut quis     |\r\n|  tellus at neque ultrices accumsan sit amet dictum massa. Donec ac ultrices  |\r\n|   arcu, ut ultricies lorem. Suspendisse nulla ante, bibendum nec felis et,   |\r\n|     rhoncus dapibus nisl. Donec sodales tincidunt nibh at consequat. Cras    |\r\n|    dapibus posuere neque, at ultricies ex gravida a. Fusce et tellus elit.   |\r\n|   Nullam id viverra lectus. Nunc scelerisque, tellus vel condimentum porta,  |\r\n|     sem lacus fringilla lectus, eget posuere mi mi rhoncus odio. Cras ac     |\r\n|      vehicula mauris. Proin feugiat faucibus magna at tincidunt. Donec a     |\r\n|   eleifend dui. Sed in vestibulum risus. Duis nibh turpis, cursus sed ipsum  |\r\n|                        nec, posuere ullamcorper augue.                       |\r\n|------------------------------------------------------------------------------|\r\n|  Donec bibendum sapien metus, id lobortis urna sollicitudin et. Sed          |\r\n|  porttitor tellus nec lacus scelerisque, non sollicitudin quam faucibus.     |\r\n|  Integer finibus metus in ipsum imperdiet, et gravida leo pharetra. Aliquam  |\r\n|  non augue rhoncus, dictum mauris id, sagittis arcu. Vestibulum dolor sem,   |\r\n|  rutrum eget gravida et, pulvinar quis metus. Phasellus porta molestie erat  |\r\n|  nec sagittis. Cras ullamcorper ullamcorper nibh, non dictum arcu fermentum  |\r\n|  et. Aenean quis vestibulum dui. Nulla at quam nunc. Cras purus erat,        |\r\n|  aliquet id ligula et, porta euismod augue.                                  |\r\n|------------------------------------------------------------------------------|\r\n|  Unclamped and no orientation.                                               |\r\n--------------------------------------------------------------------------------");

			// unclamped text, starry style
			options = {
				content: [
					{
						text: "Would you like\nto suck my dick?",
						orientation: stringx.PadSide.CENTER,
						clamp:false
					},
					{
						text: "Yes",
						orientation: stringx.PadSide.CENTER,
						clamp:false
					}
				],
				style: stringx.BoxStyle.STARRY,
				size: 30
			}

			expect(stringx.box(options)).is.equal("******************************\r\n*       Would you like       *\r\n*      to suck my dick?      *\r\n******************************\r\n*             Yes            *\r\n******************************");
			done();
		});

		it("clamp", function(done){
			let paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in mi convallis est mollis pharetra. Vestibulum et ante varius, imperdiet massa et, feugiat dolor. Integer elementum nunc vitae scelerisque aliquet. Maecenas varius ornare lorem. Pellentesque ut viverra felis. Phasellus condimentum dictum elementum. Nam elit tortor, varius molestie nibh vel, suscipit maximus ex. Nullam egestas scelerisque placerat.";
			expect(stringx.clamp(paragraph, 80)).is.equal("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in mi convallis\r\nest mollis pharetra. Vestibulum et ante varius, imperdiet massa et, feugiat\r\ndolor. Integer elementum nunc vitae scelerisque aliquet. Maecenas varius ornare\r\nlorem. Pellentesque ut viverra felis. Phasellus condimentum dictum elementum.\r\nNam elit tortor, varius molestie nibh vel, suscipit maximus ex. Nullam egestas\r\nscelerisque placerat.");
			expect(stringx.clamp(paragraph, 40)).is.equal("Lorem ipsum dolor sit amet, consectetur\r\nadipiscing elit. Etiam in mi convallis\r\nest mollis pharetra. Vestibulum et ante\r\nvarius, imperdiet massa et, feugiat\r\ndolor. Integer elementum nunc vitae\r\nscelerisque aliquet. Maecenas varius\r\nornare lorem. Pellentesque ut viverra\r\nfelis. Phasellus condimentum dictum\r\nelementum. Nam elit tortor, varius\r\nmolestie nibh vel, suscipit maximus ex.\r\nNullam egestas scelerisque placerat.");
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
