// ==========================
// 🔥 LOGIN
// ==========================
function login() {
  let user = document.getElementById("usuario")?.value;
  let pass = document.getElementById("password")?.value;

  if (!user || !pass) {
    alert("Completa todos los campos");
    return;
  }

  if (user === "admin" && pass === "1234") {
    localStorage.setItem("login", "true");
    window.location.href = "admin.html";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

function logout() {
  localStorage.removeItem("login");
}


// ==========================
// 📁 GUARDAR ARCHIVO
// ==========================
function guardarArchivo() {
  let titulo = document.getElementById("tituloArchivo").value;
  let desc = document.getElementById("descArchivo").value;
  let semana = document.getElementById("semanaArchivo").value;
  let fileInput = document.getElementById("fileInput");

  let archivo = fileInput.files[0];

  if (!archivo) {
    alert("Selecciona un archivo");
    return;
  }

  let reader = new FileReader();

  reader.onload = function(e) {
    let archivos = JSON.parse(localStorage.getItem("archivos")) || [];

    archivos.push({
      id: Date.now(),
      titulo,
      desc,
      semana,
      archivo: e.target.result,
      tipo: archivo.type
    });

    localStorage.setItem("archivos", JSON.stringify(archivos));

    alert("Archivo guardado 🔥");

    limpiarFormulario();
    cargarAdmin();
  };

  reader.readAsDataURL(archivo);
}


// ==========================
// 📋 MOSTRAR ADMIN
// ==========================
function cargarAdmin() {
  let lista = document.getElementById("adminLista");
  if (!lista) return;

  lista.innerHTML = "";

  let archivos = JSON.parse(localStorage.getItem("archivos")) || [];

  archivos.forEach(a => {

    let preview = "";

    if (a.tipo.startsWith("image/")) {
      preview = `<img src="${a.archivo}" class="preview">`;
    } else if (a.tipo === "application/pdf") {
      preview = `<span>📄 PDF</span>`;
    }

    lista.innerHTML += `
      <div class="admin-card">
        ${preview}
        <div>
          <h4>${a.titulo}</h4>
          <p>${a.desc}</p>
          <small>Semana ${a.semana}</small>

          <div class="acciones">
            <button onclick="eliminar(${a.id})">🗑️</button>
          </div>
        </div>
      </div>
    `;
  });
}


// ==========================
// 🗑️ ELIMINAR
// ==========================
function eliminar(id) {
  let archivos = JSON.parse(localStorage.getItem("archivos")) || [];

  archivos = archivos.filter(a => a.id !== id);

  localStorage.setItem("archivos", JSON.stringify(archivos));

  cargarAdmin();
}


// ==========================
// 🧹 LIMPIAR FORMULARIO
// ==========================
function limpiarFormulario() {
  let t = document.getElementById("tituloArchivo");
  let d = document.getElementById("descArchivo");
  let f = document.getElementById("fileInput");

  if (t) t.value = "";
  if (d) d.value = "";
  if (f) f.value = "";
}


// ==========================
// 🚀 AUTO CARGA ADMIN
// ==========================
window.onload = function() {
  cargarAdmin();
};