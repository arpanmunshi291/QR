# QR Code Customization Guide

## Overview
Your QR code generator now includes comprehensive customization options that allow users to create unique, branded QR codes. This guide explains all the available customization features.

## Features

### 1. **QR Patterns** 🎨
Choose from 6 different module patterns:
- **Square** - Classic QR code look (default)
- **Dots** - Circular dots for a modern feel
- **Rounded** - Slightly rounded corners
- **Extra Rounded** - More pronounced rounded corners
- **Classy** - Cross-shaped modules
- **Classy Rounded** - Rounded cross-shaped modules

### 2. **Eye Styles** 👁️
Customize the three corner patterns (positioning markers):
- **Square** - Traditional square eyes
- **Rounded** - Rounded corner eyes
- **Circle** - Fully circular eyes
- **Leaf** - Organic leaf-shaped eyes

### 3. **Colors** 🎨
Full color customization:
- **8 Preset Color Schemes**:
  - Classic Black
  - Ocean Blue
  - Forest Green
  - Sunset Orange
  - Royal Purple
  - Cherry Red
  - Gold
  - Pink

- **Custom Colors**:
  - Primary color (QR code modules)
  - Background color
  - Color picker with hex input
  - Live preview

### 4. **Logo Integration** 🖼️
Add your brand logo to the center:
- Drag & drop or click to upload
- Supports PNG, JPG, SVG
- Adjustable logo size (10-30% of QR code)
- Automatic white background padding
- Logo preview before generation
- Pro tips for best results

### 5. **Frames** 🖼️
Add decorative frames with custom text:
- **5 Frame Styles**:
  - None (no frame)
  - Banner (full-width bottom banner)
  - Box (rounded box frame)
  - Speech Balloon (chat bubble style)
  - Circular (oval frame)

- **Custom Frame Text** (up to 30 characters)
- Quick text suggestions: "Scan me!", "Visit us", "Get 20% off", etc.

### 6. **Templates** ✨
Quick-start with pre-designed templates:
- **Classic** - Traditional black and white
- **Modern** - Rounded and sleek (Popular)
- **Ocean** - Cool blue tones
- **Forest** - Natural green
- **Sunset** - Warm orange
- **Royal** - Elegant purple
- **Minimal** - Clean and simple
- **Bold** - High contrast red

Each template applies:
- Pattern style
- Eye style
- Color scheme
- Frame style
- Frame text

## Technical Implementation

### Database Schema
New fields added to `QRCode` model:
```prisma
pattern          String? @default("square")
eyeStyle         String? @default("square")
logoUrl          String?
primaryColor     String? @default("#0f172a")
backgroundColor  String? @default("#ffffff")
frameStyle       String?
frameText        String?
template         String?
```

### New Components
1. **CustomizationPanel** - Main container with tabbed interface
2. **PatternSelector** - QR pattern selection
3. **EyeSelector** - Corner eye style selection
4. **ColorPicker** - Color customization with presets
5. **LogoUploader** - Logo upload and sizing
6. **FrameSelector** - Frame style and text
7. **TemplateSelector** - Pre-designed templates

### Advanced QR Hook
`useAdvancedQRCode` hook provides:
- Canvas-based QR generation
- Pattern customization via pixel manipulation
- Eye style customization
- Logo overlay with proper positioning
- Frame rendering
- High error correction (30%)
- PNG and SVG export

## User Experience

### Workflow
1. **Select Content Type** - URL, Text, WiFi, or Email
2. **Enter Content Details** - Fill in the form
3. **Customize Design** - Use the 6-tab customization panel:
   - Pattern
   - Eyes
   - Colors
   - Logo
   - Frame
   - Templates
4. **Preview Live** - See changes in real-time
5. **Download** - PNG or SVG format

### Mobile Responsive
- Tabbed interface for easy navigation
- Touch-friendly controls
- Optimized preview size
- Collapsible sections

### Performance
- Real-time preview generation
- Debounced updates for smooth UX
- Canvas-based rendering for speed
- Efficient image processing

## Best Practices

### For Users
1. **Logo Guidelines**:
   - Use square logos for best results
   - Transparent backgrounds work great
   - Keep logos simple for better scanning
   - Recommended size: 15-20%

2. **Color Contrast**:
   - Ensure high contrast between primary and background
   - Dark on light works best
   - Test scanning in different lighting

3. **Frame Text**:
   - Keep it short and clear
   - Use action words: "Scan", "Visit", "Get"
   - Consider your audience

4. **Testing**:
   - Always test QR codes before printing
   - Test on multiple devices
   - Test in different lighting conditions

### For Developers
1. **Error Correction**: Set to "H" (30%) to accommodate logos and styling
2. **Canvas Size**: 400x400px provides good quality
3. **Logo Size**: 20% is optimal for most cases
4. **Frame Height**: 80px provides good text visibility

## Future Enhancements
Potential additions:
- Gradient colors
- Multiple logo positions
- Animation effects (for digital displays)
- Batch generation with templates
- Custom pattern uploads
- QR code analytics integration
- A/B testing for designs

## Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Accessibility
- Keyboard navigation support
- Screen reader friendly labels
- High contrast mode compatible
- Touch-friendly controls

## Support
For issues or questions:
1. Check the preview before downloading
2. Ensure content is valid (URLs start with https://)
3. Test QR codes with multiple scanners
4. Contact support if scanning issues persist
