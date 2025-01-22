const ConnectDb = require("./config/db.js")
const RouteUser = require("./routes/user.js")

ConnectDb()

RouteUser.launch()