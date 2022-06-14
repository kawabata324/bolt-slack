import {app} from '../App'

export const finish_work_command = () => {
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
                                    value: "火曜日"
                                },
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "火曜日",
                                        emoji: true
                                    },
                                    value: "水曜日"
                                },
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "木曜日",
                                        emoji: true
                                    },
                                    value: "月曜日"
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
}
