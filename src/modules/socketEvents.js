const chatController = require("../app/controllers/chatControllerSocket");

module.exports = function(io) {
  // Set socket.io listeners.
  io.on("connection", socket => {
    console.log("a user connected");

    socket.on("getChats", async userId => {
      const chats = await chatController.getChats(userId);

      socket.emit("chats", chats);

      //socket.join em todas as salas(id)?
      for (chat in chats) {
        socket.join(chat._id);
      }
    });

    socket.on("newMessage", (author, user, messages) => {
      const message = chatController.sendMessage(author, user, messages);

      io.in(message.conversationId).emit("message created", message.messages);
    });

    socket.on("createChat", (author, user, messages) => {
      const message = chatController.sendMessage(author, user, messages);

      io.in(message.conversationId).emit("message created", message.messages);
    });
  });
};
