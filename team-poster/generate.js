const fs = require('fs');

const people = [
  // Top
  { name: 'Seema', role: 'Core Team',         x: 540, y: 240,     lx: 690, ly: 140, rot: 15 },
  // Bottom (Empty)
  { name: 'He\\'s here...', role: 'but not here', x: 540, y: 1680, lx: 750, ly: 1780, rot: -10, empty: true },
  
  // Left side
  { name: 'Yusuf', role: 'Core Team',         x: 320, y: 450,     lx: 160, ly: 350, rot: -20 },
  { name: 'Zuhaib', role: 'Core Team',        x: 300, y: 700,     lx: 140, ly: 600, rot: -20 },
  { name: 'Likhith', role: 'Design Lead',     x: 300, y: 950,     lx: 140, ly: 850, rot: -20 },
  { name: 'Rumaan', role: 'Editorial & Content Lead', x: 300, y: 1200, lx: 140, ly: 1100, rot: -20 },
  { name: 'Muqeet', role: 'Web Design',       x: 320, y: 1450,    lx: 160, ly: 1350, rot: -20 },
  
  // Right side
  { name: 'Siddique', role: 'Tech Lead',      x: 760, y: 450,     lx: 920, ly: 350, rot: 20 },
  { name: 'Bhavani', role: 'Tech Co-Lead',    x: 780, y: 700,     lx: 940, ly: 600, rot: 20 },
  { name: 'Satwik', role: 'Social Media Management', x: 780, y: 950, lx: 940, ly: 850, rot: 20 },
  { name: 'Shabeen', role: 'PR Lead',         x: 780, y: 1200,    lx: 940, ly: 1100, rot: 20 },
  { name: 'Manisha', role: 'Event Coordinator',x: 760, y: 1450,    lx: 920, ly: 1350, rot: 20 }
];

const paths = people.map(p => {
    let sx = p.lx;
    let sy = p.ly;
    let ex = p.x;
    let ey = p.y;
    
    if(p.x < p.lx) {
        sx -= 40; sy += 30;
        ex += 60; ey -= 60;
    } else {
        sx += 40; sy += 30;
        ex -= 60; ey -= 60;
    }

    if(p.group === 'top' || p.y < 300) {
        sx = p.lx - 60; sy = p.ly + 40;
        ex = p.x + 40; ey = p.y - 80;
    }
    
    if(p.empty) {
        sx = p.lx - 80; sy = p.ly - 30;
        ex = p.x + 50; ey = p.y + 60;
    }

    let cx = (sx + ex) / 2;
    let cy = ey - 100;
    if(p.y > 1000) cy = ey + 100;
    
    return `<path d="M ${sx} ${sy} Q ${cx} ${cy} ${ex} ${ey}" stroke="white" stroke-width="3" stroke-dasharray="8 8" fill="none" class="dashed-line" />`;
}).join('\n');

const styles = people.map((p, i) => `
        .person-${i} { left: ${p.x}px; top: ${p.y}px; }
        .label-${i} { left: ${p.lx}px; top: ${p.ly}px; transform: translate(-50%, -50%) rotate(${p.rot}deg); }
`).join('');

const htmlPeople = people.map((p, i) => `
        <div class="person person-${i} ${p.empty ? 'empty' : ''}">Avatar</div>
        <div class="label label-${i}">
            <div class="name">${p.name}</div>
            <div class="role">${p.role}</div>
        </div>
`).join('');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Poster</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Inter:wght@400;500;900&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background-color: #387b89;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            font-family: 'Inter', sans-serif;
        }

        .poster {
            width: 1080px;
            height: 1920px;
            background-color: #387b89;
            position: relative;
            overflow: hidden;
            box-shadow: 0 0 50px rgba(0,0,0,0.5);
            transform-origin: top left;
        }

        .logo {
            position: absolute;
            top: 80px;
            right: 80px;
            width: 160px;
            height: 120px;
            background-image: url('../p-3/image.png');
            background-size: cover;
            background-position: center;
            border-radius: 10px;
        }

        .table {
            position: absolute;
            width: 360px;
            height: 1240px;
            background: linear-gradient(to right, #e2e8ea, #ced4d6);
            border-radius: 20px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            box-shadow: -10px 20px 40px rgba(0,0,0,0.3);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .table-text {
            font-family: 'Inter', sans-serif;
            font-weight: 900;
            font-size: 240px;
            color: #557e8a;
            transform: rotate(90deg);
            letter-spacing: 20px;
            opacity: 0.9;
        }

        .person {
            position: absolute;
            width: 180px;
            height: 180px;
            background-color: #212529;
            border-radius: 50%;
            box-shadow: -5px 15px 30px rgba(0,0,0,0.4);
            transform: translate(-50%, -50%);
            display: flex;
            justify-content: center;
            align-items: center;
            color: #444;
            font-weight: bold;
            font-size: 24px;
        }

        .person.empty {
            background-color: transparent;
            box-shadow: none;
            border: 4px dashed rgba(255,255,255,0.4);
            color: transparent;
        }

        .label {
            position: absolute;
            color: white;
            text-align: center;
            transform: translate(-50%, -50%);
            width: 300px;
        }

        .label .name {
            font-family: 'Caveat', cursive;
            font-size: 64px;
            font-weight: 600;
            line-height: 1;
            margin-bottom: -5px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.4);
        }

        .label .role {
            font-family: 'Inter', sans-serif;
            font-size: 20px;
            font-weight: 500;
            opacity: 0.95;
            letter-spacing: 0.5px;
            white-space: pre-wrap;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.4);
        }

        .svg-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 5;
        }

        .dashed-line {
            filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.2));
        }

        ${styles}
    </style>
</head>
<body>
    <div class="poster">
        <div class="logo"></div>
        
        <div class="table">
            <div class="table-text">TEAM</div>
        </div>
        
        <svg class="svg-container">
            ${paths}
        </svg>

        ${htmlPeople}
    </div>
</body>
</html>`;

fs.writeFileSync('b:/poster/team-poster/index.html', html);
console.log('HTML Generated successfully');
