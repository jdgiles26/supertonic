# Glassmorphism UI Theme - Customization Guide

This UI has been redesigned with an **American glassmorphism theme** featuring red, white, and blue colors, along with an interactive particle background.

## Features

✨ **Glassmorphism Design**
- Frosted glass effect on all UI elements
- Semi-transparent backgrounds with backdrop blur
- Beautiful layering and depth

🎨 **American Color Palette**
- Blue: `#2563eb` (rgba(37, 99, 235))
- Red: `#dc2626` (rgba(220, 38, 38))
- White: `#ffffff` with varying opacity

⭐ **Interactive Background**
- Animated particle system with red, white, and blue stars
- Mouse-interactive particles that react to cursor movement
- Connecting lines between nearby particles
- Smooth animations and twinkling effects

🎯 **Button Effects**
- Ripple effect on hover
- 3D transformation animations
- Glowing shadows in theme colors

## Adding Your Custom Background Image

To integrate your custom background image:

1. Place your image file in the `/web` directory (e.g., `bg-image.png`)

2. Open `/web/style.css` and uncomment the background image lines in the `body` selector:

```css
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: linear-gradient(135deg, #1e3a8a 0%, #7c2d12 50%, #1e3a8a 100%);

    /* Uncomment these lines and update the path to your image */
    background-image: url('bg-image.png');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;

    /* ... rest of styles ... */
}
```

3. **Tips for best results:**
   - Use high-resolution images (1920x1080 or higher)
   - The glassmorphism effect works best with subtle, not-too-busy backgrounds
   - Consider using images with American themes (flags, landscapes, patriotic colors)
   - You can combine the gradient with the image by using both properties
   - Adjust `background-blend-mode` if you want to blend the gradient with the image

## Customizing Colors

To change the theme colors, search and replace these color values in `/web/style.css`:

- **Primary Blue**: `rgba(37, 99, 235, ...)` or `#2563eb`
- **Primary Red**: `rgba(220, 38, 38, ...)` or `#dc2626`
- **Background Blue**: `#1e3a8a`
- **Background Red-Brown**: `#7c2d12`

## Adjusting Glassmorphism Intensity

You can adjust the glass effect by modifying these properties:

```css
/* Increase/decrease blur amount */
backdrop-filter: blur(20px); /* Change the px value */

/* Adjust transparency */
background: rgba(255, 255, 255, 0.1); /* Change the last number (0-1) */

/* Modify border visibility */
border: 1px solid rgba(255, 255, 255, 0.2); /* Change the last number */
```

## Interactive Background Customization

Edit `/web/background.js` to customize the particle system:

```javascript
// Line 23: Change number of particles
const numStars = 150; // Increase or decrease

// Line 28: Adjust particle size
radius: Math.random() * 2 + 0.5, // Change multiplier and base

// Lines 42-44: Modify colors
const colors = [
    'rgba(220, 38, 38, ',   // Red - customize RGB values
    'rgba(255, 255, 255, ', // White
    'rgba(37, 99, 235, '    // Blue
];
```

## Browser Compatibility

The glassmorphism effect uses `backdrop-filter` which is supported in:
- Chrome/Edge 76+
- Safari 9+
- Firefox 103+

For older browsers, the design gracefully falls back to solid backgrounds.

---

Enjoy your new glassmorphism UI! 🇺🇸✨
