const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        let rect = card.getBoundingClientRect();
        let xAxis = (rect.width / 2 - (e.clientX - rect.left)) / 10; // Increased tilting by lowering divisor
        let yAxis = (rect.height / 2 - (e.clientY - rect.top)) / 10; // Increased tilting by lowering divisor
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) scale(1.1)`; // Apply both zoom and tilt
    });

    card.addEventListener('mouseenter', (e) => {
        card.style.transition = "none"; // Remove transition for smooth tilt
    });

    card.addEventListener('mouseleave', (e) => {
        card.style.transition = "transform 0.8s ease"; // Slow down zoom effect
        card.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`; // Reset on mouse leave
    });
});
