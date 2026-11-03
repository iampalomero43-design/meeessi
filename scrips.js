
 // MENÚ PARA CELULARES
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", function () {
    const abierto = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", abierto ? "true" : "false");
    menuToggle.textContent = abierto ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

// MODO OSCURO
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    const oscuro = document.body.classList.contains("dark");

    themeToggle.textContent = oscuro ? "☀️" : "🌙";
    themeToggle.setAttribute(
      "aria-label",
      oscuro ? "Activar modo claro" : "Activar modo oscuro"
    );
  });
}

// FILTROS DE LA GALERÍA
const filterButtons = document.querySelectorAll("[data-filter]");
const photoCards = document.querySelectorAll(".photo-card");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (item) {
      item.classList.remove("active");
    });

    button.classList.add("active");

    const filtro = button.getAttribute("data-filter");

    photoCards.forEach(function (card) {
      const categoria = card.getAttribute("data-category");

      if (filtro === "todas" || categoria === filtro) {
        card.hidden = false;
      } else {
        card.hidden = true;
      }
    });
  });
});

// AMPLIAR LAS FOTOS
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

function cerrarFoto() {
  if (lightbox && lightboxImage) {
    lightbox.style.display = "none";
    lightboxImage.src = "";
  }
}

if (lightbox && lightboxImage) {
  document.querySelectorAll(".photo-card img").forEach(function (image) {
    image.addEventListener("click", function () {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.style.display = "flex";
    });
  });

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      cerrarFoto();
    }
  });
}

if (closeLightbox) {
  closeLightbox.addEventListener("click", cerrarFoto);
}

// CERRAR LA FOTO CON ESCAPE
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    cerrarFoto();
  }
});

// CUESTIONARIO SOBRE MESSI
const quizForm = document.getElementById("quizForm");
const quizResult = document.getElementById("quizResult");

if (quizForm && quizResult) {
  quizForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const preguntas = ["q1", "q2", "q3", "q4"];
    let puntos = 0;
    let respondidas = 0;

    preguntas.forEach(function (nombre) {
      const respuesta = quizForm.querySelector(
        'input[name="' + nombre + '"]:checked'
      );

      if (respuesta) {
        respondidas++;

        if (respuesta.value === "1") {
          puntos++;
        }
      }
    });

    if (respondidas < preguntas.length) {
      quizResult.textContent =
        "Respondé las cuatro preguntas antes de corregir.";
      return;
    }

    if (puntos === 4) {
      quizResult.textContent =
        "¡Excelente! Conocés muy bien la historia de Messi. 🏆";
    } else if (puntos >= 2) {
      quizResult.textContent =
        "¡Muy bien! Seguí aprendiendo sobre el fútbol. ⚽";
    } else {
      quizResult.textContent =
        "Podés repasar la página e intentarlo de nuevo. 🇦🇷";
    }
  });
}
