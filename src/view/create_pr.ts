import {app} from '../App'

export const create_pr_submit = () => {
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
}