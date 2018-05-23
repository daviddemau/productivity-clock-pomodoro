//elements to target
var sessionLength = document.querySelector('.sessionLength');
var breakLength = document.querySelector('.breakLength');
var clock = document.querySelector('.clock');
var phase = document.querySelector('.message');

//buttons
var startButton = document.querySelector('.display');
var resetButton = document.querySelector('.reset');
var minusSession = document.querySelector('.minusSession');
var minusBreak = document.querySelector('.minusBreak');
var plusSession = document.querySelector('.plusSession');
var plusBreak = document.querySelector('.plusBreak');

//variables
var count;
var state;
var countStart;
var click = 'first';

//initial state
reset();

//start, pause and restart the count
startButton.addEventListener('click', function () {
  if (click == 'first') {
    startTime();
  } else if (click == 'second') {
    pauseTime();
  }
});

// remove one minute length from session and/or break
minusSession.addEventListener('click', removeOneMinute(sessionLength));
minusBreak.addEventListener('click', removeOneMinute(breakLength));

// add one minute length from session and/or break
plusSession.addEventListener('click', addOneMinute(sessionLength));
plusBreak.addEventListener('click', addOneMinute(breakLength));

//reset the clock
resetButton.addEventListener('click', function () {
  reset();
  clearTimeout(countStart);
});

//functions
function countDown() {
  counter--;
  var m = Math.floor(counter / 60);
  var s = Math.floor(counter % 60);
  if (counter >= 0) {
    clock.innerHTML = m + ':' + s;
  } else {
    if (state == 'starting') {
      phase.innerHTML = 'Break';
      clock.innerHTML = breakLength.innerHTML;
      counter = breakLength.innerHTML * 60;
      state = 'breaking';
    } else {
      reset();
    }
  }
}

function reset() {
  phase.innerHTML = 'Session';
  clock.innerHTML = sessionLength.innerHTML;
  counter = sessionLength.innerHTML * 60;
  state = 'starting';
}

//start the count
function startTime() {
  countStart = setInterval(countDown, 1000);
  click = 'second';
}

//pause the count
function pauseTime() {
  clearTimeout(countStart, 1000);
  click = 'first';
}

//remove and add time functions
function removeOneMinute(phase) {
  return function (e) {
    if (phase.innerHTML > 1) {
      phase.innerHTML--;
      reset();
      clearTimeout(countStart);
    } else {
      alert('minimum 1 minute');
    }
  };
}

function addOneMinute(phase) {
  return function (e) {
    phase.innerHTML++;
    reset();
    clearTimeout(countStart);
  };
}
