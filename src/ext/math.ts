/**
 * Interpolates between two values using an interval.
 * @param min Minimum value.
 * @param max Maximum value.
 * @param mod Interval between 0 and 1.
 */
export function lerp(min:number, max:number, mod:number): number{
	return min+((max-min)*mod);
}

/**
 * Generate an integer between (and including) a minimum and maximum.
 * @param min The lowest value of the range.
 * @param max The highest value of the range.
 */
export function rangeInt(min:number, max:number): number{
	return Math.floor(lerp(min, max+1, Math.random()));
}

/**
 * Roll a probability check and see if it was successful.
 * @param p P value to test against.
 */
export function probability(p:number): boolean{
	if(p===0) return false;
	if(p===1) return true;
	return Math.random() < p;
};

/**
 * Roll a number of die and get the sum of the results.
 * @param die Number of die to roll.
 * @param sides Number of sides per die.
 */
export function roll(die:number, sides:number): number;
/**
 * Roll a number of die and get the sum of the results.
 * @param die Number of die to roll.
 * @param sides Number of sides per die.
 * @param mod Number to add to the result.
 */
export function roll(die:number, sides:number, mod:number): number;
export function roll(die:number, sides:number, mod?:number): number{
	if(mod) return rangeInt(die,sides*die)+mod;
	return rangeInt(die,sides*die);
}

/**
 * Roll a number of die and get the sum of the results.<br/>
 * The format of the string corresponds with the exact format of {@link roll}.
 * @param str A string in the format of `1d2[+-]3`
 */
export function rollString(str:string): number{
	let result = str.match(/(\d+)d(\d+)(?:([-+])(\d+))?/);
	if(!result) return 0;
	let die: number = Number(result[1]);
	let sides: number = Number(result[2]);
	let mod: number = Number(result[4]);
	if(!mod) mod = 0;
	if(result[3]==="-") mod = 0-mod;
	return rangeInt(die,sides*die)+mod;
}
