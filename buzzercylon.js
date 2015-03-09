var Cylon = require('cylon');

Cylon.robot({
  connections: {
    edison: { adaptor:  'intel-iot'}
  },

  devices: {
    touch: { driver: 'direct-pin', pin: 4 },
    buzz: { driver: 'direct-pin', pin: 6 }
  },

  on: function(my) {
    var value = 0;
    
    every((1).second(), function() {
      console.log('bzzzzzzz');
      my.buzz.digitalWrite(value);
      value = (value == 0) ? 1 : 0;
    });
    
    /**
    my.touch.on('push', function() {
      console.log('detected press');
        my.buzz.digitalWrite(1);
    });

    my.touch.on('release', function() {
	   console.log('touch released');
        my.buzz.digitalWrite(0);
    });
    **/
      
    
  }
}).start();