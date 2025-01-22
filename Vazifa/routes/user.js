const {Telegraf} = require("telegraf")
const Users = require("./../models/users.js")
const { request } = require("http")
require("dotenv").config()

const {Prod, prod} = require("./products.js")

fetch("https://6764223a52b2a7619f5b899a.mockapi.io/Coutry")
    .then((res) => res.json())
    .then((res) => prod(res))
    .catch((err) => console.error("Xatolik yuz berdi:", err));


let token = process.env.TOKEN
let chatId = process.env.CHAT
let my_id = process.env.MY_ID

let tg_bot = new Telegraf(token)

tg_bot.start(async (ctx)=>{
    
    let find = await Users.findOne({telegramId: ctx.from.id})

    if (!find) {
        ctx.reply("Xush kelibsz😊")

    }else{
        ctx.reply("Yana bir bor xush kelibsz😊")
    }

    let userChats = await ctx.telegram.getChatMember(chatId, ctx.from.id)
    let exists = ["member", "adminstrator", "creator"].includes(userChats.status)

    if (exists) {
        ctx.reply("Iltimos telefon raqamingizni kriting...",
            {reply_markup: {
            keyboard: [[{text: "📞Phone", request_contact: true}]],
            resize_keyboard: true,
            one_time_keyboard: true
        }})

        tg_bot.on("contact", async (ctx)=>{
            let find = await Users.findOne({telegramId: ctx.from.id})
            try {
                
        
                if (!find) {
                    const user = new Users({
                        telegramId: ctx.from.id,
                        first_name: ctx.from.first_name,
                        phone: ctx.message.contact.phone_number,
                        userLanguage: ctx.from.language_code,
                        isPremium: ctx.from.is_premium,
                    })
            
                    await user.save()
        
                    
                }
                
            } catch (error) {
            }
            ctx.reply("Ajoyib endi Tillardan bittasini tanlang😊",
                {reply_markup: {
                keyboard: [[{text: "/tanlash", callback_data: "Tanlash"}]],
                resize_keyboard: true,
                one_time_keyboard: true
            }})
        })
        
        await tg_bot.command("tanlash", (ctx)=>{
            ctx.reply("Bittasini tanlang",{
                reply_markup: {
                    inline_keyboard: [
                        [
                        { text: "UZB", callback_data: "UZB" },
                        { text: "RUS", callback_data: "RUS" },
                        { text: "ENG", callback_data: "ENG" },
                        ],
                    ],
                    },
                })
        })
        
        tg_bot.action(["UZB", "RUS", "ENG"], async (ctx) => {
            const language = ctx.match;
        
            await ctx.editMessageText(`Siz ${language} tilini tanladingiz!`, {
                reply_markup: null, 
            });


            ctx.reply("Pastdagi tugmalardan birini tanlang👇.",
                {reply_markup: {
                keyboard: [
                    [
                        {text: "Userlarni ko'rish", callback_data: "Userlarni ko'rish"},
                        {text: "Produktalar", callback_data: "Produktalar"}
                    ]
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }})

            tg_bot.on('text', async (ctx) => {
                if (ctx.message.text === "Userlarni ko'rish") {
                    console.log(ctx.from.id);

                    if (ctx.from.id == my_id) {
                        console.log(true);
                        let all = await Users.find()
                        ctx.reply(all)
                        
                    }else{
                        ctx.reply("Siz admin emassiz")
                        console.log(false);
                    }
                    
    

                } else if (ctx.message.text === "Produktalar") {
                    ctx.reply(JSON.stringify(Prod));
                }
            });
        });
        
    }else{
        ctx.reply("Obuna bo'ling", {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'join', url: 'https://t.me/Saidkamol_Saymamutov' }
                    ]
                    ]
            }
        })
    }

    
})








module.exports = tg_bot