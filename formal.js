let submit = document.getElementById("to-stage-0");
submit.onclick = function(e) {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let date = document.getElementById("date").value;
  let validName = /[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/;
  let validDate = /2019[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])/;
  if (!validName.test(name)) {
    alert("Please fill in a valid name");
  } else if (!validDate.test(date)) {
    alert("Please fill in a valid date");
  } else {
    e.target.setAttribute("disabled", true);
    e.target.textContent = "Submitting...";
    alert(
      "Thank you. You will now print the page and save it for your reference."
    );
    print();
    location = "game.html";
  }
};
