import fs from 'node:fs';
import { Client, Collection, GatewayIntentBits } from 'discord.js';

const { BOT_TOKEN: token } = process.env;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
  ],
});

const events = fs
  .readdirSync('./events')
  .filter(file => file.endsWith('.js'));

for (let event of events) {
  const eventFile = await import(`./events/${event}`);
  
  if (eventFile.once) {
    client.once(eventFile.name, (...args) => eventFile.invoke(...args));
  }
  else {
    client.on(eventFile.name, (...args) => eventFile.invoke(...args));
  }
}

client.login(token);
