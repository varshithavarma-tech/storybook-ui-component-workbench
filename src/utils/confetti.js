// Canvas Confetti Celebration Engine
export const triggerConfetti = (canvasId = 'confetti-canvas') => {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const numberOfPieces = 130;
  const colors = [
    '#f472b6', '#38bdf8', '#fbbf24', '#a78bfa',
    '#4ade80', '#fb7185', '#60a5fa', '#fcd34d'
  ];

  for (let i = 0; i < numberOfPieces; i++) {
    pieces.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height * 0.4 + (Math.random() - 0.5) * 100,
      r: Math.random() * 8 + 4,
      d: Math.random() * numberOfPieces,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngleIncremental: Math.random() * 0.07 + 0.05,
      tiltAngle: 0,
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -12 - 4,
      gravity: 0.28,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      shape: Math.random() > 0.4 ? 'circle' : 'rect'
    });
  }

  let animationFrame;
  let alpha = 1;
  const startTime = Date.now();

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const elapsed = Date.now() - startTime;

    if (elapsed > 4000) {
      alpha -= 0.03;
    }

    ctx.globalAlpha = Math.max(0, alpha);

    for (let i = 0; i < pieces.length; i++) {
      const p = pieces[i];
      p.tiltAngle += p.tiltAngleIncremental;
      p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2 + p.vy;
      p.x += Math.sin(p.d) * 2 + p.vx;
      p.vy += p.gravity;
      p.vx *= 0.98;

      ctx.beginPath();
      ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
      } else {
        ctx.rect(p.x, p.y, p.r * 1.5, p.r * 0.8);
      }
      ctx.fill();
    }

    if (alpha > 0) {
      animationFrame = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  };

  render();
};
