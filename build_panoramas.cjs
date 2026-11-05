const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'assets', 'farm_tour');

async function buildPanoramas() {
  console.log('🖼️ Pre-generating 4K Photorealistic Equirectangular Panoramas from User Reference Photos...');

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  const result = await page.evaluate(async () => {
    const W = 4096;
    const H = 2048;

    const loadImg = (src) => new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

    const imgMorning = await loadImg('/assets/farm_tour/morning_misty_paddy_cattle.jpg');
    const imgMonsoon = await loadImg('/assets/farm_tour/monsoon_farmers_rice_paddy.jpg');
    const imgLane = await loadImg('/assets/farm_tour/rural_estate_country_lane.jpg');

    function createPano(type) {
      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');

      if (type === 'morning') {
        // 1. Photorealistic Morning Sky Dome
        const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
        skyGrad.addColorStop(0, '#1c2b38');
        skyGrad.addColorStop(0.26, '#45667a');
        skyGrad.addColorStop(0.42, '#9fb7c2');
        skyGrad.addColorStop(0.50, '#dbeae4');
        skyGrad.addColorStop(0.55, '#a4c2b2');
        skyGrad.addColorStop(0.70, '#36583f');
        skyGrad.addColorStop(1, '#142718');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, W, H);

        // Sun flare in morning mist
        const sunX = W * 0.35;
        const sunY = H * 0.46;
        const sunG = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 450);
        sunG.addColorStop(0, 'rgba(255, 248, 225, 0.65)');
        sunG.addColorStop(0.4, 'rgba(255, 240, 200, 0.25)');
        sunG.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = sunG;
        ctx.fillRect(0, 0, W, H);

        // 2. Seamlessly Tile and Blend the Real Morning Photo across 360 degrees
        // The real photo has: tall palms on left, grazing cattle in middle-right, flooded terraces below, misty hill behind
        // We draw the main scene at center, and seamless reflections/extensions across sides
        const photoW = 2200;
        const photoH = H * 0.65;
        const photoY = H * 0.35;

        // Center view (heading 0 / North)
        ctx.drawImage(imgMorning, (W - photoW) / 2, photoY, photoW, photoH);

        // Left tile (mirrored for seamless continuity)
        ctx.save();
        ctx.translate((W - photoW) / 2, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(imgMorning, 0, photoY, photoW * 0.7, photoH);
        ctx.restore();

        // Right tile (mirrored for seamless continuity)
        ctx.save();
        ctx.translate((W + photoW) / 2, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(imgMorning, -photoW * 0.7, photoY, photoW * 0.7, photoH);
        ctx.restore();

        // Soft sky feathering over top of image
        const topFeather = ctx.createLinearGradient(0, photoY, 0, photoY + 200);
        topFeather.addColorStop(0, '#9fb7c2');
        topFeather.addColorStop(0.5, 'rgba(159, 183, 194, 0.5)');
        topFeather.addColorStop(1, 'rgba(159, 183, 194, 0)');
        ctx.fillStyle = topFeather;
        ctx.fillRect(0, photoY - 20, W, 220);

        // Soft misty cloud veil hugging the hill slopes
        const mistG = ctx.createLinearGradient(0, H * 0.42, 0, H * 0.52);
        mistG.addColorStop(0, 'rgba(225, 240, 235, 0)');
        mistG.addColorStop(0.5, 'rgba(225, 240, 235, 0.38)');
        mistG.addColorStop(1, 'rgba(225, 240, 235, 0)');
        ctx.fillStyle = mistG;
        ctx.fillRect(0, H * 0.42, W, H * 0.10);

        // Flooded water sheen in foreground
        const waterG = ctx.createLinearGradient(0, H * 0.85, 0, H);
        waterG.addColorStop(0, 'rgba(20, 39, 24, 0)');
        waterG.addColorStop(1, 'rgba(15, 30, 18, 0.75)');
        ctx.fillStyle = waterG;
        ctx.fillRect(0, H * 0.85, W, H * 0.15);
      } else if (type === 'monsoon') {
        // Monsoon Sky Dome (Overcast deep emerald & slate rain clouds)
        const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
        skyGrad.addColorStop(0, '#152125');
        skyGrad.addColorStop(0.28, '#263a3f');
        skyGrad.addColorStop(0.44, '#49666c');
        skyGrad.addColorStop(0.50, '#759495');
        skyGrad.addColorStop(0.55, '#3a624a');
        skyGrad.addColorStop(0.70, '#1e442d');
        skyGrad.addColorStop(1, '#0e2316');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, W, H);

        const photoW = 2400;
        const photoH = H * 0.65;
        const photoY = H * 0.35;

        // Center view: Farmers walking on mud bunds under monsoon sky
        ctx.drawImage(imgMonsoon, (W - photoW) / 2, photoY, photoW, photoH);

        // Seamless sides
        ctx.save();
        ctx.translate((W - photoW) / 2, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(imgMonsoon, 0, photoY, photoW * 0.65, photoH);
        ctx.restore();

        ctx.save();
        ctx.translate((W + photoW) / 2, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(imgMonsoon, -photoW * 0.65, photoY, photoW * 0.65, photoH);
        ctx.restore();

        // Sky feathering
        const topFeather = ctx.createLinearGradient(0, photoY, 0, photoY + 220);
        topFeather.addColorStop(0, '#49666c');
        topFeather.addColorStop(0.6, 'rgba(73, 102, 108, 0.5)');
        topFeather.addColorStop(1, 'rgba(73, 102, 108, 0)');
        ctx.fillStyle = topFeather;
        ctx.fillRect(0, photoY - 20, W, 240);

        // Raincloud mist veil
        const rainMist = ctx.createLinearGradient(0, H * 0.40, 0, H * 0.52);
        rainMist.addColorStop(0, 'rgba(180, 205, 200, 0)');
        rainMist.addColorStop(0.5, 'rgba(180, 205, 200, 0.35)');
        rainMist.addColorStop(1, 'rgba(180, 205, 200, 0)');
        ctx.fillStyle = rainMist;
        ctx.fillRect(0, H * 0.40, W, H * 0.12);
      } else if (type === 'golden') {
        // Golden Hour Sky Dome (Warm amber sunset & long hill shadows)
        const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
        skyGrad.addColorStop(0, '#2b1b2d');
        skyGrad.addColorStop(0.25, '#6a3638');
        skyGrad.addColorStop(0.42, '#b86644');
        skyGrad.addColorStop(0.50, '#f5bb69');
        skyGrad.addColorStop(0.55, '#7d5c32');
        skyGrad.addColorStop(0.70, '#362f18');
        skyGrad.addColorStop(1, '#1c180b');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, W, H);

        // Sunset Glow
        const sunX = W * 0.62;
        const sunY = H * 0.48;
        const sunG = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 500);
        sunG.addColorStop(0, 'rgba(255, 210, 110, 0.7)');
        sunG.addColorStop(0.4, 'rgba(245, 160, 70, 0.3)');
        sunG.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = sunG;
        ctx.fillRect(0, 0, W, H);

        const photoW = 2400;
        const photoH = H * 0.65;
        const photoY = H * 0.35;

        // Center view: Rural Estate Lane & Banana Groves
        ctx.drawImage(imgLane, (W - photoW) / 2, photoY, photoW, photoH);

        // Seamless sides
        ctx.save();
        ctx.translate((W - photoW) / 2, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(imgLane, 0, photoY, photoW * 0.65, photoH);
        ctx.restore();

        ctx.save();
        ctx.translate((W + photoW) / 2, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(imgLane, -photoW * 0.65, photoY, photoW * 0.65, photoH);
        ctx.restore();

        // Sky feathering
        const topFeather = ctx.createLinearGradient(0, photoY, 0, photoY + 220);
        topFeather.addColorStop(0, '#b86644');
        topFeather.addColorStop(0.6, 'rgba(184, 102, 68, 0.5)');
        topFeather.addColorStop(1, 'rgba(184, 102, 68, 0)');
        ctx.fillStyle = topFeather;
        ctx.fillRect(0, photoY - 20, W, 240);

        // Golden sunset haze
        const goldenMist = ctx.createLinearGradient(0, H * 0.42, 0, H * 0.52);
        goldenMist.addColorStop(0, 'rgba(255, 215, 140, 0)');
        goldenMist.addColorStop(0.5, 'rgba(255, 215, 140, 0.32)');
        goldenMist.addColorStop(1, 'rgba(255, 215, 140, 0)');
        ctx.fillStyle = goldenMist;
        ctx.fillRect(0, H * 0.42, W, H * 0.10);
      }

      return canvas.toDataURL('image/jpeg', 0.90);
    }

    return {
      morning: createPano('morning'),
      monsoon: createPano('monsoon'),
      golden: createPano('golden')
    };
  });

  // Save the 3 high-res panoramas to disk
  ['morning', 'monsoon', 'golden'].forEach(type => {
    const filename = `pano_${type}.jpg`;
    const fullPath = path.join(OUTPUT_DIR, filename);
    const base64Data = result[type].replace(/^data:image\/jpeg;base64,/, '');
    fs.writeFileSync(fullPath, base64Data, 'base64');
    console.log(`✅ Generated ${filename}: ${fs.statSync(fullPath).size} bytes`);
  });

  await browser.close();
  console.log('🎉 Panoramas pre-generation complete!');
}

buildPanoramas().catch(console.error);
