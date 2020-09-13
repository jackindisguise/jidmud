import * as i18n from "i18n";

// configure i18n
i18n.configure({
    locales:['en', "de"],
	directory: __dirname + '/../locales'
});

export function _(phrase: string, ...args: string[]): string{
	return i18n.__(phrase, ...args);
}
