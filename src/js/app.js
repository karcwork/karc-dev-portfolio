document.addEventListener('DOMContentLoaded', function () {

    phoneMenu();
    highlightedLink()
    observeHeaderAndInfo();
});

document.addEventListener('DOMContentLoaded', () => {
    const lightModeSaved = localStorage.getItem('lightMode');
    if (lightModeSaved === 'true') {
        document.body.classList.add('light-mode');
    }

    // Llama a la función darkMode para agregar el evento al botón
    lightMode();
});


function lightMode() {
    document.querySelector('.lightMode-btn').addEventListener('click', () => {
        // Cambia la clase del body
        document.body.classList.toggle('light-mode');

        // Guarda el estado actual en localStorage
        const lightModeActivated = document.body.classList.contains('light-mode');
        localStorage.setItem('lightMode', lightModeActivated);
    });
}

function phoneMenu() {
    const mobileMenu = document.querySelector('.hamburger');

    mobileMenu.addEventListener('click', function () {
        responsiveNav();
    });
}

function responsiveNav() {
    setTimeout(() => {
        const body = document.querySelector('body');
        body.classList.toggle('overflow-hidden');

        const modal = document.querySelector('.modal-div');
        modal.classList.toggle('modal');

    }, 150);

    const navegacion = document.querySelector('.main__nav');
    navegacion.classList.toggle('visible');
}


function highlightedLink() {
    const highlightLink = function () {
        const navLinks = document.querySelectorAll('.main__nav a');
        const headerHeight = document.querySelector('.header__content').offsetHeight;
        let actual = '';

        // Iteramos sobre las secciones usando getBoundingClientRect
        document.querySelectorAll('section').forEach(section => {
            const rect = section.getBoundingClientRect();
            // Si la parte superior de la sección está por encima del header 
            // y la parte inferior aún es visible (más abajo del header)
            if (rect.top <= headerHeight && rect.bottom > headerHeight) {
                actual = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${actual}`) {
                link.classList.add('active');
            }
        });
    };

    // Ejecuta al cargar y en cada scroll
    window.addEventListener('scroll', highlightLink);
    highlightLink();
}



function observeHeaderAndInfo() {
    const headerContent = document.querySelector('.header__content');
    const infoSection = document.querySelector('.info-section');
    const torch = document.querySelector('.header__content .container');
    const torchFilter = "hue-rotate(180deg)";
    const torchLMFilter = "hue-rotate(280deg)";
    const torchDefaultFilter = "hue-rotate(0)";
    const defaultFilter = "blur(4px)";
    const LMactiveFilter = "grayscale(100%) blur(30px)";
    const activeFilter = "blur(25px)";


    window.addEventListener('scroll', function () {
        const headerRect = headerContent.getBoundingClientRect();
        const infoRect = infoSection.getBoundingClientRect();

        if (headerRect.bottom >= infoRect.top & document.body.classList.contains('light-mode')) {
            headerContent.style.backdropFilter = LMactiveFilter;
            torch.style.filter = torchLMFilter;
        } else if (headerRect.bottom >= infoRect.top) {
            headerContent.style.backdropFilter = activeFilter;
            torch.style.filter = torchFilter;
        }
        else {
            headerContent.style.backdropFilter = defaultFilter;
            torch.style.filter = torchDefaultFilter;

        }
    });
}


// --------------------------------------------------------------------
// Footer 

// Instagram
document.querySelector(".card1").addEventListener("click", () => {
    window.open("https://www.instagram.com/axelrry?igsh=cGZyam0wYWg3dDlh", "_blank");
});

// GitHub
document.querySelector(".card2").addEventListener("click", () => {
    window.open("https://github.com/karcwork", "_blank");
});

// WhatsApp (abre chat con número)
document.querySelector(".card3").addEventListener("click", () => {
    window.open("https://wa.me/524422261890", "_blank"); // Código país + número sin espacios
});

// Gmail (abre ventana de composición)
document.querySelector(".card4").addEventListener("click", () => {
    window.location.href = "mailto:karcwork@gmail.com";
});

// Scroll to top button
document.querySelector(".footer__button").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});




