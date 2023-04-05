import express from "express"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const app = express()

app.use(express.static("public"))

app.get("*", function (req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.listen(3000, function () {
  console.log("Ctrl-Click here to test: http://localhost:3000")
})
