import {} from 'dotenv/config';
import fs from 'node:fs';
import { REST, Routes } from 'discord.js';

const { BOT_TOKEN: token, CLIENT_ID: clientId, GUILD_ID: guildId } = process.env;
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  commands.push(command.create());
}

const rest = new REST().setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
