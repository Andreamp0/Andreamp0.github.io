const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Un utente si è connesso.");

  socket.on("chat message", (msg) => {
    console.log("Messaggio ricevuto: " + msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Un utente si è disconnesso.");
  });
});

http.listen(3000, () => {
  console.log("Server in ascolto sulla porta 3000");
});
