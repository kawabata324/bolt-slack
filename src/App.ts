import {App, AppRateLimitedEvent} from '@slack/bolt'
import dotenv from 'dotenv'
import {create_pr_command} from "./command/create_pr";
import {create_pr_submit} from "./view/create_pr";

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


// app.command("/finish_work", async ({command, ack, context}) => {
//     await ack()
//
//     const result = await app.client.views.open({
//         token: context.botToken,
//         trigger_id: command.trigger_id,
//         view: {
//             type: "modal",
//             // NOTE: submitからcallback idをとりたい場合はここに定義する
//             callback_id: "finish_work",
//             title: {
//                 type: "plain_text",
//                 text: "仕事の完了",
//                 emoji: true,
//             },
//             submit: {
//                 type: "plain_text",
//                 text: "送信する",
//                 emoji: true,
//             },
//             close: {
//                 type: "plain_text",
//                 text: "キャンセル",
//                 emoji: true,
//             },
//             blocks: [
//                 {
//                     type: "divider",
//                 },
//                 {
//                     type: "section",
//                     text: {
//                         type: "plain_text",
//                         text: "何曜日か選択してください",
//                         emoji: true,
//                     },
//                 },
//                 {
//                     type: "input",
//                     block_id: "static_select",
//                     element: {
//                         type: "static_select",
//                         action_id: "weekday",
//                         placeholder: {
//                             type: "plain_text",
//                             text: "Select day",
//                             emoji: true
//                         },
//                         options: [
//                             {
//                                 text: {
//                                     type: "plain_text",
//                                     text: "月曜日",
//                                     emoji: true
//                                 },
//                                 value: "monday"
//                             },
//                             {
//                                 text: {
//                                     type: "plain_text",
//                                     text: "火曜日",
//                                     emoji: true
//                                 },
//                                 value: "tuesday"
//                             },
//                             {
//                                 text: {
//                                     type: "plain_text",
//                                     text: "木曜日",
//                                     emoji: true
//                                 },
//                                 value: "thursday"
//                             }
//                         ],
//                     },
//                     label: {
//                         type: "plain_text",
//                         text: "曜日",
//                         emoji: true
//                     }
//                 },
//             ],
//         },
//     })
// })


create_pr_command();
create_pr_submit();
(async () => {
    // アプリを起動します
    await app.start();

    console.log('⚡️ Bolt app is running!');
})();
