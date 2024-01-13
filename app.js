const express = require("express")
const os = require("os")

const app = express()

app.use('/', async (req, res) => {
    const cpus = os.cpus()
    const memory = os.totalmem()
    const uptime = os.uptime()
    console.log(`cpus: ${cpus.length}, memory: ${memory}, uptime: ${uptime}`)
    console.log(`I am sending response from ${os.hostname()}`)
    res.json({message: 'Ok, It works...', hostname: os.hostname(), cpus: cpus.length, memory: memory, uptime: uptime})
})

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '0.0.0.0'
app.listen(PORT, HOST, () => console.log(`🚀 @ http://${HOST}:${PORT}`))