export function pick(...options: any[]): any{
	if(options[0] instanceof Array) options = options[0]
	let roll = Math.random();
	let option = Math.floor(roll * options.length);
	return options[option];
}
