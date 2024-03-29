chosenFreq = 1;
zoom = 1;
ischanging = true;
class sineWave {
  freq = 0;
  finalfreq = 0;
  amplitude = 0;
  points = [];
  constructor(freq, amplitude) {
    this.freq = freq;
    this.amplitude = amplitude;
    this.finalfreq = freq;
    for (let i = 0; i < 10; i += 0.01) {
      this.points.push(Math.sin((i * freq) / 50) * amplitude);
    }
  }
  drawSelf() {
    if (this.finalfreq != this.freq) {
      this.finalfreq = this.freq;
      this.points = [];
      for (let i = 0; i < 40; i += 0.01) {
        this.points.push(Math.sin((i * this.freq) / 50) * this.amplitude);
      }
    }
    for (let i = 1; i < this.points.length; i++) {
      drawLine(
        i * zoom,
        this.points[i] + 300,
        (i - 1) * zoom,
        this.points[i - 1] + 300
      );
    }
  }
  addWave(sineWave) {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i] += sineWave.points[i];
    }
  }
}
function fourier(inputWave) {
  fouriers = [];
  for (sample = 1; sample < inputWave.points.length; sample++) {
    sumForSample = 0;
    for (i = 0; i < inputWave.points.length / 4; i += sample) {
      sumForSample += inputWave.points[i];
    }
    fouriers.push(sumForSample);
  }
  return fouriers;
}
class button {
  func = 0;
  x = 0;
  y = 0;
  constructor(x, y, func) {
    this.func = func;
    this.x = x;
    this.y = y;
  }
  drawSelf() {
    context.fillRect(this.x, this.y, 130, 70);
  }
  checkCollision() {
    if (areColliding(mouseX, mouseY, 30, 30, this.x, this.y, 130, 70)) {
      this.func();
    }
  }
}
higherFreq = new button(500, 500, () => {
  chosenFreq++;
});
lowerFreq = new button(100, 500, () => {
  chosenFreq--;
});
makeNewElem = new button(300, 500, () => {
  waveone.addWave(new sineWave(chosenFreq, 10));
});
kek = 0;
function update() {}
function draw() {
  if (ischanging) {
    kek += 4;
  }
  // waveone = new sineWave((kek * kek) / 1000, 10);
  waveone = new sineWave(kek * 1.3, 10);
  //waveone.addWave(new sineWave(kek/2, 10));

  context.font = "20px Ariel";
  context.fillText(kek, 100, 100);
  context.fillText(
    Math.round(Math.pow(10, (mouseX - 1) / 200) * 2.6),
    200,
    100
  );
  context.fillText(chosenFreq, 400, 20);
  higherFreq.drawSelf();
  lowerFreq.drawSelf();
  makeNewElem.drawSelf();
  waveone.drawSelf();
  kys = 0;
  kys = fourier(waveone);
  for (let i = kys.length; i > 0; i -= 1) {
    // console.log(i);
    drawLine(
      800 - Math.log10(i) * 200,
      300 - (kys[i] * kys[i]) / 60,
      800 - Math.log10(i - 1) * 200,
      300 - (kys[i - 1] * kys[i - 1]) / 60
    );
  }
  maxforframe = 0;
  maxforframeindex = 0;
  for (let i = 0; i < kys.length; i++) {
    if (kys[i] > maxforframe) {
      maxforframe = kys[i];
      maxforframeindex = i;
    }
  }
  context.fillText(
    Math.round(
      Math.pow(10, (800 - Math.log10(maxforframeindex) * 200) / 200) * 2.6
    ),
    800 - Math.log10(maxforframeindex) * 200,
    300 - (maxforframe * maxforframe) / 60
  );
}
function mouseup() {
  //Math.log10(i)*200=350
  //i=Math.pow(10,mouseX)/200
  console.log();
  higherFreq.checkCollision();
  lowerFreq.checkCollision();
  makeNewElem.checkCollision();
}
function keyup() {
  ischanging = !ischanging;
}
