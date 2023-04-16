import { Client, GatewayIntentBits } from 'discord.js';
import { BOT_TOKEN, MIXPANEL_ID } from './config/environment';
import { registerEventHandlers } from './events/events';
import { sendErrorLog } from './utils/helpers';
import Mixpanel from 'mixpanel';
import { isEmpty } from 'lodash';

const app: Client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const initialize = async (): Promise<void> => {
  try {
    await app.login(BOT_TOKEN);
    const mixpanel = MIXPANEL_ID && !isEmpty(MIXPANEL_ID) ? Mixpanel.init(MIXPANEL_ID) : null;
    registerEventHandlers({ app, mixpanel });
  } catch (error) {
    sendErrorLog({ error });
  }
};

initialize();
