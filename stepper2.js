var Cylon = require('cylon');

Cylon
  .robot()
  .connection('edison', { adaptor: 'intel-iot' })

  //TOUCH and BUZZ
  .device('touch', { driver: 'direct-pin', pin: 4 })
  //.device('buzz', { driver: 'direct-pin', pin: 6 })

  //steppers LEFT
  .device('stepper10', { driver: 'direct-pin', pin: 10, connection: 'edison' })
  .device('stepper11', { driver: 'direct-pin', pin: 11, connection: 'edison' })
  .device('stepper12', { driver: 'direct-pin', pin: 12, connection: 'edison' })
  .device('stepper13', { driver: 'direct-pin', pin: 13, connection: 'edison' })

  //steppers RIGHT
  .device('stepper4', { driver: 'direct-pin', pin: 4, connection: 'edison' })
  .device('stepper5', { driver: 'direct-pin', pin: 5, connection: 'edison' })
  .device('stepper6', { driver: 'direct-pin', pin: 6, connection: 'edison' })
  .device('stepper7', { driver: 'direct-pin', pin: 7, connection: 'edison' })


  .on('ready', function(my) {        
    
    //set to -1 for backwards, 0 for still, 1 for forwards
    var wheel_left = 0;
    var wheel_right = 0;

    var wheel_left_run = function(step) {
        //console.log('step = ' + step);
        if (step == 0) {
            my.stepper13.digitalWrite(0);
            my.stepper11.digitalWrite(1);
        } else if (step == 1) {
            my.stepper10.digitalWrite(0);
            my.stepper12.digitalWrite(1);
        } else if (step == 2) {
            my.stepper11.digitalWrite(0);
            my.stepper13.digitalWrite(1);
        } else if (step == 3) {
            my.stepper12.digitalWrite(0);
            my.stepper10.digitalWrite(1);
        }
    };
    var wheel_left_off = function() {
        my.stepper10.digitalWrite(0);
        my.stepper11.digitalWrite(0);
        my.stepper12.digitalWrite(0);
        my.stepper13.digitalWrite(0);
    };
    var wheel_right_run = function(step) {
        //console.log('step = ' + step);
        if (step == 0) {
            my.stepper7.digitalWrite(0);
            my.stepper5.digitalWrite(1);
        } else if (step == 1) {
            my.stepper4.digitalWrite(0);
            my.stepper6.digitalWrite(1);
        } else if (step == 2) {
            my.stepper5.digitalWrite(0);
            my.stepper7.digitalWrite(1);
        } else if (step == 3) {
            my.stepper6.digitalWrite(0);
            my.stepper4.digitalWrite(1);
        }
    };
    var wheel_right_off = function() {
        my.stepper4.digitalWrite(0);
        my.stepper5.digitalWrite(0);
        my.stepper6.digitalWrite(0);
        my.stepper7.digitalWrite(0);
    };
    
    var left_i = 0;
    var right_i = 0;
    every((.001).seconds(), function() {
        //LEFT WHEEL STATE
        if (wheel_left == -1) {
            wheel_left_run(left_i % 4);
            left_i--;
        } else if (wheel_left == 1) {
            wheel_left_run(left_i % 4);
            left_i++;
        } else {
            wheel_left_off();
        }
        
        //RIGHT WHEEL STATE
        if (wheel_right == -1) {
            wheel_right_run(right_i % 4);
            right_i--;
        } else if (wheel_right == 1) {
            wheel_right_run(right_i % 4);
            right_i++;
        } else {
            wheel_right_off();
        }
    });   
        

    
    //INSTRUCTIONS
    wheel_left = 1;
    wheel_right = 1;
    for (var i = 1; i <= 5000; i++) {
        var turntime = 14
        after((turntime*i).seconds(), function() {
            wheel_left = -1;
        });
        i++;
        after((turntime*i).seconds(), function() {
          wheel_left = 1;
        });
    }

    // OTHER STUFF
    
    //my.buzz.digitalWrite(0);
    
    //my.touch.on('push', function() {
    //  console.log('detected press');
    //    my.buzz.digitalWrite(1);
    //});

    //my.touch.on('release', function() {
	//   console.log('touch released');
    //    my.buzz.digitalWrite(0);
    //});
});

Cylon.start();