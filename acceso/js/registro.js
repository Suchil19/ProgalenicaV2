const loginText = document.querySelector(".title-text .login");
      const loginForm = document.querySelector("form.login");
      const loginBtn = document.querySelector("label.login");
      const signupBtn = document.querySelector("label.signup");
      const signupLink = document.querySelector("form .signup-link a");
      signupBtn.onclick = (()=>{
        loginForm.style.marginLeft = "-50%";
        loginText.style.marginLeft = "-50%";
      });
      loginBtn.onclick = (()=>{
        loginForm.style.marginLeft = "0%";
        loginText.style.marginLeft = "0%";
      });
      signupLink.onclick = (()=>{
        signupBtn.click();
        return false;
      });


// Validar nombre y apellidos



document.getElementById("nombre").addEventListener("input", function () {
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Solo letras y espacios
  let valor = this.value;
  let mensajeError = document.getElementById("nombreError");

  if (!regex.test(valor)) {
      mensajeError.style.display = "inline";
  } else {
      mensajeError.style.display = "none";
  }
});

document.getElementById("apellido_paterno").addEventListener("input", function () {
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Solo letras y espacios
  let valor = this.value;
  let mensajeError = document.getElementById("apellidoError");

  if (!regex.test(valor)) {
      mensajeError.style.display = "inline";
  } else {
      mensajeError.style.display = "none";
  }
});


// Validación del RFC
document.getElementById("rfc").addEventListener("input", function () {
  let regex = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/; // Expresión regular para RFC con homoclave
  let valor = this.value.toUpperCase(); // Convertir a mayúsculas
  let mensajeError = document.getElementById("mensajeError");

  if (!regex.test(valor)) {
      mensajeError.style.display = "inline";
  } else {
      mensajeError.style.display = "none";
  }
});



// Validar contraseñas 

document.getElementById("confirmPassword").addEventListener("input", function () {
  let password = document.getElementById("password").value;
  let confirmPassword = this.value;
  let error__pass = document.getElementById("error__pass");

  if (password !== confirmPassword) {
      error__pass.style.display = "inline";
  } else {
      error__pass.style.display = "none";
  }
});


// si las cobtraseñas son correctas 
document.getElementById("confirmPassword").addEventListener("input", function () {
  let password = document.getElementById("password").value;
  let confirmPassword = this.value;
  let errorMessage = document.getElementById("error__pass");
  let successMessage = document.getElementById("success__pass");

  if (password === confirmPassword && password.length > 0) {
      errorMessage.style.display = "none";
      successMessage.style.display = "inline";
  } else {
      errorMessage.style.display = "inline";
      successMessage.style.display = "none";
  }
});
//Validar correo

document.getElementById("correo").addEventListener("input", function () {
  let correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let correoValue = this.value;
  let correoError = document.getElementById("correoError");

  if (!correoRegex.test(correoValue)) {
      correoError.style.display = "inline";
  } else {
      correoError.style.display = "none";
  }
});

// Validar teléfono
document.querySelector("input[name='telefono']").addEventListener("input", function() {
  let regex = /^[0-9]{10}$/; // 10 dígitos numéricos
  let valor = this.value;
  let telefonoError = document.getElementById("telefonoError"); // Asegúrate de agregar este span en tu HTML
  
  if (!regex.test(valor)) {
    telefonoError.style.display = "inline";
  } else {
    telefonoError.style.display = "none";
  }
});



// boton submit 



// Reditreccionamiento 
document.getElementById("registroForm").addEventListener("submit", async function(event) {
  event.preventDefault();
  
  // Crear objeto con los datos
  const userData = {
    nombre: document.getElementById("nombre").value,
    apellido_paterno: document.getElementById("apellido_paterno").value,
    apellido_materno: document.querySelector("input[name='apellido_materno']").value,
    telefono: document.querySelector("input[name='telefono']").value,
    genero: document.querySelector("select[name='genero']").value,
    rfc: document.getElementById("rfc").value,
    email: document.getElementById("correo").value,
    password: document.getElementById("password").value
  };

  try {
    const response = await fetch('https://progalenica-back.onrender.com/progalenica/usuarios/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // ¡IMPORTANTE!
      },
      body: JSON.stringify(userData) // Convertir a JSON
    });

    const result = await response.json();
    
    if (response.ok) {
      window.location.href = 'registro-exitoso.html';
    } else {
      alert(result.message || "Error en el registro");
    }
  } catch (error) {
    alert("Error de conexión");
  }
});