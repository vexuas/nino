import { CacheType, Interaction } from 'discord.js';
import { sendCommandEvent } from '../../services/analytics';
import { sendErrorLog } from '../../utils/helpers';
import { EventModule } from '../events';

export default function ({ app, appCommands, mixpanel }: EventModule) {
  app.on('interactionCreate', async (interaction: Interaction<CacheType>) => {
    try {
      if (!interaction.inGuild() || !appCommands) return;

      if (interaction.isCommand()) {
        await interaction.deferReply();
        const { commandName } = interaction;
        const command = appCommands.find((command) => command.data.name === commandName);
        command && (await command.execute({ interaction, app, appCommands }));
        mixpanel &&
          sendCommandEvent({
            user: interaction.user,
            channel: interaction.channel,
            guild: interaction.guild,
            command: commandName,
            client: mixpanel,
          });
      }
      //Maybe add buttons, selections and modal handlers here eventually
    } catch (error) {
      sendErrorLog({ error });
    }
  });
}
