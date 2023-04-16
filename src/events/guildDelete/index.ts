import { Guild, WebhookClient } from 'discord.js';
import { isEmpty } from 'lodash';
import { GUILD_NOTIFICATION_WEBHOOK_URL, USE_DATABASE } from '../../config/environment';
import { deleteGuild } from '../../services/database';
import { sendErrorLog, serverNotificationEmbed } from '../../utils/helpers';
import { EventModule } from '../events';

export default function ({ app }: EventModule) {
  app.on('guildDelete', async (guild: Guild) => {
    try {
      USE_DATABASE && (await deleteGuild(guild));
      if (GUILD_NOTIFICATION_WEBHOOK_URL && !isEmpty(GUILD_NOTIFICATION_WEBHOOK_URL)) {
        const embed = await serverNotificationEmbed({ app, guild, type: 'leave' });
        const notificationWebhook = new WebhookClient({ url: GUILD_NOTIFICATION_WEBHOOK_URL });
        await notificationWebhook.send({
          embeds: [embed],
          username: 'My App Server Notification',
          avatarURL: '',
        });
      }
    } catch (error) {
      sendErrorLog({ error });
    }
  });
}
