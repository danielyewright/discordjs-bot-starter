import {} from 'dotenv/config';
import { REST, Routes } from 'discord.js';

const { BOT_TOKEN: token, CLIENT_ID: clientId, GUILD_ID: guildId } = process.env;
const rest = new REST().setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
  .then(() => console.log('Successfully deleted all guild commands.'))
  .catch(console.error);
