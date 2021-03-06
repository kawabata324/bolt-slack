const config = require("dotenv").config().parsed;
for (const k in config) {
    process.env[k] = config[k];
}
const {App} = require('@slack/bolt');

// ボットトークンと Signing Secret を使ってアプリを初期化します
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    // ソケットモードではポートをリッスンしませんが、アプリを OAuth フローに対応させる場合、
    // 何らかのポートをリッスンする必要があります
    port: process.env.PORT || 8000
});


app.message('hi', async ({message, say}) => {
    await say(`Hello, <@${message.user}>`);
});

app.event('reaction_added', async ({event, context, logger}) => {
    try {
        const result = await app.client.chat.postMessage({
            channel: 'C0325RRU6GM',
            text: `Welcome to the team, <@${event.user}>! 🎉`,
            post_at: '1654950600'
        });
        logger.info(result)
        // logger.info(result)
    } catch (error) {
        logger.error(error)
    }
});

(async () => {
    // アプリを起動します
    await app.start();

    console.log('⚡️ Bolt app is running!');
})();
