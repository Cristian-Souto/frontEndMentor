
document.addEventListener("DOMContentLoaded", () => {
  const btnCalculator = document.getElementById("btnCalulator");
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");
  const textOutputYear = document.getElementById("text-output-year");
  const textOutputMonth = document.querySelectorAll(".text-output")[1];
  const textOutputDay = document.querySelectorAll(".text-output")[2];
  const errorMessages = document.querySelectorAll(".error-invalid");
  const errorInvalidInput = document.querySelectorAll(".error-invalid-input");


  btnCalculator.addEventListener("click", () => {
    // Limpiar mensajes de error
    errorMessages.forEach((messages) => (messages.style.display = "none"));
    errorInvalidInput.forEach((msg) => msg.classList.remove("error-invalid-input"));
    // Obtener los valores de entrada
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    // Validaciones
    let valid = true;

    if (isNaN(day) || day < 1 || day > 31) {
      errorMessages[0].style.display = "block";
      dayInput.previousElementSibling.classList.add("error-invalid-input");
      valid = false;
    }
    if (isNaN(month) || month < 1 || month > 12) {
      errorMessages[1].style.display = "block";
      monthInput.previousElementSibling.classList.add("error-invalid-input");
      valid = false;
    }
    if (isNaN(year) || year > new Date().getFullYear() || year < 1) {
      errorMessages[2].style.display = "block";
      yearInput.previousElementSibling.classList.add("error-invalid-input");
      valid = false;
    }

    if (!valid) {
      return;
    }

    // Crear la fecha de nacimiento
    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();

    // Validar la fecha de nacimiento
    if (birthDate > currentDate) {
      errorMessages[2].style.display = "block";
      return;
    }

    // Calcular la edad en años, meses y días
    let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageDays = currentDate.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageDays += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
      ageMonths--;
    }

    if (ageMonths < 0) {
      ageMonths += 12;
      ageYears--;
    }

    // Mostrar la edad en el DOM
    textOutputYear.textContent = ageYears;
    textOutputMonth.textContent = ageMonths;
    textOutputDay.textContent = ageDays;
  });
});
