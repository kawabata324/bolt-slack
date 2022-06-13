import {App, AppRateLimitedEvent} from '@slack/bolt'
import dotenv from 'dotenv'
import {sampleBlock} from './Views'

const config = dotenv.config().parsed

for (const k in config) {
    process.env[k] = config[k];
}

// ボットトークンと Signing Secret を使ってアプリを初期化します
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    // ソケットモードではポートをリッスンしませんが、アプリを OAuth フローに対応させる場合、
    // 何らかのポートをリッスンする必要があります
    port: 8000
});

app.command("/create_pr", async ({command, ack, context}) => {
    await ack();

    try {
        const result = await app.client.views.open({
            token: context.botToken,
            trigger_id: command.trigger_id,
            view: {
                type: "modal",
                // NOTE: submitからcallback idをとりたい場合はここに定義する
                callback_id: "submit_modal",
                title: {
                    type: "plain_text",
                    text: "PRのReview依頼するメッセージを作成する",
                    emoji: true,
                },
                submit: {
                    type: "plain_text",
                    text: "送信する",
                    emoji: true,
                },
                close: {
                    type: "plain_text",
                    text: "キャンセル",
                    emoji: true,
                },
                blocks: [
                    {
                        type: "divider",
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "PRの題名とURLを入力してください",
                            emoji: true,
                        },
                    },
                    {
                        type: "input",
                        block_id: "text_input",
                        element: {
                            type: "plain_text_input",
                            action_id: "title"
                        },
                        label: {
                            type: "plain_text",
                            text: "Title",
                            emoji: true
                        }
                    },
                    {
                        type: "input",
                        block_id: "url_input",
                        element: {
                            type: "plain_text_input",
                            action_id: "url",
                        },
                        label: {
                            type: "plain_text",
                            text: "URL",
                            emoji: true,
                        },
                    },
                ],
            },
        });
        console.log(result);
    } catch (error) {
        console.log(error);
    }
});

app.command("/finish_work", async ({command, ack, context}) => {
    await ack()

    const result = await app.client.views.open({
        token: context.botToken,
        trigger_id: command.trigger_id,
        view: {
            type: "modal",
            // NOTE: submitからcallback idをとりたい場合はここに定義する
            callback_id: "finish_work",
            title: {
                type: "plain_text",
                text: "仕事の完了",
                emoji: true,
            },
            submit: {
                type: "plain_text",
                text: "送信する",
                emoji: true,
            },
            close: {
                type: "plain_text",
                text: "キャンセル",
                emoji: true,
            },
            blocks: [
                {
                    type: "divider",
                },
                {
                    type: "section",
                    text: {
                        type: "plain_text",
                        text: "何曜日か選択してください",
                        emoji: true,
                    },
                },
                {
                    type: "input",
                    block_id: "static_select",
                    element: {
                        type: "static_select",
                        action_id: "weekday",
                        placeholder: {
                            type: "plain_text",
                            text: "Select day",
                            emoji: true
                        },
                        options: [
                            {
                                text: {
                                    type: "plain_text",
                                    text: "月曜日",
                                    emoji: true
                                },
                                value: "monday"
                            },
                            {
                                text: {
                                    type: "plain_text",
                                    text: "火曜日",
                                    emoji: true
                                },
                                value: "tuesday"
                            },
                            {
                                text: {
                                    type: "plain_text",
                                    text: "木曜日",
                                    emoji: true
                                },
                                value: "thursday"
                            }
                        ],
                    },
                    label: {
                        type: "plain_text",
                        text: "曜日",
                        emoji: true
                    }
                },
            ],
        },
    })
})


    app.view("submit_modal", async ({ack, view, body, client}) => {
        await ack();

        const url =
            view["state"]["values"]["url_input"]["url"]["value"];
        const title =
            view["state"]["values"]["text_input"]["title"]["value"];


        if (url && title) {
            try {
                await client.chat.postMessage({
                    channel: 'C03K9QCE68K',
                    text: `お疲れさまです！
${title}が一通り完了しましたので、PRを作成しました！
${url}
お手すきの際にご確認とReviewよろしくお願いします！`,
                });
            } catch (error) {
                console.error(error);
            }
        }
    });

    (async () => {
        // アプリを起動します
        await app.start();

        console.log('⚡️ Bolt app is running!');
    })();
