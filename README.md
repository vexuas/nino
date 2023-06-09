<div align="center">
  <img src="https://cdn.discordapp.com/attachments/1097563418237599800/1098660924212117585/nino-waifuim1.png" width=240px/>
</div>

# nino | v0.3.0 <br>Random Anime Image App for Discord

Discord bot that provides an easy way to get anime images and gifs randomly! This project stemmed from me testing how quickly I can get a new Discord app up and running using my [bot template](https://github.com/vexuas/djs-typescript-template). It was so fast (roughly just under a week) in fact that I added way more features out of scope of me initially only wanting to get waifus.

That being said, I had quite a bit of fun with this even if it just was a test run. There were a bunch of really cool anime projects out there when I was trying to look for APIs to retrieve the images. I couldn't settle for just one so I ended up using these 3 super cool and awesome APIs!

- [OtakuGifs](https://otakugifs.xyz) - High quality gifs in a huge collection to choose from. Pretty straighforward endpoints too
- [NekosAPI](https://nekos-api.vercel.app) - Diverse categories with so much metadata of images. Most advanced of the endpoints I've seen out of the 3, I see its v2 is trying to move to json-api specs so that's pretty neat.
- [Waifu.im](https://www.waifu.im) - Possibly the best waifu resource out there, just top tier waifu images all round and an easy-to-use interface. Great sus collections too if you're into that :shrug:

<div align="left">
  <img src="https://user-images.githubusercontent.com/42207245/233799276-4787ba05-e759-404b-933b-f0e35df6b8d6.png" width=350  />
  <img src="https://user-images.githubusercontent.com/42207245/233799344-1a7c2a29-4265-45ae-b76c-7bb3d7ef9d0a.png" width=450  />
</div>
<div align="center"> 
  <img src="https://user-images.githubusercontent.com/42207245/233800078-34e893f9-5a54-4893-9848-737613fd7c72.gif" width=600 />
</div>

## Command List

Nino uses Discord's Slash Commands `/`:

- `image` - shows a random anime image
- `gif` - shows a random anime gif
- `waifu` - shows a random waifu image
- `about` - information hub of Nino
- `help` - list of commands
- `about` - generates Nino's invite link

## Prerequisites

You would need the following before getting started:

- Have a Discord Application created from the Discord Dev Portal
- Node with a version of at least v16.13.0
- Yarn

## Installation

1. Clone this repository and then change directory into it
   - `git clone git@github.com:vexuas/nino.git`
   - `cd nino`
2. Install dependencies
   - `yarn install`
3. Add required environment variables
   - This project needs the following core environment variables to properly work
     - `ENV`
     - `BOT_TOKEN`
     - `BOT_ID`
     - `GUILD_IDS`
   - Create a `environment.ts` file under `src/config`
     - `mkdir src/config && touch src/config/environment.ts`
   - Export the relevant variables above
     - ```
        export const ENV = 'dev';
        export const BOT_TOKEN = 'Your Discord Bot Token';
        export const BOT_ID = 'Your Discord Bot ID';
        export const GUILD_IDS = 'The Discord Server ID you want the bot to register Slash Commands in'
       ```
4. Add database configuration
   - This project uses a PostGreSQL database to store Discord Guild information.
   - If you don't particularly care about any of that, delete `src/database.ts` and any instances of `USE_DATABASES`
   - Else, create a `database.ts` file under `src/config` and export a `databaseConfig` variable
     - ```
       //Fill these up with your db credentials
        export const databaseConfig = {
           database: '',
           host: '',
           user: '',
           port: 1234,
           password: '',
           ssl: {
             rejectUnauthorized: false,
           },
        };
       ```
5. Start the App
   - `yarn start`

TODO: Add better instructions and usage examples after finishing up the readme of djs-typescript-template
