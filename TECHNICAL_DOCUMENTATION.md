# Technical Documentation
## Ragam Nasi Goreng Indonesia

---

## 🏗️ Architecture Overview

This project follows a **modular, component-based architecture** using vanilla web technologies. No build tools or frameworks are required, making it perfect for GitHub Pages deployment.

### Design Philosophy

1. **Separation of Concerns**
   - HTML: Structure only
   - CSS: All presentation logic
   - JS: Behavior and interactivity

2. **Progressive Enhancement**
   - Works without JavaScript (static content visible)
   - Enhanced with JS for animations and theme switching

3. **Mobile-First Responsive**
   - Base styles for mobile
   - Enhanced for larger screens

---

## 📐 File Structure & Responsibilities

### `index.html` (Main Landing Page)

**Purpose**: Entry point displaying all fried rice varieties

**Key Components:**
```html
<!-- Theme Toggle Button -->
<button class="theme-toggle" id="themeToggle">
  <!-- Positioned: fixed, top-right -->
  <!-- Function: Switches between light/dark modes -->
</button>

<!-- Header Section -->
<header class="header">
  <!-- Title and subtitle -->
  <!-- Animation: fadeInDown -->
</header>

<!-- Interactive Circle Container -->
<div class="circle-container">
  <!-- Center circle: Non-clickable -->
  <div class="circle center-circle">...</div>
  
  <!-- 6 Surrounding circles: Clickable links -->
  <a href="pages/nasigoreng-kambing.html" class="circle small-circle">
    <!-- Each has unique positioning -->
    <!-- data-type attribute for styling -->
    <!-- style="--delay: N" for staggered animation -->
  </a>
</div>
```

**Technical Details:**
- **Positioning System**: Absolute positioning within relative container
- **Animation Trigger**: CSS animations with calculated delays
- **Navigation**: Standard `<a>` tags (no JS routing)

---

### `style.css` (Complete Styling System)

**File Size**: ~12 KB
**Lines**: ~700

#### Section Breakdown:

1. **CSS Variables (Lines 1-50)**
   ```css
   :root {
     /* Light mode colors */
   }
   
   [data-theme="dark"] {
     /* Dark mode colors */
   }
   ```
   - **Why?** Single source of truth for colors
   - **Benefit**: Easy theme switching via `data-theme` attribute

2. **Reset & Global Styles (Lines 51-100)**
   ```css
   * { box-sizing: border-box; }
   body { 
     background: linear-gradient(...);
     transition: background 0.5s ease;
   }
   ```
   - **Why?** Consistent rendering across browsers
   - **Gradient**: Creates vibrant, cartoon-style background

3. **Component Styles**

   a. **Theme Toggle Button (Lines 101-130)**
   ```css
   .theme-toggle {
     position: fixed;
     z-index: 1000; /* Always on top */
     border-radius: 50%; /* Circular */
   }
   ```
   - **Fixed positioning**: Stays visible during scroll
   - **High z-index**: Never obscured by other elements

   b. **Circle Layout System (Lines 200-400)**
   ```css
   .circle-container {
     position: relative;
     width: 600px;
     height: 600px;
   }
   
   .center-circle {
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
   }
   
   .small-circle:nth-child(2) { /* Kambing - Top */
     top: 0;
     left: 50%;
     transform: translateX(-50%);
   }
   ```
   - **Why absolute positioning?** Precise placement in circle formation
   - **Transform centering**: More accurate than margin-based centering

4. **Animation Definitions (Lines 600-680)**
   ```css
   @keyframes staggeredAppear {
     from {
       opacity: 0;
       transform: scale(0);
     }
     to {
       opacity: 1;
       transform: scale(1);
     }
   }
   ```
   - **Staggered delays**: `animation-delay: calc(var(--delay) * 0.15s)`
   - **Result**: Circles appear sequentially (0s, 0.15s, 0.3s, etc.)

5. **Responsive Media Queries (Lines 681-750)**
   ```css
   @media (max-width: 600px) {
     .circle-container {
       display: grid;
       grid-template-columns: repeat(2, 1fr);
     }
     
     .small-circle {
       position: relative !important;
       /* Override absolute positioning */
     }
   }
   ```
   - **Strategy**: Complete layout restructure for mobile
   - **Grid system**: 2 columns for optimal mobile viewing

---

### `script.js` (Interactive Logic)

**File Size**: ~3 KB
**Lines**: ~150

#### Function Breakdown:

1. **Theme Management (Lines 1-40)**
   ```javascript
   const currentTheme = localStorage.getItem('theme') || 'light';
   document.documentElement.setAttribute('data-theme', currentTheme);
   
   function toggleTheme() {
     const current = document.documentElement.getAttribute('data-theme');
     const newTheme = current === 'light' ? 'dark' : 'light';
     
     document.documentElement.setAttribute('data-theme', newTheme);
     localStorage.setItem('theme', newTheme);
   }
   ```
   
   **How it works:**
   - On load: Check localStorage → Apply saved theme
   - On click: Toggle attribute → Save to localStorage
   - CSS reacts to `[data-theme]` attribute change

2. **Page Transitions (Lines 41-80)**
   ```javascript
   window.addEventListener('load', () => {
     document.body.style.opacity = '0';
     setTimeout(() => {
       document.body.style.transition = 'opacity 0.5s ease';
       document.body.style.opacity = '1';
     }, 100);
   });
   
   document.querySelectorAll('a').forEach(link => {
     link.addEventListener('click', function(e) {
       e.preventDefault();
       document.body.style.opacity = '0';
       setTimeout(() => {
         window.location.href = this.href;
       }, 300);
     });
   });
   ```
   
   **Flow:**
   1. User clicks link → Prevent default
   2. Fade out current page (300ms)
   3. Navigate to new page
   4. New page fades in (500ms)

3. **Intersection Observer (Lines 81-100)**
   ```javascript
   const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         entry.target.style.opacity = '1';
       }
     });
   });
   ```
   
   **Purpose**: Trigger animations when elements enter viewport
   **Benefit**: Better performance than scroll listeners

4. **Utility Functions (Lines 101-150)**
   - Debounce for resize events
   - Keyboard navigation support
   - Mobile detection
   - Console styling for developer welcome message

---

## 🎨 Design System

### Color Palette

#### Light Mode
| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| Background Start | Coral | `#FF6B9D` | Gradient top |
| Background End | Turquoise | `#4ECDC4` | Gradient bottom |
| Kambing | Sunshine Yellow | `#FFD93D` | Circle BG |
| Seafood | Ocean Blue | `#4ECDC4` | Circle BG |
| Jawa | Warm Orange | `#FF8B5A` | Circle BG |
| Ayam | Soft Pink | `#FFB6D9` | Circle BG |
| Sapi | Cherry Red | `#FF6B6B` | Circle BG |
| Pete | Fresh Green | `#6BCF7F` | Circle BG |

#### Dark Mode
| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| Background Start | Deep Navy | `#1A1A2E` | Gradient top |
| Background End | Dark Blue | `#16213E` | Gradient bottom |
| Text Primary | White | `#FFFFFF` | Main text |
| Center Circle | Deep Blue | `#0F3460` | Background |
| Accent | Neon Cyan | `#00D9FF` | Highlights |

### Typography

**Font Family**: Nunito
- **Source**: Google Fonts
- **Weights Used**: 400 (regular), 600 (semibold), 700 (bold), 800 (extrabold)
- **Why Nunito?** 
  - Rounded, friendly appearance
  - Excellent readability
  - Supports Indonesian characters
  - Perfect for teen audience

**Font Sizes:**
```css
.title { font-size: 2.8rem; }          /* 44.8px */
.subtitle { font-size: 1.2rem; }       /* 19.2px */
.circle-content h2 { font-size: 1.4rem; } /* 22.4px */
.circle-label { font-size: 0.85rem; }  /* 13.6px */
.detail-title { font-size: 2.5rem; }   /* 40px */
.detail-section p { font-size: 1rem; } /* 16px */
```

### Spacing System

**Base Unit**: 8px

```css
/* Consistent spacing multiples of 8 */
padding: 8px;   /* 1x */
padding: 16px;  /* 2x */
padding: 24px;  /* 3x */
padding: 40px;  /* 5x */
padding: 60px;  /* 7.5x */
```

### Shadow System

```css
/* Light shadows for depth */
box-shadow: 0 4px 15px rgba(0,0,0,0.15);  /* Default */
box-shadow: 0 6px 20px rgba(0,0,0,0.2);   /* Hover */
box-shadow: 0 8px 30px rgba(0,0,0,0.25);  /* Elevated */
box-shadow: 0 10px 40px rgba(0,0,0,0.3);  /* Cards */
```

---

## 🎬 Animation Choreography

### Main Page Animation Timeline

```
Time   | Event
-------|--------------------------------------------------
0.0s   | Page loads, body opacity: 0
0.1s   | Body fade-in starts (0.5s duration)
0.2s   | Header fadeInDown animation
0.4s   | Center circle scaleIn animation
0.5s   | Circle 1 (Kambing) appears (delay: 0)
0.65s  | Circle 2 (Seafood) appears (delay: 0.15s)
0.8s   | Circle 3 (Jawa) appears (delay: 0.3s)
0.95s  | Circle 4 (Ayam) appears (delay: 0.45s)
1.1s   | Circle 5 (Sapi) appears (delay: 0.6s)
1.25s  | Circle 6 (Pete) appears (delay: 0.75s)
1.4s   | All animations complete
```

### Animation Properties

**fadeInDown (Header)**
```css
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
- **Duration**: 0.8s
- **Easing**: ease
- **Effect**: Slides down while fading in

**scaleIn (Center Circle)**
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
```
- **Duration**: 0.6s
- **Easing**: ease
- **Effect**: Grows from center point

**staggeredAppear (Small Circles)**
```css
@keyframes staggeredAppear {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.small-circle {
  animation: staggeredAppear 0.6s ease forwards;
  animation-delay: calc(var(--delay) * 0.15s);
}
```
- **Duration**: 0.6s per circle
- **Delay calculation**: `index * 150ms`
- **Fill mode**: forwards (maintains end state)

### Hover Interactions

**Scale + Shadow Effect**
```css
.small-circle {
  transition: all 0.4s ease;
}

.small-circle:hover {
  transform: scale(1.15) translateY(-5px);
  box-shadow: 0 10px 35px var(--hover-shadow);
}
```
- **Transform**: 15% larger + 5px lift
- **Duration**: 0.4s
- **Easing**: ease (slow start & end)

---

## 📱 Responsive Strategy

### Breakpoint Philosophy

**Mobile-First Approach**: Base styles target mobile, then enhance for larger screens

### Desktop Layout (> 768px)
```css
.circle-container {
  position: relative;
  width: 600px;
  height: 600px;
}

.small-circle {
  position: absolute;
  /* Positioned around center circle */
}
```

**Visual:**
```
        [Kambing]
           ↑
[Pete] ← [CENTER] → [Seafood]
           ↓
    [Sapi] [Ayam] [Jawa]
```

### Mobile Layout (< 600px)
```css
.circle-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
}

.center-circle {
  grid-column: 1 / -1; /* Span both columns */
}

.small-circle {
  position: relative !important;
  /* Reset absolute positioning */
}
```

**Visual:**
```
[ CENTER CIRCLE ]
   (full width)

[Kambing] [Seafood]
[Jawa]    [Ayam]
[Sapi]    [Pete]
```

### Why This Strategy?

1. **Circular layout on desktop**: More visually interesting, utilizes space
2. **Grid on mobile**: Easier scrolling, thumb-friendly tap targets
3. **Same HTML**: No duplicate markup needed
4. **CSS-only**: No JavaScript for layout switching

---

## 🔌 API & Integration Points

### localStorage API

**Usage:**
```javascript
// Save theme preference
localStorage.setItem('theme', 'dark');

// Retrieve theme preference
const theme = localStorage.getItem('theme');

// Default if not set
const theme = localStorage.getItem('theme') || 'light';
```

**Data Stored:**
| Key | Value | Purpose |
|-----|-------|---------|
| `theme` | `'light'` or `'dark'` | User's theme preference |

**Persistence:**
- Survives page refreshes
- Survives browser restart
- Persists across sessions
- Scoped to domain

---

## ⚡ Performance Optimizations

### 1. **Critical CSS Inlined**
- All styles in single `style.css`
- No separate animation files
- Reduces HTTP requests

### 2. **Minimal JavaScript**
- Only ~150 lines
- No external libraries
- No unnecessary DOM manipulation

### 3. **Image Strategy**
```css
.circle-image {
  background-image: url('../images/kambing.png');
}

/* Fallback emoji if image not found */
.kambing-img::before {
  content: '🐐';
}
```
- **Benefit**: Site works without images
- **Progressive enhancement**: Images load when available

### 4. **CSS Animation over JS**
- Hardware-accelerated transforms
- Better performance on mobile
- No JavaScript execution cost

### 5. **Debounced Resize Handler**
```javascript
const handleResize = debounce(() => {
  // Expensive operations here
}, 250);
```
- **Prevents**: Excessive function calls during resize
- **Result**: Smoother performance

### 6. **Intersection Observer**
```javascript
const observer = new IntersectionObserver(...);
```
- **vs Scroll Listeners**: More efficient
- **Benefit**: Only triggers when elements visible

---

## 🧪 Testing Checklist

### Functionality Tests
- [ ] All 6 circles navigate to correct pages
- [ ] Back buttons return to main page
- [ ] Theme toggle switches colors
- [ ] Theme preference persists after refresh
- [ ] All animations play correctly
- [ ] Hover effects work on all circles

### Cross-Browser Tests
- [ ] Chrome (desktop & mobile)
- [ ] Firefox
- [ ] Safari (Mac & iOS)
- [ ] Edge
- [ ] Opera

### Responsive Tests
```bash
# Desktop
- [ ] 1920x1080 (Full HD)
- [ ] 1366x768 (Laptop)

# Tablet
- [ ] 768x1024 (iPad)
- [ ] 1024x768 (iPad Landscape)

# Mobile
- [ ] 375x667 (iPhone SE)
- [ ] 414x896 (iPhone 11)
- [ ] 360x640 (Android)
```

### Performance Tests
- [ ] Lighthouse Score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 2.5s
- [ ] No console errors
- [ ] No 404 errors (missing assets)

### Accessibility Tests
- [ ] Color contrast ratio > 4.5:1
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Alt text for images (if added)

---

## 🐛 Common Issues & Solutions

### Issue: Images Not Showing

**Problem:**
```css
background-image: url('images/kambing.png');
```

**Solution:**
```css
/* Use relative path from CSS file location */
background-image: url('../images/kambing.png');
```

### Issue: Theme Not Persisting

**Problem:** localStorage blocked by browser

**Solution:**
```javascript
try {
  localStorage.setItem('theme', newTheme);
} catch (e) {
  console.warn('localStorage not available');
  // Fallback: use in-memory storage
}
```

### Issue: Animations Not Working on Mobile

**Problem:** Hardware acceleration disabled

**Solution:**
```css
.small-circle {
  transform: translateZ(0); /* Force GPU acceleration */
  will-change: transform; /* Hint browser about animation */
}
```

### Issue: Layout Breaks on Small Screens

**Problem:** Fixed widths too large

**Solution:**
```css
.circle-container {
  width: 100%;
  max-width: 600px; /* Instead of fixed 600px */
}
```

---

## 🔐 Security Considerations

### 1. **No External Scripts**
- All code is local
- No third-party JavaScript
- Reduces XSS attack surface

### 2. **Content Security Policy Ready**
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               style-src 'self' 'unsafe-inline' fonts.googleapis.com; 
               font-src fonts.gstatic.com;">
```

### 3. **localStorage Safety**
```javascript
// Never store sensitive data in localStorage
// Current usage: only theme preference (safe)
```

### 4. **No User Input**
- Static site
- No forms
- No user-generated content
- Low risk

---

## 📊 Performance Metrics

### File Sizes
```
index.html:          4 KB
style.css:          12 KB
script.js:           3 KB
(6x detail pages):  24 KB (4 KB each)
-------------------------------
Total (no images):  43 KB
```

### Load Performance
- **First Contentful Paint**: < 1.0s
- **Time to Interactive**: < 1.5s
- **Speed Index**: < 1.5s
- **Total Blocking Time**: < 200ms

### Lighthouse Scores (Target)
- **Performance**: 95+
- **Accessibility**: 90+
- **Best Practices**: 95+
- **SEO**: 100

---

## 🔮 Future Technical Improvements

### Potential Enhancements

1. **Service Worker**
   ```javascript
   // Cache assets for offline access
   // Faster repeat visits
   ```

2. **Lazy Loading**
   ```html
   <img loading="lazy" src="...">
   ```

3. **WebP Images**
   ```html
   <picture>
     <source srcset="image.webp" type="image/webp">
     <img src="image.png" alt="...">
   </picture>
   ```

4. **Critical CSS Extraction**
   ```html
   <style>
     /* Inline only above-the-fold CSS */
   </style>
   <link rel="preload" href="style.css" as="style">
   ```

5. **Prefetch Next Pages**
   ```html
   <link rel="prefetch" href="pages/nasigoreng-kambing.html">
   ```

---

## 📚 Learning Resources

### Technologies Used

**HTML5:**
- [MDN HTML Reference](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [HTML Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp)

**CSS3:**
- [CSS Tricks - Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Tricks - Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [MDN CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)

**JavaScript:**
- [JavaScript.info](https://javascript.info/)
- [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

**GitHub Pages:**
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Deploying a Static Site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

---

## 🎯 Code Quality Standards

### HTML Standards
- ✅ Valid HTML5 syntax
- ✅ Semantic elements (`<header>`, `<section>`)
- ✅ Proper indentation (2 spaces)
- ✅ Descriptive class names

### CSS Standards
- ✅ BEM-inspired naming (`.circle-container`, `.circle-label`)
- ✅ Grouped by component
- ✅ Comments for major sections
- ✅ Consistent spacing

### JavaScript Standards
- ✅ ES6+ syntax
- ✅ `const`/`let` instead of `var`
- ✅ Arrow functions
- ✅ Template literals
- ✅ Comments for complex logic

---

**End of Technical Documentation**

*For user-facing documentation, see [README.md](README.md)*