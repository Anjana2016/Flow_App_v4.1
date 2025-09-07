# UI/UX SPECIFICATIONS
*Flow App v4.2 - Design System Documentation*

---

## 1. DESIGN PHILOSOPHY

### Core Aesthetic Principles
- **Glassmorphism Design Language**: Modern glass-effect UI with frosted overlays and transparency layers
- **Gen Z-Optimized Interface**: Contemporary visual design with smooth animations and micro-interactions
- **Mobile-First Architecture**: Designed primarily for mobile devices with responsive scalability
- **Minimalist Approach**: Clean, uncluttered interface focusing on essential elements

### Visual Hierarchy Strategy
- **Progressive Disclosure**: Information revealed contextually to reduce cognitive load
- **Color-Coded Categories**: Visual distinction using category-specific accent colors
- **Typography Emphasis**: Clear information architecture through font weight and sizing
- **Spatial Organization**: Consistent use of whitespace and component grouping

---

## 2. GLASSMORPHISM DESIGN SYSTEM

### Core Color Palette
```css
/* Primary Glass System */
--glass-bg: rgba(255, 255, 255, 0.08)
--glass-border: rgba(255, 255, 255, 0.06)
--glass-hover: rgba(255, 255, 255, 0.12)

/* Flow Method Colors */
--gradient-foundation: linear-gradient(135deg, #1e40af, #3b82f6)
--gradient-growth: linear-gradient(135deg, #059669, #10b981)
--gradient-freedom: linear-gradient(135deg, #dc2626, #ef4444)

/* Accent Colors */
--accent-green: #10B981
--accent-blue: #3B82F6
--accent-purple: #8B5CF6
--accent-pink: #EC4899
--accent-amber: #F59E0B
```

### Glass Effects Implementation
- **Backdrop Blur**: 24px blur for primary containers, 16px for secondary elements
- **Transparency Layers**: 8% white overlay for primary backgrounds, 12% for hover states
- **Border Definition**: Subtle 1px borders using 6% white transparency
- **Shadow System**: Multi-layered shadows combining blur and colored accents

### Visual Depth Hierarchy
1. **Background Layer**: Subtle gradient animation with GPU acceleration
2. **Content Layer**: Glassmorphism cards with backdrop-filter blur
3. **Interactive Layer**: Enhanced glass effects on hover/focus states
4. **Modal Layer**: Increased opacity and shadow depth for overlays

---

## 3. TYPOGRAPHY SYSTEM

### Font Stack
```css
--font-primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto
--font-display: "SF Pro Display", var(--font-primary)
```

### Typography Scale
- **Display Text**: 36px (hero elements, major titles)
- **3XL Headers**: 30px (section headings)
- **2XL Headers**: 24px (card titles)
- **XL Text**: 20px (important values)
- **Large Text**: 18px (secondary headings)
- **Base Text**: 16px (body content, standard UI)
- **Small Text**: 14px (labels, secondary info)
- **Extra Small**: 12px (metadata, fine print)
- **Micro Text**: 10px (navigation labels)

### Font Weight Strategy
- **700 (Bold)**: Primary values, important metrics
- **600 (Semibold)**: Section headings, button labels
- **500 (Medium)**: Interactive elements, form labels
- **400 (Regular)**: Body text, descriptions

### Text Color Hierarchy
- **Primary Text**: High contrast for main content
- **Secondary Text**: Medium contrast for supporting information
- **Muted Text**: Low contrast for metadata and fine print

---

## 4. COMPONENT SPECIFICATIONS

### Card System
```css
.glass-card {
    background: var(--glass-bg);
    backdrop-filter: blur(24px);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 24px;
    box-shadow: var(--shadow-medium);
}
```

**Card Variants:**
- **Standard Cards**: 20px border radius, 24px padding
- **Compact Cards**: 16px border radius, 16px padding
- **Hero Cards**: 24px border radius, 32px padding
- **Modal Cards**: Enhanced shadows and increased backdrop blur

### Button System

#### Primary Buttons
```css
.btn-primary {
    background: linear-gradient(135deg, var(--accent-green), #059669);
    color: white;
    border: none;
    border-radius: 12px;
    padding: 12px 24px;
    font-weight: 600;
    min-height: 44px; /* Touch target optimization */
}
```

#### Secondary Buttons
```css
.btn-secondary {
    background: var(--glass-bg);
    color: var(--text-primary);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    padding: 12px 24px;
    font-weight: 600;
    min-height: 44px;
}
```

#### Touch Target Standards
- **Minimum Size**: 44px x 44px for all interactive elements
- **Hover States**: translateY(-2px) with enhanced shadows
- **Active States**: scale(0.96) for tactile feedback
- **Disabled States**: Reduced opacity and pointer-events: none

### Form Elements
```css
.form-input-standard {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    padding: 12px 16px;
    color: var(--text-primary);
    font-size: 16px;
    backdrop-filter: blur(8px);
}
```

**Form Specifications:**
- **Input Fields**: 12px border radius, 16px font size (iOS optimization)
- **Labels**: 14px font size, 600 font weight, 8px margin bottom
- **Focus States**: Border color change with 3px box shadow
- **Placeholder Text**: Muted color with reduced opacity

---

## 5. LAYOUT ARCHITECTURE

### Container System
```css
.app-container {
    max-width: 400px;
    margin: 0 auto;
    min-height: 100vh;
    position: relative;
}
```

### Grid Specifications
- **Main Container**: 400px max width, centered layout
- **Content Padding**: 20px standard, 24px for cards
- **Safe Area**: Bottom padding with env(safe-area-inset-bottom)
- **Z-Index Hierarchy**: Defined layers for modals, navigation, and content

### Navigation System
```css
.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 400px;
    background: var(--glass-bg);
    backdrop-filter: blur(24px);
    border-top: 1px solid var(--glass-border);
}
```

**Navigation Features:**
- **Fixed Bottom Position**: Persistent accessibility
- **Glassmorphism Styling**: Consistent with design system
- **Active State Indicators**: Visual feedback with transform and color changes
- **Icon + Label Format**: Clear identification with 10px label text

---

## 6. DUAL DISPLAY SYSTEM INTERFACE

### Core Innovation: Remaining Flow Display
The dual display system transforms traditional static budgeting displays into dynamic, countdown-style interfaces that provide immediate spending clarity.

#### Primary Display Component
```css
.daily-flow-hero {
    text-align: center;
    padding: 32px 24px;
    background: var(--glass-bg);
    backdrop-filter: blur(24px);
    border-radius: 24px;
    margin-bottom: 24px;
}

.daily-flow-amount {
    font-size: 48px;
    font-weight: 700;
    color: var(--accent-green);
    line-height: 1.1;
    margin-bottom: 8px;
}

.daily-flow-label {
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: 500;
    opacity: 0.8;
}
```

#### Display Behavior Specifications
- **Initial State**: Shows full calculated daily flow amount (e.g., "$67")
- **Spending Response**: Decreases in real-time with Freedom category transactions
- **Countdown Animation**: Smooth number transitions using transform and opacity
- **Zero State**: Displays "$0" when daily allocation exhausted
- **Reset Behavior**: Returns to full calculated amount at calendar day boundary

#### Tomorrow's Flow Projection
```css
.tomorrow-flow-hint {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 13px;
    color: var(--text-secondary);
    margin-top: 12px;
    opacity: 0.9;
}

.tomorrow-amount {
    font-weight: 600;
    color: var(--accent-green);
}

.tomorrow-message {
    font-style: italic;
}
```

### Interface Animation System
#### Real-time Number Updates
```css
.daily-flow-amount {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
}

.amount-decrease {
    animation: countdownUpdate 0.3s ease-out;
}

@keyframes countdownUpdate {
    0% { transform: scale(1.05); color: var(--accent-amber); }
    50% { transform: scale(0.95); }
    100% { transform: scale(1); color: var(--accent-green); }
}
```

#### Daily Reset Animation
```css
.daily-reset-celebration {
    animation: dailyReset 0.8s ease-out;
}

@keyframes dailyReset {
    0% { opacity: 0; transform: translateY(20px) scale(0.9); }
    50% { transform: translateY(-5px) scale(1.05); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
}
```

### Responsive Dual Display
#### Mobile Optimization (Default)
- **Hero Amount**: 48px font size for optimal readability
- **Vertical Spacing**: 32px padding for comfortable touch interaction
- **Label Positioning**: Centered below amount with 8px margin

#### Tablet Adjustments (@media max-width: 768px)
- **Hero Amount**: 56px font size for larger screen utilization
- **Horizontal Padding**: Increased to 40px for balanced composition

#### Small Mobile (@media max-width: 480px)
- **Hero Amount**: 44px font size for space efficiency
- **Padding**: Reduced to 24px 20px for compact devices

---

## 7. MOBILE-FIRST RESPONSIVE DESIGN

### Breakpoint Strategy
```css
/* Mobile First (Default) */
@media (max-width: 768px) { /* Tablet adjustments */ }
@media (max-width: 480px) { /* Small mobile optimizations */ }
@media (min-width: 1024px) { /* Desktop enhancements */ }
```

### Touch Interaction Optimization
- **Touch Targets**: Minimum 44px x 44px for all interactive elements
- **Touch Actions**: Specific touch-action properties for gesture control
- **Tap Highlight**: Transparent webkit-tap-highlight-color
- **User Selection**: Disabled for UI elements, enabled for form inputs

### Gesture Support Implementation
```css
.swipe-enabled {
    touch-action: pan-y;
    user-select: none;
    cursor: grab;
}
```

**Gesture Features:**
- **Swipe Navigation**: Horizontal swipes for card stacks
- **Pull-to-Dismiss**: Vertical swipes for modal dismissal
- **Pan Gestures**: Custom handling for settings and education modals

### Performance Optimizations
```css
.performance-optimized {
    will-change: transform, opacity;
    contain: layout style paint;
    transform: translateZ(0); /* GPU acceleration */
}
```

---

## 7. ANIMATION & MICRO-INTERACTIONS

### Animation Timing System
```css
:root {
    --duration-micro: 0.15s;
    --duration-standard: 0.3s;
    --duration-slow: 0.6s;
    --easing-smooth: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Key Animation Patterns

#### Modal Animations
```css
@keyframes modalSlideUp {
    from {
        opacity: 0;
        transform: translateY(40px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}
```

#### Card Interactions
```css
.card-hover {
    transition: all 0.3s var(--easing-smooth);
    transform: translateY(0);
}
.card-hover:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
}
```

#### Progress Animations
```css
@keyframes progressFill {
    from { width: 0; }
    to { width: var(--target-width, 100%); }
}
```

### Micro-Interaction Guidelines
- **Button Press**: Scale down to 96% on active state
- **Card Hover**: 2px upward translation with shadow enhancement
- **Progress Bars**: Animated filling with 1s duration
- **Modal Entry**: Scale and fade with backdrop blur transition

---

## 8. ACCESSIBILITY SPECIFICATIONS

### Focus Management
```css
.focus-visible {
    outline: 2px solid var(--accent-green);
    outline-offset: 2px;
}
```

### Screen Reader Support
- **ARIA Labels**: Comprehensive labeling for interactive elements
- **Semantic HTML**: Proper heading hierarchy and landmark roles
- **Color Independence**: Information conveyed through multiple channels
- **Keyboard Navigation**: Full keyboard accessibility for all functions

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation: none !important;
        transition: none !important;
    }
}
```

### High Contrast Support
- **Color Contrast**: Minimum 4.5:1 ratio for normal text
- **Large Text**: Minimum 3:1 ratio for 18px+ text
- **Interactive Elements**: Enhanced contrast ratios for critical actions

---

## 9. MODAL SYSTEM ARCHITECTURE

### Modal Hierarchy
1. **Achievement Modals**: z-index: 10000
2. **Settings Modal**: z-index: 2100
3. **Education Modal**: z-index: 9999
4. **Transaction Modals**: z-index: 1001
5. **Standard Modals**: z-index: 1000

### Modal Specifications
```css
.modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
    justify-content: center;
}
```

### Swipe-to-Dismiss Implementation
- **Touch Handling**: Pan gesture recognition
- **Visual Feedback**: Real-time transform during swipe
- **Threshold Logic**: Dismiss threshold at 30% of screen height
- **Animation Recovery**: Smooth return animation on incomplete swipes

---

## 10. PERFORMANCE & BROWSER OPTIMIZATION

### CSS Performance Features
```css
.performance-layer {
    will-change: transform, opacity;
    contain: layout style paint;
    backface-visibility: hidden;
    transform: translateZ(0);
}
```

### Browser Fallbacks
```css
@supports not (backdrop-filter: blur(24px)) {
    .glass-bg {
        background: rgba(26, 26, 46, 0.95);
    }
}
```

### iOS Safari Optimizations
- **Tap Highlight Removal**: -webkit-tap-highlight-color: transparent
- **Safe Area Integration**: env(safe-area-inset-bottom) for bottom navigation
- **Input Zoom Prevention**: 16px minimum font size for form inputs
- **Hardware Acceleration**: transform3d usage for smooth animations

---

## 11. COMPONENT STATES SPECIFICATION

### Interactive State Matrix

| Component | Default | Hover | Active | Focus | Disabled |
|-----------|---------|-------|--------|-------|----------|
| **Cards** | Glass BG | -2px Y, Shadow | Scale 0.98 | Outline | Opacity 0.5 |
| **Buttons** | Gradient | -1px Y | Scale 0.96 | Ring | Gray BG |
| **Inputs** | Glass Border | Border Color | None | Shadow Ring | Gray Text |
| **Navigation** | Secondary Text | Primary Text | Transform Y | Outline | Hidden |

### Error State Handling
```css
@keyframes errorShake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
}
```

---

## 12. IMPLEMENTATION STANDARDS

### CSS Architecture
- **Custom Properties**: Consistent use of CSS variables
- **Modular Structure**: Component-based organization
- **Performance First**: Hardware acceleration and containment
- **Graceful Degradation**: Fallbacks for unsupported features

### Quality Assurance Checklist
- [ ] All interactive elements meet 44px minimum touch targets
- [ ] Glassmorphism effects render consistently across devices
- [ ] Animations respect prefers-reduced-motion settings
- [ ] Focus indicators are clearly visible and accessible
- [ ] Modal system maintains proper z-index hierarchy
- [ ] Touch gestures work smoothly on iOS and Android
- [ ] Performance optimizations applied to animated elements

---

*This specification serves as the definitive guide for Flow App's UI/UX implementation, ensuring consistent user experience across all features and platforms.*
