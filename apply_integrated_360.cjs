const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Replace CSS from line 2879 to line 3528
const oldCssStart = '    /* Fullscreen 360 Tour Modal */';
const oldCssEndMarker = '  </style>\n</head>';

const newCss = `    /* ==========================================================================
       DEDICATED 360° VIRTUAL FARM TOUR INTEGRATED SECTION
       ========================================================================== */
    .farm360-integrated-section {
      position: relative;
      width: 100%;
      padding: 96px 24px;
      background: linear-gradient(180deg, #132218 0%, #172a1e 40%, #101e15 100%);
      color: #FFF;
      overflow: hidden;
      box-sizing: border-box;
    }

    .farm360-container {
      max-width: 1240px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    .farm360-section-head {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .farm360-section-head .h2 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(30px, 4.2vw, 48px);
      font-weight: 700;
      color: #FFF;
      letter-spacing: -0.02em;
      margin: 0;
      line-height: 1.18;
    }

    .farm360-subtitle {
      font-size: clamp(15px, 1.8vw, 18px);
      color: rgba(255, 255, 255, 0.78);
      margin: 0;
      max-width: 600px;
      line-height: 1.5;
    }

    /* 360 Viewing Area Frame */
    .farm360-stage-card {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      min-height: 440px;
      max-height: 640px;
      background: #0b140f;
      border-radius: 24px;
      border: 1px solid rgba(217, 168, 92, 0.3);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.05);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
    }

    /* Fullscreen Mode */
    .farm360-stage-card.is-fullscreen {
      position: fixed !important;
      inset: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      max-height: none !important;
      aspect-ratio: auto !important;
      border-radius: 0 !important;
      border: none !important;
      z-index: 999999 !important;
    }

    /* Preview Wrap (when OFF) */
    .farm360-preview-wrap {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 5;
      transition: opacity 0.35s ease;
    }

    .farm360-preview-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      filter: brightness(0.85);
      transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
    }

    .farm360-stage-card:hover .farm360-preview-img {
      transform: scale(1.02);
      filter: brightness(0.92);
    }

    .farm360-preview-scrim {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, rgba(11, 20, 15, 0.28) 0%, rgba(11, 20, 15, 0.72) 100%);
      pointer-events: none;
    }

    .farm360-preview-center {
      position: relative;
      z-index: 6;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      text-align: center;
      padding: 24px;
    }

    .farm360-start-btn {
      position: relative;
      padding: 16px 36px;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 0.02em;
      border-radius: 9999px;
      display: inline-flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 12px 32px rgba(217, 168, 92, 0.45), 0 0 0 2px rgba(255, 255, 255, 0.15);
      cursor: pointer;
      border: none;
      transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .farm360-start-btn:hover {
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 16px 40px rgba(217, 168, 92, 0.6);
    }

    .btn-360-pulse {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #22c55e;
      box-shadow: 0 0 10px #22c55e;
      animation: pulseDot 1.8s infinite;
    }

    .farm360-preview-hint {
      font-size: 13.5px;
      color: rgba(255, 255, 255, 0.9);
      font-weight: 500;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
    }

    /* Live WebGL Wrap (when ON) */
    .farm360-live-canvas-wrap {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      cursor: grab;
      user-select: none;
      -webkit-user-select: none;
    }

    .farm360-live-canvas-wrap.is-dragging {
      cursor: grabbing;
    }

    #farm360LiveCanvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
    }

    /* Controls Top Overlay */
    .farm360-controls-top {
      position: absolute;
      top: 18px;
      left: 20px;
      right: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      z-index: 20;
      pointer-events: none;
    }

    .farm360-controls-top > * {
      pointer-events: auto;
    }

    /* ON / OFF Toggle Button */
    .farm360-toggle-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(18, 32, 23, 0.88);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(217, 168, 92, 0.45);
      color: #FFF;
      padding: 9px 18px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
      transition: all 0.25s ease;
    }

    .farm360-toggle-btn:hover {
      background: rgba(28, 48, 35, 0.95);
      border-color: var(--harvest);
      color: var(--harvest);
    }

    .farm360-toggle-btn .toggle-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #22c55e;
      box-shadow: 0 0 8px #22c55e;
    }

    .farm360-toggle-btn.is-off .toggle-dot {
      background: #ef4444;
      box-shadow: 0 0 8px #ef4444;
    }

    /* Atmosphere Switcher Pills */
    .farm360-atmo-pills {
      display: inline-flex;
      align-items: center;
      background: rgba(18, 32, 23, 0.88);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 9999px;
      padding: 3px;
      gap: 3px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    }

    .atmo-pill {
      background: transparent;
      border: none;
      color: rgba(255, 255, 255, 0.75);
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .atmo-pill:hover {
      color: #FFF;
      background: rgba(255, 255, 255, 0.1);
    }

    .atmo-pill.is-active {
      background: var(--harvest);
      color: var(--forest);
      box-shadow: 0 2px 8px rgba(217, 168, 92, 0.4);
    }

    /* Fullscreen Button */
    .farm360-icon-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(18, 32, 23, 0.88);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #FFF;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
      transition: all 0.2s ease;
    }

    .farm360-icon-btn:hover {
      background: rgba(28, 48, 35, 0.95);
      border-color: var(--harvest);
      color: var(--harvest);
      transform: scale(1.06);
    }

    /* Bottom Controls Overlay (Left/Right Arrows & Drag Hint) */
    .farm360-controls-bottom {
      position: absolute;
      bottom: 20px;
      left: 20px;
      right: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      z-index: 20;
      pointer-events: none;
    }

    .farm360-controls-bottom > * {
      pointer-events: auto;
    }

    .farm360-nav-arrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(18, 32, 23, 0.92);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(217, 168, 92, 0.4);
      color: #FFF;
      padding: 10px 20px;
      border-radius: 9999px;
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.45);
      transition: all 0.2s ease;
    }

    .farm360-nav-arrow:hover {
      background: var(--harvest);
      color: var(--forest);
      border-color: var(--harvest);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(217, 168, 92, 0.5);
    }

    .farm360-drag-indicator {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(18, 32, 23, 0.82);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: rgba(255, 255, 255, 0.9);
      padding: 9px 20px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 500;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
      pointer-events: none;
    }

    /* Hero Badges & Responsive */
    @media (max-width: 768px) {
      .farm360-integrated-section {
        padding: 60px 16px;
      }
      .farm360-stage-card {
        min-height: 360px;
        border-radius: 18px;
      }
      .farm360-controls-top {
        top: 12px;
        left: 12px;
        right: 12px;
        flex-wrap: wrap;
        gap: 8px;
      }
      .farm360-atmo-pills {
        order: 3;
        width: 100%;
        justify-content: center;
      }
      .farm360-controls-bottom {
        bottom: 12px;
        left: 12px;
        right: 12px;
      }
      .farm360-drag-indicator {
        display: none;
      }
      .farm360-nav-arrow {
        padding: 8px 14px;
        font-size: 12px;
      }
      .hero-corner-tour-pill {
        display: none;
      }
      .hero-360-badge {
        padding: 8px 16px 8px 12px;
        gap: 10px;
      }
      .badge-360-indicator {
        width: 32px;
        height: 32px;
      }
      .badge-360-icon {
        width: 17px;
        height: 17px;
      }
      .badge-360-label {
        font-size: 13px;
      }
      .badge-360-sub {
        font-size: 10.5px;
      }
    }

    @media (max-width: 480px) {
      .badge-360-sub {
        display: none;
      }
      .badge-360-label {
        font-size: 12.5px;
      }
      .atmo-pill {
        padding: 5px 9px;
        font-size: 11px;
      }
    }
  </style>
</head>`;

const cssStartIndex = html.indexOf(oldCssStart);
const cssEndIndex = html.indexOf(oldCssEndMarker);

if (cssStartIndex === -1 || cssEndIndex === -1) {
  console.error('Could not locate CSS block markers!');
  process.exit(1);
}

html = html.substring(0, cssStartIndex) + newCss + html.substring(cssEndIndex + oldCssEndMarker.length);
console.log('✅ CSS updated successfully');

// 2. Add navbar link to 360 tour
const oldNav = `<div style="display: flex; align-items: center; gap: 8px;">`;
const newNav = `<div style="display: flex; align-items: center; gap: 8px;">
          <a href="#farm-360-tour" class="btn btn-nav-360" style="padding: 7px 14px; font-size: 13px; background: rgba(32, 60, 43, 0.08); color: var(--forest); border: 1px solid rgba(32, 60, 43, 0.14);">360° Tour</a>`;
html = html.replace(oldNav, newNav);

// 3. Simplify hero subtitle
html = html.replace(
  'Breathe clean country air, step into fertile soil, and experience the timeless rhythms of rural farming alongside authentic agrarian stewards.',
  'Breathe clean country air, touch living soil, and experience authentic farm life.'
);

// 4. Insert dedicated 360 tour section after Hero
const heroEnd = `      <div class="hero-glass" id="heroGlass"></div>\n    </section>`;

const dedicated360Section = `      <div class="hero-glass" id="heroGlass"></div>
    </section>

    <!-- 01B. DEDICATED 360° VIRTUAL FARM TOUR SECTION -->
    <section class="farm360-integrated-section" id="farm-360-tour">
      <div class="farm360-container">
        <div class="farm360-section-head">
          <span class="pill">Virtual Farm Immersion</span>
          <h2 class="h2">Explore the Farm in 360°</h2>
          <p class="farm360-subtitle">Look around and experience the farm before you visit.</p>
        </div>

        <!-- 360 Viewing Area Stage Card -->
        <div class="farm360-stage-card is-off" id="farm360StageCard">
          <!-- Preview State (when OFF) -->
          <div class="farm360-preview-wrap" id="farm360PreviewWrap">
            <img src="/assets/farm_tour/tamil_nadu_hill_farm_360_master.jpg" alt="Tamil Nadu Hill Farm 360 Preview" class="farm360-preview-img" loading="lazy">
            <div class="farm360-preview-scrim"></div>
            
            <div class="farm360-preview-center">
              <button type="button" class="btn btn-gold farm360-start-btn" id="start360TourBtn" aria-label="Start 360 Farm Tour">
                <span class="btn-360-pulse"></span>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-20 12 12)"></ellipse>
                  <path d="M12 2a10 10 0 1 0 10 10"></path>
                </svg>
                <span>Start 360° View</span>
              </button>
              <span class="farm360-preview-hint">Click to activate interactive 360° view</span>
            </div>
          </div>

          <!-- Live WebGL Canvas Area (when ON) -->
          <div class="farm360-live-canvas-wrap" id="farm360LiveCanvasWrap" style="display: none;">
            <canvas id="farm360LiveCanvas"></canvas>

            <!-- Minimal Top Controls Overlay -->
            <div class="farm360-controls-top">
              <!-- ON / OFF Toggle Pill -->
              <button type="button" class="farm360-toggle-btn is-on" id="toggle360PowerBtn" aria-label="Turn 360 Tour Off">
                <span class="toggle-dot"></span>
                <span id="toggle360PowerLabel">360° Tour: ON • Turn OFF</span>
              </button>

              <!-- Minimal Atmosphere Switcher -->
              <div class="farm360-atmo-pills" role="group" aria-label="Time of Day">
                <button type="button" class="atmo-pill is-active" data-atmo="morning">🌅 Morning</button>
                <button type="button" class="atmo-pill" data-atmo="golden">☀️ Golden</button>
                <button type="button" class="atmo-pill" data-atmo="monsoon">🌧️ Monsoon</button>
              </div>

              <!-- Fullscreen Button -->
              <button type="button" class="farm360-icon-btn" id="farm360FullscreenBtn" title="Toggle Fullscreen" aria-label="Toggle Fullscreen">
                <svg id="fsIconExpand" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                <svg id="fsIconCompress" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" style="display:none;"><path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7"/></svg>
              </button>
            </div>

            <!-- Bottom Controls Overlay (Left/Right Navigation & Drag Hint) -->
            <div class="farm360-controls-bottom">
              <button type="button" class="farm360-nav-arrow" id="farm360NavLeft" title="Look Left" aria-label="Rotate View Left">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
                <span>Left</span>
              </button>

              <div class="farm360-drag-indicator">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 9l-3 3 3 3M19 9l3 3-3 3M2 12h20"/></svg>
                <span>Drag mouse or swipe to look around</span>
              </div>

              <button type="button" class="farm360-nav-arrow" id="farm360NavRight" title="Look Right" aria-label="Rotate View Right">
                <span>Right</span>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>`;

if (html.includes(heroEnd)) {
  html = html.replace(heroEnd, dedicated360Section);
  console.log('✅ Dedicated 360 section inserted after Hero');
} else {
  console.error('Could not find heroEnd marker!');
  process.exit(1);
}

// 5. Remove the old standalone modal markup (#farm360Modal)
const oldModalStart = '  <!-- 360 Realtime South Indian Hill Farm Tour Modal -->';
const oldModalEnd = '  <!-- Toast Notification -->';
const modalStartIndex = html.indexOf(oldModalStart);
const modalEndIndex = html.indexOf(oldModalEnd);

if (modalStartIndex !== -1 && modalEndIndex !== -1) {
  html = html.substring(0, modalStartIndex) + html.substring(modalEndIndex);
  console.log('✅ Old farm360Modal removed');
}

// 6. Simplify Terroirs section (remove redundant calendar and quote to keep visual and minimal)
const quoteAndCalendarMarkerStart = '            <!-- Steward Quote Callout -->';
const quoteAndCalendarMarkerEnd = '            <!-- Terroir CTA Action Bar -->';
const qIdx = html.indexOf(quoteAndCalendarMarkerStart);
const cIdx = html.indexOf(quoteAndCalendarMarkerEnd);

if (qIdx !== -1 && cIdx !== -1) {
  html = html.substring(0, qIdx) + html.substring(cIdx);
  console.log('✅ Streamlined Terroir card (pruned verbose calendar and quote text)');
}

// 7. Replace client engine script
const scriptStartMarker = '  <!-- 360 Realtime Farm Tour Three.js Engine & Client Logic -->';
const scriptEndMarker = '</body>';
const sStart = html.indexOf(scriptStartMarker);
const sEnd = html.indexOf(scriptEndMarker);

const newIntegratedScript = `  <!-- Dedicated Integrated 360 Farm Tour Engine -->
  <script>
    (function initIntegratedFarm360Engine() {
      // Elements
      const stageCard = document.getElementById('farm360StageCard');
      const previewWrap = document.getElementById('farm360PreviewWrap');
      const liveCanvasWrap = document.getElementById('farm360LiveCanvasWrap');
      const canvas = document.getElementById('farm360LiveCanvas');
      const startBtn = document.getElementById('start360TourBtn');
      const togglePowerBtn = document.getElementById('toggle360PowerBtn');
      const togglePowerLabel = document.getElementById('toggle360PowerLabel');
      const navLeftBtn = document.getElementById('farm360NavLeft');
      const navRightBtn = document.getElementById('farm360NavRight');
      const fsBtn = document.getElementById('farm360FullscreenBtn');
      const fsIconExpand = document.getElementById('fsIconExpand');
      const fsIconCompress = document.getElementById('fsIconCompress');
      const atmoBtns = document.querySelectorAll('.atmo-pill');
      const heroTourBtn = document.getElementById('open360TourBtn');
      const cornerTourBtn = document.getElementById('corner360TourBtn');

      if (!stageCard || !previewWrap || !liveCanvasWrap || !canvas) return;

      // State variables
      let isTourActive = false;
      let isInitialized = false;
      let animationFrameId = null;

      let renderer = null;
      let scene = null;
      let camera = null;
      let sphereMesh = null;
      let cloudGroup = null;
      let mistParticles = null;
      let dirLight = null;
      let hemiLight = null;

      let currentAtmo = 'morning';
      let isUserInteracting = false;
      let onPointerDownPointerX = 0;
      let onPointerDownPointerY = 0;
      let onPointerDownLon = 0;
      let onPointerDownLat = 0;
      let lon = 45;
      let lat = 0;
      let targetLon = 45;
      let targetLat = 0;
      let fov = 75;
      let targetFov = 75;

      // Panorama textures
      const textureLoader = new THREE.TextureLoader();
      const panoTextures = {};
      const atmoUrls = {
        morning: '/assets/farm_tour/pano_morning.jpg',
        golden: '/assets/farm_tour/pano_golden.jpg',
        monsoon: '/assets/farm_tour/pano_monsoon.jpg'
      };

      // Soft mist texture
      function createSoftMistTexture() {
        const c = document.createElement('canvas');
        c.width = 256;
        c.height = 256;
        const ctx = c.getContext('2d');
        const g = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
        g.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
        g.addColorStop(0.5, 'rgba(235, 248, 242, 0.15)');
        g.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(128, 128, 120, 0, Math.PI * 2);
        ctx.fill();
        const tex = new THREE.CanvasTexture(c);
        tex.needsUpdate = true;
        return tex;
      }

      // Initialize Three.js scene (on-demand only when ON)
      function initThreeScene() {
        if (isInitialized) return;

        const width = liveCanvasWrap.clientWidth || stageCard.clientWidth || 800;
        const height = liveCanvasWrap.clientHeight || stageCard.clientHeight || 450;

        renderer = new THREE.WebGLRenderer({
          canvas: canvas,
          antialias: true,
          powerPreference: 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(fov, width / height, 1, 1200);
        camera.target = new THREE.Vector3(0, 0, 0);

        hemiLight = new THREE.HemisphereLight(0xffffff, 0x243322, 1.15);
        scene.add(hemiLight);

        dirLight = new THREE.DirectionalLight(0xfff5e1, 0.95);
        dirLight.position.set(200, 320, 160);
        scene.add(dirLight);

        // 360 Inverted Sphere
        const sphereGeo = new THREE.SphereGeometry(500, 60, 36);
        sphereGeo.scale(-1, 1, 1);

        const sphereMat = new THREE.MeshBasicMaterial({
          map: panoTextures[currentAtmo] || null,
          color: 0xffffff
        });
        sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
        scene.add(sphereMesh);

        // Load current texture
        textureLoader.load(atmoUrls[currentAtmo], (tex) => {
          tex.wrapS = THREE.RepeatWrapping;
          tex.generateMipmaps = true;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          panoTextures[currentAtmo] = tex;
          sphereMesh.material.map = tex;
          sphereMesh.material.needsUpdate = true;
        });

        // Delicate floating mist clusters
        cloudGroup = new THREE.Group();
        const mistMat = new THREE.SpriteMaterial({
          map: createSoftMistTexture(),
          transparent: true,
          opacity: 0.45,
          depthWrite: false
        });

        for (let i = 0; i < 8; i++) {
          const sprite = new THREE.Sprite(mistMat.clone());
          const angle = (i / 8) * Math.PI * 2;
          const radius = 280 + Math.random() * 80;
          sprite.position.set(Math.cos(angle) * radius, 40 + Math.random() * 60, Math.sin(angle) * radius);
          const s = 140 + Math.random() * 80;
          sprite.scale.set(s, s * 0.45, 1);
          sprite.userData = { baseY: sprite.position.y, seed: Math.random() * 10 };
          cloudGroup.add(sprite);
        }
        scene.add(cloudGroup);

        attachControls();
        isInitialized = true;
      }

      // Drag Controls
      function attachControls() {
        const onPointerDown = (e) => {
          if (e.isPrimary === false) return;
          isUserInteracting = true;
          liveCanvasWrap.classList.add('is-dragging');

          const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
          const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

          onPointerDownPointerX = clientX;
          onPointerDownPointerY = clientY;
          onPointerDownLon = targetLon;
          onPointerDownLat = targetLat;

          document.addEventListener('pointermove', onPointerMove, false);
          document.addEventListener('pointerup', onPointerUp, false);
        };

        const onPointerMove = (e) => {
          if (e.isPrimary === false) return;
          const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
          const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

          targetLon = (onPointerDownPointerX - clientX) * 0.18 + onPointerDownLon;
          targetLat = (clientY - onPointerDownPointerY) * 0.18 + onPointerDownLat;
          targetLat = Math.max(-85, Math.min(85, targetLat));
        };

        const onPointerUp = (e) => {
          if (e && e.isPrimary === false) return;
          isUserInteracting = false;
          liveCanvasWrap.classList.remove('is-dragging');
          document.removeEventListener('pointermove', onPointerMove);
          document.removeEventListener('pointerup', onPointerUp);
        };

        liveCanvasWrap.addEventListener('pointerdown', onPointerDown, false);

        // Wheel Zoom
        liveCanvasWrap.addEventListener('wheel', (e) => {
          e.preventDefault();
          targetFov = Math.max(45, Math.min(85, targetFov + e.deltaY * 0.05));
        }, { passive: false });

        // Resize handler
        window.addEventListener('resize', handleResize);
      }

      function handleResize() {
        if (!renderer || !camera) return;
        const w = liveCanvasWrap.clientWidth || stageCard.clientWidth;
        const h = liveCanvasWrap.clientHeight || stageCard.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }

      // Animation Render Loop (NO autoplay or camera spinning!)
      let clock = 0;
      function renderLoop() {
        if (!isTourActive) return;
        animationFrameId = requestAnimationFrame(renderLoop);
        clock += 0.016;

        // Smooth camera dampening to user interaction
        lon += (targetLon - lon) * 0.1;
        lat += (targetLat - lat) * 0.1;
        fov += (targetFov - fov) * 0.1;

        camera.fov = fov;
        camera.updateProjectionMatrix();

        const phi = THREE.MathUtils.degToRad(90 - lat);
        const theta = THREE.MathUtils.degToRad(lon);

        camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
        camera.target.y = 500 * Math.cos(phi);
        camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);
        camera.lookAt(camera.target);

        // Gentle ambient cloud drift
        if (cloudGroup) {
          cloudGroup.rotation.y += 0.0002;
          cloudGroup.children.forEach(sprite => {
            if (sprite.userData) {
              sprite.position.y = sprite.userData.baseY + Math.sin(clock * 0.5 + sprite.userData.seed) * 4;
            }
          });
        }

        renderer.render(scene, camera);
      }

      // START 360 Tour (Turn ON)
      function startTour() {
        isTourActive = true;
        stageCard.classList.remove('is-off');
        stageCard.classList.add('is-on');

        previewWrap.style.display = 'none';
        liveCanvasWrap.style.display = 'block';

        if (togglePowerBtn) {
          togglePowerBtn.classList.remove('is-off');
          togglePowerBtn.classList.add('is-on');
        }
        if (togglePowerLabel) {
          togglePowerLabel.textContent = '360° Tour: ON • Turn OFF';
        }

        if (!isInitialized) {
          initThreeScene();
        } else {
          handleResize();
        }

        renderLoop();
      }

      // STOP 360 Tour (Turn OFF)
      function stopTour() {
        isTourActive = false;
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }

        stageCard.classList.remove('is-on');
        stageCard.classList.add('is-off');

        liveCanvasWrap.style.display = 'none';
        previewWrap.style.display = 'flex';

        if (togglePowerBtn) {
          togglePowerBtn.classList.remove('is-on');
          togglePowerBtn.classList.add('is-off');
        }
        if (togglePowerLabel) {
          togglePowerLabel.textContent = '360° Tour: OFF • Turn ON';
        }
      }

      function toggleTourPower() {
        if (isTourActive) {
          stopTour();
        } else {
          startTour();
        }
      }

      // Left & Right Navigation
      function rotateLeft() {
        targetLon -= 25;
      }

      function rotateRight() {
        targetLon += 25;
      }

      // Fullscreen Toggle
      function toggleFullscreen() {
        const isFs = document.fullscreenElement || stageCard.classList.contains('is-fullscreen');
        if (!isFs) {
          if (stageCard.requestFullscreen) {
            stageCard.requestFullscreen().catch(() => {
              stageCard.classList.add('is-fullscreen');
            });
          } else {
            stageCard.classList.add('is-fullscreen');
          }
          if (fsIconExpand) fsIconExpand.style.display = 'none';
          if (fsIconCompress) fsIconCompress.style.display = 'block';
        } else {
          if (document.exitFullscreen && document.fullscreenElement) {
            document.exitFullscreen();
          }
          stageCard.classList.remove('is-fullscreen');
          if (fsIconExpand) fsIconExpand.style.display = 'block';
          if (fsIconCompress) fsIconCompress.style.display = 'none';
        }
        setTimeout(handleResize, 150);
      }

      // Atmosphere Switcher
      function switchAtmosphere(atmo) {
        if (atmo === currentAtmo) return;
        currentAtmo = atmo;

        atmoBtns.forEach(btn => {
          btn.classList.toggle('is-active', btn.getAttribute('data-atmo') === atmo);
        });

        if (panoTextures[atmo]) {
          if (sphereMesh) {
            sphereMesh.material.map = panoTextures[atmo];
            sphereMesh.material.needsUpdate = true;
          }
        } else {
          textureLoader.load(atmoUrls[atmo], (tex) => {
            tex.wrapS = THREE.RepeatWrapping;
            tex.generateMipmaps = true;
            panoTextures[atmo] = tex;
            if (sphereMesh && currentAtmo === atmo) {
              sphereMesh.material.map = tex;
              sphereMesh.material.needsUpdate = true;
            }
          });
        }
      }

      // Smooth scroll to 360 section and activate
      function jumpTo360SectionAndStart() {
        const target = document.getElementById('farm-360-tour');
        if (target) {
          if (window.__lenis) {
            window.__lenis.scrollTo(target, { offset: -30, duration: 1.2 });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
        startTour();
      }

      // Event Listeners
      if (startBtn) startBtn.addEventListener('click', startTour);
      if (togglePowerBtn) togglePowerBtn.addEventListener('click', toggleTourPower);
      if (navLeftBtn) navLeftBtn.addEventListener('click', rotateLeft);
      if (navRightBtn) navRightBtn.addEventListener('click', rotateRight);
      if (fsBtn) fsBtn.addEventListener('click', toggleFullscreen);

      atmoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const atmo = btn.getAttribute('data-atmo');
          if (atmo) switchAtmosphere(atmo);
        });
      });

      if (heroTourBtn) heroTourBtn.addEventListener('click', jumpTo360SectionAndStart);
      if (cornerTourBtn) cornerTourBtn.addEventListener('click', jumpTo360SectionAndStart);

      document.addEventListener('fullscreenchange', () => {
        const inFs = !!document.fullscreenElement;
        if (!inFs) {
          stageCard.classList.remove('is-fullscreen');
          if (fsIconExpand) fsIconExpand.style.display = 'block';
          if (fsIconCompress) fsIconCompress.style.display = 'none';
        }
        setTimeout(handleResize, 150);
      });

      // Expose globally for testing
      window.__farm360 = {
        start: startTour,
        stop: stopTour,
        toggle: toggleTourPower,
        rotateLeft,
        rotateRight,
        toggleFullscreen,
        switchAtmosphere,
        isActive: () => isTourActive
      };
    })();
  </script>
</body>`;

if (sStart !== -1 && sEnd !== -1) {
  html = html.substring(0, sStart) + newIntegratedScript + html.substring(sEnd + '</body>'.length);
  console.log('✅ Integrated 360 script installed');
} else {
  console.error('Could not find script block markers!');
  process.exit(1);
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('🎉 index.html successfully updated with dedicated integrated 360 farm tour section!');
