(() => {

  const song = new Howl({
    src: ['push-off.mp3']
  });

  window.emitter = new Emitter()

  song.play()

  emitter.on('position:updated', (x, y, nose, leftEye, rightEye, leftEyePos) => {

    const notStraightFace = x - y > 0.3 || y - x > 0.3
    const notStraightEyes = leftEye - rightEye > 0.01 || rightEye - leftEye > 0.01

    let distanceFromScreen = nose - leftEyePos
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

  const __linearTransformation = (fromMin, fromMax, toMin, toMax) => {
    return (value) => (value - fromMin) * ((toMax - toMin) / (fromMax - fromMin)) + toMin
  }

  const __parseScore = __linearTransformation(0, 1, -2, 2)

  const __parseNosePosition = __linearTransformation(0, 500, -1, 1)

})()
