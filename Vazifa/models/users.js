const {Schema, model} = require("mongoose")

const UserSchema = Schema({
    telegramId: String,
    first_name: String,
    phone: String,
    userLanguage: String,
    isPremium: Boolean,
})

const Users = model("Tg_Users", UserSchema)

module.exports = Users
