"use strict";

const socialLinks = document.querySelector(".social-links");
const allCards = document.querySelectorAll(".card");
const portfolioSection = document.querySelector(".portfolio");
const overlay = document.querySelector(".my_overlay");
const rowProjects = document.querySelector(".row_projects");
const closingBtns = document.querySelectorAll(".closing_btn");
const navList = document.querySelector(".nav_list");
const navBurgerBtn = document.querySelector(".nav_burger_menu");

// navigation functionality
navList.style.maxHeight = "0px";

navBurgerBtn.addEventListener("click", function () {
  if (navList.style.maxHeight === "0px") {
    navList.style.maxHeight = "600px";
  } else {
    navList.style.maxHeight = "0px";
  }
});

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
  overlay.classList.remove("display-none");
};

// create a function that checks which modal is currently open and returns its data-project
const closeModal = function () {
  // check which modal does not have the "displayy-none" class
  const visibleModal = document.querySelector(".my_modal:not(.display-none)");
  visibleModal.classList.add("display-none");
  overlay.classList.add("display-none");
};

allCards.forEach((card) => {
  card.addEventListener("click", function (e) {
    const clickedCard = e.target.closest(".card").dataset.project;
    openModal(clickedCard);
  });
});

overlay.addEventListener("click", closeModal);
closingBtns.forEach((closingBtn) =>
  closingBtn.addEventListener("click", closeModal)
);
