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
	singular: string,
	plural: string
}

export namespace DamageWords {
	export const PUNCH: DamageWord = {
		class: DAMAGE_CLASS.PHYSICAL,
		type: DAMAGE_TYPE.BASH,
		singular: "punch",
		plural: "punches"
	}

	export const KICK: DamageWord = {
		class: DAMAGE_CLASS.PHYSICAL,
		type: DAMAGE_TYPE.BASH,
		singular: "kick",
		plural: "kicks"
	}

	export const BITE: DamageWord = {
		class: DAMAGE_CLASS.PHYSICAL,
		type: DAMAGE_TYPE.PIERCE,
		singular: "punch",
		plural: "punches"
	}

	export const STAB: DamageWord = {
		class: DAMAGE_CLASS.PHYSICAL,
		type: DAMAGE_TYPE.PIERCE,
		singular: "stab",
		plural: "stabs"
	}

	export const SLASH: DamageWord = {
		class: DAMAGE_CLASS.PHYSICAL,
		type: DAMAGE_TYPE.SLASH,
		singular: "slash",
		plural: "slashes"
	}

	export const CLUB: DamageWord = {
		class: DAMAGE_CLASS.PHYSICAL,
		type: DAMAGE_TYPE.BASH,
		singular: "club",
		plural: "clubs"
	}

	export const MIND_FLAY: DamageWord = {
		class: DAMAGE_CLASS.MAGICAL,
		type: DAMAGE_TYPE.MAGICAL,
		singular: "mind flay",
		plural: "mind flays"
	}
}