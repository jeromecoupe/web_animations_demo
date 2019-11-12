// -------------------------------
// Get elements
// -------------------------------
const cardwidth = document.querySelector(".js-card-login").offsetWidth;
const sectionCredentialsItems = document.querySelectorAll(
  ".js-flowsection-credentials > *"
);
const confirmationSection = document.querySelector(
  ".js-flowsection-confirmation"
);
const confirmationIcon = document.querySelector(".js-confirmation-icon");
const confirmationMessage = document.querySelector(".js-confirmation-message");
const trigger = document.querySelector(".js-trigger-animation");
const loginForm = document.querySelector(".js-form-login");

/**
 * Submit form and reset timeline to start
 * @param {form} form - the form to submit
 */

function submitForm(form) {
  alert("finished");
  form.submit();
  masterTimeline.pause("start");
}

/**
 * Initial state of items
 */

function setup() {
  // set visibility to visible if JS
  gsap.set(confirmationSection, {
    visibility: "visible"
  });

  // set opacity to zero
  gsap.set([confirmationIcon, confirmationMessage], {
    opacity: 0
  });

  // scale down
  gsap.set(confirmationIcon, {
    scale: 0.1
  });
}

/**
 * Form elements going offscreen (right)
 * textfields and buttons
 */

function formElements() {
  let tl = gsap.timeline();

  tl.to(sectionCredentialsItems, {
    stagger: 0.1,
    duration: 0.2,
    x: cardwidth * -1,
    ease: "back.in(1.2)",
    delay: 0.1
  });

  return tl;
}

/**
 * Icon (scale / opacity)
 * simultaneous
 */

function icon() {
  let tl = gsap.timeline();

  tl.to(confirmationIcon, {
    delay: 0.25,
    duration: 0.25,
    opacity: 1,
    ease: "power1.in"
  });

  tl.to(
    confirmationIcon,
    {
      duration: 0.25,
      scale: 1,
      ease: "bounce.out"
    },
    "-=0.25"
  );

  return tl;
}

/**
 * Confirmation message
 * simply appears, simultaneous with button
 */

function message() {
  let tl = gsap.timeline();

  tl.to(confirmationMessage, {
    delay: 0.1,
    duration: 0.25,
    opacity: 1
  });

  return tl;
}

// create master timeline (paused + _submitForm callback)
let masterTimeline = gsap.timeline({
  paused: true,
  onComplete: function() {
    setTimeout(function() {
      submitForm(loginForm);
    }, 750);
  }
});

// add timelines to master timeline and label them
masterTimeline
  .add(setup(), "start")
  .add(formElements(), "fields")
  .add(icon(), "icon")
  .add(message(), "message");

// start animation
trigger.addEventListener(
  "click",
  function(event) {
    event.preventDefault();
    masterTimeline.play();
  },
  false
);
