let certImages = document.querySelectorAll('.certificate-img');

certImages.forEach(img => {
    img.addEventListener('mousemove', (e) => {
        let rect = img.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        let halfWidth = img.offsetWidth / 2;
        let halfHeight = img.offsetHeight / 2;

        // Increase the tilt effect by increasing the multiplier
        let rotateX = (y - halfHeight) / halfHeight * 25; // Increased from 10 to 20
        let rotateY = (halfWidth - x) / halfWidth * 25;  // Increased from 10 to 20

        img.style.setProperty('--rX', `${rotateX}deg`);
        img.style.setProperty('--rY', `${rotateY}deg`);
    });

    img.addEventListener('mouseout', () => {
        img.style.setProperty('--rX', '0deg');
        img.style.setProperty('--rY', '0deg');
    });
});
