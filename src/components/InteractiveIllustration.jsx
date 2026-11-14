import React, { useState } from 'react';
import { soundManager } from '../utils/audio.js';

export default function InteractiveIllustration({ scene, prompt, interactiveTarget, storyColor = '#3b82f6' }) {
  const [clicked, setClicked] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  const handleInteraction = (e) => {
    setClicked(true);
    soundManager.playSparkle();

    // Generate local sparkles
    const rect = e.currentTarget.getBoundingClientRect();
    const newSparkles = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: e.clientX - rect.left + (Math.random() - 0.5) * 50,
      y: e.clientY - rect.top + (Math.random() - 0.5) * 50,
      color: ['#f472b6', '#fbbf24', '#38bdf8', '#4ade80', '#c084fc'][i % 5]
    }));
    setSparkles(newSparkles);

    setTimeout(() => {
      setClicked(false);
      setSparkles([]);
    }, 1200);
  };

  // Render rich custom SVG vector scenes based on the story page
  const renderSvgContent = () => {
    switch (scene) {
      // 1. Dragon scenes
      case 'dragon-meadow':
      case 'chipmunk-bush':
      case 'baking-stream':
      case 'village-square':
      case 'royal-feast':
        return (
          <svg viewBox="0 0 600 420" className="w-full h-full select-none">
            <defs>
              <linearGradient id="skyGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#bae6fd" />
                <stop offset="60%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#fed7aa" />
              </linearGradient>
              <linearGradient id="hillGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
              <linearGradient id="dragonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="berryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#9f1239" />
              </linearGradient>
            </defs>
            <rect width="600" height="420" fill="url(#skyGrad1)" rx="24" />
            {/* Sun */}
            <circle cx="500" cy="80" r="45" fill="#fef08a" opacity="0.9" className="animate-pulse" />
            <circle cx="500" cy="80" r="60" fill="#fef08a" opacity="0.3" />
            {/* Fluffy clouds */}
            <path d="M 80,90 Q 100,60 130,80 Q 160,70 180,90 Q 200,100 180,120 L 70,120 Q 60,105 80,90 Z" fill="#ffffff" opacity="0.85" />
            <path d="M 360,70 Q 380,45 410,65 Q 435,55 450,75 Q 470,85 450,105 L 350,105 Q 340,90 360,70 Z" fill="#ffffff" opacity="0.85" />
            {/* Mountains in background */}
            <polygon points="120,240 230,120 340,240" fill="#cbd5e1" opacity="0.7" />
            <polygon points="260,250 370,110 480,250" fill="#94a3b8" opacity="0.6" />
            {/* Rolling hills */}
            <path d="M -20,320 Q 150,220 320,280 Q 480,330 620,270 L 620,420 L -20,420 Z" fill="url(#hillGrad1)" />
            <path d="M -20,350 Q 200,280 400,340 Q 520,370 620,340 L 620,420 L -20,420 Z" fill="#15803d" opacity="0.35" />
            
            {/* Strawberry plants */}
            <g transform="translate(100, 340)">
              <circle cx="0" cy="0" r="14" fill="url(#berryGrad)" />
              <polygon points="-4,-14 4,-14 0,-20" fill="#15803d" />
              <circle cx="-3" cy="-4" r="1.5" fill="#fef08a" />
              <circle cx="3" cy="-2" r="1.5" fill="#fef08a" />
              <circle cx="0" cy="4" r="1.5" fill="#fef08a" />
            </g>
            <g transform="translate(480, 350)">
              <circle cx="0" cy="0" r="16" fill="url(#berryGrad)" />
              <polygon points="-5,-16 5,-16 0,-22" fill="#15803d" />
              <circle cx="-4" cy="-5" r="1.5" fill="#fef08a" />
              <circle cx="4" cy="-3" r="1.5" fill="#fef08a" />
              <circle cx="0" cy="5" r="1.5" fill="#fef08a" />
            </g>

            {/* Barnaby the Gentle Dragon */}
            <g className={`transition-transform duration-500 origin-bottom cursor-pointer ${clicked ? 'scale-110 -translate-y-2' : 'hover:scale-105'}`}
               onClick={handleInteraction}>
              {/* Dragon tail */}
              <path d="M 220,330 C 180,350 150,320 140,290 C 135,270 155,275 160,290 C 165,305 190,325 220,320 Z" fill="url(#dragonGrad)" />
              {/* Back spikes */}
              <polygon points="260,240 270,225 280,240" fill="#f43f5e" />
              <polygon points="245,265 255,250 265,265" fill="#f43f5e" />
              <polygon points="230,290 240,275 250,290" fill="#f43f5e" />
              {/* Dragon body */}
              <ellipse cx="290" cy="300" rx="65" ry="55" fill="url(#dragonGrad)" />
              {/* Belly */}
              <ellipse cx="305" cy="305" rx="42" ry="40" fill="#fef08a" />
              {/* Dragon head */}
              <circle cx="340" cy="230" r="42" fill="url(#dragonGrad)" />
              {/* Snout */}
              <path d="M 350,215 Q 395,225 390,250 Q 360,265 340,255 Z" fill="url(#dragonGrad)" />
              {/* Nostril puffing heart smoke */}
              <circle cx="380" cy="235" r="3" fill="#065f46" />
              {/* Eyes */}
              <circle cx="345" cy="220" r="9" fill="#ffffff" />
              <circle cx="347" cy="220" r="5" fill="#0f172a" />
              <circle cx="349" cy="218" r="2" fill="#ffffff" />
              {/* Rosy cheek */}
              <circle cx="345" cy="238" r="7" fill="#f43f5e" opacity="0.6" />
              {/* Chef Hat */}
              <path d="M 315,195 L 365,195 L 360,180 Q 375,160 355,145 Q 340,135 330,148 Q 315,138 305,155 Q 300,175 315,180 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
              {/* Little wooden berry basket */}
              <g transform="translate(350, 310)">
                <path d="M -15,0 L 15,0 L 10,24 L -10,24 Z" fill="#b45309" />
                <path d="M -15,0 Q 0,-15 15,0" stroke="#78350f" strokeWidth="3" fill="none" />
                <circle cx="-5" cy="-2" r="6" fill="url(#berryGrad)" />
                <circle cx="4" cy="-3" r="6" fill="url(#berryGrad)" />
                <circle cx="0" cy="3" r="6" fill="url(#berryGrad)" />
              </g>
              {/* Heart smoke animation */}
              <path d="M 395,215 C 390,205 380,205 385,195 C 390,185 405,190 405,200 C 405,210 395,215 395,215 Z" fill="#f472b6" opacity="0.8" className="animate-bounce" />
            </g>

            {/* Friendly text speech badge */}
            <g transform="translate(390, 160)">
              <rect width="130" height="34" rx="17" fill="#ffffff" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
              <text x="65" y="22" textAnchor="middle" fill="#065f46" fontWeight="bold" fontSize="13">
                {clicked ? '✨ Yummy! ✨' : 'Berry Sweet! 🍓'}
              </text>
            </g>
          </svg>
        );

      // 2. Adventure: Starlight Compass & Cosmic Dunes
      case 'attic-chest':
      case 'whispering-dunes':
      case 'firefly-cavern':
      case 'sky-observatory':
      case 'sunrise-constellation':
        return (
          <svg viewBox="0 0 600 420" className="w-full h-full select-none">
            <defs>
              <linearGradient id="nightSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="60%" stopColor="#1e1b4b" />
                <stop offset="100%" stopColor="#312e81" />
              </linearGradient>
              <linearGradient id="duneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="compassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#a16207" />
              </linearGradient>
            </defs>
            <rect width="600" height="420" fill="url(#nightSkyGrad)" rx="24" />

            {/* Glowing Stars */}
            {[
              [80, 50], [150, 90], [220, 40], [310, 80], [420, 45],
              [520, 90], [50, 140], [280, 130], [480, 150], [390, 110]
            ].map(([cx, cy], idx) => (
              <g key={idx} className="animate-pulse" style={{ animationDelay: `${(idx * 0.3) % 2}s` }}>
                <circle cx={cx} cy={cy} r={idx % 2 === 0 ? 3 : 2} fill="#ffffff" />
                <circle cx={cx} cy={cy} r={idx % 2 === 0 ? 6 : 4} fill="#818cf8" opacity="0.4" />
              </g>
            ))}

            {/* Crescent Moon */}
            <path d="M 480,50 A 30 30 0 0 0 520,95 A 38 38 0 1 1 480,50 Z" fill="#fef08a" filter="drop-shadow(0 0 12px #fde047)" />

            {/* Singing Dunes */}
            <path d="M -20,300 Q 140,240 300,280 Q 460,320 620,260 L 620,420 L -20,420 Z" fill="url(#duneGrad)" />
            <path d="M -20,340 Q 180,310 380,350 Q 500,380 620,340 L 620,420 L -20,420 Z" fill="#92400e" opacity="0.5" />

            {/* Giant Magic Starlight Compass in foreground */}
            <g transform="translate(300, 260)"
               className={`cursor-pointer transition-transform duration-500 ${clicked ? 'scale-125 rotate-45' : 'hover:scale-110'}`}
               onClick={handleInteraction}>
              {/* Outer Glow Ring */}
              <circle cx="0" cy="0" r="85" fill="#6366f1" opacity="0.25" className="animate-ping" />
              {/* Brass Body */}
              <circle cx="0" cy="0" r="75" fill="url(#compassGrad)" stroke="#78350f" strokeWidth="4" />
              {/* Dark Starry Dial */}
              <circle cx="0" cy="0" r="62" fill="#0f172a" />
              {/* Compass Cardinal Points */}
              <polygon points="0,-54 -6,-35 6,-35" fill="#f43f5e" />
              <polygon points="0,54 -6,35 6,35" fill="#94a3b8" />
              <polygon points="54,0 35,-6 35,6" fill="#94a3b8" />
              <polygon points="-54,0 -35,-6 -35,6" fill="#94a3b8" />
              {/* Starlight Needle that pulses */}
              <g className="transition-transform duration-700 origin-center" style={{ transform: clicked ? 'rotate(180deg)' : 'rotate(45deg)' }}>
                <polygon points="0,-48 -7,0 0,-8" fill="#38bdf8" filter="drop-shadow(0 0 8px #38bdf8)" />
                <polygon points="0,-48 7,0 0,-8" fill="#bae6fd" />
                <polygon points="0,48 -7,0 0,8" fill="#c084fc" />
                <polygon points="0,48 7,0 0,8" fill="#e9d5ff" />
                <circle cx="0" cy="0" r="6" fill="#fef08a" />
              </g>
              {/* Stardust beam projecting upward */}
              <polygon points="-12,-65 12,-65 50,-240 -50,-240" fill="url(#skyGrad1)" opacity="0.2" />
            </g>

            {/* Interactive tag */}
            <g transform="translate(230, 375)">
              <rect width="140" height="30" rx="15" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
              <text x="70" y="20" textAnchor="middle" fill="#c7d2fe" fontWeight="bold" fontSize="12">
                {clicked ? '⭐ Starlight Beaming! ⭐' : 'Tap the Compass 🧭'}
              </text>
            </g>
          </svg>
        );

      // 3. Moral: Grandfather Oak & Robin
      case 'autumn-forest':
      case 'tree-hollow':
      case 'leaf-blanket':
      case 'animal-gathering':
      case 'spring-miracle':
        return (
          <svg viewBox="0 0 600 420" className="w-full h-full select-none">
            <defs>
              <linearGradient id="autumnSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fed7aa" />
                <stop offset="50%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#f1f5f9" />
              </linearGradient>
              <linearGradient id="oakTrunk" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#78350f" />
                <stop offset="50%" stopColor="#92400e" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>
              <linearGradient id="goldLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            <rect width="600" height="420" fill="url(#autumnSky)" rx="24" />

            {/* Distant Birch Trees */}
            {[-40, 80, 480, 560].map((x, i) => (
              <g key={i}>
                <line x1={x} y1="380" x2={x} y2="160" stroke="#cbd5e1" strokeWidth="10" strokeLinecap="round" />
                <line x1={x+4} y1="200" x2={x+20} y2="180" stroke="#cbd5e1" strokeWidth="4" />
              </g>
            ))}

            {/* Snow on ground */}
            <path d="M -20,340 Q 150,300 300,330 Q 450,360 620,320 L 620,420 L -20,420 Z" fill="#e2e8f0" />
            <path d="M -20,370 Q 200,340 400,375 Q 520,390 620,370 L 620,420 L -20,420 Z" fill="#ffffff" />

            {/* Grandfather Oak Trunk */}
            <path d="M 230,420 Q 250,260 210,180 Q 200,120 180,80 Q 230,120 270,160 Q 300,120 330,80 Q 310,160 360,200 Q 340,280 370,420 Z" fill="url(#oakTrunk)" />

            {/* Cozy Hollow in the Trunk */}
            <ellipse cx="295" cy="310" rx="32" ry="40" fill="#451a03" />
            <ellipse cx="295" cy="315" rx="26" ry="34" fill="#1c1917" />
            
            {/* Cozy Nest inside Hollow */}
            <ellipse cx="295" cy="335" rx="22" ry="12" fill="#78350f" />
            <ellipse cx="295" cy="332" rx="18" ry="8" fill="#fef08a" opacity="0.6" />

            {/* Oliver the Robin */}
            <g transform="translate(295, 318)"
               className={`cursor-pointer transition-transform duration-500 ${clicked ? 'scale-125 -translate-y-2' : 'hover:scale-110'}`}
               onClick={handleInteraction}>
              {/* Robin body */}
              <ellipse cx="0" cy="0" rx="15" ry="12" fill="#78350f" />
              {/* Red breast */}
              <circle cx="6" cy="2" r="9" fill="#ef4444" />
              {/* Head */}
              <circle cx="8" cy="-8" r="9" fill="#78350f" />
              <circle cx="10" cy="-6" r="6" fill="#ef4444" />
              {/* Beak */}
              <polygon points="17,-6 23,-5 17,-3" fill="#f59e0b" />
              {/* Eye */}
              <circle cx="11" cy="-8" r="2" fill="#0f172a" />
              <circle cx="12" cy="-9" r="0.8" fill="#ffffff" />
              {/* Wing */}
              <ellipse cx="-4" cy="0" rx="10" ry="7" fill="#451a03" />
            </g>

            {/* Golden Autumn Oak Leaves Crown */}
            {[
              [200, 110, 40], [250, 90, 48], [310, 85, 45],
              [350, 115, 38], [170, 140, 32], [380, 145, 34]
            ].map(([x, y, r], idx) => (
              <circle key={idx} cx={x} cy={y} r={r} fill="url(#goldLeaf)" opacity="0.9" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))" />
            ))}

            {/* Falling Leaves Animation */}
            <g className="animate-bounce" style={{ animationDuration: '3s' }}>
              <path d="M 230,200 Q 240,190 250,200 Q 240,215 230,200 Z" fill="#f59e0b" />
              <path d="M 360,220 Q 370,210 380,220 Q 370,235 360,220 Z" fill="#ea580c" />
              <path d="M 270,240 Q 280,230 290,240 Q 280,255 270,240 Z" fill="#eab308" />
            </g>

            {/* Speech bubble */}
            <g transform="translate(350, 270)">
              <rect width="135" height="34" rx="17" fill="#ffffff" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))" />
              <text x="67" y="22" textAnchor="middle" fill="#78350f" fontWeight="bold" fontSize="12">
                {clicked ? '❤️ Warm & Cozy! ❤️' : 'Tap little Oliver 🐦'}
              </text>
            </g>
          </svg>
        );

      // 4. Fairy Tale: Whispering Cloud & Princess Tara
      case 'silent-valley':
      case 'mountain-peak':
      case 'gratitude-glow':
      case 'musical-shower':
      case 'rainbow-kingdom':
        return (
          <svg viewBox="0 0 600 420" className="w-full h-full select-none">
            <defs>
              <linearGradient id="fairySky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f3e8ff" />
                <stop offset="60%" stopColor="#fbcfe8" />
                <stop offset="100%" stopColor="#bae6fd" />
              </linearGradient>
              <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
            <rect width="600" height="420" fill="url(#fairySky)" rx="24" />

            {/* Mount Lumina Peak */}
            <polygon points="300,140 100,420 500,420" fill="#a855f7" opacity="0.35" />
            <polygon points="300,140 180,420 420,420" fill="#9333ea" opacity="0.4" />
            <polygon points="300,140 250,220 350,220" fill="#ffffff" opacity="0.8" />

            {/* Rainbow Bridge Arc */}
            <path d="M 50,380 Q 300,10 550,380" stroke="#f472b6" strokeWidth="8" fill="none" opacity="0.7" />
            <path d="M 50,374 Q 300,4 550,374" stroke="#fde047" strokeWidth="8" fill="none" opacity="0.7" />
            <path d="M 50,368 Q 300,-2 550,368" stroke="#38bdf8" strokeWidth="8" fill="none" opacity="0.7" />

            {/* Cloudette the Magical Pink Cloud */}
            <g transform="translate(300, 110)"
               className={`cursor-pointer transition-transform duration-500 ${clicked ? 'scale-125' : 'hover:scale-110'}`}
               onClick={handleInteraction}>
              {/* Cloud Glow */}
              <circle cx="0" cy="0" r="70" fill="#f472b6" opacity="0.3" className="animate-ping" />
              {/* Cloud Puffs */}
              <path d="M -50,10 Q -65,-20 -35,-30 Q -10,-55 25,-40 Q 55,-45 65,-20 Q 80,5 60,25 Q 40,45 0,35 Q -35,45 -50,10 Z"
                    fill="url(#cloudGrad)" filter="drop-shadow(0 8px 16px rgba(168,85,247,0.35))" />
              {/* Cloud Cute Face */}
              <circle cx="-16" cy="-2" r="5" fill="#1e1b4b" />
              <circle cx="16" cy="-2" r="5" fill="#1e1b4b" />
              <circle cx="-14" cy="-4" r="2" fill="#ffffff" />
              <circle cx="18" cy="-4" r="2" fill="#ffffff" />
              <circle cx="-25" cy="8" r="7" fill="#f43f5e" opacity="0.5" />
              <circle cx="25" cy="8" r="7" fill="#f43f5e" opacity="0.5" />
              {/* Happy smile */}
              <path d="M -10,10 Q 0,20 10,10" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>

            {/* Musical notes falling */}
            {[
              [240, 210, '♪'], [340, 230, '♫'], [210, 270, '♬'], [380, 280, '♩'], [290, 310, '♪']
            ].map(([x, y, note], i) => (
              <text key={i} x={x} y={y} fontSize="22" fill="#9333ea" fontWeight="bold" className="animate-bounce" style={{ animationDelay: `${i * 0.4}s` }}>
                {note}
              </text>
            ))}

            {/* Princess Tara on the trail */}
            <g transform="translate(180, 310)">
              {/* Dress */}
              <polygon points="0,0 -18,50 18,50" fill="#ec4899" />
              {/* Apron */}
              <polygon points="0,15 -10,50 10,50" fill="#fbcfe8" />
              {/* Head */}
              <circle cx="0" cy="-14" r="14" fill="#fcd34d" />
              {/* Hair */}
              <circle cx="0" cy="-18" r="16" fill="#78350f" />
              <circle cx="0" cy="-14" r="12" fill="#fcd34d" />
              {/* Silver Tiara */}
              <polygon points="-8,-25 -4,-33 0,-27 4,-33 8,-25" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
              {/* Friendly walking stick */}
              <line x1="20" y1="-5" x2="25" y2="52" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* Action pill */}
            <g transform="translate(220, 370)">
              <rect width="160" height="34" rx="17" fill="#ffffff" stroke="#c084fc" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
              <text x="80" y="22" textAnchor="middle" fill="#9333ea" fontWeight="bold" fontSize="12">
                {clicked ? '💖 Saying "Thank You"! 💖' : 'Tap Cloudette ☁️'}
              </text>
            </g>
          </svg>
        );

      // 5. Educational: Sammy’s Coral Reef
      case 'reef-intro':
      case 'polyp-close':
      case 'anemone-home':
      case 'coral-bleach':
      case 'ocean-cleanup':
      case 'guardian-celebration':
        return (
          <svg viewBox="0 0 600 420" className="w-full h-full select-none">
            <defs>
              <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#075985" />
              </linearGradient>
              <linearGradient id="turtleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
            <rect width="600" height="420" fill="url(#oceanGrad)" rx="24" />

            {/* Light Rays */}
            <polygon points="80,0 140,0 200,420 100,420" fill="#ffffff" opacity="0.12" />
            <polygon points="260,0 320,0 420,420 300,420" fill="#ffffff" opacity="0.1" />
            <polygon points="440,0 490,0 580,420 500,420" fill="#ffffff" opacity="0.08" />

            {/* Sandy ocean floor */}
            <path d="M -20,360 Q 150,330 300,350 Q 450,370 620,340 L 620,420 L -20,420 Z" fill="#fde047" opacity="0.8" />

            {/* Corals on bottom */}
            {/* Brain Coral */}
            <ellipse cx="100" cy="360" rx="45" ry="32" fill="#f43f5e" />
            {/* Sea Anemone */}
            <g transform="translate(480, 360)">
              {[-30, -18, -6, 6, 18, 30].map((dx, idx) => (
                <path key={idx} d={`M ${dx},0 Q ${dx*1.4},-40 ${dx*0.8},-60`} stroke="#c084fc" strokeWidth="8" strokeLinecap="round" fill="none" />
              ))}
              {/* Clownfish Pip */}
              <g transform="translate(-10, -35)">
                <ellipse cx="0" cy="0" rx="18" ry="11" fill="#ea580c" />
                <path d="M -5,-11 L -2,11 L 3,11 L 0,-11 Z" fill="#ffffff" />
                <polygon points="16,0 26,-8 26,8" fill="#ea580c" />
                <circle cx="-10" cy="-3" r="2.5" fill="#0f172a" />
              </g>
            </g>

            {/* Sammy the Sea Turtle in center */}
            <g transform="translate(270, 210)"
               className={`cursor-pointer transition-transform duration-500 ${clicked ? 'scale-125 -translate-y-4' : 'hover:scale-105'}`}
               onClick={handleInteraction}>
              {/* Turtle Flippers */}
              {/* Left Top Flipper */}
              <ellipse cx="-45" cy="-25" rx="35" ry="12" fill="url(#turtleGrad)" transform="rotate(-35 -45 -25)" />
              {/* Right Top Flipper */}
              <ellipse cx="45" cy="-25" rx="35" ry="12" fill="url(#turtleGrad)" transform="rotate(35 45 -25)" />
              {/* Back Flippers */}
              <ellipse cx="-35" cy="40" rx="20" ry="8" fill="url(#turtleGrad)" transform="rotate(30 -35 40)" />
              <ellipse cx="35" cy="40" rx="20" ry="8" fill="url(#turtleGrad)" transform="rotate(-30 35 40)" />
              {/* Shell */}
              <ellipse cx="0" cy="10" rx="48" ry="54" fill="#047857" stroke="#065f46" strokeWidth="4" />
              {/* Shell Scutes */}
              <polygon points="0,-25 -20,-10 -20,15 0,30 20,15 20,-10" fill="#10b981" />
              <polygon points="-20,-10 -40,-5 -40,15 -20,15" fill="#059669" />
              <polygon points="20,-10 40,-5 40,15 20,15" fill="#059669" />
              {/* Head with Goggles */}
              <circle cx="0" cy="-45" r="20" fill="url(#turtleGrad)" />
              {/* Explorer Goggles */}
              <rect x="-16" y="-50" width="32" height="12" rx="6" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
              <circle cx="-7" cy="-44" r="5" fill="#38bdf8" />
              <circle cx="7" cy="-44" r="5" fill="#38bdf8" />
            </g>

            {/* Rising Bubbles */}
            {[
              [140, 180, 8], [150, 120, 5], [380, 140, 9], [400, 90, 6], [220, 80, 7]
            ].map(([cx, cy, r], i) => (
              <circle key={i} cx={cx} cy={cy} r={r} fill="#ffffff" opacity="0.5" className="animate-pulse" />
            ))}

            {/* Info badge */}
            <g transform="translate(220, 365)">
              <rect width="160" height="34" rx="17" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.2))" />
              <text x="80" y="22" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
                {clicked ? '🌊 Splash! Great Job! 🌊' : 'Tap Sammy the Turtle 🐢'}
              </text>
            </g>
          </svg>
        );

      // 6. Educational: Nova’s Rocket & Solar System
      default:
        return (
          <svg viewBox="0 0 600 420" className="w-full h-full select-none">
            <defs>
              <linearGradient id="spaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#030712" />
                <stop offset="50%" stopColor="#111827" />
                <stop offset="100%" stopColor="#1e1b4b" />
              </linearGradient>
              <linearGradient id="saturnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
            </defs>
            <rect width="600" height="420" fill="url(#spaceGrad)" rx="24" />

            {/* Distant Stars */}
            {[
              [50, 40], [120, 90], [200, 35], [280, 85], [360, 40], [450, 95],
              [540, 50], [90, 160], [240, 150], [480, 170], [520, 240]
            ].map(([x, y], idx) => (
              <circle key={idx} cx={x} cy={y} r={idx % 3 === 0 ? 3 : 1.5} fill="#ffffff" opacity="0.9" className="animate-pulse" />
            ))}

            {/* Giant Saturn with Rings */}
            <g transform="translate(460, 140)">
              {/* Back of Ring */}
              <ellipse cx="0" cy="0" rx="75" ry="16" fill="none" stroke="#fde047" strokeWidth="8" opacity="0.7" transform="rotate(-20)" />
              {/* Saturn Body */}
              <circle cx="0" cy="0" r="42" fill="url(#saturnGrad)" />
              {/* Front of Ring */}
              <path d="M -70,25 Q 0,40 70,-25" stroke="#fde047" strokeWidth="8" fill="none" opacity="0.85" />
            </g>

            {/* Earth in Distance */}
            <g transform="translate(100, 120)">
              <circle cx="0" cy="0" r="30" fill="#0284c7" />
              <circle cx="0" cy="0" r="33" fill="#38bdf8" opacity="0.3" className="animate-ping" />
              {/* Continents */}
              <path d="M -15,-5 Q -5,-20 10,-10 Q 15,10 0,15 Z" fill="#22c55e" />
            </g>

            {/* Nova's Eco Rocket in center */}
            <g transform="translate(280, 240)"
               className={`cursor-pointer transition-transform duration-500 ${clicked ? 'scale-125 -translate-y-6 rotate-12' : 'hover:scale-105 -rotate-6'}`}
               onClick={handleInteraction}>
              {/* Plasma Flame */}
              <polygon points="-12,50 0,95 12,50" fill="#f43f5e" className="animate-pulse" />
              <polygon points="-7,50 0,80 7,50" fill="#fbbf24" />
              {/* Rocket Body */}
              <path d="M 0,-70 C -25,-30 -25,45 -25,50 L 25,50 C 25,45 25,-30 0,-70 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
              {/* Rocket Fins */}
              <polygon points="-25,25 -45,55 -25,50" fill="#0284c7" />
              <polygon points="25,25 45,55 25,50" fill="#0284c7" />
              {/* Rocket Porthole Window with Nova the Pup */}
              <circle cx="0" cy="-10" r="18" fill="#0284c7" stroke="#38bdf8" strokeWidth="3" />
              {/* Astro Puppy Face */}
              <circle cx="0" cy="-10" r="12" fill="#f59e0b" />
              <circle cx="-4" cy="-12" r="2" fill="#0f172a" />
              <circle cx="4" cy="-12" r="2" fill="#0f172a" />
              <polygon points="0,-8 -2,-6 2,-6" fill="#0f172a" />
              {/* Puppy Ears */}
              <ellipse cx="-10" cy="-15" rx="4" ry="7" fill="#b45309" />
              <ellipse cx="10" cy="-15" rx="4" ry="7" fill="#b45309" />
            </g>

            {/* Action pill */}
            <g transform="translate(210, 365)">
              <rect width="180" height="34" rx="17" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))" />
              <text x="90" y="22" textAnchor="middle" fill="#bae6fd" fontWeight="bold" fontSize="12">
                {clicked ? '🚀 Blast Off! Whoosh! 🚀' : 'Tap Nova’s Rocket 🚀'}
              </text>
            </g>
          </svg>
        );
    }
  };

  return (
    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-md border-4 border-white/60 bg-white">
      {renderSvgContent()}

      {/* Floating Sparkle Particles on Click */}
      {sparkles.map((sp) => (
        <span
          key={sp.id}
          className="absolute pointer-events-none text-2xl animate-ping"
          style={{
            left: `${sp.x}px`,
            top: `${sp.y}px`,
            color: sp.color
          }}
        >
          ✨
        </span>
      ))}

      {/* Child-friendly interactive hint bottom bar */}
      {prompt && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-slate-100 flex items-center gap-2 max-w-[90%] text-center">
          <span className="text-sm">👆</span>
          <p className="text-xs font-semibold text-slate-700 truncate">{prompt}</p>
        </div>
      )}
    </div>
  );
}
