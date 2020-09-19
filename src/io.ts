import * as events from "events";
import * as net from "net";

export interface MUDServer{
	clients: MUDClient[];
	add(client: MUDClient): void;
	remove(client: MUDClient): void;
	emit(event: "join", client: MUDClient): void;
	emit(event: "leave", client: MUDClient): void;
	on(event: "join", listener: (client: MUDClient)=>void): void;
	on(event: "leave", listener: (client: MUDClient)=>void): void;
}

export interface MUDClient{
	server: MUDServer;
	emit(event: "end", reason: string): void;
	emit(event: "data", data: string): void;
	on(event: "end", listener: (reason: string)=>void): void;
	on(event: "data", listener: (data: string)=>void): void;
}

export class TelnetServer implements MUDServer{
	socket: net.Server;
	emitter: events.EventEmitter = new events.EventEmitter();
	clients: MUDClient[] = [];
	constructor(){
		let server = this;
		let socket = new net.Server();
		this.socket = socket;
		socket.listen(23, function(){
			socket.on("connection", function(socket: net.Socket){
				let client = new TelnetClient({socket: socket, server:server})
				server.add(client);
				client.on("end", function(reason: string){
					server.remove(client);
				});
			});
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
		this.socket = options.socket;
		this.server = options.server;
	}

	emit(event: "end", reason: string): void;
	emit(event: "data", data: string): void;
	emit(event: string, ...args: any[]): void{
		this.emitter.emit(event, ...args);
	}

	on(event: "end", listener: (reason: string)=>void): void;
	on(event: "data", listener: (data: string)=>void): void;
	on(event: string, listener: (...args: any[])=>void): void{
		this.emitter.on(event, listener);
	}
}