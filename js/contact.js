function submitToAPI(e) {
  e.preventDefault();
  var data = {
    name : $("#contact-form #name").val(),
    email : $("#contact-form #email").val(),
    message : $("#contact-form #message").val()
  };
  $.ajax({
    type: "POST",
    url : "https://z46dfp1938.execute-api.us-east-1.amazonaws.com/prod",
    dataType: "json",
    crossDomain: "true",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    success: function () {
      $("#contact-form").hide();
      $("p:first").text("Thanks for getting in touch with me. I will get back to you as soon as possible.");
    },
    error: function () {
      $("#contact-form").hide();
      $("p:first").text("An error has occurred, please try again later.");
    }
  });
}
