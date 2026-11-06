const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Remove the old #stories code from its previous misplaced position (before mm.add)
const oldStoriesStart = '// Premium Side-by-Side Scroll Storytelling (#stories)';
const oldStoriesEnd = '// Counters function with comma formatting and precision';

const oldStartIndex = html.indexOf(oldStoriesStart);
const oldEndIndex = html.indexOf(oldStoriesEnd);

if (oldStartIndex === -1 || oldEndIndex === -1) {
  console.error('❌ Could not find old stories code block in index.html');
  process.exit(1);
}

// Remove old stories block from before stats/mm.add
html = html.slice(0, oldStartIndex) + html.slice(oldEndIndex);

// 2. Insert new bidirectional #stories code in correct DOM order:
// After loop accordion mm.add (max-width: 760px) and BEFORE // CTA Parallax & Entrance
const ctaMarker = '// CTA Parallax & Entrance';
const ctaIndex = html.indexOf(ctaMarker);

if (ctaIndex === -1) {
  console.error('❌ Could not find CTA Parallax marker in index.html');
  process.exit(1);
}

const newStoriesCode = `// ------------------------------------------------------------------
        // Premium Side-by-Side Scroll Storytelling (#stories)
        // Bidirectional Single-Source-of-Truth Controller (01 <-> 02 <-> 03)
        // Correct DOM order: initialized after #stats and #loop pinning
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
              stageIndex: 0,
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
              stageIndex: 1,
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
              stageIndex: 2,
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

            // Kill any in-flight transition to prevent desync or queue build-up
            if (activeTransition) {
              activeTransition.kill();
              activeTransition = null;
            }

            const data = STORY_STAGES[targetIdx];
            if (!data) return;

            const isDown = direction >= 0;
            const outDigitY = isDown ? -30 : 30;
            const inDigitY = isDown ? 30 : -30;
            const outCopyY = isDown ? -16 : 16;
            const inCopyY = isDown ? 16 : -16;

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

            // Bidirectional cinematic choreographed transition timeline
            // Forward (down): Outgoing moves UP & fades -> Midpoint swap -> Incoming moves UP from below & fades in
            // Backward (up): Outgoing moves DOWN & fades -> Midpoint swap -> Incoming moves DOWN from above & fades in
            const tl = gsap.timeline({
              defaults: { ease: 'power2.out' },
              onComplete: () => {
                activeTransition = null;
              }
            });
            activeTransition = tl;

            // Phase 1: Slide & fade out previous elements
            tl.to(giantDigit, { opacity: 0, y: outDigitY, duration: 0.20, ease: 'power2.in' }, 0)
              .to(numSubLabel, { opacity: 0, y: outDigitY * 0.5, duration: 0.16, ease: 'power2.in' }, 0)
              .to(storyEditorialCopy, { opacity: 0, y: outCopyY, duration: 0.20, ease: 'power2.in' }, 0)
              .to(storyVisualBadge, { opacity: 0, duration: 0.16 }, 0);

            // Phase 2: Switch DOM and set incoming starting position at 0% opacity
            tl.add(() => {
              applyStageDOM(targetIdx);
              gsap.set(giantDigit, { y: inDigitY, opacity: 0 });
              gsap.set(numSubLabel, { y: inDigitY * 0.5, opacity: 0 });
              gsap.set(storyEditorialCopy, { y: inCopyY, opacity: 0 });
              gsap.set(storyVisualBadge, { opacity: 0 });
            });

            // Phase 3: Animate in incoming number, label, and copy with silky easing
            tl.to(giantDigit, { opacity: 1, y: 0, duration: 0.34, ease: 'power2.out' }, '+=0.02')
              .to(numSubLabel, { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' }, '-=0.24')
              .to(storyEditorialCopy, { opacity: 1, y: 0, duration: 0.34, ease: 'power2.out' }, '-=0.28')
              .to(storyVisualBadge, { opacity: 1, duration: 0.26 }, '-=0.22');

            // Phase 4: Synchronized photograph crossfade with subtle scale parallax
            storyImgs.forEach((img, i) => {
              if (!img) return;
              if (i === targetIdx) {
                img.classList.add('is-active');
                tl.fromTo(img,
                  { opacity: 0, scale: isDown ? 1.05 : 0.98 },
                  { opacity: 1, scale: 1, duration: 0.48, ease: 'power2.out' },
                  0.04
                );
              } else if (i === prevIdx) {
                tl.to(img, {
                  opacity: 0,
                  scale: isDown ? 0.98 : 1.05,
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

          // Force Stage 01 as the guaranteed initial state
          transitionToStage(0, true, 1);

          // ScrollTrigger for Stories Section:
          // start: 'top top' - pins & starts when the top of the section reaches the top of the viewport
          // end: 'bottom bottom' - unpins when the bottom of the section reaches the bottom of viewport
          const storyST = ScrollTrigger.create({
            trigger: storySection,
            start: 'top top',
            end: 'bottom bottom',
            refreshPriority: 10,
            onEnter: () => {
              // Always guarantee Stage 01 when entering from above
              transitionToStage(0, false, 1);
            },
            onLeaveBack: () => {
              // Always reset to Stage 01 when scrolling back above the section
              transitionToStage(0, false, -1);
            },
            onEnterBack: () => {
              // When re-entering from below (scrolling UP from hampers), start at Stage 03
              transitionToStage(2, false, -1);
            },
            onLeave: () => {
              // When leaving past the bottom, ensure Stage 03 is active
              transitionToStage(2, false, 1);
            },
            onUpdate: (self) => {
              const p = self.progress;
              const dir = self.direction; // 1 = scrolling down, -1 = scrolling up

              // Smooth continuous progress bar fill
              if (storyProgressBar) {
                storyProgressBar.style.width = \`\${Math.min(100, Math.max(0, p * 100))}%\`;
              }

              // Before or at the very start of the section: always Stage 01
              if (p <= 0.05) {
                if (currentStage !== 0) transitionToStage(0, false, dir);
                return;
              }
              // At or past the very end: always Stage 03
              if (p >= 0.95) {
                if (currentStage !== 2) transitionToStage(2, false, dir);
                return;
              }

              // Determine target stage with symmetrical directional hysteresis
              let targetStage = currentStage;
              if (dir >= 0) {
                // Forward scrolling (01 -> 02 -> 03)
                if (p >= 0.67) {
                  targetStage = 2;
                } else if (p >= 0.34) {
                  targetStage = 1;
                } else {
                  targetStage = 0;
                }
              } else {
                // Backward scrolling (03 -> 02 -> 01)
                if (p <= 0.32) {
                  targetStage = 0;
                } else if (p <= 0.65) {
                  targetStage = 1;
                } else {
                  targetStage = 2;
                }
              }

              if (targetStage !== currentStage) {
                transitionToStage(targetStage, false, dir);
              }
            }
          });

          // Handle page refresh at scroll position: check progress on initialization
          if (storyST.progress > 0) {
            const initialTarget = storyST.progress >= 0.67 ? 2 : (storyST.progress >= 0.34 ? 1 : 0);
            transitionToStage(initialTarget, true, 1);
            if (storyProgressBar) {
              storyProgressBar.style.width = \`\${Math.min(100, Math.max(0, storyST.progress * 100))}%\`;
            }
          }

          // Chapter dots click navigation (bidirectional jump)
          storyDots.forEach((dot) => {
            dot.addEventListener('click', (e) => {
              e.preventDefault();
              const jumpIdx = parseInt(dot.getAttribute('data-jump'), 10) || 0;
              const st = ScrollTrigger.getAll().find(t => t.trigger === storySection);
              const fraction = jumpIdx === 0 ? 0.08 : (jumpIdx === 1 ? 0.50 : 0.88);
              let targetY = storySection.offsetTop + fraction * (storySection.offsetHeight - window.innerHeight);
              if (st && st.end > st.start) {
                targetY = st.start + fraction * (st.end - st.start);
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

html = html.slice(0, ctaIndex) + newStoriesCode + html.slice(ctaIndex);

// 3. Ensure ScrollTrigger.sort() and ScrollTrigger.refresh() are called:
// At the end of setupScroll()
const setupScrollEndMarker = 'ScrollTrigger.refresh();\n      }';
if (html.includes(setupScrollEndMarker)) {
  html = html.replace(setupScrollEndMarker, 'ScrollTrigger.sort();\n        ScrollTrigger.refresh();\n      }');
}

// In introComplete()
const introCompleteMarker = 'setupScroll();';
if (html.includes(introCompleteMarker)) {
  html = html.replace('setupScroll();', 'setupScroll();\n        ScrollTrigger.sort();\n        ScrollTrigger.refresh();');
}

// In window.addEventListener('load')
const loadMarker = "window.addEventListener('load', () => {\n        ScrollTrigger.refresh();\n      });";
if (html.includes(loadMarker)) {
  html = html.replace(loadMarker, "window.addEventListener('load', () => {\n        ScrollTrigger.sort();\n        ScrollTrigger.refresh();\n      });");
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('✅ Successfully applied bidirectional scroll fix to index.html!');
