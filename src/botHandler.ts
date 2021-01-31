import {Telegraf, Markup} from 'telegraf';
import makeHandler from "lambda-request-handler";

const token = process.env.BOT_TOKEN
if (token === undefined) {
    throw new Error('BOT_TOKEN must be provided!')
}

const bot = new Telegraf(token, {
    telegram: {webhookReply: true}
})

const keyboard = Markup.inlineKeyboard([
    Markup.button.url('❤️', 'http://telegraf.js.org'),
    Markup.button.callback('Delete', 'delete')
])

bot.start((ctx) => ctx.reply('Hello'))
bot.on("text", (ctx) => {
    ctx.telegram.copyMessage(ctx.message.chat.id, ctx.message.chat.id, ctx.message.message_id, keyboard)
})
bot.action('delete', (ctx) => ctx.deleteMessage())

export const handler = makeHandler(
    bot.webhookCallback(process.env.BOT_HOOK_PATH ?? '/')
)