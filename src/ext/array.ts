/**
 * Pick a random item from an array.
 * @param options The array of options to choose from.
 * @returns An item from the given options.
 */
export function pick(options:any[]): any;
/**
 * Pick a random item from the arguments.
 * @param options The arguments to choose from.
 * @returns An item from the given options.
 */
export function pick(...options: any[]): any;
export function pick(...options: any[]): any{
	if(options.length === 1 && options[0] instanceof Array) options = options[0]
	let roll = Math.random();
	let option = Math.floor(roll * options.length);
	return options[option];
}
