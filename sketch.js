var mySong;
var rainbowblur;
var rainbow;
var marioImage;
var fft;

function preload(){
  mySong = loadSound("./assets/rainbowroad.mp3");
  rainbowblur = loadImage("./assets/rainbow.jpg");
  rainbow = loadImage("./assets/rainbow2.jpg");
  marioImage = loadImage("./assets/mario.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  angleMode(DEGREES);
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
  fft = new p5.FFT();
}

function mousePressed() {
  if ( mySong.isPlaying() ) {
    mySong.pause();
  } else {
    mySong.play();
  }
}

function draw() {
  var volume = 0;
  var spectrum = fft.analyze();

  if ( mySong.isPlaying()) {
    imageMode(CENTER);
    image(rainbow, width/2, height/2, width, 1080);
  } else {
    push();
    imageMode(CENTER);
    image(rainbowblur, width/2, height/2, width, 1080);
    pop();
  }

  for (var i = 0; i< spectrum.length-200; i+=10){
    //remap the lenght of the lines of the pattern
    var h = map(spectrum[i], 30, 255, 0, 70);
    if(h<0){
     //set the values under zero back to zero
     h=0;
   }


    //create half of the audio pattern
    var x = map(i, 0, spectrum.length-200, 180, 0);
      stroke('white');
      strokeWeight(2);
      push();
      translate(width/2,height/2);
      rotate(x+45);
      //draw half of the circle
      line(cos(x)+100, sin(x)+100, cos(x)+100+h, sin(x)+100+h);
    pop();

    var x = map(i, spectrum.length-200, 0, 360, 180);
    push();
      translate(width/2,height/2);
      rotate(x+45);
      //draw the other half

      line(cos(x)+100, sin(x)+100, cos(x)+100+h, sin(x)+100+h);
    pop();

  }
//create a mario logo that changes size depending on the volume
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, height)
  imageMode(CENTER);
  image(marioImage, width/2, height/2, 120+volume/2, 120+volume/2);
}
