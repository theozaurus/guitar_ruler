//= require jquery
//= require ruler
//= require graph

$(function(){

  var bufferSizes = [256, 512, 1024, 2048, 4096, 8192, 16384];

  var ruler = new Ruler();

  var $fundamental = $('.js-fundamental');

  ruler.onStreamAvailable.add(function(r){
    var context    = new webkitAudioContext();
    var source     = context.createMediaStreamSource(r.stream);
    var graph1     = new Graph('canvas-out1');
    var graph2     = new Graph('canvas-out2');

    var analyser = context.createAnalyser();
    analyser.fftSize = 2048; // 2048-point FFT
    analyser.smoothingTimeConstant = 0.3;

    binToFreq = (function(){
      var sampleRate = context.sampleRate;
      var fftSize    = analyser.fftSize;
      return function(bin){
        return bin * (sampleRate / fftSize);
      };
    }());

    var bufferSize = bufferSizes[4]; // Lower better latency, higher more reliable
    var process    = context.createScriptProcessor(bufferSize, 1, 1);
    process.onaudioprocess = function(audioProcessingEvent){
      var data = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(data);

      // Fundamental Frequency (using Harmonic Product Spectrum)
      // https://ccrma.stanford.edu/~pdelac/154/m154paper.htm
      var l = data.length;
      var result = new Uint8Array(l);
      var maxIndex;
      var maxVal = 0;
      for(var i = 0; i < l; i++){

        result[i] += data[i];

        ii = i * 2;
        if(ii < l){ results[i] += data[ii]; }

        ii = i * 4;
        if(ii < l){ results[i] += data[ii]; }

        ii = i * 8;
        if(ii < l){ results[i] += data[ii]; }

        ii = i * 16;
        if(ii < l){ results[i] += data[ii]; }

        if(result[i] > maxVal){ maxVal = result[i]; maxFreqBin = i; }
      }

      // FFT Graph
      graph1.update(data);
      graph2.update(result);

      $fundamental.html(binToFreq(maxFreqBin));
    };

    source.connect(analyser);
    analyser.connect(process);
    process.connect(context.destination);
  });

  ruler.start();

});
