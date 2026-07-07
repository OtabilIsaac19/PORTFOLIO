const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const themeToggle = document.getElementById("themeToggle");
const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

/* ================= NAV MENU ================= */
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

/* ================= THEME TOGGLE ================= */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeToggle.textContent = "☀️ Light";
    localStorage.setItem("portfolioTheme", "dark");
  } else {
    themeToggle.textContent = "🌙 Dark";
    localStorage.setItem("portfolioTheme", "light");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("portfolioTheme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️ Light";
  }
});

/* ================= FORM VALIDATION ================= */
function showError(input, message) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector(".error-message");
  errorMessage.textContent = message;
  input.style.borderColor = "#ef4444";
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector(".error-message");
  errorMessage.textContent = "";
  input.style.borderColor = "#16a34a";
}

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  let isValid = true;

  successMessage.textContent = "";

  if (name.value.trim() === "") {
    showError(name, "Full name is required.");
    isValid = false;
  } else {
    showSuccess(name);
  }

  if (email.value.trim() === "") {
    showError(email, "Email address is required.");
    isValid = false;
  } else if (!isValidEmail(email.value.trim())) {
    showError(email, "Please enter a valid email address.");
    isValid = false;
  } else {
    showSuccess(email);
  }

  if (message.value.trim() === "") {
    showError(message, "Message is required.");
    isValid = false;
  } else if (message.value.trim().length < 10) {
    showError(message, "Message must be at least 10 characters long.");
    isValid = false;
  } else {
    showSuccess(message);
  }

  if (isValid) {
    successMessage.textContent =
      "Thank you! Your message has been validated successfully.";
    contactForm.reset();
  }
});

/* ================= SPLASH SCREEN ================= */
window.addEventListener("load", function () {
  const splashScreen = document.getElementById("splash-screen");

  setTimeout(function () {
    splashScreen.classList.add("hide-splash");
  }, 2800);
});

/* ================= CHATBOT ================= */
const chatbotToggle = document.getElementById("chatbotToggle");
const chatbotContainer = document.getElementById("chatbotContainer");
const closeChatbot = document.getElementById("closeChatbot");
const chatbotInput = document.getElementById("chatbotInput");
const sendChatbotMessage = document.getElementById("sendChatbotMessage");
const chatbotMessages = document.getElementById("chatbotMessages");

function addMessage(text, className) {
  const message = document.createElement("div");
  message.className = className;
  message.textContent = text;
  chatbotMessages.appendChild(message);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getBotReply(message) {
  const text = message.toLowerCase();

  if (text.includes("hi") || text.includes("hello")) {
    return "Hello 👋 I’m Isaac’s assistant.";
  }

  if (text.includes("skills")) {
    return "HTML, CSS, JavaScript, frontend development.";
  }

  if (text.includes("project")) {
    return "Portfolio, Java fee system, student system.";
  }

  if (text.includes("contact")) {
    return "Email: isaacbagoskiotabil@gmail.com | 0546809305";
  }

  return "Ask me about Isaac’s skills, projects, or contact.";
}

chatbotToggle.addEventListener("click", () => {
  chatbotContainer.classList.toggle("show-chatbot");
});

closeChatbot.addEventListener("click", () => {
  chatbotContainer.classList.remove("show-chatbot");
});

sendChatbotMessage.addEventListener("click", sendMessage);

chatbotInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const userText = chatbotInput.value.trim();

  if (!userText) return;

  addMessage(userText, "user-message");
  chatbotInput.value = "";

  setTimeout(() => {
    addMessage(getBotReply(userText), "bot-message");
  }, 500);
}
/* ================= BACK TO HOME BUTTON ================= */
const backToHome = document.getElementById("backToHome");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToHome.classList.add("show");
  } else {
    backToHome.classList.remove("show");
  }
});

backToHome.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});