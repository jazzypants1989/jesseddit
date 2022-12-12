const express = require("express") // import Express

app = express() // Start it up

app.use(express.static("public")) // tell it where our static assets will live.

app.get("*", function (req, res) {
  // THERE CAN ONLY BE ONE (route)!
  res.sendFile(__dirname + "/index.html") // We'll make this file soon.
})

app.listen(3000, function () {
  // the server is now listening for http requests
  console.log("Ctrl-Click here to test: http://localhost:3000")
})
