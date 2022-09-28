const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

let stream;

const handleStop = () => {
  startBtn.innerText = "Start Recoding";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleStart);
};

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);
  const recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    console.log(event.data);
  };
  recorder.start();
  setTimeout(() => {
    recorder.stop();
  }, 5000); // stop recording after 5seconds.
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { width: 480, height: 320 },
  });
  preview.srcObject = stream;
  preview.play();
};

init();

startBtn.addEventListener("click", handleStart);
