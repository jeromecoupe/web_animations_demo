"use strict";

const sectionConfirmation = document.querySelector(".js-flowsection-confirmation");
const sectionCredentialsItems = document.querySelectorAll(".js-flowsection-credentials > *");
const confirmationIcon = document.querySelector(".js-confirmation-icon");
const confirmationMessage = document.querySelector(".js-confirmation-message");

const trigger = document.querySelector(".js-trigger-animation");

// set default values
// sectionConfirmation.style.opacity = 0;

// prettier-ignore
const animOffscreen = [
  { transform: "none" },
  { transform: "translate3D(24px, 0, 0)" },
  { transform: "translate3D(0, 0, 0)" },
  { transform: "translate3D(calc(-100% - 48px), 0, 0)" }
];

const animOffscreenOptions = {
  easing: "cubic-bezier(.98,.01,1,.99)",
  duration: 200,
  fill: "both"
};

// prettier-ignore
const animScaleBounce = [
  { transform: "scale(0.5)", opacity: 0, transformOrigin: "50% 50%" },
  { transform: "scale(1)", opacity: 1 },
  { transform: "scale(0.85)" },
  { transform: "scale(1)" },
  { transform: "scale(0.90)" },
  { transform: "scale(1)" },
  { transform: "scale(0.95)" },
  { transform: "scale(1)" }
];

const animScaleBounceOptions = {
  delay: 500,
  easing: "cubic-bezier(.98,.01,1,.99)",
  duration: 500,
  fill: "both"
};

// prettier-ignore
const animAppear = [
  { opacity: 0 },
  { opacity: 1 }
];

const animAppearOptions = {
  easing: "ease-out",
  duration: 300,
  fill: "both"
};

// prettier-ignore
const sequence = new SequenceEffect([
  new KeyframeEffect(sectionCredentialsItems[0], animOffscreen, animOffscreenOptions),
  new KeyframeEffect(sectionCredentialsItems[1], animOffscreen, animOffscreenOptions),
  new KeyframeEffect(sectionCredentialsItems[2], animOffscreen, animOffscreenOptions),
  new KeyframeEffect(sectionCredentialsItems[3], animOffscreen, animOffscreenOptions),
  new KeyframeEffect(sectionCredentialsItems[4], animOffscreen, animOffscreenOptions),
  new KeyframeEffect(confirmationIcon, animScaleBounce, animScaleBounceOptions),
  new KeyframeEffect(confirmationMessage, animAppear, animAppearOptions)
]);

const anim = new Animation(sequence, document.timeline);
console.log(anim);
anim.pause();

trigger.addEventListener(
  "click",
  el => {
    el.preventDefault();
    anim.play();
    anim.onfinish = function() {
      alert("finished");
      document.querySelector(".js-login-form").submit();
    };
  },
  false
);
