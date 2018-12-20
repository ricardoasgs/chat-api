const chatController = require("../app/controllers/chatControllerSocket");

module.exports = function(io) {
  // Set socket.io listeners.
  io.on("connection", socket => {
    //console.log("Conectado!!!");
    socket.join("general");

    socket.on("getChats", async userId => {
      const chats = await chatController.getChats(userId);

      // for (let chat of chats) {
      //   socket.join(chat._id, function() {
      //     io.to(chat._id).emit("newMessage", "Connectado ao socket");
      //   });
      // }
      // console.log(socket.rooms);
      socket.emit("chats", chats);
    });

    socket.on("joinChats", chat => {
      //console.log(chat);
      socket.join(chat._id, function() {
        io.to(chat._id).emit("newMessage", "Connectado ao socket");
      });
      console.log(socket.rooms);
    });

    socket.on("newMessage", async (author, user, messages) => {
      //let rooms = Object.keys(socket.rooms);
      //console.log(rooms);
      const message = await chatController.sendMessage(author, user, messages);
      console.log(message);
      io.to(message.conversationId).emit("newMessage", message);
    });

    socket.on("createChat", (author, user, messages) => {
      const message = chatController.sendMessage(author, user, messages);

      io.sockets.in(message.conversationId).emit("newMessage", message);
    });
  });
};
