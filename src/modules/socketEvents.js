const chatController = require("../app/controllers/chatControllerSocket");

module.exports = function(io) {
  io.on("connection", socket => {
    socket.join("general");

    socket.on("getChats", async userId => {
      const chats = await chatController.getChats(userId);

      await joinChats(chats);

      socket.emit("chats", chats);
    });

    const joinChats = chats => {
      return new Promise(function(resolve, reject) {
        chats.map(chat => {
          socket.join(chat._id, function() {
            console.log(socket.rooms);
          });
        });
        resolve();
      });
    };

    socket.on("newMessage", async (author, user, messages) => {
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
