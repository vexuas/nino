import {
  APIEmbed,
  Channel,
  Client,
  CommandInteraction,
  Guild,
  GuildChannel,
  inlineCode,
  WebhookClient,
} from 'discord.js';
import { capitalize, isEmpty } from 'lodash';
import {
  BOOT_NOTIFICATION_CHANNEL_ID,
  ERROR_NOTIFICATION_WEBHOOK_URL,
} from '../config/environment';
import { v4 as uuid } from 'uuid';

export const serverNotificationEmbed = async ({
  app,
  guild,
  type,
}: {
  app: Client;
  guild: Guild;
  type: 'join' | 'leave';
}): Promise<APIEmbed> => {
  const defaultIcon =
    'https://cdn.discordapp.com/attachments/248430185463021569/614789995596742656/Wallpaper2.png';
  const guildIcon = guild.icon && guild.iconURL();
  const guildOwner =
    type === 'join'
      ? await guild.members.fetch(guild.ownerId).then((guildMember) => guildMember.user.tag)
      : '-';

  const embed = {
    title: type === 'join' ? 'Joined a new server' : 'Left a server',
    description: `I'm now in **${app.guilds.cache.size}** servers!`,
    color: type === 'join' ? 55296 : 16711680,
    thumbnail: {
      url: guildIcon ? guildIcon.replace(/jpeg|jpg/gi, 'png') : defaultIcon,
    },
    fields: [
      {
        name: 'Name',
        value: guild.name,
        inline: true,
      },
      {
        name: 'Owner',
        value: guildOwner,
        inline: true,
      },
      {
        name: 'Members',
        value: guild.memberCount.toString(),
        inline: true,
      },
    ],
  };
  return embed;
};

export const sendErrorLog = async ({
  error,
  interaction,
}: {
  error: any;
  interaction?: CommandInteraction;
}) => {
  console.error(error);
  const errorID = uuid();
  if (interaction) {
    const errorEmbed = {
      description: `Oops something went wrong! D:\n\nError: ${
        error.message ? inlineCode(error.message) : inlineCode('Unexpected Error')
      }\nError ID: ${inlineCode(errorID)}`,
      color: 16711680,
    };
    await interaction.editReply({ embeds: [errorEmbed] });
  }
  if (ERROR_NOTIFICATION_WEBHOOK_URL && !isEmpty(ERROR_NOTIFICATION_WEBHOOK_URL)) {
    const interactionChannel = interaction?.channel as GuildChannel | undefined;
    const notificationEmbed: APIEmbed = {
      title: interaction ? `Error | ${capitalize(interaction.commandName)} Command` : 'Error',
      color: 16711680,
      description: `uuid: ${errorID}\nError: ${error.message ? error.message : 'Unexpected Error'}`,
      fields: interaction
        ? [
            {
              name: 'User',
              value: interaction.user.username,
              inline: true,
            },
            {
              name: 'User ID',
              value: interaction.user.id,
              inline: true,
            },
            {
              name: 'Channel',
              value: interactionChannel ? interactionChannel.name : '-',
              inline: true,
            },
            {
              name: 'Channel ID',
              value: interaction.channelId,
              inline: true,
            },
            {
              name: 'Guild',
              value: interaction.guild ? interaction.guild.name : '-',
              inline: true,
            },
            {
              name: 'Guild ID',
              value: interaction.guildId ? interaction.guildId : '-',
              inline: true,
            },
          ]
        : undefined,
    };
    const notificationWebhook = new WebhookClient({ url: ERROR_NOTIFICATION_WEBHOOK_URL });
    await notificationWebhook.send({
      embeds: [notificationEmbed],
      username: 'Nino Error Notification',
      avatarURL:
        'https://cdn.discordapp.com/attachments/1097563418237599800/1098660924212117585/nino-waifuim1.png',
    });
  }
};

export const sendBootNotification = async (app: Client) => {
  console.log("I'm booting up! (◕ᴗ◕✿)");
  const bootNotificationChannel: Channel | undefined =
    BOOT_NOTIFICATION_CHANNEL_ID && !isEmpty(BOOT_NOTIFICATION_CHANNEL_ID)
      ? app.channels.cache.get(BOOT_NOTIFICATION_CHANNEL_ID)
      : undefined;
  bootNotificationChannel &&
    bootNotificationChannel.isTextBased() &&
    (await bootNotificationChannel.send("I'm booting up! (◕ᴗ◕✿)"));
};
