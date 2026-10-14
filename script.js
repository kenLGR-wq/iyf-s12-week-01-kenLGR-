
const contactEmail = "YOUR_EMAIL@example.com";
document.querySelectorAll(".current-year").forEach((element) => {
  element.textContent = new Date().getFullYear();
})
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    });
  });
}


const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const emptyState = document.querySelector(".empty-state");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    projectCards.forEach((card) => {
      const matches =
        selectedCategory === "all" ||
        card.dataset.category === selectedCategory;

      card.hidden = !matches;

      if (matches) visibleCount++;
    });

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  });

  button.setAttribute(
    "aria-pressed",
    String(button.classList.contains("active"))
  );
});


const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    if (
      !contactEmail ||
      contactEmail === "YOUR_EMAIL@example.com" ||
      !contactEmail.includes("@")
    ) {
      formStatus.textContent =
        "Please update contactEmail in js/script.js with your real email address first.";
      return;
    }

    const formData = new FormData(contactForm);
    const name = formData.get("name").trim();
    const senderEmail = formData.get("email").trim();
    const subject = formData.get("subject").trim();
    const message = formData.get("message").trim();

    const emailSubject = encodeURIComponent(subject);
    const emailBody = encodeURIComponent(
      `Name: ${name}\n` +
      `Reply email: ${senderEmail}\n\n` +
      `Message:\n${message}`
    );

    const mailtoURL =
      `mailto:${contactEmail}?subject=${emailSubject}&body=${emailBody}`;

    formStatus.textContent =
      "Opening your email application. Review the message and press Send there.";

    window.location.href = mailtoURL;
  });
                      }
      
