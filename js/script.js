"use strict";

const socialLinks = document.querySelector(".social-links");
const allCards = document.querySelectorAll(".card-custom");
const portfolioSection = document.querySelector(".portfolio");
const overlay = document.querySelector(".my_overlay");
const rowProjects = document.querySelector(".row_projects");
const closingBtns = document.querySelectorAll(".closing_btn");
const allModals = document.querySelectorAll(".my_modal");
const allTabs = document.querySelectorAll(".tab");
const allDescriptions = document.querySelectorAll(".description");
const body = document.querySelector("body");
const header = document.querySelector(".header");
const navigation = document.querySelector(".navbar-custom");
const formButton = document.querySelector(".form-button");
const contactForm = document.querySelector(".contact_form");

// navigation functionality (we display the navigation when the header is no longer in view)

const navigationHeight = navigation.getBoundingClientRect().height;

const makeNavbarSticky = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    navigation.classList.add("sticky-top", "navbar-visible");
  } else {
    navigation.classList.remove("sticky-top");
  }
};

const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${navigationHeight + 50}px`,
};

const headerObserver = new IntersectionObserver(makeNavbarSticky, options);
headerObserver.observe(header);

function runTypingEffect() {
  const text = "I am Daniel Deaconescu";
  const typingElement = document.getElementById("typing-text");
  const typingDelay = 100;

  typeText(text, typingElement, typingDelay);
}

function typeText(text, typingElement, delay) {
  for (let i = 0; i < text.length; i++) {
    setTimeout(() => {
      typingElement.textContent += text.charAt(i);
    }, delay * i);
  }
}

document.addEventListener("DOMContentLoaded", runTypingEffect);

// links effect
const opacityChanger = function (e) {
  if (e.target.classList.contains("social-link")) {
    const link = e.target;
    const siblings = link
      .closest(".social-links")
      .querySelectorAll(".social-link");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

socialLinks.addEventListener("mouseover", opacityChanger.bind(0.5));
socialLinks.addEventListener("mouseout", opacityChanger.bind(1));

// modal functionality

// create a function that opens a modal based on the specified number
const openModal = function (modalNumber) {
  const correspondingModal = document.querySelector(
    `.my_modal[data-modal="${modalNumber}"]`
  );
  correspondingModal.classList.remove("display-none");
  correspondingModal.scrollIntoView({ behavior: "smooth", block: "start" });
  overlay.classList.remove("display-none");
  document.querySelector("body").style.overflowY = "hidden";
};

// create a function that checks which modal is currently open and returns its data-project
const closeModal = function () {
  // check which modal does not have the "displayy-none" class
  const visibleModal = document.querySelector(".my_modal:not(.display-none)");
  visibleModal.classList.add("display-none");
  overlay.classList.add("display-none");
  document.querySelector("body").style.overflowY = "auto";
};

allCards.forEach((card) => {
  card.addEventListener("click", function (e) {
    const clickedCard = e.target.closest(".card").dataset.project;
    openModal(clickedCard);
  });
});
// closing modal when clicking the overlay
overlay.addEventListener("click", closeModal);
// closing modal when clicking "X" mark
closingBtns.forEach((closingBtn) =>
  closingBtn.addEventListener("click", closeModal)
);
// closing modal when hitting the "Esc" button
document.addEventListener("keydown", function (e) {
  // check if there is a modal open
  allModals.forEach((modal) => {
    if (!modal.classList.contains("display-none") && e.key === "Escape") {
      closeModal();
    }
  });
});

// tabbed component functionality
allTabs.forEach((tab) => {
  tab.addEventListener("click", function (e) {
    const clickedTab = e.target.dataset.tech;
    allTabs.forEach((tab) => tab.classList.remove("tab_active"));
    document
      .querySelector(`.tab[data-tech="${clickedTab}"]`)
      .classList.add("tab_active");
    // descriptions
    allDescriptions.forEach((description) =>
      description.classList.remove("description-active")
    );
    document
      .querySelector(`.description[data-tech="${clickedTab}"]`)
      .classList.add("description-active");
  });
});

// scrolling functionality

// const aboutMeBtn = document.querySelector(".about-me-test");
// aboutMeBtn.addEventListener("click", function (e) {
//   e.preventDefault();

//   const target = this.getAttribute("href").substring(1);
//   const targetSection = document.getElementById(target);

//   const navHeight = document
//     .querySelector(".navbar")
//     .getBoundingClientRect().height;
//   const scrollPosition = targetSection.offsetTop - navHeight;

//   window.scrollTo({
//     top: scrollPosition,
//     behavior: "smooth",
//   });
// });

const allNavLinks = document.querySelectorAll(".link-custom");
allNavLinks.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const targetID = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetID);
    // we need to scroll down up until the top of each section - the height of the navigation bar
    console.log(targetID);

    // const navHeight = document
    //   .querySelector(".navbar")
    //   .getBoundingClientRect().height;
    let scrollPosition;

    if (targetID === "my-skills") {
      scrollPosition = targetSection.offsetTop - (navigationHeight + 40);
    } else {
      scrollPosition = targetSection.offsetTop - navigationHeight;
    }

    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  });
});

// Form button functionality

formButton.addEventListener("click", function () {
  contactForm.classList.toggle("display-none");
});
