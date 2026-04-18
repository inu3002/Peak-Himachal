// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add("shadow");
    navbar.style.background = "#0b2c3d";
  } else {
    navbar.classList.remove("shadow");
    navbar.style.background = "#212529";
  }
});

// Intersection Observer animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document
  .querySelectorAll(".card, .content-section, .gallery-item")
  .forEach((el) => {
    el.classList.add("hidden");
    observer.observe(el);
  });

// Back to top button
const topBtn = document.createElement("button");
topBtn.innerHTML = "↑";
topBtn.id = "topBtn";
document.body.appendChild(topBtn);

topBtn.onclick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

// Close navbar on link click (Bootstrap)
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    const nav = document.querySelector(".navbar-collapse");

    if (nav && nav.classList.contains("show")) {
      const bsCollapse =
        bootstrap.Collapse.getInstance(nav) ||
        new bootstrap.Collapse(nav);
      bsCollapse.hide();
    }
  });
});
document.querySelectorAll(".mountain").forEach((el) => {
  el.classList.add("hidden");   // 🔥 IMPORTANT
  observer.observe(el);
});
// Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .then((reg) => console.log("Service Worker Registered"))
      .catch((err) => console.log("SW Failed:", err));
  });
}