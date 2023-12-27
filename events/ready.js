import fs from 'node:fs';
import { Events, ActivityType } from 'discord.js';

const once = true;
const name = Events.ClientReady;

async function invoke(client) {
  const commands = fs
		.readdirSync('./commands')
		.filter((file) => file.endsWith('.js'))
		.map((file) => file.slice(0, -3));

	const commandsArray = [];

	for (let command of commands) {
		const commandFile = await import(`../commands/${command}.js`);
		commandsArray.push(commandFile.create());
	}

	client.application.commands.set(commandsArray);

	console.log(`Successfully logged in as ${client.user.tag}`);

  client.user.setActivity({
    name: 'economy',
    type: ActivityType.Watching
  });
}

export { once, name, invoke };
