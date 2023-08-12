// pass the path you want to call
const socket = io('/room');
const videoGrid = document.getElementById("video-grid")
const myPeer = new Peer(undefined, {
  host: "/room",
  port: "3001"
});

const myVideo = document.createElement('video')
myVideo.muted = true

navigator.mediaDevices.getUserMedia({
  video:true, 
  audio:true
}).then(stream => {
  addVideoStream(myVideo, stream)
} )
// send an event to the room
// last parameter is user id, hardcoded to test 
myPeer.on("open", id => {
  socket.emit("join-room", roomId, id)
})


socket.on("user-connected", userId => {
  console.log("user connected " + userId)
})

function addVideoStream(video, stream) {
  video.srcOrbject= stream
  video.addEventListener("laodedmetadata", () => {
    video.play()
  })
  videoGrid.append(video)
}