//= require callback
//= require logger
//= require jquery

Ruler = (function(){

  var CallbackList = com.jivatechnology.CallbackList;

  return function(){
    var that = this;

    var $file = $('.js-file');

    var onMicrophoneSuccess = function(stream){
      Logger.debug('Microphone stream available');
      that.stream = stream;
      that.onStreamAvailable.handle(that);
    };

    var onMicrophoneFailure = function(){
      Logger.warn('Microphone stream unavailable');
      that.onStreamUnavailable.handle(that);
    };

    this.start = function(){
      navigator.webkitGetUserMedia({audio: true}, onMicrophoneSuccess, onMicrophoneFailure);
    };

    $file.change(function(e){
      var file = e.currentTarget.files[0];
      that.onFileAvailable.handle(file);
    });

    this.stream = null;

    this.onStreamAvailable   = new CallbackList({must_keep: true});
    this.onStreamUnavailable = new CallbackList({must_keep: true});

    this.onFileAvailable     = new CallbackList({must_keep: true});
  };

}());
