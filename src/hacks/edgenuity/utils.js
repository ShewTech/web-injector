/* eslint-disable */
// @ts-nocheck

/**
 * Disable new relic monitoring
 *
 * This might be used for some kind of detection system for cheating
 */
function disableNewRelic() {
  function disableForWindow(window) {
    if (window.NREUM) {
      window.NREUM = null;
      console.log('NREUM disabled for ', window.location.href);
    }

    if (window.newrelic) {
      window.newrelic = null;
      console.log('newrelic disabled for ', window.location.href);
    }
  }

  disableForWindow(window);
  disableForWindow(window[0]);
}

/**
 * Get Activity Type
 */
function getActivityType() {
  return $('#activity-title').text();
}

/**
 * Get Advanced Button
 */
function getAdvanceButton() {
  const button = $('.FrameRight');

  if (button.length === 0) return;

  return button;
}

/**
 * Can advance video
 *
 * This could be optimized by checking the video duration and the current time
 */
function canAdvanceVideo() {
  return getAdvanceButton()?.css('opacity') < 1 ? true : false;
}

/**
 * Can advance activity
 */
function canAdvanceActivity() {
  return !$('.footnav.goRight').hasClass('disabled');
}

/**
 * Advance to next activity
 */
function Advance() {
  if (canAdvanceActivity()) {
    $('.footnav.goRight').click();
  } else if (canAdvanceVideo()) {
    getAdvanceButton()?.click();
  }
}

/**
 * Register activity
 */
function RegisterActivity(name, func) {
  window[0].activities = window[0].activities || {};
  window[0].activities[name] = func.toString();
}

/**
 * Execute activity
 *
 * Sends a message to the iframe window to execute the activity
 */
function ExecuteActivity(_activity) {
  const activity = window[0].activities[_activity];

  if (activity) {
    window[0].postMessage({
      type: 'execute',
      func: activity,
    });
  } else {
    console.warn(
      "No exploit available for activity type '" + getActivityType() + "'"
    );
  }
}

/**
 * Initialize iframe listener
 */
function initListener() {
  const listener = (event) => {
    if (event.data.type === 'execute') eval(`(${event.data.func})()`);
  };

  window[0].removeEventListener('message', listener);
  window[0].addEventListener('message', listener);
}

/**
 * Hide blocker
 */
function HideBlocker() {
  try {
    window[0].HideBlocker();
  } catch (e) {
    // console.warn('HideBlocker not found');
  }
}
