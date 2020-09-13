export const ColorEscapeCharacter: string = "{";
export const ColorEscapeRegExp: RegExp = new RegExp(`${ColorEscapeCharacter}(.?)`, "g");

export enum Color {
	BLINK,
	CLEAR,
	MAROON,
	DARK_GREEN,
	OLIVE,
	NAVY,
	PURPLE,
	TEAL,
	SILVER,
	GREY,
	CRIMSON,
	LIME,
	YELLOW,
	BLUE,
	PINK,
	CYAN,
	WHITE,
}

export namespace ColorCharacter {
	export const BLINK: string		= "!";
	export const CLEAR: string		= "x";
	export const MAROON: string		= "r";
	export const DARK_GREEN: string	= "g";
	export const OLIVE: string		= "y";
	export const NAVY: string		= "b";
	export const PURPLE: string		= "p";
	export const TEAL: string		= "c";
	export const SILVER: string		= "w";
	export const GREY: string		= "D";
	export const CRIMSON: string	= "R";
	export const LIME: string		= "G";
	export const YELLOW: string		= "Y";
	export const BLUE: string		= "B";
	export const PINK: string		= "P";
	export const CYAN: string		= "C";
	export const WHITE: string		= "W";
}

export namespace ColorCode {
	export namespace Telnet {
		export const BLINK: string = "\u001b[5m";
		export const CLEAR: string = "\u001b[0m";
		export const MAROON: string = "\u001b[0;31m";
		export const DARK_GREEN: string = "\u001b[0;32m";
		export const OLIVE: string = "\u001b[0;33m";
		export const NAVY: string = "\u001b[0;34m";
		export const PURPLE: string = "\u001b[0;35m";
		export const TEAL: string = "\u001b[0;36m";
		export const SILVER: string = "\u001b[0;37m";
		export const GREY: string = "\u001b[1;30m";
		export const CRIMSON: string = "\u001b[1;31m";
		export const LIME: string = "\u001b[1;32m";
		export const YELLOW: string = "\u001b[1;33m";
		export const BLUE: string = "\u001b[1;34m";
		export const PINK: string = "\u001b[1;35m";
		export const CYAN: string = "\u001b[1;36m";
		export const WHITE: string = "\u001b[1;37m";
	}
}

export const Color2Character: Map<Color, string> = new Map<Color, string>([
	[Color.BLINK, ColorCharacter.BLINK],
	[Color.CLEAR, ColorCharacter.CLEAR],
	[Color.MAROON, ColorCharacter.MAROON],
	[Color.DARK_GREEN, ColorCharacter.DARK_GREEN],
	[Color.OLIVE, ColorCharacter.OLIVE],
	[Color.NAVY, ColorCharacter.NAVY],
	[Color.PURPLE, ColorCharacter.PURPLE],
	[Color.TEAL, ColorCharacter.TEAL],
	[Color.SILVER, ColorCharacter.SILVER],
	[Color.GREY, ColorCharacter.GREY],
	[Color.CRIMSON, ColorCharacter.CRIMSON],
	[Color.LIME, ColorCharacter.LIME],
	[Color.YELLOW, ColorCharacter.YELLOW],
	[Color.BLUE, ColorCharacter.BLUE],
	[Color.PINK, ColorCharacter.PINK],
	[Color.CYAN, ColorCharacter.CYAN],
	[Color.WHITE, ColorCharacter.WHITE]
]);

export const Character2Color: Map<string, Color> = new Map<string, Color>([
	[ColorCharacter.BLINK, Color.BLINK],
	[ColorCharacter.CLEAR, Color.CLEAR],
	[ColorCharacter.MAROON, Color.MAROON],
	[ColorCharacter.DARK_GREEN, Color.DARK_GREEN],
	[ColorCharacter.OLIVE, Color.OLIVE],
	[ColorCharacter.NAVY, Color.NAVY],
	[ColorCharacter.PURPLE, Color.PURPLE],
	[ColorCharacter.TEAL, Color.TEAL],
	[ColorCharacter.SILVER, Color.SILVER],
	[ColorCharacter.GREY, Color.GREY],
	[ColorCharacter.CRIMSON, Color.CRIMSON],
	[ColorCharacter.LIME, Color.LIME],
	[ColorCharacter.YELLOW, Color.YELLOW],
	[ColorCharacter.BLUE, Color.BLUE],
	[ColorCharacter.PINK, Color.PINK],
	[ColorCharacter.CYAN, Color.CYAN],
	[ColorCharacter.WHITE, Color.WHITE]
]);

export namespace ColorCodeMap {
	export const Telnet: Map<Color, string> = new Map<Color, string>([
		[Color.BLINK, ColorCode.Telnet.BLINK],
		[Color.CLEAR, ColorCode.Telnet.CLEAR],
		[Color.MAROON, ColorCode.Telnet.MAROON],
		[Color.DARK_GREEN, ColorCode.Telnet.DARK_GREEN],
		[Color.OLIVE, ColorCode.Telnet.OLIVE],
		[Color.NAVY, ColorCode.Telnet.NAVY],
		[Color.PURPLE, ColorCode.Telnet.PURPLE],
		[Color.TEAL, ColorCode.Telnet.TEAL],
		[Color.SILVER, ColorCode.Telnet.SILVER],
		[Color.GREY, ColorCode.Telnet.GREY],
		[Color.CRIMSON, ColorCode.Telnet.CRIMSON],
		[Color.LIME, ColorCode.Telnet.LIME],
		[Color.YELLOW, ColorCode.Telnet.YELLOW],
		[Color.BLUE, ColorCode.Telnet.BLUE],
		[Color.PINK, ColorCode.Telnet.PINK],
		[Color.CYAN, ColorCode.Telnet.CYAN],
		[Color.WHITE, ColorCode.Telnet.WHITE]
	]);
}

export namespace ColorReplace {
	export function Telnet(substr: string, char: string): string{
		if(char === ColorEscapeCharacter) return ColorEscapeCharacter;
		let color = Character2Color.get(char); // convert character to color
		if(color===undefined) return ""; // if not valid, return empty string instead
		let code = ColorCodeMap.Telnet.get(color); // map color to telnet color code
		if(!code) return ""; // if not valid, return empty string instead
		return code; // return color code
	}
}

export function strip(str: string){
	return str.replace(ColorEscapeRegExp, function(sub, char){
		if(char === ColorEscapeCharacter) return char;
		return "";
	});
}

export function color(str: string, replacer: (substr: string, char: string) => string){
	return str.replace(ColorEscapeRegExp, replacer);
}