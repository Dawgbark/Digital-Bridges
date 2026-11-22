
/* Responsive Navigation Menu */
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", function() {
    const isOpen =
      toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("open", !isOpen);
  });
}

/* Interactive FAQ Accordion */
const faqQuestions = document.querySelectorAll(".faq-list details");

faqQuestions.forEach(function(faq) {
  faq.addEventListener("toggle", function() {
    faq.classList.toggle("active", faq.open);
  });
});
