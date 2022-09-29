const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

// need to share cross all the functions
let stream;
let recorder;
let videoFile;

const handleDownload = () => {
  startBtn.innerText = "Start Recording";
  startBtn.removeEventListener("click", handleDownload);
  startBtn.addEventListener("click", handleStart);

  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "MyRecording.webm"; // download url, not go to the url
  // document.body.appendChild(a);
  a.click();
  // document.body.removeChild(a);

  init();
};

const handleStop = () => {
  startBtn.innerText = "Download Recoding";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);
  recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  recorder.ondataavailable = (event) => {
    // register this event that is fired when the recording stops.
    videoFile = URL.createObjectURL(event.data); // => file in browser's memory
    video.srcObject = null; // delete preview stream
    video.src = videoFile; // instead, play recorded video.
    video.loop = true;
    video.play();
  };
  recorder.start();
  setTimeout(() => {
    handleStop();
  }, 5000); // stop recording after 5seconds.
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { width: 480, height: 320 },
  });
  preview.srcObject = stream;
  preview.play(); // for stream in real time.
};

init();

startBtn.addEventListener("click", handleStart);
