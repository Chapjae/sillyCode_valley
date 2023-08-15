let preview = document.getElementById("localVideo");
let recording = document.getElementById("recording");
let startButton = document.getElementById("startButton");
let stopButton = document.getElementById("stopButton");
let downloadButton = document.getElementById("downloadButton");
let logElement = document.getElementById("log");
let randomPrompt = document.getElementById("improvPrompt")

document.getElementById("prompt").addEventListener("click", function(){
 const events = ["Ordering a pizza", "Giving an inspirational speech", "Reviewing a movie", "Hosting a nature show", "Running from a wild animal", 
                "Anchoring for evening news","Trying to sell a pen","Officiating a funeral", "Looking for a bathroom", "Singing a song", "Floating in space", "Hosting a cooking show", "Officiating a wedding", 
                "Doing a pre-fight interview", "Programming your second project", "Selling a used car", "Returning clothes that are too small"]
  const characters = ["Jerome Chenette","Foghorn Leghorn", "Yoda", "Gollum", "Bernie Sanders", "An auctioneer","Mickey Mouse", "Arnold Schwarzenagger", "Kermit the Frog", "Jim Carey", "Emperor Palpatine", "Hank Hill", "A knight", "Mike Tyson", "A waiter", "Count Dracula",
                "Dr. Evil", "Austin Powers", " A radio DJ","Darth Vader", "Ruby Rhod", "Sylvester Stallone", "Batman", "A Fashionista","A snooty person", "A news anchor", "A priest"]

  let randomEvent = events[Math.floor(Math.random() * events.length)]
  let randomCharacter = characters[Math.floor(Math.random() * characters.length)]

  randomPrompt.textContent = `You are: ${randomCharacter} and you are: ${randomEvent}`
})

let recordingTimeMS = 20000;
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

function stopMicrophone(stream) {
  stream.getAudioTracks().forEach((track) => track.stop());
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
      stream.getTracks().forEach((track) => track.stop());
      recorder.stop();
    }
  });

  return Promise.all([stopped, recorded]).then(() => data);
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
      }).then(() => {

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