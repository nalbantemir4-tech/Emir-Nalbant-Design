/* ===== SCRIPT.JS – Emir NALBANT Portfolio ===== */

// ─── EmailJS Init ─────────────────────────────────────
(function () {
    emailjs.init('R8fLAyS_CVaXA89-y');
})();

// ─── Navbar scroll effect ──────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ─── Mobile Menu ──────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.display = open ? 'none' : 'flex';
    navLinks.style.position = 'fixed';
    navLinks.style.flexDirection = 'column';
    navLinks.style.top = '70px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(5,8,16,0.98)';
    navLinks.style.padding = '24px';
    navLinks.style.gap = '20px';
    navLinks.style.backdropFilter = 'blur(20px)';
    navLinks.style.zIndex = '999';
});

// ─── Counter Animation ────────────────────────────────
function animateCounter(el, target) {
    let start = 0;
    const step = Math.ceil(target / 60);
    const t = setInterval(() => {
        start += step;
        if (start >= target) { el.textContent = target; clearInterval(t); }
        else { el.textContent = start; }
    }, 25);
}

let counted = false;
const heroSec = document.querySelector('.hero');
const heroObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !counted) {
        counted = true;
        document.querySelectorAll('.stat-num').forEach(el =>
            animateCounter(el, parseInt(el.dataset.target))
        );
    }
}, { threshold: 0.4 });
if (heroSec) heroObs.observe(heroSec);

// ─── Reveal on Scroll ─────────────────────────────────
const revealEls = document.querySelectorAll(
    '.service-card, .portfolio-item, .testimonial-card, .about-card, .skill-item, .contact-item, .process-step'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const delay = e.target.dataset.delay || 0;
            setTimeout(() => e.target.classList.add('visible'), parseInt(delay));
            revealObs.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

// ─── Skill Bars ───────────────────────────────────────
const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.width = e.target.dataset.width + '%';
            skillObs.unobserve(e.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.skill-fill').forEach(el => skillObs.observe(el));

// ─── Portfolio Filter ─────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        portfolioItems.forEach(item => {
            const match = filter === 'all' || item.dataset.category === filter;
            item.style.opacity = match ? '1' : '0.2';
            item.style.transform = match ? '' : 'scale(0.95)';
            item.style.pointerEvents = match ? 'all' : 'none';
            item.style.transition = 'opacity 0.4s, transform 0.4s';
        });
    });
});

// ─── Testimonial Auto Slider ──────────────────────────
const track = document.getElementById('testimonialTrack');
const dots = document.querySelectorAll('.dot');
const cards = document.querySelectorAll('.testimonial-card');
let current = 0, autoPlay;

function goTo(index) {
    const cardW = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${index * cardW}px)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
    current = index;
}
function nextSlide() { goTo((current + 1) % dots.length); }
function startAuto() { autoPlay = setInterval(nextSlide, 4000); }
function stopAuto() { clearInterval(autoPlay); }

dots.forEach((d, i) => d.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); }));
startAuto();

// ─── Contact Form – EmailJS ───────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const btn = document.getElementById('submitBtn');
        const submitText = document.getElementById('submitText');
        const formMsg = document.getElementById('formMessage');

        // Loading state
        submitText.textContent = 'Gönderiliyor...';
        btn.disabled = true;

        // ⚠️ Template ID'nizi buraya ekleyin (EmailJS > Email Templates)
        const SERVICE_ID = 'service_36lvinm';
        const TEMPLATE_ID = 'template_7a478s1';

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm)
            .then(function () {
                submitText.textContent = 'Mesaj Gönder';
                btn.disabled = false;
                formMsg.style.display = 'block';
                formMsg.style.background = 'rgba(34,197,94,0.12)';
                formMsg.style.color = '#22c55e';
                formMsg.style.border = '1px solid rgba(34,197,94,0.3)';
                formMsg.textContent = '✓ Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağım.';
                contactForm.reset();
                setTimeout(() => { formMsg.style.display = 'none'; }, 6000);
            })
            .catch(function (error) {
                submitText.textContent = 'Mesaj Gönder';
                btn.disabled = false;
                formMsg.style.display = 'block';
                formMsg.style.background = 'rgba(239,68,68,0.12)';
                formMsg.style.color = '#ef4444';
                formMsg.style.border = '1px solid rgba(239,68,68,0.3)';
                formMsg.textContent = '✗ Bir hata oluştu. Lütfen tekrar deneyin.';
                console.error('EmailJS Error:', error);
                setTimeout(() => { formMsg.style.display = 'none'; }, 6000);
            });
    });
}

// ─── Active nav link on scroll ────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let id = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) id = s.id; });
    navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + id ? 'var(--text)' : '';
    });
}, { passive: true });


/* ═══════════════════════════════════════════════════
   INDUSTRIAL DESIGN BACKGROUND — Technical Drawing
   Dot grid + drifting geometric outlines
   Mouse: dots glow, shapes gently drift away
═══════════════════════════════════════════════════ */
(function () {
    const bg = document.getElementById('bgCanvas');
    if (!bg) return;
    const bctx = bg.getContext('2d');
    let bw, bh;
    let mouse = { x: -9999, y: -9999 };

    function bgResize() {
        bw = bg.width = window.innerWidth;
        bh = bg.height = window.innerHeight;
    }
    bgResize();
    window.addEventListener('resize', bgResize, { passive: true });

    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }, { passive: true });
    window.addEventListener('mouseleave', () => {
        mouse.x = -9999; mouse.y = -9999;
    });

    /* ── Dot grid ──────────────────────────────────────
       Like engineering dot paper. Dots near mouse glow. */
    const DOT_GAP = 46;

    function drawDotGrid() {
        const cols = Math.ceil(bw / DOT_GAP);
        const rows = Math.ceil(bh / DOT_GAP);
        for (let c = 1; c <= cols; c++) {
            for (let r = 1; r <= rows; r++) {
                const x = c * DOT_GAP;
                const y = r * DOT_GAP;
                const dx = x - mouse.x;
                const dy = y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const near = dist < 150;
                const t = near ? 1 - dist / 150 : 0;
                const alpha = 0.07 + t * 0.20;
                const r2 = 0.7 + t * 0.9;

                bctx.fillStyle = `rgba(34,197,94,${alpha})`;
                bctx.beginPath();
                bctx.arc(x, y, r2, 0, Math.PI * 2);
                bctx.fill();
            }
        }
    }

    /* ── Geometric shape helpers ─────────────────────── */
    function drawCircle(s) {
        bctx.beginPath();
        bctx.arc(0, 0, s.size, 0, Math.PI * 2);
        bctx.stroke();
        // Inner ring
        bctx.globalAlpha *= 0.45;
        bctx.beginPath();
        bctx.arc(0, 0, s.size * 0.5, 0, Math.PI * 2);
        bctx.stroke();
        // Centre cross
        bctx.globalAlpha *= 0.6;
        const c = 8;
        bctx.beginPath();
        bctx.moveTo(-c, 0); bctx.lineTo(c, 0);
        bctx.moveTo(0, -c); bctx.lineTo(0, c);
        bctx.stroke();
    }

    function drawHexagon(s) {
        function hex(r) {
            bctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const a = (Math.PI / 3) * i - Math.PI / 6;
                const fn = i === 0 ? 'moveTo' : 'lineTo';
                bctx[fn](r * Math.cos(a), r * Math.sin(a));
            }
            bctx.closePath();
            bctx.stroke();
        }
        hex(s.size);
        bctx.globalAlpha *= 0.45;
        hex(s.size * 0.55);
    }

    function drawCross(s) {
        // Drafting crosshair with measurement ticks
        const sz = s.size;
        const tick = sz * 0.14;
        bctx.lineWidth = 0.55;
        bctx.beginPath();
        bctx.moveTo(-sz, 0); bctx.lineTo(sz, 0);
        bctx.moveTo(0, -sz); bctx.lineTo(0, sz);
        [-sz * 0.5, sz * 0.5].forEach(o => {
            bctx.moveTo(o, -tick); bctx.lineTo(o, tick);
            bctx.moveTo(-tick, o); bctx.lineTo(tick, o);
        });
        // End arrows
        bctx.moveTo(sz - 6, -5); bctx.lineTo(sz, 0); bctx.lineTo(sz - 6, 5);
        bctx.moveTo(-sz + 6, -5); bctx.lineTo(-sz, 0); bctx.lineTo(-sz + 6, 5);
        bctx.stroke();
    }

    function drawArc(s) {
        // Partial arc with radius indicator — like a compass arc
        bctx.beginPath();
        bctx.arc(0, 0, s.size, -0.3, Math.PI * 1.1);
        bctx.stroke();
        // Arrowhead at end
        const endA = Math.PI * 1.1;
        const ax = s.size * Math.cos(endA);
        const ay = s.size * Math.sin(endA);
        bctx.lineWidth = 0.5;
        bctx.beginPath();
        bctx.moveTo(ax - 6, ay - 5);
        bctx.lineTo(ax, ay);
        bctx.lineTo(ax - 2, ay + 7);
        bctx.stroke();
        // Radius line
        bctx.globalAlpha *= 0.4;
        bctx.setLineDash([4, 5]);
        bctx.beginPath();
        bctx.moveTo(0, 0); bctx.lineTo(s.size * 0.9, 0);
        bctx.stroke();
        bctx.setLineDash([]);
    }

    function drawSquare(s) {
        const h = s.size * 0.72;
        bctx.strokeRect(-h / 2, -h / 2, h, h);
        // Diagonals
        bctx.globalAlpha *= 0.25;
        bctx.setLineDash([3, 5]);
        bctx.beginPath();
        bctx.moveTo(-h / 2, -h / 2); bctx.lineTo(h / 2, h / 2);
        bctx.moveTo(h / 2, -h / 2); bctx.lineTo(-h / 2, h / 2);
        bctx.stroke();
        bctx.setLineDash([]);
        // Centre dot
        bctx.globalAlpha *= 3;
        bctx.beginPath();
        bctx.arc(0, 0, 1.5, 0, Math.PI * 2);
        bctx.fillStyle = 'rgba(34,197,94,0.8)';
        bctx.fill();
    }

    function drawTriangle(s) {
        const h = s.size;
        bctx.beginPath();
        bctx.moveTo(0, -h);
        bctx.lineTo(h * 0.866, h * 0.5);
        bctx.lineTo(-h * 0.866, h * 0.5);
        bctx.closePath();
        bctx.stroke();
        // Inscribed circle
        bctx.globalAlpha *= 0.35;
        bctx.beginPath();
        bctx.arc(0, h * 0.1, h * 0.33, 0, Math.PI * 2);
        bctx.stroke();
    }

    /* ── Shape pool ──────────────────────────────────── */
    const DRAWERS = [drawCircle, drawHexagon, drawCross, drawArc, drawSquare, drawTriangle];

    function mkShape() {
        return {
            draw: DRAWERS[Math.floor(Math.random() * DRAWERS.length)],
            x: Math.random() * bw,
            y: Math.random() * bh,
            size: 45 + Math.random() * 100,
            rot: Math.random() * Math.PI * 2,
            drot: (Math.random() - 0.5) * 0.0014,
            vx: (Math.random() - 0.5) * 0.10,
            vy: (Math.random() - 0.5) * 0.10,
            alpha: 0.030 + Math.random() * 0.040,
        };
    }

    const SHAPES = Array.from({ length: 20 }, mkShape);

    function updateShape(s) {
        // Gentle mouse repulsion
        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
            const f = (200 - dist) / 200 * 0.006;
            s.vx += (dx / dist) * f;
            s.vy += (dy / dist) * f;
            s.drot += 0.00015;
        }
        const spd = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        if (spd > 0.45) { s.vx *= 0.45 / spd; s.vy *= 0.45 / spd; }
        s.vx *= 0.993; s.vy *= 0.993;
        s.x += s.vx; s.y += s.vy;
        s.rot += s.drot; s.drot *= 0.99;
        const pad = s.size + 20;
        if (s.x < -pad) s.x = bw + pad;
        if (s.x > bw + pad) s.x = -pad;
        if (s.y < -pad) s.y = bh + pad;
        if (s.y > bh + pad) s.y = -pad;
    }

    function renderShape(s) {
        bctx.save();
        bctx.translate(s.x, s.y);
        bctx.rotate(s.rot);
        bctx.globalAlpha = s.alpha;
        bctx.strokeStyle = 'rgba(34,197,94,1)';
        bctx.fillStyle = 'rgba(34,197,94,1)';
        bctx.lineWidth = 0.65;
        s.draw(s);
        bctx.restore();
    }

    /* ── Main loop ────────────────────────────────────── */
    function bgAnimate() {
        bctx.clearRect(0, 0, bw, bh);
        drawDotGrid();
        SHAPES.forEach(s => { updateShape(s); renderShape(s); });
        requestAnimationFrame(bgAnimate);
    }

    bgAnimate();
})();
