window.onload = function() {
  try {
    TagCanvas.Start('myCanvas', 'tags', {
      textColour : '#eee',
      outlineThickness : 1,
      decel : 0.95,
      frontSelect: true,
      zoomMin : 1,
      zoomMax : 1,
      pulsateTo : 0.1,
      pulsateTime : 3,
      maxSpeed : 0.08,
      stretchX : 2.3,
      depth : 0.3
    });
  } catch(e) {
    // something went wrong, hide the canvas container
    document.getElementById('myCanvasContainer').style.display = 'none';
    document.getElementById('tags').style.display = 'none';
  }
};
