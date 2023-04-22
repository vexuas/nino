import { Guild, WebhookClient } from 'discord.js';
import { isEmpty } from 'lodash';
import { GUILD_NOTIFICATION_WEBHOOK_URL, USE_DATABASE } from '../../config/environment';
import { insertNewGuild } from '../../services/database';
import { sendErrorLog, serverNotificationEmbed } from '../../utils/helpers';
import { EventModule } from '../events';

export default function ({ app }: EventModule) {
  app.on('guildCreate', async (guild: Guild) => {
    try {
      USE_DATABASE && (await insertNewGuild(guild));
      if (GUILD_NOTIFICATION_WEBHOOK_URL && !isEmpty(GUILD_NOTIFICATION_WEBHOOK_URL)) {
        const embed = await serverNotificationEmbed({ app, guild, type: 'join' });
        const notificationWebhook = new WebhookClient({ url: GUILD_NOTIFICATION_WEBHOOK_URL });
        await notificationWebhook.send({
          embeds: [embed],
          username: 'Nino Server Notification',
          avatarURL:
            'https://cdn.discordapp.com/attachments/1097563418237599800/1098660924212117585/nino-waifuim1.png',
        });
      }
    } catch (error) {
      sendErrorLog({ error });
    }
  });
}
