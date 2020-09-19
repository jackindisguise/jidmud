import * as events from "events";
import * as net from "net";
import { logger } from "./util/logger";

export interface MUDServer{
	clients: MUDClient[];
	add(client: MUDClient): void;
	remove(client: MUDClient): void;
	emit(event: "join", client: MUDClient): void;
	emit(event: "leave", client: MUDClient): void;
	on(event: "join", listener: (client: MUDClient)=>void): void;
	on(event: "leave", listener: (client: MUDClient)=>void): void;
	once(event: "join", listener: (client: MUDClient)=>void): void;
	once(event: "leave", listener: (client: MUDClient)=>void): void;
}

export interface MUDClient{
	server: MUDServer;
	quit(): void;
	write(data: string): void;
	writeLine(data: string): void;
	emit(event: "end", reason: string): void;
	emit(event: "command", data: string): void;
	on(event: "end", listener: (reason: string)=>void): void;
	on(event: "command", listener: (command: string)=>void): void;
	once(event: "end", listener: (reason: string)=>void): void;
	once(event: "command", listener: (command: string)=>void): void;
}

export class TelnetServer implements MUDServer{
	socket?: net.Server;
	emitter: events.EventEmitter = new events.EventEmitter();
	clients: MUDClient[] = [];
	open(port: number, success: (...args: any[])=>void){
		let server = this;
		let socket = new net.Server();
		this.socket = socket;
		socket.listen(port, function(){
			socket.on("connection", function(socket: net.Socket){
				socket.setEncoding("ascii");
				socket.setTimeout(60000);
				let client = new TelnetClient({socket: socket, server:server})
				server.add(client);
				client.once("end", function(reason: string){
					server.remove(client);
				});
			});
			success();
		});
	}

	add(client: MUDClient){
		if(this.clients.indexOf(client) !== -1) return;
		this.clients.push(client);
		this.emit("join", client);
	}

	remove(client: MUDClient){
		let pos = this.clients.indexOf(client);
		if(pos === -1) return;
		this.clients.splice(pos,1);
		this.emit("leave", client);
	}

	emit(event: "join", client: MUDClient): void;
	emit(event: "leave", client: MUDClient): void;
	emit(event: string, ...args: any[]): void{
		this.emitter.emit(event, ...args);
	}
	
	on(event: "join", listener: (client: MUDClient)=>void): void;
	on(event: "leave", listener: (client: MUDClient)=>void): void;
	on(event: string, listener: (...args: any[])=>void): void{
		this.emitter.on(event, listener);
	}

	once(event: "join", listener: (client: MUDClient)=>void): void;
	once(event: "leave", listener: (client: MUDClient)=>void): void;
	once(event: string, listener: (...args: any[])=>void): void{
		this.emitter.once(event, listener);
	}
}

export type TelnetClientOptions = {
	socket: net.Socket;
	server: TelnetServer;
}

export class TelnetClient implements MUDClient{
	emitter: events.EventEmitter = new events.EventEmitter();
	socket: net.Socket;
	server: MUDServer;
	constructor(options: TelnetClientOptions){
		let client = this;
		this.socket = options.socket;
		this.server = options.server;
		this.socket.on("timeout", function(error:boolean){
			client.quit();
		});

		this.socket.on("end", function(){ // only called when the client closes the connection (I think)
			client.emit("end", "socket:end");
		});

		this.socket.on("close", function(error:boolean){ // called whenever the socket is closed by any means
			client.emit("end", "socket:close")
		});

		this.socket.on("data", function(data: string){
			// preprocess data if necessary
			let commands = data.split("\r\n");
			let last = commands.pop();
			for(let line of commands) client.emit("command", line);
		});
	}

	toString(): string{
		let address: string|net.AddressInfo = this.socket.address();
		if(typeof address === "object") return `client@${address.address}`;
		return `client@${address}`;
	}

	quit(){
		if(this.socket.writable) this.socket.destroy();
	}

	write(data: string){
		if(this.socket.writable) this.socket.write(data);
	}

	writeLine(data: string){
		this.write(data+"\r\n");
	}

	emit(event: "end", reason: string): void;
	emit(event: "command", command:string): void;
	emit(event: string, ...args: any[]): void{
		this.emitter.emit(event, ...args);
	}

	on(event: "end", listener: (reason: string)=>void): void;
	on(event: "command", listener: (command: string)=>void): void;
	on(event: string, listener: (...args: any[])=>void): void{
		this.emitter.on(event, listener);
	}

	once(event: "end", listener: (reason: string)=>void): void;
	once(event: "command", listener: (command: string)=>void): void;
	once(event: string, listener: (...args: any[])=>void): void{
		this.emitter.once(event, listener);
	}
}