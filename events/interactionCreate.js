import { Events } from 'discord.js';

const once = false;
const name = Events.InteractionCreate;

async function invoke(interaction) {
  if (!interaction.isChatInputCommand()) return;

  try {
    (await import(`../commands/${interaction.commandName}.js`)).invoke(interaction);
  } catch (error) {
    console.error(`Error executing ${interaction.commandName}`);
    console.error(error);
  }
}

export { once, name, invoke };
