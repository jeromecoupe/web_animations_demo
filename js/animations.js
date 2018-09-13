const cardwidth = document.querySelector(".js-card-login").offsetWidth;
const sectionCredentialsItems = document.querySelectorAll(".js-flowsection-credentials > *");
const confirmationSection = document.querySelector(".js-flowsection-confirmation");
const confirmationIcon = document.querySelector(".js-confirmation-icon");
const confirmationMessage = document.querySelector(".js-confirmation-message");
const trigger = document.querySelector(".js-trigger-animation");
const loginForm = document.getElementById("form-login");

function _submitForm(form) {
  alert("finished");
  form.submit();
  master.reset();
}

function _setup() {
  const tl = new TimelineLite();

  // set opacity to zero
  tl.set([confirmationIcon, confirmationMessage], {
    opacity: 0
  });

  // scale down
  tl.set(confirmationIcon, {
    scale: 0.1
  });

  // now that elements are opacity 0, make container visible
  tl.set(confirmationSection, {
    visibility: "visible"
  });

  return tl;
}

// animate form elements
function _formElements() {
  const tl = new TimelineLite();

  tl.add("formElements").staggerTo(
    sectionCredentialsItems,
    0.2,
    {
      x: cardwidth * -1,
      ease: Back.easeIn
    },
    0.1
  );

  return tl;
}

// animate Icon
function _checkIcon() {
  const tl = new TimelineLite();

  tl.add("checkIcon")
    // appear
    .to(
      confirmationIcon,
      0.25,
      {
        opacity: 1,
        ease: "Power1"
      },
      "+=0.25"
    )

    // bounce scaling
    .to(
      confirmationIcon,
      0.25,
      {
        scale: 1,
        ease: "Bounce.easeOut"
      },
      "-=0.25"
    );

  return tl;
}

// animate confirmation message
function _confirmationScreen() {
  const tl = new TimelineLite();

  tl.add("message")
    // appear
    .to(
      confirmationMessage,
      0.25,
      {
        opacity: 1
      },
      "+=0.25"
    );

  return tl;
}

// create master timeline (paused + _submitForm callback)
const master = new TimelineLite({
  paused: true,
  onComplete: () => {
    _submitForm(loginForm);
  }
});

// add timelines to master timeline and label them
master
  .add(_setup())
  .add(_formElements(), "animForm")
  .add(_checkIcon(), "animIcon")
  .add(_confirmationScreen(), "animMessage");

// start animation
trigger.addEventListener(
  "click",
  el => {
    el.preventDefault();
    master.play();
  },
  false
);
