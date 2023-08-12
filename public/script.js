// pass the path you want to call
const socket = io('/room');

// send an event to the room
// last parameter is user id, hardcoded to test 
socket.emit("join-room", roomId, 10);

socket.on("user-connected", userId => {
  console.log("user connected " + userId)
})