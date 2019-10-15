var mySong;
var myImage;
var marioImage;

function preload(){
  mySong = loadSound("./assets/rainbowroad.mp3");
  myImage = loadImage("./assets/rainbow.jpg");
  marioImage = loadImage("./assets/mario.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight)

  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
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

  if ( mySong.isPlaying() ) {
    imageMode(CENTER);
    image(myImage, width/2, height/2, width, height);
  } else {
    push();
    imageMode(CENTER);
    image(myImage, width/2, height/2, width, height);
    noStroke();
    fill('rgba(0,0,0, 0.5)');
    rect(0,0,width, height);
    pop();
  }

  for (var i = 0; i<360; i++){
         var angle = i;
         volume = analyzer.getLevel();
         volume = map(volume, 0, 1, 0, height)
         var r = 100 + volume/4*3 + volume/4*random();
         var ray = 100;
         var x = r*cos(angle);
         var y = r*sin(angle);
         var borderx = ray*cos(angle);
         var bordery = ray*sin(angle);

         strokeWeight(2);
         stroke('white');
         line(borderx+width/2,bordery+height/2,x+width/2,y+height/2);
       }

  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, height)
  imageMode(CENTER);
  image(marioImage, width/2, height/2, 80+volume/2, 80+volume/2);
}
