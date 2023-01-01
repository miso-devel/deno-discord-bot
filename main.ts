import { CreateSlashApplicationCommand, startBot } from './deps.ts';
import { Secret } from './secret.ts';
import { Bot } from './libs/discord.ts';

const nekoCommand: CreateSlashApplicationCommand = {
  name: 'neko',
  description: 'にゃーんと返します',
};

await Bot.helpers.createGuildApplicationCommand(nekoCommand, Secret.GUILD_ID);
await Bot.helpers.upsertGuildApplicationCommands(Secret.GUILD_ID, [
  nekoCommand,
]);

Bot.events.messageCreate = async (b, message) => {
  if (message.content === `!neko`) {
    const f = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err.json();
      });
    b.helpers.sendMessage(message.channelId, {
      content: `にゃーん！！！！！ ${message.content} ${f.title}`,
    });
  }
};

Bot.events.interactionCreate = (b, interaction) => {
  if (interaction.channelId) {
    b.helpers.sendMessage(interaction.channelId, {
      content: 'スラッシュコマンドの結果です',
    });
  }
};

await startBot(Bot);
