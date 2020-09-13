import * as winston from "winston";

export const logger: winston.Logger = winston.createLogger({
	transports: [
		new (winston.transports.Console)({
			level: "silly",
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.printf(function(i) { return `[${i.timestamp}] <${i.level}> ${i.message}`; })	
			),
		}),
		new (winston.transports.File)({
			filename: `logs/${Date.now()}.log`,
			level: "silly",
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.printf(function(i) { return `[${i.timestamp}] <${i.level}> ${i.message}`; })	
			),
		})
	]
});