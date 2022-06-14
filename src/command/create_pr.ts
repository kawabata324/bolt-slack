import {app} from '../App'

export const create_pr_command = () => {
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
    })
}