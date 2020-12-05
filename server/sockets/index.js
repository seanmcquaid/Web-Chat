exports.message = (socket) => {
  socket.on('message', (response) => {
    console.log(response);
  });
};
