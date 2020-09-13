export function lerp(min:number, max:number, mod:number): number{
	return min+((max-min)*mod);
}

export function rangeInt(min:number, max:number): number{
	return Math.floor(lerp(min, max+1, Math.random()));
}

export function probability(p:number): boolean{
	if(p===0) return false;
	if(p===1) return true;
	return Math.random() < p;
};

export function roll(die:number, sides:number): number;
export function roll(die:number, sides:number, mod:number): number;
export function roll(die:number, sides:number, mod?:number): number{
	if(mod) return rangeInt(die,sides*die)+mod;
	return rangeInt(die,sides*die);
}

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