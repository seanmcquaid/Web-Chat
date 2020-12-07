exports.message = (socket) => {
  socket.on('message', async (response) => {
    console.log(response);
  });
};
