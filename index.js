TweenLite.defaultEase = Expo.easeOut;

initTimer('January 27, 2020 16:00:00');

var timerEl = document.querySelector('.timer');

function initTimer (t) {
   
   var self = this,
       timerEl = document.querySelector('.timer'),
       daysGroupEl = timerEl.querySelector('.days-group'),
       hoursGroupEl = timerEl.querySelector('.hours-group'),
       minutesGroupEl = timerEl.querySelector('.minutes-group'),
       secondsGroupEl = timerEl.querySelector('.seconds-group'),

       daysGroup = {
          firstNum: daysGroupEl.querySelector('.first'),
          secondNum: daysGroupEl.querySelector('.second')
       },
       hoursGroup = {
          firstNum: hoursGroupEl.querySelector('.first'),
          secondNum: hoursGroupEl.querySelector('.second')
       },
       minutesGroup = {
          firstNum: minutesGroupEl.querySelector('.first'),
          secondNum: minutesGroupEl.querySelector('.second')
       },
       secondsGroup = {
          firstNum: secondsGroupEl.querySelector('.first'),
          secondNum: secondsGroupEl.querySelector('.second')
       };

  const calculateTimeToDate = dateOfEvent => {
    const timeOfEvent = Date.parse(dateOfEvent);
    const acctualTime = Date.now();
    const timeToEvent = timeOfEvent - acctualTime;
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    if (timeToEvent >= 0) {
      days = Math.floor(timeToEvent / (1000 * 60 * 60 * 24));
      hours = Math.floor(
        (timeToEvent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      minutes = Math.floor((timeToEvent % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((timeToEvent % (1000 * 60)) / (1000));
    }

    let daysStr = days < 10 ? '0' + days.toString() : days.toString();
    let hoursStr = hours < 10 ? '0' + hours.toString() : hours.toString();
    let minStr = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
    let secStr = seconds < 10 ? '0' + seconds.toString() : seconds.toString();
  
    return {
      days: daysStr,
      hours: hoursStr,
      minutes: minStr,
      seconds: secStr
    };
  };

   let timeNumbers;

   function updateTimer() {
    let time = calculateTimeToDate(t);

      var timestr;

      timestr = time.days + time.hours + time.minutes + time.seconds;
      timeNumbers = timestr.split('');
      updateTimerDisplay(timeNumbers);

      if(timestr === '00000000') {
        countdownFinished();
      } else {
        setTimeout(updateTimer, 1000);
      }
   }

   function updateTimerDisplay(arr) {
      animateNum(daysGroup.firstNum, arr[0]);
      animateNum(daysGroup.secondNum, arr[1]);
      animateNum(hoursGroup.firstNum, arr[2]);
      animateNum(hoursGroup.secondNum, arr[3]);
      animateNum(minutesGroup.firstNum, arr[4]);
      animateNum(minutesGroup.secondNum, arr[5]);
      animateNum(secondsGroup.firstNum, arr[6]);
      animateNum(secondsGroup.secondNum, arr[7]);
   }

   function animateNum (group, arrayValue) {

      TweenMax.killTweensOf(group.querySelector('.number-grp-wrp'));
      TweenMax.to(group.querySelector('.number-grp-wrp'), 1, {
         y: - group.querySelector('.num-' + arrayValue).offsetTop
      });

   }
   
   setTimeout(updateTimer, 1000);

}

function countdownFinished() {
  console.log("countdown finished");
}