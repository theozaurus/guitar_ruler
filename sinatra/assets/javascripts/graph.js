Graph = (function(){

  return function(canvas_id){

    var canvas = document.getElementById(canvas_id);
    var canvas_context = canvas.getContext("2d");

    var num_bars = 300;

    this.update = function(fft_data){
      // Clear the canvas
      canvas_context.clearRect(0, 0, canvas.width, canvas.height);

      // Break the samples up into bins
      var bin_size = Math.floor(fft_data.length / num_bars);
      for (var i=0; i < num_bars; ++i) {
        var sum = 0;
        for (var j=0; j < bin_size; ++j) {
          sum += fft_data[(i * bin_size) + j];
        }

        // Calculate the average frequency of the samples in the bin
        var average = sum / bin_size;

        // Draw the bars on the canvas
        var bar_width = canvas.width / num_bars;
        var scaled_average = (average / 256) * canvas.height;

        canvas_context.fillRect(i * bar_width, canvas.height, bar_width - 2,
                             -scaled_average);
      }
    };
  };

}());
