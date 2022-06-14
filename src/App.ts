import {App} from '@slack/bolt'
import dotenv from 'dotenv'
import {create_pr_command} from "./command/create_pr";
import {create_pr_submit} from "./view/create_pr";
import {finish_work_command} from "./command/finish_work";
import {finish_work_submit} from "./view/finish_work";

const config = dotenv.config().parsed

for (const k in config) {
    process.env[k] = config[k];
}

// ボットトークンと Signing Secret を使ってアプリを初期化します
export const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    // ソケットモードではポートをリッスンしませんが、アプリを OAuth フローに対応させる場合、
    // 何らかのポートをリッスンする必要があります
    port: 8000
});

create_pr_command();
create_pr_submit();
finish_work_command();
finish_work_submit();

(async () => {
    // アプリを起動します
    await app.start();

    console.log('⚡️ Bolt app is running!');
})();
