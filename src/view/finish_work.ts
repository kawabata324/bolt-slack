import {app} from '../App'

export const finish_work_submit = () => {
    app.view("finish_work", async ({ack, view, body, client}) => {
        await ack();

        const weekday =
            view["state"]["values"]["static_select"]["weekday"]["selected_option"]!["value"]

        const finishWorkMessage = `お疲れ様です！
本日の作業が終了したので　https://github.com/timelab2018/toro/issues/1055 にコメントしました。また、${weekday}よろしくお願いします`

        try {
            await client.chat.postMessage({
                channel: 'C03K9QCE68K',
                text: finishWorkMessage
            });
        } catch (error) {
            console.error(error);
        }

    });
}