# How to See the Voice Button 🎤

## Quick Steps

1. **Start the development server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:3001/farmer/dashboard
   ```
   (or http://localhost:3000 if 3001 is not available)

3. **Look at the BOTTOM-RIGHT corner** of the screen

4. **You should see TWO buttons**:
   - A **simple test button** (shows alert when clicked)
   - The **full voice assistant button** (with microphone icon)

## Visual Location

```
┌─────────────────────────────────────────────┐
│  Khet2Kitchen Dashboard                     │
│                                             │
│  [Your dashboard content here]              │
│                                             │
│                                             │
│                                             │
│                                             │
│                                      ┌────┐ │
│                                      │ 🎤 │ │ ← HERE!
│                                      └────┘ │
│                                             │
└─────────────────────────────────────────────┘
```

## Test Page

Visit the test page to verify everything:
```
http://localhost:3001/farmer/voice-test
```

This page will:
- ✅ Show browser support status
- ✅ Display troubleshooting tips
- ✅ Confirm button location
- ✅ Check if voice features work

## Button Appearance

### Simple Test Button (Top)
- **Color**: Primary blue
- **Size**: 64px × 64px
- **Icon**: Microphone
- **Action**: Shows alert when clicked
- **Purpose**: Verify button is visible

### Full Voice Button (Below)
- **Color**: Changes based on state
  - Blue: Ready to listen
  - Red (pulsing): Listening
  - Blue (animated): Speaking
  - Gray: Processing
- **Size**: 64px × 64px
- **Icon**: Microphone / MicOff / Volume
- **Action**: Activates voice assistant

## Browser Requirements

### ✅ Fully Supported
- **Chrome** (Desktop & Mobile)
- **Edge** (Desktop)
- **Safari** (Desktop & iOS)

### ⚠️ Limited Support
- **Firefox** (Basic features only)

### ❌ Not Supported
- **Internet Explorer**
- **Older browsers**

## Troubleshooting

### Problem: "I don't see any button"

**Solutions:**
1. **Refresh the page** (Ctrl+R or Cmd+R)
2. **Clear browser cache** (Ctrl+Shift+Delete)
3. **Check if you're on a farmer page**:
   - ✅ `/farmer/dashboard`
   - ✅ `/farmer/pricing`
   - ✅ `/farmer/orders`
   - ❌ `/` (landing page)
   - ❌ `/welcome`
   - ❌ `/language`

4. **Scroll down** - Make sure you're not at the very top
5. **Check browser console** (F12) for errors
6. **Try a different browser** (Chrome recommended)

### Problem: "Button is there but disabled"

**Reason:** Your browser doesn't support Web Speech API

**Solutions:**
1. Use **Chrome**, **Edge**, or **Safari**
2. Update your browser to the latest version
3. Check if you're using HTTPS (required for microphone access)

### Problem: "Button doesn't respond"

**Solutions:**
1. **Allow microphone permission** when prompted
2. **Check microphone is connected** and working
3. **Test on voice-test page**: `/farmer/voice-test`
4. **Check browser console** for errors

### Problem: "Voice not recognized"

**Solutions:**
1. **Speak clearly** and at normal pace
2. **Reduce background noise**
3. **Check microphone volume** in system settings
4. **Try simple commands** first:
   - "What's the weather today?"
   - "Show tomato prices"

## Current Setup

### Files Created:
- ✅ `src/components/voice-assistant/voice-button.tsx` - Full voice button
- ✅ `src/components/voice-assistant/simple-voice-button.tsx` - Test button
- ✅ `src/app/farmer/voice-test/page.tsx` - Test page
- ✅ `src/hooks/use-voice-assistant.ts` - Voice logic
- ✅ All voice services and handlers

### Integration:
- ✅ Added to `src/app/farmer/layout.tsx`
- ✅ Available on all farmer pages
- ✅ Fixed position (bottom-right)
- ✅ High z-index (50)

## Quick Test

1. Open: `http://localhost:3001/farmer/dashboard`
2. Look bottom-right corner
3. Click the **top button** (simple test)
4. Should see alert: "Voice button clicked!"
5. If you see the alert, buttons are working!
6. Click the **bottom button** (voice assistant)
7. Allow microphone permission if asked
8. Speak a command

## Example Commands to Try

Once the button works:

### English:
- "What's the weather today?"
- "Show tomato prices"
- "Calculate my profit"

### Hindi:
- "आज का मौसम कैसा है?"
- "टमाटर की कीमत दिखाओ"

### Telugu:
- "ఈరోజు వాతావరణం ఎలా ఉంది?"
- "టమాటా ధరలు చూపించు"

### Tamil:
- "இன்று வானிலை எப்படி இருக்கிறது?"
- "தக்காளி விலைகளைக் காட்டு"

## Still Can't See It?

### Check These:

1. **Server is running?**
   ```bash
   npm run dev
   ```
   Should show: `✓ Ready in X.Xs`

2. **Correct URL?**
   - ✅ `http://localhost:3001/farmer/dashboard`
   - ❌ `http://localhost:3000` (wrong port)
   - ❌ `http://localhost:3001` (missing /farmer/dashboard)

3. **Browser DevTools (F12):**
   - Check Console tab for errors
   - Check Elements tab - search for "voice-button"
   - Check Network tab - all files loading?

4. **CSS/Styling:**
   - Button has `fixed` position
   - Button has `bottom-6 right-6` (24px from edges)
   - Button has `z-50` (high z-index)
   - Check if any CSS is overriding these

## Contact Support

If you still can't see the button after trying all above:

1. **Take a screenshot** of your browser window
2. **Open browser console** (F12) and screenshot any errors
3. **Note your browser** name and version
4. **Share the URL** you're trying to access

---

**Remember**: The button is ALWAYS in the bottom-right corner on farmer pages! 🎯
