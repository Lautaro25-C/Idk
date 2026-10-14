const sendBtn = document.getElementById("form-btn");
const formPage = document.getElementById("form");
const msgPage = document.getElementById("msg");
const Telefono = document.getElementById("telefono");

sendBtn.addEventListener("click", sendForm);
const digitos = Telefono.value;
function sendForm(e) {
  e.preventDefault();

  if (formPage.checkValidity()) {
    formPage.classList.remove("active");
    msgPage.classList.add("active");
  } else {
    formPage.reportValidity();
  }
  if (digitos.length < 10 || digitos.length > 13) {
    alert("Ingresá un teléfono válido.");
  }
}
