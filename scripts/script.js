/*
    I don't created or own the JavaScript code for the Lorenz Attractor canvas
    I copied it from source: https://www.eigenron.com/
*/

class LorenzAttractor {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.setupCanvas();

        // Lorenz parameters
        this.sigma = 10.0;
        this.rho = 28.0;
        this.beta = 8.0 / 3.0;
        this.dt = 0.01;

        // Animation settings
        this.maxTrailLength = 300;
        this.fadeSpeed = 0.02;

        // Multiple initial conditions with neon colors
        this.attractors = [
            { x: 1, y: 1, z: 1, trail: [], color: '#00FFFF' },      // Cyan
            { x: 2, y: 1, z: 1, trail: [], color: '#FF00FF' },      // Magenta
            { x: 1, y: 2, z: 1, trail: [], color: '#FFFF00' },      // Yellow
            { x: 1, y: 1, z: 2, trail: [], color: '#00FF00' },      // Green
            { x: -1, y: -1, z: 1, trail: [], color: '#FF4000' },    // Orange
            { x: 0.5, y: -0.5, z: 1.5, trail: [], color: '#8000FF' } // Purple
        ];

        this.setupEventListeners();
        this.prePopulateTrails(); // Pre-populate for smooth start
        this.animate();
    }

    setupCanvas() {
        // Responsive size based on container
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';

        // Get actual container dimensions
        const container = this.canvas.parentElement;
        const containerRect = container.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;

        // Set optimized resolution for smooth performance
        const pixelRatio = window.devicePixelRatio || 1;
        const superSamplingRatio = 2; // 2x supersampling for balance of quality and performance
        this.canvas.width = containerWidth * pixelRatio * superSamplingRatio;
        this.canvas.height = containerHeight * pixelRatio * superSamplingRatio;

        this.ctx.scale(pixelRatio * superSamplingRatio, pixelRatio * superSamplingRatio);
        this.ctx.strokeWidth = 1.0;

        // Enable high-quality rendering for smooth lines
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        this.width = containerWidth;
        this.height = containerHeight;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;

        // Scale proportionally based on container size
        // Base scale for 700px width container
        const baseScale = 2;
        this.scale = baseScale * (containerWidth / 700);
    }

    setupEventListeners() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Clear trails and repopulate for new dimensions
                this.attractors.forEach(attractor => {
                    attractor.trail = [];
                });
                this.setupCanvas();
                this.prePopulateTrails();
            }, 150);
        });
    }

    prePopulateTrails() {
        // Pre-calculate some trail points for smooth startup
        for (let step = 0; step < 100; step++) {
            this.attractors.forEach(attractor => {
                const [dx, dy, dz] = this.lorenzEquations(attractor.x, attractor.y, attractor.z);

                attractor.x += dx;
                attractor.y += dy;
                attractor.z += dz;

                const [screenX, screenY] = this.projectTo2D(attractor.x, attractor.y, attractor.z);
                attractor.trail.push([screenX, screenY]);
            });
        }
    }

    lorenzEquations(x, y, z) {
        const dx = this.sigma * (y - x) * this.dt;
        const dy = (x * (this.rho - z) - y) * this.dt;
        const dz = (x * y - this.beta * z) * this.dt;
        return [dx, dy, dz];
    }

    projectTo2D(x, y, z) {
        // Front view of butterfly - X-Z plane projection centered on screen
        // This shows the classic butterfly shape head-on with wider aspect ratio
        return [
            this.centerX + x * this.scale * 2,  // 1.5x wider horizontally
            this.centerY - (z - 15) * this.scale  // Center around z=25 (typical Lorenz center)
        ];
    }

    update() {
        // Clear canvas completely for transparent background
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.attractors.forEach(attractor => {
            // Calculate next point using Lorenz equations
            const [dx, dy, dz] = this.lorenzEquations(attractor.x, attractor.y, attractor.z);

            attractor.x += dx;
            attractor.y += dy;
            attractor.z += dz;

            // Project to 2D
            const [screenX, screenY] = this.projectTo2D(attractor.x, attractor.y, attractor.z);

            // Add to trail
            attractor.trail.push([screenX, screenY]);

            // Limit trail length
            if (attractor.trail.length > this.maxTrailLength) {
                attractor.trail.shift();
            }

            // Draw trail with gradient
            this.drawTrail(attractor);
        });
    }

    drawTrail(attractor) {
        if (attractor.trail.length < 2) return;

        this.ctx.globalCompositeOperation = 'lighter';
        this.ctx.strokeStyle = attractor.color;
        this.ctx.lineWidth = 1.5;
        this.ctx.globalAlpha = 0.4;

        // Simple continuous path for maximum performance
        this.ctx.beginPath();
        this.ctx.moveTo(attractor.trail[0][0], attractor.trail[0][1]);

        // Draw every 2nd point for performance while maintaining smoothness
        for (let i = 2; i < attractor.trail.length; i += 2) {
            this.ctx.lineTo(attractor.trail[i][0], attractor.trail[i][1]);
        }

        // Always include the last point
        if (attractor.trail.length > 1) {
            this.ctx.lineTo(attractor.trail[attractor.trail.length - 1][0], attractor.trail[attractor.trail.length - 1][1]);
        }

        this.ctx.stroke();
        this.ctx.globalAlpha = 1;
        this.ctx.globalCompositeOperation = 'source-over';
    }

    animate() {
        this.update();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('lorenzCanvas');
    new LorenzAttractor(canvas);
});