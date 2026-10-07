# CLAUDE.md — Repository Directives & Mobile Guidelines

## 📱 CRITICAL MANDATE: MOBILE-FIRST & RESPONSIVE SYNCHRONIZATION

> **EVERY SINGLE TIME ANY CHANGE IS MADE (design, layout, styling, text content, navigation, or CMS features), THE CHANGES MUST BE FULLY APPLIED AND TESTED FOR THE MOBILE VIEW (`max-width: 768px`) AS WELL.**

---

### Key Requirements for All Updates

1. **Dual-View Synchronization**:
   - Every desktop layout modification or new feature **MUST** have an equivalent, perfectly responsive mobile view representation.
   - Never commit or declare a feature complete without ensuring it works seamlessly on both desktop and mobile screens.

2. **Mobile App Experience (Facebook/Instagram Style UI)**:
   - Preserve the fixed glassmorphism top header and bottom mobile app tab bar (`MobileTabBar`).
   - Ensure all touch targets are at least **44px × 44px** for effortless touch interaction.
   - Use dynamic typography scaling (`clamp()`) to avoid visual overflow or awkward wrapping on mobile viewports.
   - Maintain iOS/Android safe area inset paddings (`env(safe-area-inset-bottom)`).

3. **Admin CMS & Separate URL Route**:
   - The Public Homepage (`/`) must remain 100% clean with **NO visible Admin login buttons or lock icons** for regular visitors.
   - Admin access is hosted on a separate dedicated URL route: **`/admin`** (e.g. `http://localhost:5173/admin`).
   - Direct inline text editing, login screens, and CMS management panels on `/admin` must remain 100% accessible, touch-friendly, and responsive on both Desktop and Mobile viewports.

4. **Events Management & Image Standardization**:
   - Admins can manage architectural **Events & Symposia** (date, time, location, title, description, image, RSVP link).
   - An interactive **Image Cropper Modal** (`16:9`, `4:3`, `1:1`, `21:9` ratios + zoom/pan controls) standardizes card image dimensions across Desktop and Mobile feeds.

5. **Architectural Aesthetic & Structural Schematics System**:
   - **Background Blueprint Grid**: Delicate 80px × 80px background grid lines with section index numbers (`01 // ESSAYS`, `02 // DIALOGUES`, `03 // MANIFESTO`, `04 // STRUCTURAL & BRIDGE ENGINEERING`).
   - **Bridge & Cantilever Engineering Showcase**: Interactive cable-stayed bridge and cantilevered pavilion analysis with SVG blueprint dimension lines, tension load vectors, scale metrics (`SCALE 1:500`), and modal schematics inspector.
   - **Monospaced Metadata Badges**: Monospaced tags (`[REF // 001]`, `LAT 35.0116° N`) for editorial prestige.
   - **Interactive Filtering & Micro-Animations**: Smooth category pills, smooth card lift on hover, image zoom transitions, and interactive newsletter subscription banner.

---

### Verification Protocol

For **EVERY** task or modification:
- [ ] Verify Desktop layout and functionality.
- [ ] Verify Mobile layout (`<= 768px`) and ensure bottom tab bar, top bar, and mobile drawer render flawlessly.
- [ ] Confirm Admin CMS capabilities function on mobile touch screens.
