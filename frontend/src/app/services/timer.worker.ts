/// <reference lib="webworker" />

let sittingTimer: any;
let standingTimer: any;

addEventListener('message', ({ data }) => {
  if (data.action === 'startSitting') {
    const duration = data.duration;
    sittingTimer = setTimeout(() => {
      postMessage({ action: 'sittingComplete' });
    }, duration);
  } else if (data.action === 'startStanding') {
    const duration = data.duration;
    standingTimer = setTimeout(() => {
      postMessage({ action: 'standingComplete' });
    }, duration);
  } else if (data.action === 'stopSitting') {
    clearTimeout(sittingTimer);
    sittingTimer = null;
  } else if (data.action === 'stopStanding') {
    clearTimeout(standingTimer);
    standingTimer = null;
  }
});
