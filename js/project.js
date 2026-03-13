/* ============================================
   A&D Interiores — Project Page Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Lightbox --- */
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImg = lightbox.querySelector('.lightbox__img');
    const lightboxCounter = lightbox.querySelector('.lightbox__counter');
    const galleryItems = document.querySelectorAll('.gallery-grid__item');
    let currentIndex = 0;
    const images = [];

    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        images.push(img.src);

        item.addEventListener('click', () => {
            currentIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        lightboxImg.src = images[currentIndex];
        lightboxCounter.textContent = (currentIndex + 1) + ' / ' + images.length;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex];
        lightboxCounter.textContent = (currentIndex + 1) + ' / ' + images.length;
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex];
        lightboxCounter.textContent = (currentIndex + 1) + ' / ' + images.length;
    }

    lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox__next').addEventListener('click', nextImage);
    lightbox.querySelector('.lightbox__prev').addEventListener('click', prevImage);

    /* Close on backdrop click */
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    /* Keyboard navigation */
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

});
