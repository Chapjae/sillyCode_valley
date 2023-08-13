// user's current stream
let localStream;
// other users's stream
let remoteStream;
// creates the initial peer connection, this is the core interface that allows us to connect to other users
let peerConnection;

// setup two stun servers to be passed into the new RTCPeerConnection()
const servers = {
  
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"]
    }
  ]
}

// function that will ask for permission to use user's camera and audio
let init = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: false})

  document.getElementById("user-1").srcObject = localStream
}


let createOffer = async () => {
  peerConnection = new RTCPeerConnection(servers)

  // sets up a connection with other user
  remoteStream = new MediaStream()
  document.getElementById("user-2").srcObject = remoteStream

  // get all audio and video tracks from local stream, loop over them and
  localStream.getTracks().forEach((track) => { 
  // add looped tracks to the peer connection so that peers can hear and see us 
    peerConnection.addTrack(track, localStream)
  });

// listen using an eventlistener for peer tracks so that we can hear / see them
  peerConnection.ontrack = (event) => {
    // very similar functionality as line 34, loop over every track from the peer connection
    event.streams[0].getTracks().forEach((track) => {
    // add the looped tracks to the remoteStream we instantiated/declared on line 30
      remoteStream.addTrack(track)
    })
  }

  // incecandidtate is an event listener that will create an ICE candidate
  peerConnection.onicecandidate = async (event) => {
    if(event.candidate) {
      console.log("new ICE candadite:", event.candidate)
    }
  }
  // each connection has an offer and a connection
  let offer = await peerConnection.createOffer()

  // then we set the local description, once set it will trigger line 49 ICE candidates to make 
  // making requests to the STUN servers, and that will create the ICE candidatese
  await peerConnection.setLocalDescription(offer)

  console.log("offer:", offer)
}

init()