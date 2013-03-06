//= require jquery
//= require ruler
//= require graph

$(function(){

  var ruler = new Ruler();

  var analyser;
  var context = new webkitAudioContext();
  var graph = new Graph('canvas-out');

  var process = function(){
    setInterval(function(){
      FFTData = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(FFTData);
      graph.update(FFTData);
    },100);
  };

  ruler.onStreamAvailable.add(function(r){
    // Let's process that fool
    analyser = context.createAnalyser();
    analyser.fftSize = 2048; // 2048-point FFT

    var sound = context.createMediaStreamSource(r.stream);
    sound.connect(analyser);
    // analyser.connect(aCtx.destination);
    process();
  });

  ruler.start();

});
