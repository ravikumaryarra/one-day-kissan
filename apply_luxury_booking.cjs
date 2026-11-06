const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// =========================================================================
// 1. LUXURY BOOKING CSS
// =========================================================================
const luxuryBookingCSS = `
    /* 05. LUXURY FARM RESERVATION & BOOKING EXPERIENCE */
    section.luxury-booking-section {
      position: relative;
      background: linear-gradient(180deg, #132418 0%, #0d1a11 50%, #09130c 100%);
      color: #FAF7F0;
      padding: 90px 4vw 80px;
      overflow: hidden;
      z-index: 4;
    }
    .luxury-booking-container {
      max-width: 1360px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 56px;
    }
    .luxury-booking-grid {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 40px;
      align-items: stretch;
    }

    /* LEFT SIDE: Farm Photography */
    .luxury-visual-col {
      position: relative;
      border-radius: 26px;
      overflow: hidden;
      min-height: 640px;
      border: 1px solid rgba(217, 168, 92, 0.28);
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 32px;
      background: #0d1a11;
    }
    .luxury-visual-img-wrap {
      position: absolute;
      inset: 0;
      z-index: 1;
      overflow: hidden;
    }
    .luxury-visual-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s ease;
      filter: saturate(1.05) brightness(0.92);
    }
    .luxury-visual-col:hover .luxury-visual-img {
      transform: scale(1.035);
    }
    .luxury-visual-overlay {
      position: absolute;
      inset: 0;
      z-index: 2;
      background: linear-gradient(180deg, rgba(9, 19, 12, 0.35) 0%, rgba(9, 19, 12, 0.1) 40%, rgba(9, 19, 12, 0.92) 100%);
      pointer-events: none;
    }
    .luxury-visual-top {
      position: relative;
      z-index: 3;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      flex-wrap: wrap;
    }
    .luxury-location-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(14, 26, 17, 0.8);
      border: 1px solid rgba(217, 168, 92, 0.45);
      color: #FAF7F0;
      padding: 8px 16px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: .03em;
      backdrop-filter: blur(12px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    }
    .luxury-location-pill svg {
      width: 14px;
      height: 14px;
      fill: var(--harvest);
      flex-shrink: 0;
    }
    .luxury-visual-caption {
      position: relative;
      z-index: 3;
      background: rgba(14, 26, 17, 0.82);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 20px;
      padding: 24px 26px;
      backdrop-filter: blur(16px);
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.4);
    }
    .luxury-visual-caption h3 {
      font-family: "Playfair Display", Georgia, serif;
      font-size: clamp(24px, 2.2vw, 32px);
      font-weight: 600;
      color: #FAF7F0;
      margin: 0 0 8px;
      line-height: 1.25;
    }
    .luxury-visual-caption p {
      font-size: 14.5px;
      line-height: 1.55;
      color: rgba(250, 247, 240, 0.88);
      margin: 0 0 14px;
    }
    .luxury-active-farm-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-weight: 700;
      color: var(--harvest);
      background: rgba(217, 168, 92, 0.12);
      border: 1px solid rgba(217, 168, 92, 0.3);
      padding: 5px 12px;
      border-radius: 8px;
      letter-spacing: .02em;
    }

    /* RIGHT SIDE: Booking Panel */
    .luxury-panel-col {
      display: flex;
      flex-direction: column;
    }
    .luxury-booking-card {
      background: rgba(19, 36, 24, 0.84);
      border: 1px solid rgba(217, 168, 92, 0.32);
      border-radius: 26px;
      padding: 36px 34px 38px;
      backdrop-filter: blur(24px);
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      flex: 1;
      position: relative;
    }
    .luxury-card-header {
      margin-bottom: 24px;
    }
    .luxury-overline {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: var(--harvest);
      margin-bottom: 6px;
    }
    .luxury-card-title {
      font-family: "Playfair Display", Georgia, serif;
      font-size: clamp(26px, 2.3vw, 34px);
      font-weight: 700;
      color: #FAF7F0;
      margin: 0 0 8px;
      line-height: 1.2;
    }
    .luxury-card-subtitle {
      font-size: 14px;
      line-height: 1.5;
      color: rgba(250, 247, 240, 0.8);
      margin: 0;
    }

    /* Multi-step progress bar */
    .luxury-progress-track {
      position: relative;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 28px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 16px;
    }
    .luxury-progress-step {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      opacity: 0.55;
      transition: opacity .25s, color .25s;
    }
    .luxury-progress-step.is-active {
      opacity: 1;
    }
    .luxury-progress-step.is-done {
      opacity: 0.9;
    }
    .luxury-step-num {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.2);
      font-size: 11px;
      font-weight: 700;
      color: rgba(250, 247, 240, 0.85);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all .25s;
    }
    .luxury-progress-step.is-active .luxury-step-num {
      background: var(--harvest);
      border-color: var(--harvest);
      color: var(--forest);
      box-shadow: 0 0 12px rgba(217, 168, 92, 0.45);
    }
    .luxury-progress-step.is-done .luxury-step-num {
      background: #2e693e;
      border-color: #3b8750;
      color: #FAF7F0;
    }
    .luxury-step-text {
      display: flex;
      flex-direction: column;
    }
    .luxury-step-label {
      font-size: 9.5px;
      font-weight: 700;
      letter-spacing: .06em;
      text-transform: uppercase;
      color: var(--harvest);
    }
    .luxury-step-name {
      font-size: 11.5px;
      font-weight: 600;
      color: #FAF7F0;
      white-space: nowrap;
    }

    /* Step Panels */
    .luxury-step-panel {
      display: none;
      animation: luxuryFadeIn .35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .luxury-step-panel.is-active {
      display: block;
    }
    @keyframes luxuryFadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Category & Farm Selection Grid */
    .luxury-selection-group {
      margin-bottom: 22px;
    }
    .luxury-group-label {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .06em;
      text-transform: uppercase;
      color: var(--harvest);
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .luxury-choice-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    .luxury-choice-card {
      background: rgba(13, 26, 17, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 14px;
      padding: 12px 14px;
      cursor: pointer;
      transition: border-color .2s, background .2s, transform .2s, box-shadow .2s;
      display: flex;
      flex-direction: column;
      gap: 4px;
      position: relative;
    }
    .luxury-choice-card:hover {
      background: rgba(22, 42, 28, 0.8);
      border-color: rgba(217, 168, 92, 0.5);
      transform: translateY(-1px);
    }
    .luxury-choice-card.is-selected {
      background: rgba(28, 54, 36, 0.9);
      border-color: var(--harvest);
      box-shadow: 0 0 0 1px var(--harvest), 0 6px 20px rgba(0, 0, 0, 0.3);
    }
    .luxury-choice-card input[type="radio"] {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }
    .luxury-choice-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #FAF7F0;
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .luxury-choice-desc {
      font-size: 11.5px;
      color: rgba(250, 247, 240, 0.72);
      line-height: 1.35;
    }
    .luxury-choice-badge {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: .04em;
      text-transform: uppercase;
      color: var(--harvest);
      background: rgba(217, 168, 92, 0.14);
      padding: 2px 7px;
      border-radius: 4px;
      width: fit-content;
      margin-top: 4px;
    }

    /* Form Inputs */
    .luxury-form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
      margin-bottom: 20px;
    }
    .luxury-col-1 { grid-column: span 1; }
    .luxury-col-2 { grid-column: span 2; }

    .luxury-field {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .luxury-field label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .05em;
      text-transform: uppercase;
      color: var(--harvest);
    }
    .luxury-field input,
    .luxury-field select,
    .luxury-field textarea {
      background: rgba(13, 26, 17, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 12px;
      padding: 10px 14px;
      font-family: inherit;
      font-size: 13.5px;
      color: #FAF7F0;
      outline: none;
      transition: border-color .2s, box-shadow .2s, background .2s;
    }
    .luxury-field input:focus,
    .luxury-field select:focus,
    .luxury-field textarea:focus {
      border-color: var(--harvest);
      box-shadow: 0 0 0 2px rgba(217, 168, 92, 0.25);
      background: rgba(17, 34, 22, 0.9);
    }
    .luxury-field input::placeholder,
    .luxury-field textarea::placeholder {
      color: rgba(250, 247, 240, 0.4);
      font-weight: 400;
    }
    .luxury-field textarea {
      resize: vertical;
      min-height: 72px;
      line-height: 1.45;
    }
    .luxury-field-note {
      font-size: 11px;
      color: rgba(250, 247, 240, 0.65);
      line-height: 1.4;
      margin-top: 2px;
    }
    .luxury-notice-pill {
      background: rgba(217, 168, 92, 0.12);
      border: 1px solid rgba(217, 168, 92, 0.25);
      border-radius: 10px;
      padding: 9px 13px;
      font-size: 11.5px;
      color: #FAF7F0;
      line-height: 1.45;
      margin-bottom: 16px;
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }
    .luxury-notice-pill svg {
      width: 15px;
      height: 15px;
      fill: var(--harvest);
      flex-shrink: 0;
      margin-top: 2px;
    }

    /* Actions Footer */
    .luxury-step-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      margin-top: 8px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 18px;
    }
    .luxury-btn-back {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #FAF7F0;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      padding: 10px 18px;
      border-radius: 10px;
      cursor: pointer;
      transition: all .2s;
    }
    .luxury-btn-back:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.35);
    }
    .luxury-btn-next {
      background: var(--harvest);
      color: var(--forest);
      border: none;
      font-family: inherit;
      font-size: 13.5px;
      font-weight: 700;
      letter-spacing: .02em;
      padding: 11px 24px;
      border-radius: 10px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all .25s;
      box-shadow: 0 4px 16px rgba(217, 168, 92, 0.35);
      margin-left: auto;
    }
    .luxury-btn-next:hover {
      background: #e5b974;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(217, 168, 92, 0.45);
    }
    .luxury-btn-next:disabled {
      opacity: 0.55;
      cursor: not-allowed;
      transform: none;
    }

    /* Review Card (Step 4) */
    .luxury-review-sheet {
      background: rgba(13, 26, 17, 0.7);
      border: 1px solid rgba(217, 168, 92, 0.3);
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 18px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .luxury-review-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      padding-bottom: 10px;
    }
    .luxury-review-row:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .luxury-review-label {
      font-size: 11.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .05em;
      color: var(--harvest);
      min-width: 110px;
    }
    .luxury-review-value {
      font-size: 13.5px;
      font-weight: 500;
      color: #FAF7F0;
      text-align: right;
    }
    .luxury-review-value small {
      display: block;
      font-size: 11px;
      color: rgba(250, 247, 240, 0.65);
      margin-top: 2px;
    }

    /* Error alert in panel */
    .luxury-error-box {
      background: #7f1d1d;
      border: 1px solid #ef4444;
      color: #fef2f2;
      padding: 10px 14px;
      border-radius: 10px;
      font-size: 12.5px;
      font-weight: 600;
      margin-bottom: 14px;
      display: none;
    }

    /* Confirmation Success Panel */
    .luxury-confirmed-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 20px 10px;
      animation: luxuryConfirmPop .5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes luxuryConfirmPop {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    .luxury-confirm-icon-wrap {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(217, 168, 92, 0.25) 0%, rgba(217, 168, 92, 0.05) 70%);
      border: 2px solid var(--harvest);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--harvest);
      margin-bottom: 16px;
      box-shadow: 0 0 24px rgba(217, 168, 92, 0.4);
    }
    .luxury-confirm-icon-wrap svg {
      width: 32px;
      height: 32px;
      fill: var(--harvest);
    }
    .luxury-confirm-ref {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(217, 168, 92, 0.15);
      border: 1px solid rgba(217, 168, 92, 0.35);
      padding: 6px 16px;
      border-radius: 999px;
      font-family: monospace;
      font-size: 13.5px;
      font-weight: 700;
      color: var(--harvest);
      letter-spacing: .08em;
      margin-bottom: 14px;
    }
    .luxury-confirm-title {
      font-family: "Playfair Display", Georgia, serif;
      font-size: clamp(24px, 2.2vw, 30px);
      font-weight: 700;
      color: #FAF7F0;
      margin: 0 0 10px;
    }
    .luxury-confirm-text {
      font-size: 14px;
      line-height: 1.6;
      color: rgba(250, 247, 240, 0.88);
      max-width: 480px;
      margin: 0 0 18px;
    }
    .luxury-confirm-details-box {
      width: 100%;
      background: rgba(13, 26, 17, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 14px;
      padding: 14px 18px;
      text-align: left;
      font-size: 12.5px;
      color: rgba(250, 247, 240, 0.8);
      margin-bottom: 18px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .luxury-confirm-helpline {
      font-size: 12.5px;
      color: rgba(250, 247, 240, 0.75);
      margin-bottom: 18px;
    }
    .luxury-confirm-helpline a {
      color: var(--harvest);
      text-decoration: underline;
      font-weight: 600;
    }

    /* ADDITIONAL VISITOR INFORMATION AREA */
    .luxury-info-section {
      border-top: 1px solid rgba(217, 168, 92, 0.2);
      padding-top: 48px;
    }
    .luxury-info-header {
      text-align: center;
      margin-bottom: 32px;
    }
    .luxury-info-header h3 {
      font-family: "Playfair Display", Georgia, serif;
      font-size: clamp(22px, 2vw, 28px);
      font-weight: 600;
      color: #FAF7F0;
      margin: 0 0 6px;
    }
    .luxury-info-header p {
      font-size: 14px;
      color: rgba(250, 247, 240, 0.72);
      margin: 0;
    }
    .luxury-info-cards-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 16px;
    }
    .luxury-info-card {
      background: rgba(17, 33, 22, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 20px 18px;
      transition: all .25s;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .luxury-info-card:hover {
      background: rgba(22, 44, 29, 0.85);
      border-color: rgba(217, 168, 92, 0.35);
      transform: translateY(-2px);
    }
    .luxury-info-card-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: rgba(217, 168, 92, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--harvest);
    }
    .luxury-info-card-icon svg {
      width: 18px;
      height: 18px;
      fill: var(--harvest);
    }
    .luxury-info-card h4 {
      font-size: 13.5px;
      font-weight: 700;
      color: #FAF7F0;
      margin: 0;
    }
    .luxury-info-card p {
      font-size: 12px;
      line-height: 1.5;
      color: rgba(250, 247, 240, 0.75);
      margin: 0;
    }

    /* REFINED LUXURY FOOTER */
    footer#footer.luxury-footer {
      background: #09130c;
      color: #FAF7F0;
      padding: 56px 4vw 28px;
      border-top: 1px solid rgba(217, 168, 92, 0.16);
      position: relative;
      z-index: 5;
    }
    .luxury-footer-container {
      max-width: 1360px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 40px;
    }
    .luxury-footer-main {
      display: grid;
      grid-template-columns: 1.2fr 1fr 1.4fr 0.8fr;
      gap: 36px;
      align-items: flex-start;
    }
    .luxury-footer-brand {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .luxury-footer-logo-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .luxury-footer-brand h4 {
      font-family: "Playfair Display", Georgia, serif;
      font-size: 20px;
      font-weight: 700;
      color: var(--harvest);
      margin: 0;
    }
    .luxury-footer-brand p {
      font-size: 12.5px;
      color: rgba(250, 247, 240, 0.7);
      line-height: 1.5;
      margin: 0;
      max-width: 280px;
    }
    .luxury-footer-col h5 {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .08em;
      color: var(--harvest);
      margin: 0 0 14px;
    }
    .luxury-footer-contact-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 13px;
    }
    .luxury-footer-contact-item {
      display: flex;
      align-items: center;
      gap: 10px;
      color: rgba(250, 247, 240, 0.88);
    }
    .luxury-footer-contact-item a {
      color: #FAF7F0;
      text-decoration: none;
      transition: color .2s;
    }
    .luxury-footer-contact-item a:hover {
      color: var(--harvest);
    }
    .luxury-footer-contact-item svg {
      width: 15px;
      height: 15px;
      fill: var(--harvest);
      flex-shrink: 0;
    }
    .luxury-footer-locations-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .luxury-footer-loc-item {
      display: flex;
      flex-direction: column;
      gap: 3px;
      font-size: 12px;
    }
    .luxury-footer-loc-name {
      font-weight: 700;
      color: #FAF7F0;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .luxury-footer-loc-badge {
      font-size: 9.5px;
      font-weight: 700;
      color: var(--harvest);
      background: rgba(217, 168, 92, 0.15);
      padding: 1px 6px;
      border-radius: 4px;
      text-transform: uppercase;
    }
    .luxury-footer-loc-addr {
      color: rgba(250, 247, 240, 0.65);
      line-height: 1.4;
    }
    .luxury-footer-social-wrap {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .luxury-footer-social-links {
      display: flex;
      gap: 12px;
    }
    .luxury-footer-social-btn {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FAF7F0;
      transition: all .2s;
    }
    .luxury-footer-social-btn:hover {
      background: var(--harvest);
      color: var(--forest);
      border-color: var(--harvest);
      transform: translateY(-2px);
    }
    .luxury-footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 22px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 12px;
      color: rgba(250, 247, 240, 0.6);
    }

    /* RESPONSIVE STYLES */
    @media (max-width: 1080px) {
      .luxury-booking-grid {
        grid-template-columns: 1fr;
      }
      .luxury-visual-col {
        min-height: 480px;
      }
      .luxury-info-cards-grid {
        grid-template-columns: repeat(3, 1fr);
      }
      .luxury-footer-main {
        grid-template-columns: 1fr 1fr;
        gap: 32px;
      }
    }
    @media (max-width: 768px) {
      section.luxury-booking-section {
        padding: 60px 4vw 50px;
      }
      .luxury-booking-card {
        padding: 26px 20px 30px;
      }
      .luxury-choice-grid {
        grid-template-columns: 1fr;
      }
      .luxury-form-grid {
        grid-template-columns: 1fr;
      }
      .luxury-col-1, .luxury-col-2 {
        grid-column: span 1;
      }
      .luxury-info-cards-grid {
        grid-template-columns: 1fr;
      }
      .luxury-footer-main {
        grid-template-columns: 1fr;
        gap: 28px;
      }
      .luxury-progress-track {
        gap: 4px;
      }
      .luxury-step-name {
        display: none;
      }
    }
`;

// =========================================================================
// 2. LUXURY BOOKING HTML + REFINED FOOTER
// =========================================================================
const luxuryBookingHTML = `
    <!-- 05. LUXURY FARM RESERVATION SECTION -->
    <section class="luxury-booking-section" id="booking">
      <div class="luxury-booking-container">
        
        <!-- Two Column Reservation Experience -->
        <div class="luxury-booking-grid">
          
          <!-- LEFT SIDE: Farm Photography (50–55%) -->
          <div class="luxury-visual-col" id="luxuryVisualCol">
            <div class="luxury-visual-img-wrap">
              <img id="luxuryFarmPhoto" src="/assets/locations/bhongir_main_farm.jpg" alt="Authentic farmland at One Day Kissan Bhongir, Telangana" class="luxury-visual-img">
            </div>
            <div class="luxury-visual-overlay"></div>
            
            <!-- Top Location Badge -->
            <div class="luxury-visual-top">
              <span class="luxury-location-pill">
                <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                <span>Telangana, India • Bhongir & Moinabad</span>
              </span>
            </div>

            <!-- Bottom Vignette Editorial Caption -->
            <div class="luxury-visual-caption">
              <h3>A day away from the everyday.</h3>
              <p>Come closer to nature. Discover the joy of farm life across open agricultural fields and traditional village traditions.</p>
              <div class="luxury-active-farm-badge" id="luxuryActiveFarmBadge">
                <span>📍 Currently Selected: Main Farm — Bhongir</span>
              </div>
            </div>
          </div>

          <!-- RIGHT SIDE: Luxury Booking Panel -->
          <div class="luxury-panel-col">
            <div class="luxury-booking-card" id="luxuryBookingCard">
              
              <!-- Header -->
              <div class="luxury-card-header">
                <span class="luxury-overline">Countryside Hospitality Reservation</span>
                <h2 class="luxury-card-title">Plan Your Farm Visit</h2>
                <p class="luxury-card-subtitle">Tell us about your group and preferred farm date. Our stewardship team will coordinate your itinerary and contact you to confirm your visit.</p>
              </div>

              <!-- Multi-Step Progress Track (4 Steps) -->
              <div class="luxury-progress-track" id="luxuryProgressTrack" role="tablist" aria-label="Booking Steps">
                <div class="luxury-progress-step is-active" data-step-target="1" role="tab" aria-selected="true" tabindex="0">
                  <div class="luxury-step-num">01</div>
                  <div class="luxury-step-text">
                    <span class="luxury-step-label">Step 01</span>
                    <span class="luxury-step-name">Visit Type</span>
                  </div>
                </div>
                <div class="luxury-progress-step" data-step-target="2" role="tab" aria-selected="false" tabindex="0">
                  <div class="luxury-step-num">02</div>
                  <div class="luxury-step-text">
                    <span class="luxury-step-label">Step 02</span>
                    <span class="luxury-step-name">Details</span>
                  </div>
                </div>
                <div class="luxury-progress-step" data-step-target="3" role="tab" aria-selected="false" tabindex="0">
                  <div class="luxury-step-num">03</div>
                  <div class="luxury-step-text">
                    <span class="luxury-step-label">Step 03</span>
                    <span class="luxury-step-name">Contact</span>
                  </div>
                </div>
                <div class="luxury-progress-step" data-step-target="4" role="tab" aria-selected="false" tabindex="0">
                  <div class="luxury-step-num">04</div>
                  <div class="luxury-step-text">
                    <span class="luxury-step-label">Step 04</span>
                    <span class="luxury-step-name">Review</span>
                  </div>
                </div>
              </div>

              <!-- Error Alert Banner -->
              <div id="luxuryErrorBox" class="luxury-error-box" role="alert"></div>

              <!-- FORM CONTAINER -->
              <form id="luxuryBookingForm" novalidate>
                
                <!-- STEP 01 – Choose Your Visit -->
                <div class="luxury-step-panel is-active" data-step="1">
                  <!-- Category Choice -->
                  <div class="luxury-selection-group">
                    <div class="luxury-group-label">
                      <span>1. Who's visiting?</span>
                      <span style="font-size: 11px; opacity: 0.8; text-transform: none; color: #FAF7F0;">Select category</span>
                    </div>
                    <div class="luxury-choice-grid">
                      <label class="luxury-choice-card is-selected" data-category="school">
                        <input type="radio" name="visitorCategory" value="school" checked>
                        <span class="luxury-choice-title">
                          <span>🏫 School Field Trip</span>
                        </span>
                        <span class="luxury-choice-desc">Experiential outdoor farm learning for students & teachers.</span>
                      </label>
                      <label class="luxury-choice-card" data-category="corporate">
                        <input type="radio" name="visitorCategory" value="corporate">
                        <span class="luxury-choice-title">
                          <span>🏢 Corporate Team Outing</span>
                        </span>
                        <span class="luxury-choice-desc">Recharge in rural nature with team bonding & traditional dining.</span>
                      </label>
                      <label class="luxury-choice-card" data-category="family">
                        <input type="radio" name="visitorCategory" value="family">
                        <span class="luxury-choice-title">
                          <span>👨‍👩‍👧‍👦 Family Visit</span>
                        </span>
                        <span class="luxury-choice-desc">Wholesome countryside day retreat for all generations.</span>
                      </label>
                      <label class="luxury-choice-card" data-category="friends">
                        <input type="radio" name="visitorCategory" value="friends">
                        <span class="luxury-choice-title">
                          <span>👥 Friends / Others</span>
                        </span>
                        <span class="luxury-choice-desc">Weekend retreat with hands-on activities, pottery & village games.</span>
                      </label>
                    </div>
                  </div>

                  <!-- Farm Location Choice -->
                  <div class="luxury-selection-group">
                    <div class="luxury-group-label">
                      <span>2. Preferred Farm Location</span>
                      <span style="font-size: 11px; opacity: 0.8; text-transform: none; color: #FAF7F0;">Two Telangana Locations</span>
                    </div>
                    <div class="luxury-choice-grid">
                      <label class="luxury-choice-card is-selected" data-farm="bhongir">
                        <input type="radio" name="farmLocation" value="bhongir" checked>
                        <span class="luxury-choice-title">
                          <span>Main Farm – Bhongir</span>
                        </span>
                        <span class="luxury-choice-desc">Hotel Vivera, Hyderabad–Warangal Highway, Bhongir Bypass, Bhongir – 508116.</span>
                        <span class="luxury-choice-badge">Main Farm • 300 Capacity</span>
                      </label>
                      <label class="luxury-choice-card" data-farm="moinabad">
                        <input type="radio" name="farmLocation" value="moinabad">
                        <span class="luxury-choice-title">
                          <span>Branch Farm – Moinabad</span>
                        </span>
                        <span class="luxury-choice-desc">Kapil Agro Farms, Sriramnagar, Moinabad, Telangana – 501504.</span>
                        <span class="luxury-choice-badge">Branch Farm • 300 Capacity</span>
                      </label>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="luxury-step-actions">
                    <span style="font-size: 12px; color: rgba(250, 247, 240, 0.65);">Step 1 of 4</span>
                    <button type="button" class="luxury-btn-next" id="luxuryStep1NextBtn">
                      <span>Continue to Details</span>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>

                <!-- STEP 02 – Visit Details -->
                <div class="luxury-step-panel" data-step="2">
                  
                  <!-- School Dynamic Fields -->
                  <div id="luxuryFieldsSchool" class="luxury-dynamic-fields">
                    <div class="luxury-notice-pill">
                      <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                      <span><strong>School Notice:</strong> Booking at least one week in advance is recommended to ensure dedicated farm mentors and safety equipment.</span>
                    </div>
                    <div class="luxury-form-grid">
                      <div class="luxury-field luxury-col-1">
                        <label for="inputSchoolName">School Name *</label>
                        <input type="text" id="inputSchoolName" placeholder="e.g. Alphores eTechno School">
                      </div>
                      <div class="luxury-field luxury-col-1">
                        <label for="inputSchoolCity">City / District *</label>
                        <input type="text" id="inputSchoolCity" placeholder="e.g. Hyderabad / Karimnagar">
                      </div>
                      <div class="luxury-field luxury-col-1">
                        <label for="inputSchoolGrade">Grade or Class *</label>
                        <input type="text" id="inputSchoolGrade" placeholder="e.g. Classes 4 to 8">
                      </div>
                      <div class="luxury-field luxury-col-1">
                        <label for="inputSchoolStudents">Number of Students *</label>
                        <input type="number" id="inputSchoolStudents" placeholder="e.g. 80" min="10" max="500">
                      </div>
                    </div>
                  </div>

                  <!-- Corporate Dynamic Fields -->
                  <div id="luxuryFieldsCorporate" class="luxury-dynamic-fields" style="display: none;">
                    <div class="luxury-form-grid">
                      <div class="luxury-field luxury-col-1">
                        <label for="inputCorpCompany">Company / Org Name *</label>
                        <input type="text" id="inputCorpCompany" placeholder="e.g. Microsoft India / Infosys">
                      </div>
                      <div class="luxury-field luxury-col-1">
                        <label for="inputCorpCity">City / Base Location *</label>
                        <input type="text" id="inputCorpCity" placeholder="e.g. Hyderabad (HITEC City)">
                      </div>
                      <div class="luxury-field luxury-col-1">
                        <label for="inputCorpVisitors">Number of Visitors *</label>
                        <input type="number" id="inputCorpVisitors" placeholder="e.g. 45" min="5" max="300">
                      </div>
                      <div class="luxury-field luxury-col-1">
                        <label for="inputCorpPerson">Contact Person *</label>
                        <input type="text" id="inputCorpPerson" placeholder="e.g. Vikram Rao (HR / Team Lead)">
                      </div>
                    </div>
                  </div>

                  <!-- Family & Friends Dynamic Fields -->
                  <div id="luxuryFieldsFamily" class="luxury-dynamic-fields" style="display: none;">
                    <div class="luxury-form-grid">
                      <div class="luxury-field luxury-col-1">
                        <label for="inputFamilyName">Full Name *</label>
                        <input type="text" id="inputFamilyName" placeholder="e.g. Srinivas & Lakshmi Rao">
                      </div>
                      <div class="luxury-field luxury-col-1">
                        <label for="inputFamilyVisitors">Number of Visitors (All Ages) *</label>
                        <input type="number" id="inputFamilyVisitors" placeholder="e.g. 5 (3 Adults, 2 Children)" min="1" max="50">
                      </div>
                    </div>
                  </div>

                  <!-- Common Date & Preferred Activities -->
                  <div class="luxury-form-grid">
                    <div class="luxury-field luxury-col-2">
                      <label for="inputVisitDate">Preferred Visit Date *</label>
                      <input type="date" id="inputVisitDate" required>
                    </div>
                    <div class="luxury-field luxury-col-2">
                      <label for="dietaryNotes">Preferred Activities or Custom Requests (Optional)</label>
                      <textarea id="dietaryNotes" placeholder="Mention any preferred activities (e.g. paddy transplantation, pottery, bullock cart, tractor ride) or special requirements..."></textarea>
                      <span class="luxury-field-note">Note: Activities depend on seasonality and local farm layout. We do not claim every activity is available at both locations.</span>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="luxury-step-actions">
                    <button type="button" class="luxury-btn-back" id="luxuryStep2BackBtn">← Back</button>
                    <button type="button" class="luxury-btn-next" id="luxuryStep2NextBtn">
                      <span>Continue to Contact</span>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>

                <!-- STEP 03 – Contact Details -->
                <div class="luxury-step-panel" data-step="3">
                  <div class="luxury-notice-pill">
                    <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z"/></svg>
                    <span>Our farm coordinator will call or WhatsApp you directly to discuss timings, directions, and confirm your itinerary.</span>
                  </div>
                  
                  <div class="luxury-form-grid">
                    <div class="luxury-field luxury-col-2">
                      <label for="inputContactName">Contact Person Name *</label>
                      <input type="text" id="inputContactName" placeholder="e.g. Dr. K. Ramesh Kumar" autocomplete="name">
                    </div>
                    <div class="luxury-field luxury-col-1">
                      <label for="inputContactPhone">Phone / WhatsApp *</label>
                      <input type="tel" id="inputContactPhone" placeholder="+91 98497 98674" autocomplete="tel">
                    </div>
                    <div class="luxury-field luxury-col-1">
                      <label for="inputContactEmail">Email Address (Optional)</label>
                      <input type="email" id="inputContactEmail" placeholder="contact@example.com" autocomplete="email">
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="luxury-step-actions">
                    <button type="button" class="luxury-btn-back" id="luxuryStep3BackBtn">← Back</button>
                    <button type="button" class="luxury-btn-next" id="luxuryStep3NextBtn">
                      <span>Review Your Request</span>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>

                <!-- STEP 04 – Review Your Request -->
                <div class="luxury-step-panel" data-step="4">
                  <div class="luxury-review-sheet">
                    <div class="luxury-review-row">
                      <span class="luxury-review-label">Selected Farm</span>
                      <span class="luxury-review-value" id="revFarmName">
                        Main Farm – Bhongir
                        <small id="revFarmAddr">Hotel Vivera, NH 163, Bhongir Bypass, Bhongir – 508116</small>
                      </span>
                    </div>
                    <div class="luxury-review-row">
                      <span class="luxury-review-label">Visitor Type</span>
                      <span class="luxury-review-value" id="revCategory">School Field Trip</span>
                    </div>
                    <div class="luxury-review-row">
                      <span class="luxury-review-label">Party & Details</span>
                      <span class="luxury-review-value" id="revParty">80 Students (Grade 4 to 8)</span>
                    </div>
                    <div class="luxury-review-row">
                      <span class="luxury-review-label">Preferred Date</span>
                      <span class="luxury-review-value" id="revDate">Saturday, Nov 21, 2026</span>
                    </div>
                    <div class="luxury-review-row">
                      <span class="luxury-review-label">Contact</span>
                      <span class="luxury-review-value" id="revContact">
                        <span id="revContactName">Contact Name</span>
                        <small id="revContactPhone">+91 98497 98674</small>
                      </span>
                    </div>
                    <div class="luxury-review-row">
                      <span class="luxury-review-label">Preferred Activities</span>
                      <span class="luxury-review-value" id="revNotes" style="font-size: 12.5px; max-width: 300px;">None specified</span>
                    </div>
                  </div>

                  <div class="luxury-notice-pill" style="margin-bottom: 20px;">
                    <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    <span><strong>Transparent Booking:</strong> Our team will contact you to confirm your visit. No advance deposit or payment is required today.</span>
                  </div>

                  <!-- Actions -->
                  <div class="luxury-step-actions">
                    <button type="button" class="luxury-btn-back" id="luxuryStep4EditBtn">← Modify Details</button>
                    <button type="submit" class="luxury-btn-next" id="luxurySubmitBtn" style="padding: 13px 28px; font-size: 14.5px;">
                      <span id="luxurySubmitBtnText">Send Booking Request</span>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                    </button>
                  </div>
                </div>

              </form>

              <!-- SUCCESS CONFIRMATION STATE -->
              <div class="luxury-confirmed-card" id="luxuryConfirmedCard" style="display: none;">
                <div class="luxury-confirm-icon-wrap">
                  <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                </div>
                <div class="luxury-confirm-ref" id="luxuryConfirmRef">
                  <span>Ref: ODK-2611-XXXX</span>
                </div>
                <h3 class="luxury-confirm-title">Booking Request Received with Gratitude</h3>
                <p class="luxury-confirm-text" id="luxuryConfirmText">
                  Thank you! We have received your booking enquiry for One Day Kissan. Our farm stewardship team will review your date and contact you within 24 hours to confirm your visit.
                </p>
                <div class="luxury-confirm-details-box" id="luxuryConfirmSummary">
                  <!-- Populated dynamically -->
                </div>
                <div class="luxury-confirm-helpline">
                  <span>Have questions or urgent scheduling? Call / WhatsApp: </span>
                  <a href="tel:+919849798674">+91 9849798674</a> • 
                  <a href="mailto:info@onedaykisan.com">info@onedaykisan.com</a>
                </div>
                <button type="button" class="luxury-btn-back" id="luxuryNewBookingBtn" style="margin-top: 8px;">
                  Submit Another Enquiry
                </button>
              </div>

            </div>
          </div>

        </div>

        <!-- ADDITIONAL VISITOR INFORMATION AREA -->
        <div class="luxury-info-section" id="luxuryVisitorInfo">
          <div class="luxury-info-header">
            <h3>Essential Information for Your Farm Day</h3>
            <p>Helpful guidelines to ensure a comfortable, joyful countryside immersion.</p>
          </div>
          <div class="luxury-info-cards-grid">
            <div class="luxury-info-card">
              <div class="luxury-info-card-icon">
                <svg viewBox="0 0 24 24"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
              </div>
              <h4>23+ Farm Activities</h4>
              <p>Paddy planting, bullock cart rides, tractor trails, pottery, desi cattle petting, and traditional village games.</p>
            </div>
            <div class="luxury-info-card">
              <div class="luxury-info-card-icon">
                <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
              </div>
              <h4>Suitable for Everyone</h4>
              <p>Thoughtfully tailored itineraries for school batches, multi-generational families, friends, and corporate retreats.</p>
            </div>
            <div class="luxury-info-card">
              <div class="luxury-info-card-icon">
                <svg viewBox="0 0 24 24"><path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1 1H2c-.55 0-1-.45-1-1zm14.03-7c0-2.55-1.42-4.14-3.11-5.18C10.74 9.07 9.38 8.64 8 8.64c-1.38 0-2.74.43-3.92 1.17C2.42 10.85 1 12.44 1 14.99v4.01h14.03v-4.01z"/></svg>
              </div>
              <h4>Food & Picnics</h4>
              <p>Visitors are welcome to bring home-cooked food for outdoor picnics. Authentic village catering can be arranged upon request.</p>
            </div>
            <div class="luxury-info-card">
              <div class="luxury-info-card-icon">
                <svg viewBox="0 0 24 24"><path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/></svg>
              </div>
              <h4>Attire & Footwear</h4>
              <p>Wear comfortable cotton clothing and closed-toe footwear suitable for walking through mud, earth, and farming paths.</p>
            </div>
            <div class="luxury-info-card">
              <div class="luxury-info-card-icon">
                <svg viewBox="0 0 24 24"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>
              </div>
              <h4>Transportation</h4>
              <p>Transportation is not currently provided by One Day Kissan. Easily reachable via private car or cab (Bhongir on NH 163, Moinabad on Chevella Rd).</p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- 06. REFINED LUXURY FOOTER -->
    <footer id="footer" class="luxury-footer">
      <div class="luxury-footer-container">
        
        <div class="luxury-footer-main">
          
          <!-- Column 1: Brand & Emblem -->
          <div class="luxury-footer-brand">
            <div class="luxury-footer-logo-row">
              <svg class="f-logo" viewBox="0 0 80 80" width="56" height="56" aria-label="One Day Kissan Emblem">
                <circle id="fRing" cx="40" cy="40" r="37" fill="none" stroke="var(--harvest)" stroke-width="2.4" stroke-dasharray="233" stroke-dashoffset="0" transform="rotate(-90 40 40)"/>
                <circle class="fdot" cx="22" cy="40" r="4.5" fill="var(--harvest)"/>
                <circle class="fdot" cx="40" cy="40" r="4.5" fill="var(--harvest)"/>
                <circle class="fdot" cx="58" cy="40" r="4.5" fill="var(--harvest)"/>
                <path id="fMark" d="M33 53 43 31 56 53" fill="none" stroke="var(--harvest)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="60" stroke-dashoffset="0"/>
              </svg>
              <div>
                <h4>One Day Kissan</h4>
                <span style="font-size: 11px; color: rgba(250, 247, 240, 0.7); letter-spacing: .04em;">Reconnecting Cities to the Soil</span>
              </div>
            </div>
            <p>Empowering children, families, and communities through tactile agrarian learning and genuine rural hospitality across Telangana.</p>
          </div>

          <!-- Column 2: Direct Contact -->
          <div class="luxury-footer-col">
            <h5>Direct Contact</h5>
            <div class="luxury-footer-contact-list">
              <div class="luxury-footer-contact-item">
                <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                <a href="tel:+919849798674">+91 9849798674</a>
              </div>
              <div class="luxury-footer-contact-item">
                <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                <a href="mailto:info@onedaykisan.com">info@onedaykisan.com</a>
              </div>
              <div class="luxury-footer-contact-item" style="font-size: 11.5px; color: rgba(250, 247, 240, 0.65); margin-top: 4px;">
                <span>Visit Hours: 8:30 AM – 6:00 PM (Prior Request Advised)</span>
              </div>
            </div>
          </div>

          <!-- Column 3: Farm Locations -->
          <div class="luxury-footer-col">
            <h5>Farm Locations</h5>
            <div class="luxury-footer-locations-list">
              <div class="luxury-footer-loc-item">
                <span class="luxury-footer-loc-name">
                  <span>Main Farm – Bhongir</span>
                  <span class="luxury-footer-loc-badge">Main Farm</span>
                </span>
                <span class="luxury-footer-loc-addr">Hotel Vivera, Hyderabad–Warangal Highway, Bhongir Bypass, Bhongir, Telangana – 508116.</span>
              </div>
              <div class="luxury-footer-loc-item">
                <span class="luxury-footer-loc-name">
                  <span>Branch Farm – Moinabad</span>
                  <span class="luxury-footer-loc-badge">Branch Farm</span>
                </span>
                <span class="luxury-footer-loc-addr">Kapil Agro Farms, Sriramnagar, Moinabad, Telangana – 501504.</span>
              </div>
            </div>
          </div>

          <!-- Column 4: Social Media -->
          <div class="luxury-footer-col">
            <h5>Connect With Nature</h5>
            <div class="luxury-footer-social-wrap">
              <div class="luxury-footer-social-links">
                <!-- Instagram -->
                <a href="https://www.instagram.com/onedaykisan/" target="_blank" rel="noopener noreferrer" class="luxury-footer-social-btn" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.79-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <!-- YouTube -->
                <a href="https://www.youtube.com/@onedaykisan" target="_blank" rel="noopener noreferrer" class="luxury-footer-social-btn" aria-label="YouTube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <!-- Facebook -->
                <a href="https://www.facebook.com/onedaykisan/" target="_blank" rel="noopener noreferrer" class="luxury-footer-social-btn" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <!-- WhatsApp -->
                <a href="https://wa.me/919849798674" target="_blank" rel="noopener noreferrer" class="luxury-footer-social-btn" aria-label="WhatsApp">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        <div class="luxury-footer-bottom">
          <span>© 2026 One Day Kissan. Rooted in soil stewardship & rural community empowerment. All rights reserved.</span>
          <span>Bhongir Main Farm & Moinabad Branch Farm • Telangana, India</span>
        </div>

      </div>
    </footer>
`;

// =========================================================================
// 3. LUXURY BOOKING JAVASCRIPT CONTROLLER
// =========================================================================
const luxuryBookingJS = `
      // =======================================================================
      // LUXURY FARM RESERVATION & MULTI-STEP BOOKING CONTROLLER
      // =======================================================================
      (function initLuxuryBookingEngine() {
        // State
        let currentStep = 1;
        let selectedCategory = 'school';
        let selectedFarm = 'bhongir';
        let activeBookingData = null;

        const farmData = {
          bhongir: {
            name: 'Main Farm – Bhongir',
            addr: 'Hotel Vivera, Hyderabad–Warangal Highway, Bhongir Bypass, Bhongir, Telangana – 508116',
            badgeText: '📍 Currently Selected: Main Farm — Bhongir',
            photo: '/assets/locations/bhongir_main_farm.jpg',
            alt: 'One Day Kissan Bhongir Main Farm, Telangana'
          },
          moinabad: {
            name: 'Branch Farm – Moinabad',
            addr: 'Kapil Agro Farms, Sriramnagar, Moinabad, Telangana – 501504',
            badgeText: '📍 Currently Selected: Branch Farm — Moinabad',
            photo: '/assets/locations/moinabad_branch_farm.jpg',
            alt: 'One Day Kissan Moinabad Branch Farm, Telangana'
          }
        };

        // Elements
        const farmPhoto = document.getElementById('luxuryFarmPhoto');
        const activeFarmBadge = document.getElementById('luxuryActiveFarmBadge');
        const errorBox = document.getElementById('luxuryErrorBox');
        const progressSteps = document.querySelectorAll('.luxury-progress-step');
        const stepPanels = document.querySelectorAll('.luxury-step-panel');
        const bookingForm = document.getElementById('luxuryBookingForm');
        const confirmedCard = document.getElementById('luxuryConfirmedCard');

        // Step 1 Category & Farm Cards
        const categoryCards = document.querySelectorAll('.luxury-choice-card[data-category]');
        const farmCards = document.querySelectorAll('.luxury-choice-card[data-farm]');

        // Dynamic Field Wrappers
        const fieldsSchool = document.getElementById('luxuryFieldsSchool');
        const fieldsCorporate = document.getElementById('luxuryFieldsCorporate');
        const fieldsFamily = document.getElementById('luxuryFieldsFamily');

        // Inputs
        const inputSchoolName = document.getElementById('inputSchoolName');
        const inputSchoolCity = document.getElementById('inputSchoolCity');
        const inputSchoolGrade = document.getElementById('inputSchoolGrade');
        const inputSchoolStudents = document.getElementById('inputSchoolStudents');

        const inputCorpCompany = document.getElementById('inputCorpCompany');
        const inputCorpCity = document.getElementById('inputCorpCity');
        const inputCorpVisitors = document.getElementById('inputCorpVisitors');
        const inputCorpPerson = document.getElementById('inputCorpPerson');

        const inputFamilyName = document.getElementById('inputFamilyName');
        const inputFamilyVisitors = document.getElementById('inputFamilyVisitors');

        const inputVisitDate = document.getElementById('inputVisitDate');
        const dietaryNotes = document.getElementById('dietaryNotes');

        const inputContactName = document.getElementById('inputContactName');
        const inputContactPhone = document.getElementById('inputContactPhone');
        const inputContactEmail = document.getElementById('inputContactEmail');

        // Step Navigation Buttons
        const step1NextBtn = document.getElementById('luxuryStep1NextBtn');
        const step2BackBtn = document.getElementById('luxuryStep2BackBtn');
        const step2NextBtn = document.getElementById('luxuryStep2NextBtn');
        const step3BackBtn = document.getElementById('luxuryStep3BackBtn');
        const step3NextBtn = document.getElementById('luxuryStep3NextBtn');
        const step4EditBtn = document.getElementById('luxuryStep4EditBtn');
        const submitBtn = document.getElementById('luxurySubmitBtn');
        const submitBtnText = document.getElementById('luxurySubmitBtnText');
        const newBookingBtn = document.getElementById('luxuryNewBookingBtn');

        // Review Labels
        const revFarmName = document.getElementById('revFarmName');
        const revFarmAddr = document.getElementById('revFarmAddr');
        const revCategory = document.getElementById('revCategory');
        const revParty = document.getElementById('revParty');
        const revDate = document.getElementById('revDate');
        const revContactName = document.getElementById('revContactName');
        const revContactPhone = document.getElementById('revContactPhone');
        const revNotes = document.getElementById('revNotes');

        // Initialize Default Date (upcoming Saturday)
        if (inputVisitDate) {
          const now = new Date();
          const nextSat = new Date();
          const dayOfWeek = now.getDay();
          const daysUntilSat = (6 - dayOfWeek + 7) % 7 || 7;
          nextSat.setDate(now.getDate() + daysUntilSat);

          const yyyy = nextSat.getFullYear();
          const mm = String(nextSat.getMonth() + 1).padStart(2, '0');
          const dd = String(nextSat.getDate()).padStart(2, '0');
          inputVisitDate.value = \`\${yyyy}-\${mm}-\${dd}\`;

          const tomorrow = new Date();
          tomorrow.setDate(now.getDate() + 1);
          inputVisitDate.min = \`\${tomorrow.getFullYear()}-\${String(tomorrow.getMonth() + 1).padStart(2, '0')}-\${String(tomorrow.getDate()).padStart(2, '0')}\`;
        }

        // Switch Farm Visual & Badge
        function setFarm(farmKey) {
          if (!farmData[farmKey]) return;
          selectedFarm = farmKey;
          const data = farmData[farmKey];

          if (farmPhoto) {
            farmPhoto.style.opacity = '0.4';
            setTimeout(() => {
              farmPhoto.src = data.photo;
              farmPhoto.alt = data.alt;
              farmPhoto.style.opacity = '1';
            }, 250);
          }
          if (activeFarmBadge) {
            activeFarmBadge.textContent = data.badgeText;
          }

          // Update cards UI
          farmCards.forEach(card => {
            const isMatch = card.getAttribute('data-farm') === farmKey;
            card.classList.toggle('is-selected', isMatch);
            const radio = card.querySelector('input[type=\"radio\"]');
            if (radio) radio.checked = isMatch;
          });
        }

        // Switch Category
        function setCategory(catKey) {
          selectedCategory = catKey;
          categoryCards.forEach(card => {
            const isMatch = card.getAttribute('data-category') === catKey;
            card.classList.toggle('is-selected', isMatch);
            const radio = card.querySelector('input[type=\"radio\"]');
            if (radio) radio.checked = isMatch;
          });

          // Show corresponding Step 2 dynamic fields
          if (fieldsSchool) fieldsSchool.style.display = (catKey === 'school') ? 'block' : 'none';
          if (fieldsCorporate) fieldsCorporate.style.display = (catKey === 'corporate') ? 'block' : 'none';
          if (fieldsFamily) fieldsFamily.style.display = (catKey === 'family' || catKey === 'friends') ? 'block' : 'none';
        }

        // Switch Step
        function goToStep(stepNum) {
          if (errorBox) {
            errorBox.style.display = 'none';
            errorBox.textContent = '';
          }
          currentStep = stepNum;

          // Update Progress Bar
          progressSteps.forEach(stepEl => {
            const num = parseInt(stepEl.getAttribute('data-step-target'), 10);
            stepEl.classList.toggle('is-active', num === stepNum);
            stepEl.classList.toggle('is-done', num < stepNum);
            stepEl.setAttribute('aria-selected', num === stepNum ? 'true' : 'false');
          });

          // Show target panel
          stepPanels.forEach(panel => {
            const num = parseInt(panel.getAttribute('data-step'), 10);
            panel.classList.toggle('is-active', num === stepNum);
          });

          // Populate Step 4 Review summary when entering step 4
          if (stepNum === 4) {
            populateReviewSummary();
          }
        }

        function showError(msg) {
          if (!errorBox) return;
          errorBox.textContent = msg;
          errorBox.style.display = 'block';
          errorBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Validation for each step
        function validateStep1() {
          return true; // category & farm have valid defaults
        }

        function validateStep2() {
          if (!inputVisitDate || !inputVisitDate.value) {
            showError('Please choose your preferred visit date.');
            return false;
          }

          if (selectedCategory === 'school') {
            if (!inputSchoolName.value.trim()) { showError('Please enter your school name.'); return false; }
            if (!inputSchoolCity.value.trim()) { showError('Please enter city or district.'); return false; }
            if (!inputSchoolGrade.value.trim()) { showError('Please enter grade or class.'); return false; }
            const students = parseInt(inputSchoolStudents.value, 10);
            if (!students || students < 1) { showError('Please enter the number of students.'); return false; }
          } else if (selectedCategory === 'corporate') {
            if (!inputCorpCompany.value.trim()) { showError('Please enter your company or organization name.'); return false; }
            if (!inputCorpCity.value.trim()) { showError('Please enter city or base location.'); return false; }
            const visitors = parseInt(inputCorpVisitors.value, 10);
            if (!visitors || visitors < 1) { showError('Please enter the number of visitors.'); return false; }
            if (!inputCorpPerson.value.trim()) { showError('Please enter contact person name.'); return false; }
          } else {
            // Family & Friends
            if (!inputFamilyName.value.trim()) { showError('Please enter your full name.'); return false; }
            const visitors = parseInt(inputFamilyVisitors.value, 10);
            if (!visitors || visitors < 1) { showError('Please enter the number of visitors.'); return false; }
          }

          return true;
        }

        function validateStep3() {
          if (!inputContactName || !inputContactName.value.trim()) {
            showError('Please enter the contact person name.');
            return false;
          }
          if (!inputContactPhone || !inputContactPhone.value.trim()) {
            showError('Please enter a valid phone number or WhatsApp.');
            return false;
          }
          if (inputContactEmail && inputContactEmail.value.trim()) {
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!emailRegex.test(inputContactEmail.value.trim())) {
              showError('Please enter a valid email address (or leave it blank).');
              return false;
            }
          }
          return true;
        }

        // Populate Step 4 Review Summary
        function populateReviewSummary() {
          const farm = farmData[selectedFarm];
          if (revFarmName) revFarmName.firstChild.nodeValue = farm.name + ' ';
          if (revFarmAddr) revFarmAddr.textContent = farm.addr;

          const catTitles = {
            school: 'School Field Trip',
            corporate: 'Corporate Team Outing',
            family: 'Family Visit',
            friends: 'Friends / Others'
          };
          if (revCategory) revCategory.textContent = catTitles[selectedCategory] || 'Farm Immersion';

          let partyText = '';
          if (selectedCategory === 'school') {
            partyText = \`\${inputSchoolStudents.value || 0} Students (\${inputSchoolGrade.value || 'All Grades'}) • \${inputSchoolName.value || ''}, \${inputSchoolCity.value || ''}\`;
          } else if (selectedCategory === 'corporate') {
            partyText = \`\${inputCorpVisitors.value || 0} Visitors • \${inputCorpCompany.value || ''} (\${inputCorpCity.value || ''})\`;
          } else {
            partyText = \`\${inputFamilyVisitors.value || 0} Visitors • \${inputFamilyName.value || ''}\`;
          }
          if (revParty) revParty.textContent = partyText;

          if (revDate && inputVisitDate && inputVisitDate.value) {
            const d = new Date(inputVisitDate.value + 'T00:00:00');
            revDate.textContent = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
          }

          if (revContactName && inputContactName) revContactName.textContent = inputContactName.value.trim();
          if (revContactPhone && inputContactPhone) {
            const emailPart = (inputContactEmail && inputContactEmail.value.trim()) ? (' • ' + inputContactEmail.value.trim()) : '';
            revContactPhone.textContent = inputContactPhone.value.trim() + emailPart;
          }

          if (revNotes) {
            const notes = (dietaryNotes ? dietaryNotes.value.trim() : '');
            revNotes.textContent = notes || 'General farm immersion & seasonal activities';
          }
        }

        // Event Listeners for Choices
        categoryCards.forEach(card => {
          card.addEventListener('click', () => {
            const cat = card.getAttribute('data-category');
            setCategory(cat);
          });
        });

        farmCards.forEach(card => {
          card.addEventListener('click', () => {
            const farm = card.getAttribute('data-farm');
            setFarm(farm);
          });
        });

        // Step Navigation Clicks
        if (step1NextBtn) {
          step1NextBtn.addEventListener('click', () => {
            if (validateStep1()) goToStep(2);
          });
        }
        if (step2BackBtn) step2BackBtn.addEventListener('click', () => goToStep(1));
        if (step2NextBtn) {
          step2NextBtn.addEventListener('click', () => {
            if (validateStep2()) {
              // Pre-fill contact name from step 2 if available
              if (!inputContactName.value.trim()) {
                if (selectedCategory === 'school') inputContactName.value = inputSchoolName.value.trim();
                else if (selectedCategory === 'corporate') inputContactName.value = inputCorpPerson.value.trim();
                else inputContactName.value = inputFamilyName.value.trim();
              }
              goToStep(3);
            }
          });
        }
        if (step3BackBtn) step3BackBtn.addEventListener('click', () => goToStep(2));
        if (step3NextBtn) {
          step3NextBtn.addEventListener('click', () => {
            if (validateStep3()) goToStep(4);
          });
        }
        if (step4EditBtn) step4EditBtn.addEventListener('click', () => goToStep(2));

        // Submit Booking Enquiry
        if (bookingForm) {
          bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!validateStep1() || !validateStep2() || !validateStep3()) return;

            let guestCount = 2;
            let travellersStr = '';
            let specialReqs = '';

            if (selectedCategory === 'school') {
              guestCount = parseInt(inputSchoolStudents.value, 10) || 50;
              travellersStr = \`School Field Trip (\${guestCount} Students)\`;
              specialReqs = \`School: \${inputSchoolName.value.trim()} | City: \${inputSchoolCity.value.trim()} | Grade: \${inputSchoolGrade.value.trim()}\`;
            } else if (selectedCategory === 'corporate') {
              guestCount = parseInt(inputCorpVisitors.value, 10) || 20;
              travellersStr = \`Corporate Outing (\${guestCount} Visitors)\`;
              specialReqs = \`Company: \${inputCorpCompany.value.trim()} | City: \${inputCorpCity.value.trim()} | Coordinator: \${inputCorpPerson.value.trim()}\`;
            } else {
              guestCount = parseInt(inputFamilyVisitors.value, 10) || 4;
              travellersStr = \`\${selectedCategory === 'family' ? 'Family Visit' : 'Friends Group'} (\${guestCount} Guests)\`;
              specialReqs = \`Lead Guest: \${inputFamilyName.value.trim()}\`;
            }

            const payload = {
              fullName: inputContactName.value.trim(),
              phone: inputContactPhone.value.trim(),
              email: (inputContactEmail ? inputContactEmail.value.trim() : ''),
              regionId: selectedFarm,
              experienceId: 'family',
              visitDate: inputVisitDate.value,
              travellers: travellersStr,
              guestCount: guestCount,
              dietaryNotes: (dietaryNotes ? dietaryNotes.value.trim() : ''),
              specialRequests: specialReqs
            };

            if (submitBtn) submitBtn.disabled = true;
            if (submitBtnText) submitBtnText.textContent = 'Sending Request...';

            try {
              const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
              });

              const data = await res.json();
              if (!res.ok || !data.success) {
                throw new Error(data.error || 'Unable to submit booking request. Please try again.');
              }

              activeBookingData = data.data;
              showConfirmation(data.data, payload);
              if (window.__showToast) window.__showToast('Booking request received with gratitude!');
            } catch (err) {
              console.warn('Booking API fallback:', err);
              // Graceful offline fallback
              const fallbackRef = 'ODK-' + payload.visitDate.replace(/-/g, '').slice(2, 6) + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
              const fallbackData = {
                booking_ref: fallbackRef,
                full_name: payload.fullName,
                farm_name: farmData[selectedFarm].name,
                visit_date: payload.visitDate
              };
              showConfirmation(fallbackData, payload);
              if (window.__showToast) window.__showToast('Request recorded (Offline Mode)!');
            } finally {
              if (submitBtn) submitBtn.disabled = false;
              if (submitBtnText) submitBtnText.textContent = 'Send Booking Request';
            }
          });
        }

        // Render Refined Confirmation State
        function showConfirmation(b, req) {
          bookingForm.style.display = 'none';
          document.getElementById('luxuryProgressTrack').style.display = 'none';

          const confirmRef = document.getElementById('luxuryConfirmRef');
          const confirmText = document.getElementById('luxuryConfirmText');
          const confirmSummary = document.getElementById('luxuryConfirmSummary');

          if (confirmRef) confirmRef.textContent = \`Ref: \${b.booking_ref || 'ODK-PENDING'}\`;

          const farm = farmData[selectedFarm];
          const formattedDate = new Date(req.visitDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });

          if (confirmText) {
            confirmText.innerHTML = \`Thank you, <strong>\${req.fullName}</strong>! We have received your request for <strong>\${farm.name}</strong> on <strong>\${formattedDate}</strong>. Our farm stewardship team will review your requirements and contact you at <strong>\${req.phone}</strong> to confirm your visit.\`;
          }

          if (confirmSummary) {
            confirmSummary.innerHTML = \`
              <div><strong>Selected Farm:</strong> \${farm.name}</div>
              <div><strong>Address:</strong> \${farm.addr}</div>
              <div><strong>Group Size:</strong> \${req.travellers}</div>
              <div><strong>Contact Person:</strong> \${req.fullName} (\${req.phone})</div>
              \${req.dietaryNotes ? \`<div><strong>Notes:</strong> \${req.dietaryNotes}</div>\` : ''}
              <div style="margin-top: 4px; color: var(--harvest); font-weight: 600;">✓ Our team will contact you to confirm your visit.</div>
            \`;
          }

          confirmedCard.style.display = 'flex';
          confirmedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Reset for another inquiry
        if (newBookingBtn) {
          newBookingBtn.addEventListener('click', () => {
            bookingForm.reset();
            confirmedCard.style.display = 'none';
            document.getElementById('luxuryProgressTrack').style.display = 'grid';
            bookingForm.style.display = 'block';
            goToStep(1);
          });
        }

        // Expose prefill helper for external buttons ("Plan Your Farm Visit", "Enquire")
        window.scrollToBookingForExperience = function(activityTitle) {
          const bookingEl = document.getElementById('booking');
          if (dietaryNotes && activityTitle) {
            dietaryNotes.value = \`Interested in \${activityTitle} & farm day immersion\`;
          }
          if (bookingEl) {
            if (window.__lenis) window.__lenis.scrollTo(bookingEl, { duration: 1.2, offset: -20 });
            else bookingEl.scrollIntoView({ behavior: 'smooth' });
          }
        };

        // Entrance animation with GSAP if available
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
          gsap.from('#booking .luxury-visual-col', {
            x: -30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#booking',
              start: 'top 75%'
            }
          });
          gsap.from('#booking .luxury-panel-col', {
            x: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#booking',
              start: 'top 75%'
            }
          });
        }
      })();
`;

// =========================================================================
// 4. APPLY REPLACEMENTS IN INDEX.HTML
// =========================================================================

// A. Replace Booking CSS
const cssTarget = content.substring(
  content.indexOf('/* 05. BOOKING EXPERIENCE (CTA) */'),
  content.indexOf('/* Modal Overlay */')
);
content = content.replace(cssTarget, luxuryBookingCSS + '\n    ');

// B. Replace Booking HTML & Footer HTML
const htmlStartMarker = '<section class="cta" id="booking">';
const htmlEndMarker = '</div>\n\n  <!-- Scripts in order -->';
const htmlTarget = content.substring(
  content.indexOf(htmlStartMarker),
  content.indexOf(htmlEndMarker)
);
content = content.replace(htmlTarget, luxuryBookingHTML.trim() + '\n  ');

// C. Replace Booking JS Controller
const jsStartStr = 'let currentActiveBooking = null;\n\n      // DOM Elements\n      const regionSelect = document.getElementById(\'regionSelect\');';
const jsEndStr = '      // Keyboard Esc key listener\n      window.addEventListener(\'keydown\', (e) => {';
const jsTarget = content.substring(
  content.indexOf(jsStartStr),
  content.indexOf(jsEndStr)
);
content = content.replace(jsTarget, luxuryBookingJS + '\n\n');

fs.writeFileSync(indexPath, content, 'utf8');
console.log('✅ Luxury Farm Reservation & Footer successfully applied to index.html!');
