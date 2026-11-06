const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace CSS in index.html
const cssTargetStart = '/* 04. FARM STORIES */';
const cssTargetEnd = '/* 04B. FARM-TO-FORK HARVEST HAMPERS */';

const newStoriesCSS = `/* 04. STORIES ROOTED IN THE SOIL (PREMIUM SIDE-BY-SIDE SCROLL STORYTELLING) */
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
    }
    .story-giant-num {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      opacity: 0;
      transform: translateY(40px);
      pointer-events: none;
      transition: opacity .45s ease, transform .45s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .story-giant-num.is-active {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
    .giant-digit {
      font-family: "Playfair Display", Georgia, serif;
      font-size: clamp(110px, 14vw, 190px);
      font-weight: 800;
      line-height: 0.82;
      letter-spacing: -0.04em;
      display: block;
      user-select: none;
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
      transition: width .2s ease;
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

    /* RIGHT COLUMN: Story & Visuals Card Stack */
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
    }
    .story-slide {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      opacity: 0;
      pointer-events: none;
      transform: scale(1.03) translateY(24px);
      transition: opacity .5s ease, transform .5s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .story-slide.is-active {
      opacity: 1;
      pointer-events: auto;
      transform: scale(1) translateY(0);
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
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform .75s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .story-slide:hover .story-slide-image {
      transform: scale(1.03);
    }
    .story-visual-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(14, 28, 18, 0.65) 0%, rgba(14, 28, 18, 0.1) 50%, rgba(14, 28, 18, 0.25) 100%);
      pointer-events: none;
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
    }
    .story-step-prefix {
      font-size: 11px;
      font-weight: 700;
      color: var(--harvest);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 4px;
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

const cssStartIndex = html.indexOf(cssTargetStart);
const cssEndIndex = html.indexOf(cssTargetEnd);
if (cssStartIndex === -1 || cssEndIndex === -1) {
  throw new Error("Could not find CSS boundaries");
}
html = html.slice(0, cssStartIndex) + newStoriesCSS + html.slice(cssEndIndex);

// 2. Replace HTML Section
const htmlTargetStart = '<!-- 04. FARM STORIES -->';
const htmlTargetEnd = '<!-- 04B. FARM-TO-FORK HARVEST HAMPERS -->';

const newStoriesHTML = `<!-- 04. STORIES ROOTED IN THE SOIL (PREMIUM SIDE-BY-SIDE SCROLL STORYTELLING) -->
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

            <!-- LEFT COLUMN: Oversized Numbers -->
            <div class="stories-col-left">
              <div class="stories-number-stage" id="storiesNumberStage">
                <!-- Giant Number 01 -->
                <div class="story-giant-num is-active" data-stage="0" id="num-0">
                  <span class="giant-digit num-color-1">01</span>
                  <span class="num-sub-label">Discover</span>
                </div>
                <!-- Giant Number 02 -->
                <div class="story-giant-num" data-stage="1" id="num-1">
                  <span class="giant-digit num-color-2">02</span>
                  <span class="num-sub-label">Participate</span>
                </div>
                <!-- Giant Number 03 -->
                <div class="story-giant-num" data-stage="2" id="num-2">
                  <span class="giant-digit num-color-3">03</span>
                  <span class="num-sub-label">Experience</span>
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

            <!-- RIGHT COLUMN: Story & Visuals Card Stack -->
            <div class="stories-col-right">
              <div class="stories-viewport-card" id="storiesViewportCard">

                <!-- STAGE 01: Discover the Farm -->
                <article class="story-slide is-active" data-stage="0" id="slide-0">
                  <div class="story-visual-frame">
                    <img src="/assets/stories/story_01_discover_farm.jpg" alt="01 – Discover the Farm: Sweeping landscape of One Day Kissan farmland in morning light" class="story-slide-image" loading="lazy">
                    <div class="story-visual-overlay"></div>
                    <div class="story-visual-badge">Stage 01 • Countryside Discovery</div>
                  </div>
                  <div class="story-editorial-copy">
                    <span class="story-step-prefix">Stage 01</span>
                    <h3 class="story-editorial-heading">Discover the Farm</h3>
                    <p class="story-editorial-desc">Explore the farm, discover nature and experience the beauty of rural life.</p>
                    <div class="story-tag-cluster">
                      <span class="story-chip">Wide Open Farmland</span>
                      <span class="story-chip">Morning Mist Trails</span>
                      <span class="story-chip">Native Flora</span>
                    </div>
                  </div>
                </article>

                <!-- STAGE 02: Participate in Farming -->
                <article class="story-slide" data-stage="1" id="slide-1">
                  <div class="story-visual-frame">
                    <img src="/assets/stories/story_02_participate_farming.jpg" alt="02 – Participate in Farming: Visitors actively planting paddy rice seedlings in wet soil" class="story-slide-image" loading="lazy">
                    <div class="story-visual-overlay"></div>
                    <div class="story-visual-badge">Stage 02 • Agrarian Work</div>
                  </div>
                  <div class="story-editorial-copy">
                    <span class="story-step-prefix">Stage 02</span>
                    <h3 class="story-editorial-heading">Participate in Farming</h3>
                    <p class="story-editorial-desc">Get your hands into the soil and experience farming yourself.</p>
                    <div class="story-tag-cluster">
                      <span class="story-chip">Paddy Transplantation</span>
                      <span class="story-chip">Soil Stewardship</span>
                      <span class="story-chip">Hands-On Fieldwork</span>
                    </div>
                  </div>
                </article>

                <!-- STAGE 03: Experience Rural Life -->
                <article class="story-slide" data-stage="2" id="slide-2">
                  <div class="story-visual-frame">
                    <img src="/assets/stories/story_03_experience_rural_life.jpg" alt="03 – Experience Rural Life: Traditional clay chulha woodfire cooking and rural hospitality" class="story-slide-image" loading="lazy">
                    <div class="story-visual-overlay"></div>
                    <div class="story-visual-badge">Stage 03 • Living Culture</div>
                  </div>
                  <div class="story-editorial-copy">
                    <span class="story-step-prefix">Stage 03</span>
                    <h3 class="story-editorial-heading">Experience Rural Life</h3>
                    <p class="story-editorial-desc">Enjoy traditional food, rural culture and meaningful moments.</p>
                    <div class="story-tag-cluster">
                      <span class="story-chip">Woodfire Hearth Cooking</span>
                      <span class="story-chip">Artisan Pottery</span>
                      <span class="story-chip">Folk Stories</span>
                    </div>
                  </div>
                </article>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>

    `;

const htmlStartIndex = html.indexOf(htmlTargetStart);
const htmlEndIndex = html.indexOf(htmlTargetEnd);
if (htmlStartIndex === -1 || htmlEndIndex === -1) {
  throw new Error("Could not find HTML boundaries");
}
html = html.slice(0, htmlStartIndex) + newStoriesHTML + html.slice(htmlEndIndex);

// 3. Replace JS Scroll Animation in setupScroll
const oldJsBlock = `        // Farm Stories cards stagger entrance
        gsap.from('.story-card', {
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stories-grid',
            start: 'top 75%'
          }
        });`;

const newJsBlock = `        // ------------------------------------------------------------------
        // Premium Side-by-Side Scroll Storytelling (#stories)
        // ------------------------------------------------------------------
        const storySection = document.getElementById('stories');
        const numItems = document.querySelectorAll('.story-giant-num');
        const slideItems = document.querySelectorAll('.story-slide');
        const storyDots = document.querySelectorAll('.story-dot');
        const storyBar = document.getElementById('storyProgressBar');

        if (storySection && numItems.length && slideItems.length) {
          let currentStoryIndex = 0;

          function setStoryStage(idx, progress) {
            currentStoryIndex = idx;

            // Numbers transition with smooth directional offset
            numItems.forEach((numEl, i) => {
              const isActive = i === idx;
              numEl.classList.toggle('is-active', isActive);
              if (!reduce) {
                if (isActive) {
                  gsap.to(numEl, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out', overwrite: 'auto' });
                } else if (i < idx) {
                  gsap.to(numEl, { opacity: 0, y: -40, scale: 0.95, duration: 0.4, ease: 'power2.in', overwrite: 'auto' });
                } else {
                  gsap.to(numEl, { opacity: 0, y: 40, scale: 0.95, duration: 0.4, ease: 'power2.in', overwrite: 'auto' });
                }
              }
            });

            // Slides transition with layered reveals and parallax
            slideItems.forEach((slideEl, i) => {
              const isActive = i === idx;
              slideEl.classList.toggle('is-active', isActive);
              const img = slideEl.querySelector('.story-slide-image');

              if (!reduce) {
                if (isActive) {
                  gsap.to(slideEl, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power2.out', overwrite: 'auto' });
                  if (img) gsap.to(img, { scale: 1, y: 0, duration: 0.7, ease: 'power2.out', overwrite: 'auto' });
                } else if (i < idx) {
                  gsap.to(slideEl, { opacity: 0, y: -26, scale: 0.96, duration: 0.48, ease: 'power2.in', overwrite: 'auto' });
                  if (img) gsap.to(img, { scale: 1.04, y: -12, duration: 0.48, ease: 'power2.in', overwrite: 'auto' });
                } else {
                  gsap.to(slideEl, { opacity: 0, y: 26, scale: 1.04, duration: 0.48, ease: 'power2.in', overwrite: 'auto' });
                  if (img) gsap.to(img, { scale: 1.04, y: 12, duration: 0.48, ease: 'power2.in', overwrite: 'auto' });
                }
              }
            });

            // Progress bar and dot styling
            if (storyBar && progress !== undefined) {
              storyBar.style.width = \`\${Math.min(100, Math.max(0, progress * 100))}%\`;
            } else if (storyBar) {
              storyBar.style.width = \`\${((idx + 1) / 3) * 100}%\`;
            }
            storyDots.forEach((dot, i) => {
              dot.classList.toggle('is-active', i === idx);
            });
          }

          // GSAP ScrollTrigger to track scroll-linked stages
          ScrollTrigger.create({
            trigger: storySection,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
            onUpdate: (self) => {
              const p = self.progress;
              let targetIdx = 0;
              if (p >= 0.64) {
                targetIdx = 2;
              } else if (p >= 0.31) {
                targetIdx = 1;
              } else {
                targetIdx = 0;
              }
              setStoryStage(targetIdx, p);
            }
          });

          // Click on chapter dot jumps to corresponding stage
          storyDots.forEach((dot) => {
            dot.addEventListener('click', (e) => {
              e.preventDefault();
              const jumpIdx = parseInt(dot.getAttribute('data-jump'), 10) || 0;
              const totalScrollDist = storySection.offsetHeight - window.innerHeight;
              const targetY = storySection.offsetTop + (jumpIdx / 2) * totalScrollDist;
              if (window.__lenis) {
                window.__lenis.scrollTo(targetY, { duration: 1.2 });
              } else {
                window.scrollTo({ top: targetY, behavior: 'smooth' });
              }
            });
          });
        }`;

if (html.includes(oldJsBlock)) {
  html = html.replace(oldJsBlock, newJsBlock);
  console.log("✅ Updated GSAP scroll-driven storytelling in setupScroll");
} else {
  console.warn("⚠️ Could not match oldJsBlock exactly");
}

fs.writeFileSync('index.html', html, 'utf8');
console.log("🎉 Successfully transformed Stories section into Premium Side-by-Side Scroll Storytelling!");
