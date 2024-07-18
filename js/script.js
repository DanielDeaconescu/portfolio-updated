"use strict";

const socialLinks = document.querySelector(".social-links");
const allCards = document.querySelectorAll(".card");
const portfolioSection = document.querySelector(".portfolio");
const overlay = document.querySelector(".my_overlay");
const rowProjects = document.querySelector(".row_projects");

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
const displayModal = function (givenObject) {
  const { projectImage, projectTitle, projectParagraph } = givenObject;
  const itemToInsert = `<div class="my_modal project-1 text-start bg-light">
          <div class="modal_image">
            <img
              class="img-fluid"
              src="/images/projects/${projectImage}" 
              alt=""
            />
          </div>
          <div class="modal_info">
            <h3>${projectTitle}</h3>
            <p>
              ${projectParagraph}
            </p>
          </div>
          <div class="modal_action">
            <a href="#" class="btn btn-primary">Project Preview</a>
            <a href="#" class="btn btn-secondary">GitHub Repo</a>
          </div>
        </div>`;
  portfolioSection.insertAdjacentHTML("beforeend", itemToInsert);
  overlay.classList.remove("display-none");

  const modals = document.querySelectorAll(".my_modal");
  modals.forEach((modal) =>
    modal.scrollIntoView({ behavior: "smooth", block: "center" })
  );
};

const closeModal = function () {
  document.querySelectorAll(".my_modal").forEach((item) => {
    item.classList.add("display-none");
  });
  overlay.classList.add("display-none");
};

// displayModal("project2-multi-step-form.jpg", "Hello there", "Hello again");

// see how you can put them in one data structure, like one bigger object/array
// input for displayModal
const project1 = {
  projectImage: "project1-vera.jpg",
  projectTitle: "Vera Landing Page",
  projectParagraph:
    'The landing page "Vera" was crafted with HTML, CSS, and JavaScript, offering a sleek, modern design. It features responsive layouts, interactive elements, and dynamic content. "Vera" seamlessly blends aesthetics with functionality, ensuring a captivating user experience while maintaining optimal performance across all devices and browsers.',
};

const project2 = {
  projectImage: "project2-multi-step-form.jpg",
  projectTitle: "Multi-step Form",
  projectParagraph:
    'The "Multi-step form" project, built using HTML, CSS, and JavaScript, provides a user-friendly, interactive experience. It guides users through a series of steps with smooth transitions and real-time validations. Designed with a focus on usability and responsiveness, the form ensures seamless data entry and enhances user engagement across all devices.',
};

const project3 = {
  projectImage: "project3-ecommerce-product-page.jpg",
  projectTitle: "E-commerce Product Page",
  projectParagraph:
    'The "E-commerce Product Page" project, developed with HTML, CSS, and JavaScript, showcases products in an appealing and interactive manner. It features responsive design, intuitive navigation, and dynamic elements such as image carousels and customer reviews. This project ensures an engaging shopping experience, optimizing performance across various devices and browsers.',
};

const projects = {
  project1: project1,
  project2: project2,
  project3: project3,
};

// displayModal(project3);

rowProjects.addEventListener("click", function (e) {
  const clickedCard = e.target.closest(".card").dataset.project;
  // console.log(clickedCard);
  const inputDisplay = "project" + clickedCard;
  const dynamicObject = projects[inputDisplay];
  displayModal(dynamicObject);
});

overlay.addEventListener("click", closeModal);
