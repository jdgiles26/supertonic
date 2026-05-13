// Interactive stars/particles background with American theme
class StarField {
    constructor() {
        this.canvas = document.getElementById('stars-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.mouseX = 0;
        this.mouseY = 0;

        this.resize();
        this.createStars();
        this.setupMouseTracking();

        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createStars() {
        const numStars = 150;
        this.stars = [];

        for (let i = 0; i < numStars; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2 + 0.5,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.3,
                // American flag colors: red, white, blue
                color: this.getRandomColor()
            });
        }
    }

    getRandomColor() {
        const colors = [
            'rgba(220, 38, 38, ',   // Red
            'rgba(255, 255, 255, ', // White
            'rgba(37, 99, 235, '    // Blue
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }

    drawStar(star) {
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = star.color + star.opacity + ')';
        this.ctx.fill();

        // Add glow effect
        const gradient = this.ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.radius * 3
        );
        gradient.addColorStop(0, star.color + (star.opacity * 0.8) + ')');
        gradient.addColorStop(1, star.color + '0)');
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }

    updateStar(star) {
        // Move star
        star.x += star.vx;
        star.y += star.vy;

        // Mouse interaction - stars move away from cursor
        const dx = this.mouseX - star.x;
        const dy = this.mouseY - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
            const force = (150 - distance) / 150;
            star.x -= (dx / distance) * force * 2;
            star.y -= (dy / distance) * force * 2;
        }

        // Wrap around edges
        if (star.x < 0) star.x = this.canvas.width;
        if (star.x > this.canvas.width) star.x = 0;
        if (star.y < 0) star.y = this.canvas.height;
        if (star.y > this.canvas.height) star.y = 0;

        // Twinkle effect
        star.opacity += (Math.random() - 0.5) * 0.02;
        star.opacity = Math.max(0.2, Math.min(0.8, star.opacity));
    }

    connectStars() {
        for (let i = 0; i < this.stars.length; i++) {
            for (let j = i + 1; j < this.stars.length; j++) {
                const dx = this.stars[i].x - this.stars[j].x;
                const dy = this.stars[i].y - this.stars[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distance / 100) * 0.15})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.stars[i].x, this.stars[i].y);
                    this.ctx.lineTo(this.stars[j].x, this.stars[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw connections first (so they appear behind stars)
        this.connectStars();

        // Update and draw stars
        this.stars.forEach(star => {
            this.updateStar(star);
            this.drawStar(star);
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new StarField();
    });
} else {
    new StarField();
}
