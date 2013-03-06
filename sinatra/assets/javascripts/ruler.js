//= require callback
//= require logger

Ruler = (function(){

  var CallbackList = com.jivatechnology.CallbackList;

  return function(){
    var that = this;

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

    this.stream = null;

    this.onStreamAvailable   = new CallbackList({must_keep: true});
    this.onStreamUnavailable = new CallbackList({must_keep: true});
  };

}());
