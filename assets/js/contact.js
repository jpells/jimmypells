const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("contact-form-success").classList.add("hidden");
  document.getElementById("contact-form-error").classList.add("hidden");
  let data = {
    name : document.getElementById("name").value,
    email : document.getElementById("email").value,
    message : document.getElementById("message").value,
  };
  let request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        for (let i = 0, len = contactForm.elements.length; i < len; ++i) {
          contactForm.elements[i].disabled = true;
        }
        document.getElementById("contact-form-success").classList.remove("hidden");
      } else {
        document.getElementById("contact-form-error").classList.remove("hidden");
      }
    }
  };
  request.open("POST", "https://z46dfp1938.execute-api.us-east-1.amazonaws.com/prod", true);
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  request.send(JSON.stringify(data));
});