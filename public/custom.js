(() => {

  const song = new Howl({
    src: ['push-off.mp3']
  });

  window.emitter = new Emitter()

  song.play()

  emitter.on('position:updated', (x, y, nose, leftEye, rightEye, leftEyePos) => {

    const notStraightFace = x - y > 0.3 || y - x > 0.3
    const notStraightEyes = leftEye - rightEye > 0.01 || rightEye - leftEye > 0.01

    let distanceFromScreen = nose - leftEyePos;
    let volume = distanceFromScreen / 100
    if (volume > 1) { volume = 1 }

    if (notStraightFace && notStraightEyes) {
      x = __parseScore(x)
      y = __parseScore(y)
      song.volume(volume)
    } else {
      y = x = 0
      song.volume(volume / 2)
    }

    z = __parseNosePosition(nose)

    song.pos(x, y, z);

  });

  const __parseScore = (score) => {
    if (score > 0.9) {
      score = 2
    } else if (score > 0.8) {
      score = 1.5
    } else if (score > 0.7) {
      score = 1
    } else if (score > 0.6) {
      score = 0.5
    } else if (score > 0.5) {
      score = 0
    } else if (score > 0.4) {
      score = -0.5
    } else if (score > 0.3) {
      score = -1
    } else if (score > 0.2) {
      score = -1.5
    } else {
      score = -2
    }
    return score
  }

  const __parseNosePosition = (pos) => {
    if (pos < 100) {
      pos = -1
    } else if (pos < 200) {
      pos = -0.5
    } else if (pos < 300) {
      pos = 0
    } else if (pos < 400) {
      pos = 0.5
    } else {
      pos = 1
    }
    return pos
  }

})()
