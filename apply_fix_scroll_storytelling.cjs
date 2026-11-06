const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Replace CSS block
const cssStartMarker = '/* 04. STORIES ROOTED IN THE SOIL (PREMIUM SIDE-BY-SIDE SCROLL STORYTELLING) */';
const cssEndMarker = '/* 04B. FARM-TO-FORK HARVEST HAMPERS */';

const cssStartIndex = html.indexOf(cssStartMarker);
const cssEndIndex = html.indexOf(cssEndMarker);

if (cssStartIndex === -1 || cssEndIndex === -1) {
  console.error('❌ Could not find CSS markers in index.html');
  process.exit(1);
}

const newCss = `/* 04. STORIES ROOTED IN THE SOIL (PREMIUM SIDE-BY-SIDE SCROLL STORYTELLING) */
    .stories-scroll-section,
    section.stories {
      position: relative;
      height: 320vh;
      background: var(--ivory);
      border-top: 1px solid rgba(32, 60, 43, 0.08);
      z-index: 4;
    }

    /* Pinned Sticky Viewport (Locks in place as user scrolls through the 320vh) */
    .stories-sticky-wrap {
      position: sticky;
      top: 0;
      height: 100vh;
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--ivory);
    }

    .stories-editorial-container {
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 4vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      box-sizing: border-box;
    }

    /* Section Header */
    .stories-editorial-header {
      margin-bottom: 22px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    .stories-section-title {
      font-family: "Playfair Display", Georgia, serif;
      font-size: clamp(28px, 3.2vw, 42px);
      color: var(--forest);
      line-height: 1.18;
      margin: 0;
    }

    /* Main Two-Column Side-by-Side Grid */
    .stories-side-by-side {
      display: grid;
      grid-template-columns: minmax(320px, 0.85fr) minmax(480px, 1.35fr);
      gap: 5vw;
      align-items: center;
      width: 100%;
    }

    /* LEFT COLUMN: Oversized Numbers */
    .stories-col-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
    }
    .stories-number-stage {
      position: relative;
      width: 100%;
      height: 230px;
      overflow: visible;
    }
    /* Single Shared Number Display Container - eliminates stacked overlapping elements */
    .story-giant-display {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      will-change: transform, opacity;
    }
    .giant-digit {
      font-family: "Playfair Display", Georgia, serif;
      font-size: clamp(110px, 14vw, 190px);
      font-weight: 800;
      line-height: 0.82;
      letter-spacing: -0.04em;
      display: block;
      user-select: none;
      will-change: transform, opacity;
    }
    .num-color-1 {
      color: #1B3B22;
      text-shadow: 0 8px 30px rgba(27, 59, 34, 0.12);
    }
    .num-color-2 {
      color: #3D6B48;
      text-shadow: 0 8px 30px rgba(61, 107, 72, 0.12);
    }
    .num-color-3 {
      color: #C89B53;
      text-shadow: 0 8px 30px rgba(200, 155, 83, 0.12);
    }
    .num-sub-label {
      font-size: 13.5px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--harvest);
      margin-top: 14px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      will-change: transform, opacity;
    }
    .num-sub-label::before {
      content: "";
      width: 24px;
      height: 2px;
      background: currentColor;
    }

    /* Chapter Progress Track */
    .story-progress-track {
      margin-top: 32px;
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .story-progress-line {
      width: 100px;
      height: 3px;
      background: rgba(32, 60, 43, 0.12);
      border-radius: 999px;
      overflow: hidden;
      position: relative;
    }
    .story-progress-bar {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 33.33%;
      background: var(--forest);
      border-radius: 999px;
      transition: width .15s ease-out;
    }
    .story-track-dots {
      display: inline-flex;
      gap: 6px;
    }
    .story-dot {
      border: 1px solid rgba(32, 60, 43, 0.12);
      background: rgba(255, 255, 255, 0.7);
      padding: 5px 12px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      color: #556250;
      cursor: pointer;
      transition: all .25s ease;
    }
    .story-dot:hover {
      background: #FFFFFF;
      color: var(--forest);
      border-color: var(--forest);
    }
    .story-dot.is-active {
      background: var(--forest);
      color: #FFFFFF;
      border-color: var(--forest);
      box-shadow: 0 4px 12px rgba(27, 59, 34, 0.2);
    }

    /* RIGHT COLUMN: Story & Visuals Card */
    .stories-col-right {
      position: relative;
      width: 100%;
    }
    .stories-viewport-card {
      position: relative;
      width: 100%;
      height: 540px;
      max-height: 70vh;
      border-radius: 26px;
      overflow: hidden;
      background: #FFFFFF;
      border: 1px solid rgba(32, 60, 43, 0.12);
      box-shadow: 0 24px 60px rgba(18, 36, 25, 0.09);
      display: flex;
      flex-direction: column;
    }

    /* Visual Frame (Upper 62%) */
    .story-visual-frame {
      position: relative;
      width: 100%;
      height: 62%;
      overflow: hidden;
      background: #1B3B22;
    }
    .story-slide-image {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      opacity: 0;
      transform: scale(1.04);
      pointer-events: none;
      will-change: transform, opacity;
    }
    .story-slide-image.is-active {
      opacity: 1;
      transform: scale(1);
      pointer-events: auto;
    }
    .story-visual-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(14, 28, 18, 0.65) 0%, rgba(14, 28, 18, 0.1) 50%, rgba(14, 28, 18, 0.25) 100%);
      pointer-events: none;
      z-index: 2;
    }
    .story-visual-badge {
      position: absolute;
      top: 16px;
      left: 16px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 5px 14px;
      border-radius: 999px;
      background: rgba(14, 28, 18, 0.78);
      color: #FFFFFF;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      z-index: 3;
      will-change: opacity, transform;
    }

    /* Editorial Caption (Lower 38%) */
    .story-editorial-copy {
      padding: 24px 28px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 38%;
      background: #FFFFFF;
      box-sizing: border-box;
      position: relative;
      z-index: 1;
      will-change: opacity, transform;
    }
    .story-step-prefix {
      font-size: 11px;
      font-weight: 700;
      color: var(--harvest);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 4px;
      display: block;
    }
    .story-editorial-heading {
      font-family: "Playfair Display", Georgia, serif;
      font-size: clamp(22px, 2.2vw, 30px);
      color: var(--forest);
      margin: 0 0 6px 0;
      line-height: 1.2;
    }
    .story-editorial-desc {
      font-size: 14.5px;
      line-height: 1.55;
      color: #435041;
      margin: 0 0 14px 0;
    }
    .story-tag-cluster {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .story-chip {
      font-size: 11px;
      font-weight: 600;
      padding: 4px 11px;
      border-radius: 999px;
      background: rgba(32, 60, 43, 0.06);
      color: var(--forest);
      border: 1px solid rgba(32, 60, 43, 0.08);
    }

    @media (max-width: 900px) {
      .stories-scroll-section,
      section.stories {
        height: 260vh;
      }
      .stories-editorial-container {
        padding: 0 5vw;
      }
      .stories-side-by-side {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      .stories-col-left {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
      .stories-number-stage {
        height: 80px;
        width: 140px;
      }
      .story-giant-display {
        height: 100%;
      }
      .giant-digit {
        font-size: clamp(60px, 14vw, 80px);
        line-height: 0.9;
      }
      .num-sub-label {
        display: none;
      }
      .story-progress-track {
        margin-top: 0;
      }
      .stories-viewport-card {
        height: 480px;
      }
      .story-editorial-copy {
        padding: 18px 20px;
      }
      .story-editorial-desc {
        font-size: 13.5px;
        margin-bottom: 10px;
      }
    }

    `;

html = html.slice(0, cssStartIndex) + newCss + html.slice(cssEndIndex);

// 2. Replace HTML block
const htmlStartMarker = '<!-- 04. STORIES ROOTED IN THE SOIL (PREMIUM SIDE-BY-SIDE SCROLL STORYTELLING) -->';
const htmlEndMarker = '<!-- 04B. FARM-TO-FORK HARVEST HAMPERS -->';

const htmlStartIndex = html.indexOf(htmlStartMarker);
const htmlEndIndex = html.indexOf(htmlEndMarker);

if (htmlStartIndex === -1 || htmlEndIndex === -1) {
  console.error('❌ Could not find HTML markers in index.html');
  process.exit(1);
}

const newHtml = `<!-- 04. STORIES ROOTED IN THE SOIL (PREMIUM SIDE-BY-SIDE SCROLL STORYTELLING) -->
    <section class="stories-scroll-section stories" id="stories">
      <div class="stories-sticky-wrap" id="storiesStickyWrap">
        <div class="stories-editorial-container">

          <!-- Section Header -->
          <div class="stories-editorial-header">
            <span class="pill">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
              Stories Rooted in the Soil
            </span>
            <h2 class="stories-section-title">A day lived with the earth.</h2>
          </div>

          <!-- Main Two-Column Side-by-Side Grid -->
          <div class="stories-side-by-side">

            <!-- LEFT COLUMN: Oversized Numbers (Single Shared Display) -->
            <div class="stories-col-left">
              <div class="stories-number-stage" id="storiesNumberStage">
                <!-- Single Shared Giant Number Display - prevents duplicate or overlapping numbers -->
                <div class="story-giant-display" id="storyGiantDisplay" data-stage="0">
                  <span class="giant-digit num-color-1" id="giantDigit">01</span>
                  <span class="num-sub-label" id="numSubLabel">Discover</span>
                </div>
              </div>

              <!-- Chapter Progress Track -->
              <div class="story-progress-track" aria-label="Story Stages Progress">
                <div class="story-progress-line">
                  <div class="story-progress-bar" id="storyProgressBar"></div>
                </div>
                <div class="story-track-dots">
                  <button type="button" class="story-dot is-active" data-jump="0" aria-label="Stage 01: Discover">01</button>
                  <button type="button" class="story-dot" data-jump="1" aria-label="Stage 02: Participate">02</button>
                  <button type="button" class="story-dot" data-jump="2" aria-label="Stage 03: Experience">03</button>
                </div>
              </div>
            </div>

            <!-- RIGHT COLUMN: Story & Visuals Card -->
            <div class="stories-col-right">
              <div class="stories-viewport-card" id="storiesViewportCard">

                <!-- Visual Frame with 3 Photorealistic Farm Layers -->
                <div class="story-visual-frame" id="storyVisualFrame">
                  <img id="storyImg-0" src="/assets/stories/story_01_discover_farm.jpg" alt="01 – Discover the Farm: Sweeping landscape of One Day Kissan farmland in morning light" class="story-slide-image is-active" loading="lazy">
                  <img id="storyImg-1" src="/assets/stories/story_02_participate_farming.jpg" alt="02 – Participate in Farming: Visitors actively planting paddy rice seedlings in wet soil" class="story-slide-image" loading="lazy">
                  <img id="storyImg-2" src="/assets/stories/story_03_experience_rural_life.jpg" alt="03 – Experience Rural Life: Traditional clay chulha woodfire cooking and rural hospitality" class="story-slide-image" loading="lazy">
                  <div class="story-visual-overlay"></div>
                  <div class="story-visual-badge" id="storyVisualBadge">Stage 01 • Countryside Discovery</div>
                </div>

                <!-- Single Shared Editorial Copy Container (No overlapping text) -->
                <div class="story-editorial-copy" id="storyEditorialCopy">
                  <span class="story-step-prefix" id="storyStepPrefix">Stage 01</span>
                  <h3 class="story-editorial-heading" id="storyHeading">Discover the Farm</h3>
                  <p class="story-editorial-desc" id="storyDesc">Explore the farm, discover nature and experience the beauty of rural life.</p>
                  <div class="story-tag-cluster" id="storyTagCluster">
                    <span class="story-chip">Wide Open Farmland</span>
                    <span class="story-chip">Morning Mist Trails</span>
                    <span class="story-chip">Native Flora</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>

    `;

html = html.slice(0, htmlStartIndex) + newHtml + html.slice(htmlEndIndex);

// 3. Replace JS block
const jsStartMarker = '// Premium Side-by-Side Scroll Storytelling (#stories)';
const jsEndMarker = '// Counters function with comma formatting and precision';

const jsStartIndex = html.indexOf(jsStartMarker);
const jsEndIndex = html.indexOf(jsEndMarker);

if (jsStartIndex === -1 || jsEndIndex === -1) {
  console.error('❌ Could not find JS markers in index.html');
  process.exit(1);
}

const newJs = `// Premium Side-by-Side Scroll Storytelling (#stories)
        // Single-Source-of-Truth Stage Controller (Zero Overlapping Elements)
        // ------------------------------------------------------------------
        const storySection = document.getElementById('stories');
        const giantDisplay = document.getElementById('storyGiantDisplay');
        const giantDigit = document.getElementById('giantDigit');
        const numSubLabel = document.getElementById('numSubLabel');
        const storyProgressBar = document.getElementById('storyProgressBar');
        const storyDots = document.querySelectorAll('.story-dot');
        const storyImgs = [
          document.getElementById('storyImg-0'),
          document.getElementById('storyImg-1'),
          document.getElementById('storyImg-2')
        ];
        const storyVisualBadge = document.getElementById('storyVisualBadge');
        const storyEditorialCopy = document.getElementById('storyEditorialCopy');
        const storyStepPrefix = document.getElementById('storyStepPrefix');
        const storyHeading = document.getElementById('storyHeading');
        const storyDesc = document.getElementById('storyDesc');
        const storyTagCluster = document.getElementById('storyTagCluster');

        if (storySection && giantDigit && numSubLabel && storyEditorialCopy) {
          const STORY_STAGES = [
            {
              num: '01',
              numClass: 'num-color-1',
              label: 'Discover',
              badge: 'Stage 01 • Countryside Discovery',
              step: 'Stage 01',
              heading: 'Discover the Farm',
              desc: 'Explore the farm, discover nature and experience the beauty of rural life.',
              tags: ['Wide Open Farmland', 'Morning Mist Trails', 'Native Flora']
            },
            {
              num: '02',
              numClass: 'num-color-2',
              label: 'Participate',
              badge: 'Stage 02 • Agrarian Work',
              step: 'Stage 02',
              heading: 'Participate in Farming',
              desc: 'Get your hands into the soil and experience farming yourself.',
              tags: ['Paddy Transplantation', 'Soil Stewardship', 'Hands-On Fieldwork']
            },
            {
              num: '03',
              numClass: 'num-color-3',
              label: 'Experience',
              badge: 'Stage 03 • Living Culture',
              step: 'Stage 03',
              heading: 'Experience Rural Life',
              desc: 'Enjoy traditional food, rural culture and meaningful moments.',
              tags: ['Woodfire Hearth Cooking', 'Artisan Pottery', 'Folk Stories']
            }
          ];

          let currentStage = 0;
          let activeTransition = null;

          function applyStageDOM(targetIdx) {
            const data = STORY_STAGES[targetIdx];
            if (!data) return;
            giantDigit.textContent = data.num;
            giantDigit.className = 'giant-digit ' + data.numClass;
            numSubLabel.textContent = data.label;
            if (giantDisplay) giantDisplay.setAttribute('data-stage', String(targetIdx));

            if (storyStepPrefix) storyStepPrefix.textContent = data.step;
            if (storyHeading) storyHeading.textContent = data.heading;
            if (storyDesc) storyDesc.textContent = data.desc;
            if (storyVisualBadge) storyVisualBadge.textContent = data.badge;

            if (storyTagCluster) {
              storyTagCluster.innerHTML = data.tags
                .map(t => '<span class="story-chip">' + t + '</span>')
                .join('');
            }
          }

          function transitionToStage(targetIdx, immediate = false, direction = 1) {
            if (targetIdx === currentStage && !immediate) return;

            const prevIdx = currentStage;
            currentStage = targetIdx;

            // Update chapter progress track dots
            storyDots.forEach((dot, i) => {
              dot.classList.toggle('is-active', i === targetIdx);
            });

            // Kill any running transition timeline
            if (activeTransition) {
              activeTransition.kill();
              activeTransition = null;
            }

            const data = STORY_STAGES[targetIdx];
            if (!data) return;

            const isDown = direction >= 0;
            const outDigitY = isDown ? -28 : 28;
            const inDigitY = isDown ? 28 : -28;
            const outCopyY = isDown ? -14 : 14;
            const inCopyY = isDown ? 14 : -14;

            if (immediate || reduce) {
              applyStageDOM(targetIdx);
              gsap.set([giantDigit, numSubLabel, storyEditorialCopy, storyVisualBadge], { opacity: 1, y: 0 });
              storyImgs.forEach((img, i) => {
                if (img) {
                  img.classList.toggle('is-active', i === targetIdx);
                  gsap.set(img, { opacity: i === targetIdx ? 1 : 0, scale: 1 });
                }
              });
              return;
            }

            // Cinematic choreographed transition timeline
            // 1. Current number moves out and fades.
            // 2. Current label fades away.
            // 3. Right-side story copy moves out and fades.
            // 4. Midpoint: update DOM contents while fully transparent.
            // 5. Next number enters smoothly with subtle vertical motion.
            // 6. Corresponding label appears.
            // 7. Right-side photograph and story transition in sync.
            const tl = gsap.timeline({
              defaults: { ease: 'power2.out' },
              onComplete: () => {
                activeTransition = null;
              }
            });
            activeTransition = tl;

            // Phase 1: Fade and slide out current elements
            tl.to(giantDigit, { opacity: 0, y: outDigitY, duration: 0.18, ease: 'power2.in' }, 0)
              .to(numSubLabel, { opacity: 0, y: outDigitY * 0.5, duration: 0.15, ease: 'power2.in' }, 0)
              .to(storyEditorialCopy, { opacity: 0, y: outCopyY, duration: 0.18, ease: 'power2.in' }, 0)
              .to(storyVisualBadge, { opacity: 0, duration: 0.15 }, 0);

            // Phase 2: Switch DOM and set starting positions for entry
            tl.add(() => {
              applyStageDOM(targetIdx);
              gsap.set(giantDigit, { y: inDigitY, opacity: 0 });
              gsap.set(numSubLabel, { y: inDigitY * 0.5, opacity: 0 });
              gsap.set(storyEditorialCopy, { y: inCopyY, opacity: 0 });
              gsap.set(storyVisualBadge, { opacity: 0 });
            });

            // Phase 3: Animate in incoming number and label
            tl.to(giantDigit, { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' }, '+=0.02')
              .to(numSubLabel, { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' }, '-=0.22')
              .to(storyEditorialCopy, { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' }, '-=0.26')
              .to(storyVisualBadge, { opacity: 1, duration: 0.24 }, '-=0.2');

            // Phase 4: Synchronized photograph crossfade with subtle scale parallax
            storyImgs.forEach((img, i) => {
              if (!img) return;
              if (i === targetIdx) {
                img.classList.add('is-active');
                tl.fromTo(img,
                  { opacity: 0, scale: 1.05 },
                  { opacity: 1, scale: 1, duration: 0.48, ease: 'power2.out' },
                  0.05
                );
              } else if (i === prevIdx) {
                tl.to(img, {
                  opacity: 0,
                  scale: 0.98,
                  duration: 0.42,
                  ease: 'power2.inOut',
                  onComplete: () => {
                    img.classList.remove('is-active');
                  }
                }, 0);
              } else {
                img.classList.remove('is-active');
                gsap.set(img, { opacity: 0, scale: 1 });
              }
            });
          }

          // Initialize Stage 0 DOM immediately
          transitionToStage(0, true, 1);

          // ScrollTrigger with Hysteresis to guarantee zero jitter/flickering
          let lastProgress = 0;
          ScrollTrigger.create({
            trigger: storySection,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
            onUpdate: (self) => {
              const p = self.progress;
              const scrollDir = p >= lastProgress ? 1 : -1;
              lastProgress = p;

              // Smooth continuous progress bar fill
              if (storyProgressBar) {
                storyProgressBar.style.width = \`\${Math.min(100, Math.max(0, p * 100))}%\`;
              }

              // Hysteresis thresholds for forward vs backward scrolling
              let targetStage = currentStage;
              if (scrollDir >= 0) {
                // Forward scrolling thresholds
                if (p >= 0.68) {
                  targetStage = 2;
                } else if (p >= 0.34) {
                  targetStage = 1;
                } else {
                  targetStage = 0;
                }
              } else {
                // Backward scrolling thresholds with deadband buffer
                if (p <= 0.30) {
                  targetStage = 0;
                } else if (p <= 0.64) {
                  targetStage = 1;
                } else {
                  targetStage = 2;
                }
              }

              if (targetStage !== currentStage) {
                transitionToStage(targetStage, false, scrollDir);
              }
            }
          });

          // Chapter dots click navigation
          storyDots.forEach((dot) => {
            dot.addEventListener('click', (e) => {
              e.preventDefault();
              const jumpIdx = parseInt(dot.getAttribute('data-jump'), 10) || 0;
              const triggers = typeof ScrollTrigger !== 'undefined' ? ScrollTrigger.getAll() : [];
              const st = triggers.find(t => t.trigger === storySection);
              let targetY = storySection.offsetTop + (jumpIdx / 2) * (storySection.offsetHeight - window.innerHeight);
              if (st && st.end > st.start) {
                targetY = st.start + (jumpIdx / 2) * (st.end - st.start);
              }
              const scrollDir = jumpIdx >= currentStage ? 1 : -1;
              transitionToStage(jumpIdx, false, scrollDir);

              if (window.__lenis) {
                window.__lenis.scrollTo(targetY, { duration: 1.0 });
              } else {
                window.scrollTo({ top: targetY, behavior: 'smooth' });
              }
            });
          });
        }

        `;

html = html.slice(0, jsStartIndex) + newJs + html.slice(jsEndIndex);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('✅ Successfully updated index.html with single-source-of-truth storytelling transitions!');
