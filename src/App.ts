import { Client, GatewayIntentBits } from 'discord.js';
import { BOT_TOKEN, MIXPANEL_ID, FLAGSMITH_KEY } from './config/environment';
import { registerEventHandlers } from './events/events';
import { sendErrorLog } from './utils/helpers';
import Mixpanel from 'mixpanel';
import { isEmpty } from 'lodash';
import Flagsmith from 'flagsmith-nodejs';

const app: Client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const initialize = async (): Promise<void> => {
  try {
    await app.login(BOT_TOKEN);
    const mixpanel = MIXPANEL_ID && !isEmpty(MIXPANEL_ID) ? Mixpanel.init(MIXPANEL_ID) : null;
    const flagsmith =
      FLAGSMITH_KEY && !isEmpty(FLAGSMITH_KEY)
        ? new Flagsmith({
            environmentKey: FLAGSMITH_KEY,
            defaultFlagHandler: () => {
              return { enabled: false, isDefault: true, value: undefined };
            },
          })
        : null;
    registerEventHandlers({ app, mixpanel, flagsmith });
  } catch (error) {
    sendErrorLog({ error });
  }
};

initialize();
