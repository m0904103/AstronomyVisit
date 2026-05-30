document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxMedia = document.getElementById('lightbox-media');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');

    // Music Control
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const musicText = musicBtn.querySelector('.music-text');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicText.textContent = '播放星空配樂';
            musicBtn.classList.remove('playing');
        } else {
            bgMusic.play();
            musicText.textContent = '暫停配樂';
            musicBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });

    // Pause music if a video starts playing in lightbox
    const pauseMusicForVideo = () => {
        if (isPlaying) {
            bgMusic.pause();
            musicText.textContent = '播放星空配樂';
            musicBtn.classList.remove('playing');
            isPlaying = false;
        }
    };

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title');
            lightboxCaption.textContent = title;
            
            // Clear previous media
            lightboxMedia.innerHTML = '';

            const img = item.querySelector('img');
            const video = item.querySelector('video');

            if (img) {
                const newImg = document.createElement('img');
                newImg.src = img.src;
                lightboxMedia.appendChild(newImg);
            } else if (video) {
                pauseMusicForVideo();
                const newVideo = document.createElement('video');
                newVideo.src = video.querySelector('source').src;
                newVideo.controls = true;
                newVideo.autoplay = true;
                lightboxMedia.appendChild(newVideo);
            }

            lightbox.classList.add('active');
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightboxMedia.innerHTML = ''; // Stop video playback when closed
        }, 400);
    };

    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Create simple stars effect
    const bgAnimation = document.querySelector('.background-animation');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.opacity = Math.random();
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite alternate`;
        bgAnimation.appendChild(star);
    }

    // Add twinkle animation dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes twinkle {
            from { opacity: 0.2; }
            to { opacity: 1; box-shadow: 0 0 10px #fff, 0 0 20px #4a90e2; }
        }
    `;
    document.head.appendChild(style);
});
