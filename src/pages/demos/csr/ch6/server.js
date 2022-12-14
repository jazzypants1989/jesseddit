const express = require("express")

app = express()

app.use(express.static("public"))

app.get("*", function (req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.listen(3000, function () {
  console.log("Ctrl-Click here to test: http://localhost:3000")
})
