// Bootstrap form validation
(function () {
  "use strict";

  // Fetch all forms with needs-validation class
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over forms and prevent submission if invalid
  Array.from(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();
          // Show success message
          showSubscriptionSuccess();
        }
        form.classList.add("was-validated");
      },
      false,
    );
  });
})();

// Show subscription success message
function showSubscriptionSuccess() {
  const form = document.querySelector(".needs-validation");
  const formContainer = form.parentElement;

  // Create success message
  const successMessage = document.createElement("div");
  successMessage.className = "alert alert-success text-center";
  successMessage.setAttribute("role", "alert");
  successMessage.innerHTML = `
    <i class="bi bi-check-circle-fill fs-3 mb-2 d-block"></i>
    <h4 class="alert-heading">Thank you for subscribing!</h4>
    <p>You'll receive our sustainability newsletter at the email address you provided.</p>
  `;

  // Hide form and show success message
  form.style.display = "none";
  formContainer.appendChild(successMessage);

  // Reset form after 5 seconds
  setTimeout(() => {
    form.style.display = "block";
    successMessage.remove();
    form.reset();
    form.classList.remove("was-validated");
  }, 5000);
}

// Auto-detect language changes and apply RTL layout (Extra Credit)
(function () {
  const html = document.documentElement;
  const rtlLanguages = ["ar", "he", "fa", "ur", "yi"];

  function checkAndApplyRTL() {
    const currentLang = html.getAttribute("lang") || "en";
    const langCode = currentLang.split("-")[0].toLowerCase();

    if (rtlLanguages.includes(langCode)) {
      html.setAttribute("dir", "rtl");
      console.log("RTL layout applied for language:", currentLang);
    } else {
      html.setAttribute("dir", "ltr");
      console.log("LTR layout applied for language:", currentLang);
    }
  }

  // Check on page load
  checkAndApplyRTL();

  // Monitor for language attribute changes (e.g., Google Translate)
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "attributes" && mutation.attributeName === "lang") {
        checkAndApplyRTL();
      }
    });
  });

  observer.observe(html, {
    attributes: true,
    attributeFilter: ["lang"],
  });

  // Also check periodically for Google Translate changes
  setInterval(checkAndApplyRTL, 1000);
})();

// Smooth scroll behavior for any anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// Add keyboard navigation for timeline cards
document.querySelectorAll(".timeline-card").forEach((card) => {
  card.setAttribute("tabindex", "0");
  card.addEventListener("keypress", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const details = this.querySelector(".card-details");
      if (details) {
        // Toggle visibility for keyboard users
        if (details.style.opacity === "1") {
          details.style.opacity = "0";
        } else {
          details.style.opacity = "1";
        }
      }
    }
  });
});
