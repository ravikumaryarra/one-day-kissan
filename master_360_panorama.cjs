const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const INPUT_IMG = '/home/ravikumaryarra5224/.gemini/antigravity/brain/a4c3fedf-4303-4802-bedf-aa97232e47e8/tamil_nadu_hill_farm_360_panorama_1793843913464.jpg';
const OUTPUT_DIR = path.join(__dirname, 'assets', 'farm_tour');
const ARTIFACT_DIR = '/home/ravikumaryarra5224/.gemini/antigravity/brain/a4c3fedf-4303-4802-bedf-aa97232e47e8';

async function masterAllPanoramas() {
  console.log('🎨 Mastering 3 Atmospheres of the AI Generated Tamil Nadu Hill Farm...');

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  const inputBuf = fs.readFileSync(INPUT_IMG);
  const inputBase64 = `data:image/jpeg;base64,${inputBuf.toString('base64')}`;

  const atmospheres = ['morning', 'golden', 'monsoon'];

  for (const atmo of atmospheres) {
    console.log(`Processing atmosphere: ${atmo}...`);
    const dataUrl = await page.evaluate(async ({ base64, atmo }) => {
      const W = 4096;
      const H = 2048;
      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');

      const loadImg = (src) => new Promise((res, rej) => {
        const img = new Image();
        img.onload = () => res(img);
        img.onerror = rej;
        img.src = src;
      });

      const aiImg = await loadImg(base64);

      // Environment gradients per atmosphere
      const atmoStyles = {
        morning: {
          skyZenith: '#1c2e3d',
          skyUpper: '#3f6277',
          skyHaze: '#8aa8b6',
          horizon: '#d9ebe3',
          sunColor: 'rgba(255, 250, 230, 0.55)',
          sunX: W * 0.45,
          sunY: H * 0.38,
          hazeColor: 'rgba(220, 238, 230, 0.28)',
          filter: 'none',
          groundNadir: '#2c190d'
        },
        golden: {
          skyZenith: '#2b1b2d',
          skyUpper: '#68363a',
          skyHaze: '#b66746',
          horizon: '#f6ba67',
          sunColor: 'rgba(255, 215, 110, 0.68)',
          sunX: W * 0.52,
          sunY: H * 0.42,
          hazeColor: 'rgba(255, 210, 140, 0.30)',
          filter: 'sepia(0.2) saturate(1.2) hue-rotate(-10deg)',
          groundNadir: '#29170a'
        },
        monsoon: {
          skyZenith: '#152125',
          skyUpper: '#283c41',
          skyHaze: '#4e696f',
          horizon: '#799696',
          sunColor: 'rgba(190, 215, 210, 0.22)',
          sunX: W * 0.35,
          sunY: H * 0.36,
          hazeColor: 'rgba(180, 210, 205, 0.35)',
          filter: 'contrast(1.05) saturate(1.15) hue-rotate(6deg)',
          groundNadir: '#1a2216'
        }
      };

      const style = atmoStyles[atmo];

      // 1. Sky & Nadir Gradient
      const envGrad = ctx.createLinearGradient(0, 0, 0, H);
      envGrad.addColorStop(0, style.skyZenith);
      envGrad.addColorStop(0.22, style.skyUpper);
      envGrad.addColorStop(0.40, style.skyHaze);
      envGrad.addColorStop(0.49, style.horizon);
      envGrad.addColorStop(0.51, '#567a62');
      envGrad.addColorStop(0.65, '#2e4a35');
      envGrad.addColorStop(0.85, '#4a2f1c');
      envGrad.addColorStop(1, style.groundNadir);
      ctx.fillStyle = envGrad;
      ctx.fillRect(0, 0, W, H);

      // Atmospheric sun flare
      const sunG = ctx.createRadialGradient(style.sunX, style.sunY, 10, style.sunX, style.sunY, 480);
      sunG.addColorStop(0, style.sunColor);
      sunG.addColorStop(0.35, 'rgba(255, 240, 205, 0.15)');
      sunG.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = sunG;
      ctx.fillRect(0, 0, W, H);

      // 2. Draw AI Generated Tamil Nadu Hill Farm
      const mainW = Math.round(W * 0.85);
      const mainH = Math.round(H * 0.72);
      const mainX = Math.round((W - mainW) / 2);
      const mainY = Math.round(H * 0.5 - mainH * 0.48);

      ctx.save();
      if (style.filter !== 'none') ctx.filter = style.filter;

      // Draw center frame
      ctx.drawImage(aiImg, mainX, mainY, mainW, mainH);

      // Left extension (mirrored for 360 wrap)
      ctx.save();
      ctx.translate(mainX, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(aiImg, 0, mainY, Math.round(W * 0.45), mainH);
      ctx.restore();

      // Right extension (mirrored for 360 wrap)
      ctx.save();
      ctx.translate(mainX + mainW, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(aiImg, -Math.round(W * 0.45), mainY, Math.round(W * 0.45), mainH);
      ctx.restore();

      ctx.restore();

      // 3. Horizontal Seam Feathering at X = 0 and X = W
      const seamW = 140;
      const seamGradL = ctx.createLinearGradient(0, 0, seamW, 0);
      seamGradL.addColorStop(0, 'rgba(217, 235, 227, 0.25)');
      seamGradL.addColorStop(1, 'rgba(217, 235, 227, 0)');
      ctx.fillStyle = seamGradL;
      ctx.fillRect(0, H * 0.35, seamW, H * 0.35);

      const seamGradR = ctx.createLinearGradient(W - seamW, 0, W, 0);
      seamGradR.addColorStop(0, 'rgba(217, 235, 227, 0)');
      seamGradR.addColorStop(1, 'rgba(217, 235, 227, 0.25)');
      ctx.fillStyle = seamGradR;
      ctx.fillRect(W - seamW, H * 0.35, seamW, H * 0.35);

      // 4. Sky Feathering
      const skyFeather = ctx.createLinearGradient(0, mainY, 0, mainY + 160);
      skyFeather.addColorStop(0, style.skyHaze);
      skyFeather.addColorStop(0.5, 'rgba(138, 168, 182, 0.35)');
      skyFeather.addColorStop(1, 'rgba(138, 168, 182, 0)');
      ctx.fillStyle = skyFeather;
      ctx.fillRect(0, mainY - 10, W, 170);

      // 5. Ground Feathering
      const groundFeather = ctx.createLinearGradient(0, mainY + mainH - 140, 0, mainY + mainH);
      groundFeather.addColorStop(0, 'rgba(74, 47, 28, 0)');
      groundFeather.addColorStop(0.6, 'rgba(74, 47, 28, 0.38)');
      groundFeather.addColorStop(1, '#4a2f1c');
      ctx.fillStyle = groundFeather;
      ctx.fillRect(0, mainY + mainH - 140, W, 160);

      // 6. Mountain Mist Veil
      const mistHaze = ctx.createLinearGradient(0, H * 0.42, 0, H * 0.52);
      mistHaze.addColorStop(0, 'rgba(220, 238, 230, 0)');
      mistHaze.addColorStop(0.5, style.hazeColor);
      mistHaze.addColorStop(1, 'rgba(220, 238, 230, 0)');
      ctx.fillStyle = mistHaze;
      ctx.fillRect(0, H * 0.42, W, H * 0.10);

      return canvas.toDataURL('image/jpeg', 0.92);
    }, { base64: inputBase64, atmo });

    const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, '');
    const outName = `pano_${atmo}.jpg`;
    const dest1 = path.join(OUTPUT_DIR, outName);
    const dest2 = path.join(ARTIFACT_DIR, outName);
    fs.writeFileSync(dest1, base64Data, 'base64');
    fs.writeFileSync(dest2, base64Data, 'base64');
    console.log(`✅ Saved ${outName}: ${fs.statSync(dest1).size} bytes`);
  }

  // Also copy main master
  fs.copyFileSync(path.join(OUTPUT_DIR, 'pano_morning.jpg'), path.join(OUTPUT_DIR, 'tamil_nadu_hill_farm_360_master.jpg'));

  await browser.close();
  console.log('🎉 All 3 photorealistic panoramas successfully mastered!');
}

masterAllPanoramas().catch(console.error);
