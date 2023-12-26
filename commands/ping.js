import { SlashCommandBuilder } from 'discord.js';

const create = () => {
  const command = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');

  return command.toJSON();
};

const invoke = async (interaction) => {
  await interaction.reply({ content: 'Pong!', ephemeral: true });
};

export { create, invoke };
