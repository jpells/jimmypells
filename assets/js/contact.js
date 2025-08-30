// Initialize variables to track page load time and user's interactions
const pageLoadTime = Date.now();
let userInteractionCount = 0;

// Generate token based on page load time
const sessionToken = btoa(pageLoadTime.toString()).substring(0, 16);
document.getElementById("token").value = sessionToken;

// Track user's interactions
document.addEventListener("mousemove", () => userInteractionCount++);
document.addEventListener("keypress", () => userInteractionCount++);
document.addEventListener("click", () => userInteractionCount++);

const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (document.getElementById("token").value !== sessionToken) {
    // Pay the toll!
    return;
  }

  if (document.getElementById("website").value) {
    // Honey do not!
    return;
  }

  if (Date.now() - pageLoadTime < 10000 || userInteractionCount < 5) {
    // Can you do it in less than 10 seconds or 5 moves?
    return;
  }

  for (let i = 0, len = contactForm.elements.length; i < len; ++i) {
    contactForm.elements[i].disabled = true;
  }
  document.getElementById("submit-btn").value = "Sending...";

  const successMessage = document.getElementById("contact-form-success");
  const errorMessage = document.getElementById("contact-form-error");

  let recaptchaResponse;
  try {
    // Validate reCAPTCHA
    const recaptchaSiteKey = "6Lept5grAAAAAL_t6IKTDCJBiigne_gUmkqGAMkC";
    recaptchaResponse = await grecaptcha.execute(recaptchaSiteKey, {
      action: "contact_form",
    });
  } catch (error) {
    console.error("reCAPTCHA error:", error);
    errorMessage.classList.remove("hidden");
    return;
  }

  const data = {
    subject: "[Jimmy Pells] Contact Form",
    message: `Name: ${document.getElementById("name").value}\nEmail: ${document.getElementById("email").value}\nMessage: ${document.getElementById("message").value}`,
    recaptchaResponse: recaptchaResponse,
  };

  const request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        successMessage.classList.remove("hidden");
        document.getElementById("submit-btn").value = "Sent";
      } else {
        try {
          const response = JSON.parse(this.responseText);
          if (response.error) {
            errorMessage.textContent = response.error;
          }
        } catch (err) {
          console.error("Failed to parse error response:", err);
        }
        errorMessage.classList.remove("hidden");
      }
    }
  };

  request.onerror = () => {
    console.error("Network error occurred.");
    errorMessage.classList.remove("hidden");
  };

  const endpoint =
    "https://z46dfp1938.execute-api.us-east-1.amazonaws.com/prod/send";
  request.open("POST", endpoint, true);
  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  request.send(JSON.stringify(data));
});
