# 1minus1.com — Animation & WebGL Teardown

**Site:** https://1minus1.com/  
**Date researched:** 2026-04-13  
**Purpose:** Reference for future Tekton hero/animation work

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Nuxt 3 (Vue 3) |
| Animation | GSAP + ScrollTrigger + SplitText |
| Smooth scroll | Lenis (`window.$lenis`) |
| 3D / WebGL | Three.js (custom, no R3F) |
| Styling | Tailwind CSS |
| Assets | DigitalOcean Spaces CDN |

---

## The Hero Video — It's Not a `<video>` Tag

The showreel is not a plain HTML video. It runs through a full WebGL pipeline:

1. A hidden `<video>` element loads the MP4/WebM
2. Three.js wraps it as a `VideoTexture`
3. The texture is mapped onto a **plane mesh** in a foreground Three.js scene
4. A custom GLSL fragment shader handles opacity, border radius, pixelation, and the neon mouse trail effect

The video player opacity is controlled via a shader uniform (`uOpacity`), not CSS — so fading in/out is GPU-driven.

---

## The Neon Mouse Trail Effect

The signature visual on the hero — neon green pixels light up as you move the cursor over images/video.

**How it works:**

- 150 plane meshes are pre-allocated in a hidden Three.js scene (the `TouchTexture` system)
- On `mousemove`, a new mesh is "stamped" at the cursor position (only if movement > 1px threshold)
- Each stamp mesh has a shader that fades out over **0.7 seconds** using `uBirthTime` vs `uTime`
- The touch scene renders to a **50×50px offscreen render target** (`WebGLRenderTarget`)
- That render target texture is passed as `uMouseTexture` into every image/video mesh shader

**Fragment shader logic (simplified):**
```glsl
float mouseBrightness = dot(mouseTexture.rgb, LUMINANCE_WEIGHTS);
float luminance = dot(pixelatedTexture.rgb, LUMINANCE_WEIGHTS);
float mixFactor = smoothstep(thresholdLow, uTrailThreshold, luminance) * mouseEffect;
vec3 coloredPixelated = mix(pixelatedTexture.rgb, uTrailColor, uTrailOpacity) * uTrailBrightness;
vec3 finalColor = mix(pixelatedTexture.rgb, coloredPixelated, mixFactor);
gl_FragColor = vec4(finalColor, uOpacity);
```

Trail config (set at experience init):
```javascript
config: {
  pixelSize: 25,
  trailColor: new Color(0.49, 1, 0.43),  // neon green
  trailOpacity: 0,
  trailThreshold: 0.25,
  trailBrightness: 1.2
}
```

---

## Dual Canvas WebGL Architecture

Two `<canvas>` elements sit in the DOM — background and foreground. Both share a single orthographic camera and a GSAP ticker loop.

```
ThreeJSExperience (singleton)
├── backgroundRenderer  → backgroundExperience.scene
├── foregroundRenderer  → foregroundExperience.scene
├── camera (orthographic, shared)
├── touchTexture (mouse trail system)
└── time (GSAP ticker → triggers update())
```

Camera scrolls with the page:
```javascript
camera.instance.position.y = -window.scrollY
```
This keeps WebGL meshes locked to their DOM counterparts as the user scrolls — no scroll recalculation needed per mesh.

Images and videos are created via:
```javascript
threeJs.createImage(domElement, { type: 'video', opacity: 0 })
```

---

## Hero Entrance Animation (GSAP)

Fires on mount. Three key moves:

```javascript
// 1. Heading chars fly in from alternating top/bottom, randomised stagger
gsap.from(splitHeadingOne.chars, {
  y: (index) => index % 2 === 0 ? '-100%' : '100%',
  duration: 0.7,
  stagger: { each: 0.03, from: 'random' }
})

// 2. Supporting text scales up from near-zero
gsap.from(dom.text[0], { scale: 0.1, duration: 1, ease: 'smooth' })

// 3. Play button elastic-bounces in from off-screen right
gsap.from(dom.start, { x: 600, y: 150, duration: 1.5, ease: 'elastic.out(1, 1)' })
```

The heading line container has `overflow: hidden` (via `.sections-hero .line`) so chars clipping outside the line are invisible — the reveal looks clean.

---

## Mousemove Parallax on Hero Text

```javascript
const move = gsap.quickTo(dom.textInner[0], 'x', { duration: 1, ease: 'power2.out' })
const mapRange = gsap.utils.mapRange(0, window.innerWidth, 6, -14)
el.addEventListener('mousemove', (e) => { move(mapRange(e.clientX)) })
```

Mouse X maps to a ±14px horizontal shift on the inner text — subtle depth effect.

---

## Showreel Play Flow

1. User clicks play button
2. Lenis scrolls to `#showreel` (`duration: 1`)
3. `showControls()` fires:
   - Controls fade in (`autoAlpha: 1`)
   - Overlay fades out (`autoAlpha: 0`)
   - WebGL mesh opacity animates: `uOpacity uniform 0 → 1` (desktop) or `video CSS opacity 0 → 1` (mobile)
4. ScrollTrigger watches the button — if user scrolls away mid-play, video pauses and `showPlayButton()` resets state

---

## CSS Hero Rule

The only Hero-specific CSS file contained one rule:
```css
.sections-hero .line {
  overflow: hidden;
}
```
Everything else is Tailwind utilities + GSAP-driven inline transforms.

---

## Key Observations for Future Reference

- **No GSAP on mobile for some components** — `matchMedia` guards disable animations under `lg` breakpoint
- **`prefers-reduced-motion` respected** — animations disabled when detected
- **WebGL only on desktop** — `window.innerWidth < breakpoints.lg` skips Three.js init entirely on mobile, falls back to plain `<video>` + CSS opacity
- **Singleton pattern** for the ThreeJS experience — one instance shared across all components via `new ThreeJSExperience()` returning the cached `R`
- **GSAP `quickTo`** used for mousemove parallax — avoids creating a new tween on every event, far more performant than `gsap.to()` in a listener
- **SplitText** (GSAP plugin) used for char-level heading animations
- **Lenis** exposed globally as `window.$lenis` — scroll position read directly in shaders via `uScrollY` uniform
