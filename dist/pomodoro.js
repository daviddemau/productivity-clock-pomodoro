// elements to target
let sessionLength = document.querySelector('.sessionLength');
let breakLength = document.querySelector('.breakLength');
let clock = document.querySelector('.clock');
let phase = document.querySelector('.message');

// buttons
let startButton = document.querySelector('.display');
let resetButton = document.querySelector('.reset');
let minusSession = document.querySelector('.minusSession');
let minusBreak = document.querySelector('.minusBreak');
let plusSession = document.querySelector('.plusSession');
let plusBreak = document.querySelector('.plusBreak');

// variables
let state;
let countStart;
let firstClick;

// initial state
reset();

// start, pause and restart the count
startButton.addEventListener('click', function () {
  firstClick ? startTime() : pauseTime();
});

// remove one minute length from session and/or break
minusSession.addEventListener('click', removeOneMinute(sessionLength));
minusBreak.addEventListener('click', removeOneMinute(breakLength));

// add one minute length from session and/or break
plusSession.addEventListener('click', addOneMinute(sessionLength));
plusBreak.addEventListener('click', addOneMinute(breakLength));

// reset the clock
resetButton.addEventListener('click', function () {
  reset();
  clearTimeout(countStart);
});

function countDown() {
  counter--;
  let m = Math.floor(counter / 60);
  let s = Math.floor(counter % 60);
  if (counter >= 0) {
    clock.innerHTML = m + ':' + s;
  } else {
    if (state === 'starting') {
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
  firstClick = true;
}

//start the count
function startTime() {
  countStart = setInterval(countDown, 1000);
  firstClick = false;
}

// pause the count
function pauseTime() {
  clearTimeout(countStart, 1000);
  firstClick = true;
}

// remove and add time functions
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
