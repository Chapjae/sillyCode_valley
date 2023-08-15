let preview = document.getElementById("localVideo");
let recording = document.getElementById("recording");
let startButton = document.getElementById("startButton");
let stopButton = document.getElementById("stopButton");
let downloadButton = document.getElementById("downloadButton");
let logElement = document.getElementById("log");
let randomPrompt = document.getElementById("improvPrompt")

document.getElementById("prompt").addEventListener("click", function(){
 const events = ["Ordering a pizza", "Giving an inspirational speech", "Reviewing a movie", "Hosting a nature show", "Running from a wild animal", 
                "Anchoring for evening news","Officiating a funeral", "Looking for a bathroom", "Singing a song", "Floating in space", "Hosting a cooking show", "Officiating a wedding", 
                "Doing a pre-fight interview", "Programming your second project", "Selling a used car", "Returning clothes that are too small"]
  const characters = ["Foghorn Leghorn", "Gollum", "Bernie Sanders", "An Auctioneer", "Arnold Schwarzenagger", "Kermit the Frog", "Jim Carey", "Hank Hill", "A knight", "Mike Tyson", "A waiter", "Count Dracula",
                "Dr. Evil", "Austin Powers", " A radio DJ", "Ruby Rhod", "Sylvester Stallone", "Batman", "A snooty person", "A news anchor", "A priest"]

  let randomEvent = events[Math.floor(Math.random() * events.length)]
  let randomCharacter = characters[Math.floor(Math.random() * characters.length)]

  randomPrompt.textContent = `You are: ${randomCharacter} and you are: ${randomEvent}`
})

let recordingTimeMS = 10000;
var myWidget = cloudinary.createUploadWidget({
  cloudName: 'dxxawmgby', 
  uploadPreset: 'ml_default'}, async (error, result) => { 
    if (!error && result && result.event === "success") { 
      console.log('Done! Here is the image info: ', result.info);
      const url = result.info.url 
      const uploadedVideo = await fetch('/api/videos', {
        method: 'POST',
        body: JSON.stringify({ link: url }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(uploadedVideo)
    }
  }
)

document.getElementById("upload_widget").addEventListener("click", function(){
  console.log("widget")
    myWidget.open();
  }, false);

function log(msg) {
  logElement.innerHTML += `${msg}\n`;
}

function wait(delayInMS) {
  return new Promise((resolve) => setTimeout(resolve, delayInMS));
}

function startRecording(stream, lengthInMS) {
  let recorder = new MediaRecorder(stream);
  let data = [];

  recorder.ondataavailable = (event) => data.push(event.data);
  recorder.start();
  console.log(`${recorder.state} for ${lengthInMS / 1000} seconds…`);

  let stopped = new Promise((resolve, reject) => {
    recorder.onstop = resolve;
    recorder.onerror = (event) => reject(event.name);
  });

  let recorded = wait(lengthInMS).then(() => {
    if (recorder.state === "recording") {
      recorder.stop();
    }
  });

  return Promise.all([stopped, recorded]).then(() => data);
}

function stop(stream) {
  stream.getTracks().forEach((track) => track.stop());
}

startButton.addEventListener(
  "click",
  () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        preview.srcObject = stream;
        downloadButton.href = stream;
        preview.captureStream =
          preview.captureStream || preview.mozCaptureStream;
        return new Promise((resolve) => (preview.onplaying = resolve));
      })
      .then(() => startRecording(preview.captureStream(), recordingTimeMS))
      .then((recordedChunks) => {
        let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
        console.log(recording)
        recording.src = URL.createObjectURL(recordedBlob);
        downloadButton.href = recording.src;
        downloadButton.download = "RecordedVideo.webm";

        console.log(
          `Successfully recorded ${recordedBlob.size} bytes of ${recordedBlob.type} media.`,
        );
      })
      .catch((error) => {
        if (error.name === "NotFoundError") {
          console.log("Camera or microphone not found. Can't record.");
        } else {
          console.log(error);
        }
      });
  },
  false,
);

stopButton.addEventListener(
  "click",
  () => {
    stop(preview.srcObject);
  },
  false,
);


// const canvas = document.querySelector("canvas");

// // Optional frames per second argument.
// const stream = canvas.captureStream(25);
// const recordedChunks = [];

// console.log(stream);
// const options = { mimeType: "video/webm; codecs=vp9" };
// const mediaRecorder = new MediaRecorder(stream, options);

// mediaRecorder.ondataavailable = handleDataAvailable;
// mediaRecorder.start();

// function handleDataAvailable(event) {
//   console.log("data-available");
//   if (event.data.size > 0) {
//     recordedChunks.push(event.data);
//     console.log(recordedChunks);
//     download();
//   } else {
//     // …
//   }
// }
// function download() {
//   const blob = new Blob(recordedChunks, {
//     type: "video/webm",
//   });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   document.body.appendChild(a);
//   a.style = "display: none";
//   a.href = url;
//   a.download = "test.webm";
//   a.click();
//   window.URL.revokeObjectURL(url);
// }

// // demo: to download after 9sec
// setTimeout((event) => {
//   console.log("stopping");
//   mediaRecorder.stop();
// }, 9000);


// user's current stream
// let localStream;
// // other users's stream
// let remoteStream;
// // creates the initial peer connection, this is the core interface that allows us to connect to other users
// let peerConnection;

// // setup two stun servers to be passed into the new RTCPeerConnection()
// const servers = {
  
//   iceServers: [
//     {
//       urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"]
//     }
//   ]
// }

// function that will ask for permission to use user's camera and audio
// let init = async () => {
//   localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: false})

//   document.getElementById("user-1").srcObject = localStream
// }


// let createOffer = async () => {
//   peerConnection = new RTCPeerConnection(servers)

//   // sets up a connection with other user
//   remoteStream = new MediaStream()
//   document.getElementById("user-2").srcObject = remoteStream

//   // get all audio and video tracks from local stream, loop over them and
//   localStream.getTracks().forEach((track) => { 
//   // add looped tracks to the peer connection so that peers can hear and see us 
//     peerConnection.addTrack(track, localStream)
//   });

// // listen using an eventlistener for peer tracks so that we can hear / see them
//   peerConnection.ontrack = (event) => {
//     // very similar functionality as line 34, loop over every track from the peer connection
//     event.streams[0].getTracks().forEach((track) => {
//     // add the looped tracks to the remoteStream we instantiated/declared on line 30
//       remoteStream.addTrack(track)
//     })
//   }

//   // incecandidtate is an event listener that will create an ICE candidate
//   peerConnection.onicecandidate = async (event) => {
//     if(event.candidate) {
//       console.log("new ICE candadite:", event.candidate)
//     }
//   }
//   // each connection has an offer and a connection
//   let offer = await peerConnection.createOffer()

//   // then we set the local description, once set it will trigger line 49 ICE candidates to make 
//   // making requests to the STUN servers, and that will create the ICE candidatese
//   await peerConnection.setLocalDescription(offer)

//   console.log("offer:", offer)
// }

// init()