let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let resetBtn = document.getElementById('reset');
let shareBtn = document.getElementById('share');
let setIntervalBtn = document.getElementById('setIntervalBtn');
let intervalInput = document.getElementById('intervalInput');
let challengeStatus = document.getElementById('challenge-status');

let hour = 0;
let minute = 0;
let second = 0;
let count = 0;
let timer = false;
let interval = null;
let challengeStarted = false;
let challengeTarget = 10; 

let intervalTime = null; 
let intervalTimeout = null;

startBtn.addEventListener('click', function () {
    timer = true;
    stopWatch();
});

stopBtn.addEventListener('click', function () {
    timer = false;
    checkChallenge();
});

resetBtn.addEventListener('click', function () {
    timer = false;
    hour = 0;
    minute = 0;
    second = 0;
    count = 0;
    document.getElementById('hr').innerHTML = "00";
    document.getElementById('min').innerHTML = "00";
    document.getElementById('sec').innerHTML = "00";
    document.getElementById('count').innerHTML = "00";
    challengeStatus.innerHTML = "Current Challenge: Not Started";
    clearInterval(intervalTimeout); 
});

setIntervalBtn.addEventListener('click', function () {
    intervalTime = parseInt(intervalInput.value);
    if (intervalTime < 1) {
        alert("Interval must be 1 second or more!");
        return;
    }
    clearInterval(intervalTimeout);
    intervalTimeout = setInterval(function () {
        alert(`Interval reached! ${intervalTime} seconds passed.`);
    }, intervalTime * 1000);
});

shareBtn.addEventListener('click', function () {
    let currentTime = `${document.getElementById('hr').innerHTML}:${document.getElementById('min').innerHTML}:${document.getElementById('sec').innerHTML}:${document.getElementById('count').innerHTML}`;
    let shareMessage = `Check out my stopwatch: ${currentTime}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Stopwatch',
            text: shareMessage,
            url: window.location.href
        }).then(() => {
            console.log('Thanks for sharing!');
        }).catch((error) => {
            console.log('Error sharing: ', error);
        });
    } else {
        alert("Share API is not supported on this browser.");
    }
});

function stopWatch() {
    if (timer) {
        count++;

        if (count == 100) {
            second++;
            count = 0;
        }

        if (second == 60) {
            minute++;
            second = 0;
        }

        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }

        let hrString = hour;
        let minString = minute;
        let secString = second;
        let countString = count;

        if (hour < 10) {
            hrString = "0" + hrString;
        }

        if (minute < 10) {
            minString = "0" + minString;
        }

        if (second < 10) {
            secString = "0" + secString;
        }

        if (count < 10) {
            countString = "0" + countString;
        }

        document.getElementById('hr').innerHTML = hrString;
        document.getElementById('min').innerHTML = minString;
        document.getElementById('sec').innerHTML = secString;
        document.getElementById('count').innerHTML = countString;
        
        setTimeout(stopWatch, 10);
    }
}

function checkChallenge() {
    if (!challengeStarted) {
        challengeStarted = true;
        challengeStatus.innerHTML = `Current Challenge: Try to stop at ${challengeTarget} seconds!`;
    }

    let currentTime = hour * 3600 + minute * 60 + second + count / 100;
    if (Math.abs(currentTime - challengeTarget) < 0.1) {
        challengeStatus.innerHTML = `You did it! Challenge passed at ${currentTime.toFixed(2)} seconds.`;
    } else {
        challengeStatus.innerHTML = `Challenge failed! You stopped at ${currentTime.toFixed(2)} seconds.`;
    }
}
