const express = require('express')
const cors = require('cors')
const connection = require('./config/database')
const usersRoutes = require("./routes/users")
const app = express()
const path = require('path')

app.use(cors())
app.use(express.json())
app.use("/api/users" , usersRoutes)

app.use(express.static(path.join(__dirname , 'public')))

const myDB = "myDB"
const url = `mongodb://localhost:27017/${myDB}`
connection(url)

module.exports = app