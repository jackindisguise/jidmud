export enum DAMAGE_CLASS {
	PHYSICAL,
	MAGICAL
}

export const DamageClassNames = new Map<DAMAGE_CLASS, string>([
	[DAMAGE_CLASS.PHYSICAL, "physical"],
	[DAMAGE_CLASS.MAGICAL, "magical"]
]);

export enum DAMAGE_TYPE {
	PIERCE,
	SLASH,
	BASH,
	MAGICAL,
	FLAME,
	FROST,
	ELECTRIFY,
	VORPAL
}

export const DamageTypeNames = new Map<DAMAGE_TYPE, string>([
	[DAMAGE_TYPE.PIERCE, "pierce"],
	[DAMAGE_TYPE.SLASH, "slash"],
	[DAMAGE_TYPE.BASH, "bash"],
	[DAMAGE_TYPE.MAGICAL, "magical"],
	[DAMAGE_TYPE.FLAME, "flame"],
	[DAMAGE_TYPE.FROST, "frost"],
	[DAMAGE_TYPE.ELECTRIFY, "electrify"],
	[DAMAGE_TYPE.VORPAL, "vorpal"],
]);

export type DamageWord = {
	class: DAMAGE_CLASS,
	type: DAMAGE_TYPE,
	first: string, // first person verb
	third: string // third person verb
}

export namespace DamageWords {
	export const PUNCH: DamageWord = {
		class: DAMAGE_CLASS.PHYSICAL,
		type: DAMAGE_TYPE.BASH,
		first: "punch",
		third: "punches"
	}

	export const KICK: DamageWord = {
		class: DAMAGE_CLASS.PHYSICAL,
		type: DAMAGE_TYPE.BASH,
		first: "kick",
		third: "kicks"
	}

	export const BITE: DamageWord = {
		class: DAMAGE_CLASS.PHYSICAL,
		type: DAMAGE_TYPE.PIERCE,
		first: "punch",
		third: "punches"
	}

	export const STAB: DamageWord = {
		class: DAMAGE_CLASS.PHYSICAL,
		type: DAMAGE_TYPE.PIERCE,
		first: "stab",
		third: "stabs"
	}

	export const SLASH: DamageWord = {
		class: DAMAGE_CLASS.PHYSICAL,
		type: DAMAGE_TYPE.SLASH,
		first: "slash",
		third: "slashes"
	}

	export const CLUB: DamageWord = {
		class: DAMAGE_CLASS.PHYSICAL,
		type: DAMAGE_TYPE.BASH,
		first: "club",
		third: "clubs"
	}
}