const router = require("express").Router();
const cloudinary = require("cloudinary").v2; // Setting up Cloudinery
const { v4: uuidv4 } = require("uuid");
// const { OpenVidu } = require("openvidu-node-client"); // using OpenVidu for WebRTC


// Initialize OpenVidu, replace this with out open video config??
// WEB RTC uses this config option i think
// const OV = new OpenVidu({
//   // OpenVidu configuration options
//   hostname: 'your_openvidu_url', // Replace with your OpenVidu server URL
//   port: 3001, // Replace with the appropriate port number
//   basicAuth: 'YOUR_BASIC_AUTH_CREDENTIALS' 
// });


// Store active sessions
const activeSessions = {};

// Route to create a new video session
router.post("/create-session", async (req, res) => {
  try {
    const sessionId = uuidv4(); // Generate a unique session ID
    const session = OV.createSession(); // Create an OpenVidu session
    activeSessions[sessionId] = session;

    res.status(200).json({ sessionId });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ error: "Failed to create session" });
  }
});

// Route to generate a token for a user to join a session
router.post("/generate-token", async (req, res) => {
  const { sessionId, userName } = req.body;

  try {
    if (!activeSessions[sessionId]) {
      return res.status(404).json({ error: "Session not found" });
    }

    const session = activeSessions[sessionId];
    const tokenOptions = {
      data: `userName=${userName}`, // Attach custom data to the token
    };
    const token = session.generateToken(tokenOptions);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

// Route to upload a video to Cloudinary
router.post("/upload-video", async (req, res) => {
  try {
    const file = req.files.video; // If we are using a file upload middleware??
    const result = await cloudinary.uploader.upload(file.tempFilePath); // Upload to Cloudinary

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ error: "Failed to upload video" });
  }
});


module.exports = router;
