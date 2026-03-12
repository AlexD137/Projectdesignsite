// Плавный скролл для меню (только для ссылок с реальными якорями)
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        // Показываем хедер перед скроллом
        header.style.transform = 'translateY(0)';

        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });

            // Сбрасываем lastScroll, чтобы хедер не спрятался сразу после скролла
            setTimeout(() => {
                lastScroll = window.pageYOffset;
            }, 500);
        }
    });
});

// Анимация появления секций при скролле
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll("section").forEach(section => {
    observer.observe(section);
});

// Плавное исчезновение хедера при скролле
let lastScroll = 0;
const header = document.querySelector('header');
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// ===== БУРГЕР-МЕНЮ =====
const burger = document.querySelector('.burger-menu');
const nav = document.querySelector('header nav');

if (burger) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Закрываем меню при клике на ссылку
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            nav.classList.remove('active');
        });
    });
}

// ===== МОДАЛЬНОЕ ОКНО =====
const modal = document.getElementById('callbackModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalForm = document.getElementById('modalForm');
const modalSuccess = document.getElementById('modalSuccess');
const successClose = document.getElementById('successClose');
const callbackForm = document.getElementById('callbackForm');

// Все кнопки, которые открывают модальное окно
const modalTriggers = [
    document.querySelector('.header-btn'),
    document.querySelector('.hero-btn'),
    ...document.querySelectorAll('.price-card__btn'),
    ...document.querySelectorAll('.price-btn')
].filter(btn => btn !== null);

function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';

    setTimeout(() => {
        modalForm.style.display = 'block';
        modalSuccess.style.display = 'none';
        if (callbackForm) callbackForm.reset();
    }, 300);
}

modalTriggers.forEach(btn => {
    if (btn) {
        btn.addEventListener('click', openModal);
    }
});

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

if (callbackForm) {
    callbackForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('nameInput').value;
        const phone = document.getElementById('phoneInput').value;

        if (name && phone) {
            modalForm.style.display = 'none';
            modalSuccess.style.display = 'block';
            console.log('Отправка формы:', { name, phone });
        }
    });
}

if (successClose) {
    successClose.addEventListener('click', closeModal);
}

// ===== КНОПКА НАВЕРХ =====
const scrollToTopBtn = document.querySelector('.scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
