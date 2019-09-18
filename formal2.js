let proceed = document.getElementById("to-sign");
proceed.onclick = function(e) {
  e.preventDefault();
  alert(
    "Thank you. You will now print the page and be guided to conscent form."
  );
  print();
  location = "conscent.html";
};
