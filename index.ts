import * as io from "./src/io";
import { logger } from "./src/util/logger";

let server = new io.TelnetServer();
server.open(23, function(){
	logger.debug("TelnetServer running on port 23.");
	server.on("join", function(client: io.MUDClient){
		logger.debug(`${client} joined`);
		client.writeLine("Sup dude.");
		client.once("end", function(reason:string){
			logger.debug(`${client} left (${reason})`);
		});
		client.on("command", function(input:string){
			logger.debug(`${client}: ${input}`)
			client.writeLine("Nice message, bro.");
			if(input === "quit"){
				client.quit();
			}
		});
	});
});