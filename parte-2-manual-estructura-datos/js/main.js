function copyCode(button) {
const codeBlock =
    button.parentElement
    ?.nextElementSibling;

if (!codeBlock) return;

const code = codeBlock.innerText;

navigator.clipboard
    .writeText(code)
    .then(() => {
    const originalText = button.innerText;
    button.innerText = "Copiado";
    button.disabled = true;
    setTimeout(() => {
        button.innerText = originalText;
        button.disabled = false;
    }, 2000);
    })
    .catch(() => {
    console.warn("No se pudo copiar el código.");
    });
}


const sections =
document.querySelectorAll(".section");

if (sections.length > 0) {
const observer = new IntersectionObserver(
    (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
        entry.target.classList.add("show-section");
        observer.unobserve(entry.target); 
        }
    });
    },
    { threshold: 0.15 }
);

sections.forEach((section) => {
    observer.observe(section);
});
}


const blur1 = document.querySelector(".blur-1");
const blur2 = document.querySelector(".blur-2");

if (blur1 || blur2) {
let ticking = false; 
window.addEventListener("scroll", () => {
    if (!ticking) {
    requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        if (blur1) {
        blur1.style.transform =
            `translateY(${scrollY * 0.2}px)`;
        }
        if (blur2) {
        blur2.style.transform =
            `translateY(-${scrollY * 0.15}px)`;
        }

        ticking = false;
    });

    ticking = true;
    }
});
}


const cards = document.querySelectorAll(
".topic-card, .example-card, .challenge-card"
);

cards.forEach((card) => {
card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;

    card.style.transform = `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scale(1.02)
    `;
});

card.addEventListener("mouseleave", () => {
    card.style.transform = `
    perspective(1000px)
    rotateX(0deg)
    rotateY(0deg)
    scale(1)
    `;
});
});

window.addEventListener("beforeunload", () => {
window.scrollTo(0, 0);
});