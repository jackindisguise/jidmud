import * as color from "../color";

// side parameter for pad function
export enum PadSide { LEFT, RIGHT, CENTER };

// box styles for menus
export namespace BoxStyle {
	export type BoxStyleOptions = {
		topLeft?: string;
		top?: string;
		topRight?: string;
		left?: string;
		right?: string;
		middle?: string;
		bottomLeft?: string;
		bottom?: string;
		bottomRight?: string;
		corner?: string;
		separator?: string;
	};

	export const COMPUTERIE: BoxStyleOptions = {
		topLeft: "[",
		top: "'",
		topRight: "]",
		left: "[",
		right: "]",
		bottomLeft: "[",
		bottom: ".",
		bottomRight: "]",
		separator: "|"
	}

	export const CLEAN: BoxStyleOptions = {
		topLeft: ".",
		top: "-",
		topRight: ".",
		middle: "|",
		bottomLeft: "'",
		bottom: "-",
		bottomRight: "'"
	};

	export const BOXY: BoxStyleOptions = {
		top: "-",
		middle: "|",
		bottom: "-",
	};

	export const BOXY_THICK: BoxStyleOptions = {
		top:"=",
		middle: "=",
		bottom: "=",
		separator: "="
	}

	export const BOXY_FANCY: BoxStyleOptions = {
		top:"-",
		middle: "|",
		bottom: "-",
		corner: "+"
	}

	export const CIRCULAR: BoxStyleOptions = {
		topLeft: "/",
		top: "-",
		topRight: "\\",
		middle: "|",
		bottomLeft: "\\",
		bottom: "-",
		bottomRight: "/"
	}

	export const STARRY: BoxStyleOptions = {
		top: "*",
		middle: "*",
		bottom: "*",
		separator: "*"
	}
}

export type BoxOptions = {
	content: (string|BoxLine)[];
	style: BoxStyle.BoxStyleOptions;
	size: number;
	padding?: number;
	contentOrientation?: PadSide;
	header?: string;
	headerOrientation?: PadSide;
}

export type BoxLine = {
	text: string;
	clamp?: boolean;
	orientation?: PadSide;
}

export function box(options:BoxOptions): string{
	// preprocessing to avoid fuck tons of embedded expressions
	let top = options.style.top ? options.style.top : "-";
	let topLeft = options.style.topLeft ? options.style.topLeft : options.style.corner ? options.style.corner : top;
	let topRight = options.style.topRight ? options.style.topRight : options.style.corner ? options.style.corner : top;
	let middle = options.style.middle ? options.style.middle : "|";
	let left = options.style.left ? options.style.left : middle;
	let right = options.style.right ? options.style.right : middle;
	let bottom = options.style.bottom ? options.style.bottom : top;
	let bottomLeft = options.style.bottomLeft ? options.style.bottomLeft : options.style.corner ? options.style.corner : bottom;
	let bottomRight = options.style.bottomRight ? options.style.bottomRight : options.style.corner ? options.style.corner : bottom;
	let separator = options.style.separator ? options.style.separator : top;

	// construct lines
	let lines = [];
	if(options.header) lines.push(topLeft + pad(top+" "+options.header+" "+top, options.headerOrientation === undefined ? PadSide.RIGHT : options.headerOrientation, options.size-2, top) + topRight);
	else lines.push(topLeft+top.repeat(options.size-2)+topRight);

	if(options.contentOrientation === undefined) options.contentOrientation = PadSide.RIGHT;
	let padding = options.padding ? " ".repeat(options.padding) : "";
	let textSize = options.size-((1+padding.length)*2);
	for(let line of options.content) {
		if(lines.length > 1) lines.push(left+separator.repeat(options.size-2)+right);
		if(typeof line === "string") line = {text: line, clamp: true, orientation: options.contentOrientation};
		if(line.clamp === true || line.clamp === undefined){
			let clamped: string[] = clamp(line.text, textSize).split("\r\n");
			for(let subline of clamped){
				let padded = pad(subline, line.orientation === undefined ? options.contentOrientation : line.orientation, textSize);
				lines.push(left+padding+padded+padding+right);	
			}
		} else {
			let split: string[] = line.text.split("\n");
			for(let subline of split){
				let padded = pad(subline, line.orientation === undefined ? options.contentOrientation : line.orientation, textSize);
				lines.push(left+padding+padded+padding+right);	
			}
		}
	}

	lines.push(bottomLeft+bottom.repeat(options.size-2)+bottomRight);
	return lines.join("\r\n");
}

export function clamp(str: string, size: number): string{
	let lines: string[] = [];
	let split = str.split(/[ \t\r\n]+/);
	let processed: string[] = [];
	// best way i can think of to deal with overflowing text
	// because the loop is designed to work a step ahead,
	// processing large words requires a lot of code duplication
	// and messing with the flow of the program
	for(let word of split){
		if(word.length > size){
			for(let i=0;i<word.length;i+=size) processed.push(word.substr(i,size));
		} else processed.push(word);
	}

	let line: string[] = [];
	let clength: number = 0;
	for(let word of processed){
		if(!clength && word.length == size) {
			lines.push(word);
		} else if(clength && clength + word.length + 1 > size) { // if the following word goes over the limit, move it to next line
			lines.push(line.join(" "));
			line = [word];
			clength = word.length;
		} else { // add the following word to the line
			line.push(word);
			clength += word.length + 1;
		}
	}

	if(clength) lines.push(line.join(" "));
	return lines.join("\r\n");
}

// padder functions
export function pad(str: string, side: PadSide, size: number, padder?: string): string {
	if(padder === undefined) padder = " "; // default to a space
	let strnocolor = color.strip(str);
	if(strnocolor.length > size) return str;
	let paddernocolor = color.strip(padder);
	let padding = size-strnocolor.length; // total space to fill
	let padderCount = padding/paddernocolor.length; // number of padders needed to fill space
	let left: number = 0;
	let right: number = 0;
	switch(side){
		case PadSide.LEFT:
			left = padderCount;
			break;
		case PadSide.RIGHT:
			right = padderCount;
			break;
		case PadSide.CENTER:
			let split = padderCount/2;
			left = split + padderCount%2; // extra space goes on left when not even
			right = split;
			break;
	}

	return padder.repeat(left) + str + padder.repeat(right);
}

// alias for pad(str, PadSide.CENTER, size);
export function center(str: string, size: number, padder?: string): string{
	return pad(str, PadSide.CENTER, size);
}

// keyword functions
export function compareKeywords(needle: string, haystack: string){
	let haystacks: string[] = haystack.trim().split(/\W+/);
	let needles: string[] = needle.trim().split(/\W+/);
	for(let fNeedle of needles){
		if(fNeedle === "") return false;
		let found = false;
		for(let fHaystack of haystacks){
			if(fHaystack.startsWith(fNeedle)){
				found = true;
				break;
			}
		}

		if(!found) return false; // every needle must find 1 match in the haystack
	}

	return true;
}

// use a string as a search term for a list of items
export function searchList(needle: string, haystack: any[], compareFun: (needle: string, comparedTo: any) => boolean): any|undefined{
	for(let hay of haystack) if(compareFun(needle, hay)) return hay;
}