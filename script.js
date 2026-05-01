const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const year5 = document.getElementById('year-5');
const year6 = document.getElementById('year-6');
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
const bgMusic = document.getElementById('bg-music');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];
let balloons = [];
let bubbles = [];

function countdown() {
    const newYear = new Date('January 1, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const gap = newYear - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const d = Math.floor(gap / day);
    const h = Math.floor((gap % day) / hour);
    const m = Math.floor((gap % hour) / minute);
    const s = Math.floor((gap % minute) / second);

    daysEl.innerHTML = d;
    hoursEl.innerHTML = h;
    minutesEl.innerHTML = m;
    secondsEl.innerHTML = s;

    if (gap <= 0) {
        clearInterval(timer);
        happyNewYear();
    }
}

function happyNewYear() {
    year5.style.animation = 'slideDown 1s ease-in-out forwards';
    setTimeout(() => {
        year6.style.display = 'inline-block';
        year6.style.animation = 'slideUp 1s ease-in-out forwards';
    }, 1000);
    startFireworks();
    startBalloons();
    startBubbles();
    bgMusic.play();
}

function startFireworks() {
    setInterval(() => {
        const firework = {
            x: Math.random() * canvas.width,
            y: canvas.height,
            particles: []
        };
        for (let i = 0; i < 30; i++) {
            firework.particles.push({
                x: firework.x,
                y: firework.y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                life: 100
            });
        }
        fireworks.push(firework);
    }, 500);
}

function startBalloons() {
    setInterval(() => {
        const balloon = {
            x: Math.random() * canvas.width,
            y: canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: -Math.random() * 2 - 1,
            color: `hsl(${Math.random() * 360}, 100%, 70%)`,
            size: Math.random() * 20 + 10
        };
        balloons.push(balloon);
    }, 1000);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((firework, fi) => {
        firework.particles.forEach((particle, pi) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1;
            particle.life--;
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.life / 100;
            ctx.fillRect(particle.x, particle.y, 2, 2);
            if (particle.life <= 0) {
                firework.particles.splice(pi, 1);
            }
        });
        if (firework.particles.length === 0) {
            fireworks.splice(fi, 1);
        }
    });
    balloons.forEach((balloon, bi) => {
        balloon.x += balloon.vx;
        balloon.y += balloon.vy;
        ctx.fillStyle = balloon.color;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(balloon.x, balloon.y, balloon.size, 0, Math.PI * 2);
        ctx.fill();
        if (balloon.y < -balloon.size) {
            balloons.splice(bi, 1);
        }
    });
    bubbles.forEach((bubble, bi) => {
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;
        ctx.fillStyle = bubble.color;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fill();
        if (bubble.y < -bubble.size) {
            bubbles.splice(bi, 1);
        }
    });
    requestAnimationFrame(animate);
}

animate();

const timer = setInterval(countdown, 1000);
countdown();
