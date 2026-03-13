/* ============================================
   A&D Interiores — Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Sticky Header --- */
    const header = document.getElementById('header');
    const handleScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    /* --- Mobile Menu --- */
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        nav.classList.toggle('open');
    });

    /* Close on link click */
    nav.querySelectorAll('.header__link').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('open');
            nav.classList.remove('open');
        });
    });

    /* --- Smooth Scroll --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    /* --- Active Nav Link on Scroll --- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__link');

    const activateNav = () => {
        const scrollY = window.pageYOffset + 200;
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < bottom) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    };
    window.addEventListener('scroll', activateNav, { passive: true });

    /* --- Fade-Up on Scroll (Intersection Observer) --- */
    const fadeElements = document.querySelectorAll('.fade-up');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    /* Stagger child animations */
                    const parent = entry.target.parentElement;
                    const siblings = parent ? Array.from(parent.querySelectorAll('.fade-up')) : [];
                    const i = siblings.indexOf(entry.target);
                    const delay = i >= 0 ? i * 120 : 0;

                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeElements.forEach(el => observer.observe(el));
    } else {
        fadeElements.forEach(el => el.classList.add('visible'));
    }

});
