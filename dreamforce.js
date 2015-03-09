var Cylon = require('cylon');

Cylon
  .robot()
  .connection('edison', { adaptor: 'intel-iot' })
  .device('buzzer', { driver: 'direct-pin', pin: 6, connection: 'edison' })
  .device('touch', { driver: 'button', pin: 4, connection: 'edison' })

  .device('stepper10', { driver: 'direct-pin', pin: 10, connection: 'edison' })
  .device('stepper11', { driver: 'direct-pin', pin: 11, connection: 'edison' })
  .device('stepper12', { driver: 'direct-pin', pin: 12, connection: 'edison' })
  .device('stepper13', { driver: 'direct-pin', pin: 13, connection: 'edison' })


  .on('ready', function(my) {

    var step = 0;
    
    /**
    //every((.0001).seconds(),function() {
    constantly(function() {
      
      if (step == 0) {
          my.stepper13.digitalWrite(0);
      } else if (step == 1) {
          my.stepper11.digitalWrite(1);
      } else if (step == 2) {
          my.stepper10.digitalWrite(0);
      } else if (step == 3) {
          my.stepper12.digitalWrite(1);
      } else if (step == 4) {
          my.stepper11.digitalWrite(0);
      } else if (step == 5) {
          my.stepper13.digitalWrite(1);
      } else if (step == 6) {
          my.stepper12.digitalWrite(0);
      } else if (step == 7) {
          my.stepper10.digitalWrite(1);
      }
        
      step++;
      step = (step % 8);
      //console.log('stepped');
    });
    **/
    
    /**
    constantly(function() {
        if (step == 0) {
          my.stepper10.digitalWrite(0);
        } else if (step == 1) {
          my.stepper10.digitalWrite(1);
        }

        step++;
        step = (step % 2);
    });
    **/
    
    constantly(function() {
    //every((.1).seconds(),function() {
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
        
      step++;
      step = (step % 4);
      //console.log('stepped');
    });

    
    my.touch.on('push', function() {
      //my.buzzer.turnOn();
        console.log('press');
        my.buzzer.digitalWrite(1);
    });

    my.touch.on('release', function() {
      //my.buzzer.turnOff();
        console.log('release');
        my.buzzer.digitalWrite(0);
    });
  });

Cylon.start();