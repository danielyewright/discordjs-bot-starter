const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const logger = require('../logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('event')
    .setDescription('Create a scheduled event'),
  async execute(interaction) {
    await axios({
      method: 'POST',
      url: `https://discord.com/api/guilds/${process.env.GUILD_ID}/scheduled-events`,
      headers: {
        'Authorization': `Bot ${process.env.BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      data: {
        channel_id: null,
        privacy_level: 2,
        entity_type: 3,
        name: 'Test Event 1',
        scheduled_start_time: '2022-11-22T16:30:44+0000',
        scheduled_end_time: '2022-11-22T17:30:44+0000',
        description: 'Lorem ipsum',
        entity_metadata: {
          location: 'at USA',
        },
      },
    }).then(() => {
      return interaction.reply(':white_check_mark: Event created!');
    }).catch(error => {
      console.log(error);
      logger.error(error);
      return interaction.reply(':bangbang: Event could not be created. Please try again :bangbang:');
    });
  },
};
