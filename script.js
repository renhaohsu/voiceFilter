const $startStopButton = document.getElementById('start-stop');
const $upButton = document.getElementById('up');
const $downButton = document.getElementById('down');

const pitchShift = new Tone.PitchShift();

var autoFilter = new Tone.AutoFilter({
  frequency : 500 ,
  type : 'sine' ,
  depth : 1 ,
  baseFrequency : 0 ,
  octaves : 2.6 ,
  filter : {
    type : 'highpass' ,
    rolloff : -12 ,
    Q : 1
    }
})
// var player = new Tone.Player("./myVoice.wav").connect(autoFilter)
//play as soon as the buffer is loaded
// player.autostart = false;


var motu = new Tone.UserMedia()
document.body.addEventListener("click", function(){
  console.log('initially 連接好toneJS的物件們')
  
  motu.connect(autoFilter);
  autoFilter.connect(pitchShift);
  pitchShift.toMaster();
},{once:true})


$startStopButton.onclick = () => {


  if ($startStopButton.textContent === 'start') {
    $startStopButton.textContent = 'stop';
    // player.start();

    //opening the input asks the user to activate their mic
    motu.open().then(function(){
    	//promise resolves when input is available
      console.log('mic open')
    });

  } else {
    $startStopButton.textContent = 'start';
    // player.stop();
    motu.close()
  }
};

$upButton.onclick = () => pitchShift.pitch += 2;
$downButton.onclick = () => pitchShift.pitch -= 2;
