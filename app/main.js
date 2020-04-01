const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();

let logger;

client.on('ready', () => {
	logger(`Logged in as ${client.user.tag}!`);
	client.user.setPresence({ activity: { name: 'jouw huiswerk', type: 'WATCHING' }, status: 'online' });
});

client.on('message', (msg) => {
	if(msg.author.bot) return;
	if(!msg.guild) return;
	
	if(msg.content.startsWith(config.prefix)) {
		let command = msg.content.substring(config.prefix.length, msg.content.indexOf(' ') !== -1 ? msg.content.indexOf(' ') : msg.content.length);
		let args = msg.content.indexOf(' ') !== -1 ? msg.content.substring(config.prefix.length + command.length + 1).split(' ') : [];
		
		logger(msg.author.tag + ': ' + msg.content);
	}
});

function start(token, log) {
	logger = log;
	client.login(token);
}
function stop() {
	client.user.setPresence({ activity: { name: 'met nieuwe updates', type: 'PLAYING' }, status: 'dnd' });
}
function terminate() {
	client.destroy();
}
module.exports = {
	start: start,
	stop: stop,
	terminate: terminate
}
