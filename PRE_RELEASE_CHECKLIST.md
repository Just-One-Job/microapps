# Pre-Release Checklist

This checklist tracks progress toward shipping Tip Calculator v1.0.0.

## ✅ Completed

### 1. App Polish & Bug Fixes
- [x] Verified all README features are implemented
- [x] Fixed edge cases:
  - [x] Bill input: Prevents decimal-first input (now starts with "0.")
  - [x] Bill input: Added maximum limit ($999,999.99)
  - [x] Bill input: Prevents multiple decimal points
  - [x] Custom tip: Supports decimal percentages (e.g., 17.5%)
  - [x] Custom tip: Prevents values over 100%
  - [x] Split count: Enforced minimum of 1 person
- [x] Improved input validation and error handling

### 2. Engineering Hygiene
- [x] Added Jest test configuration
- [x] Created unit tests for calculation logic (useTipCalculator hook)
- [x] Added ESLint configuration
- [x] Added test scripts to package.json
- [x] Added type-check script

### 3. App Store Preparation
- [x] Updated app.json with bundle identifiers:
  - iOS: `com.justonejobapps.tipcalculator`
  - Android: `com.justonejobapps.tipcalculator`
- [x] Set orientation to portrait
- [x] Updated app name to "Tip Calculator"
- [x] Set userInterfaceStyle to "automatic" (supports system theme)
- [x] Created APP_STORE.md with listing information
- [x] Created PRIVACY_POLICY.md
- [x] Created SUPPORT.md

## 🔄 In Progress / Needs Testing

### Device Testing Required
- [ ] Test on real iOS device via Expo Go
- [ ] Test on real Android device via Expo Go
- [ ] Test edge cases:
  - [ ] Bill = 0, 0.01, 99999.99
  - [ ] Decimal input sequences
  - [ ] Rapid backspace
  - [ ] Custom tip with decimals (17.5%)
  - [ ] Split = 1, 2, 3, 10+ people
- [ ] Test landscape orientation (currently locked to portrait - verify this is desired)
- [ ] Test dark mode toggle
- [ ] Test haptic feedback on physical device
- [ ] Test persistence (close/reopen app, verify preferences saved)

### UX Polish Verification
- [ ] Verify buttons are thumb-friendly (min 44x44pt recommended)
- [ ] Test one-handed operation
- [ ] Verify no state gets "stuck" (modals dismiss properly)
- [ ] Check keyboard doesn't obscure important content
- [ ] Test on different screen sizes (iPhone SE, iPhone Pro Max, iPad)

## 📋 Remaining Tasks

### App Icon & Splash Screen
- [ ] Design app icon (1024×1024 for iOS, 512×512 for Android)
  - Consider: "%" symbol or receipt icon
  - Add subtle "1" for "Just One Job" branding
  - Use brand colors
- [ ] Create splash screen image
- [ ] Update assets/icon.png
- [ ] Update assets/splash-icon.png
- [ ] Update assets/adaptive-icon.png (Android)

### Dependencies Installation
- [ ] Install test dependencies:
  ```bash
  npm install --save-dev jest @testing-library/react-native @testing-library/jest-native @types/jest eslint-config-expo @typescript-eslint/parser @typescript-eslint/eslint-plugin
  ```

### Testing
- [ ] Run tests: `npm test`
- [ ] Run type check: `npm run type-check`
- [ ] Run linter: `npm run lint`
- [ ] Fix any issues found

### App Store Submission Prep
- [ ] Create EAS account (if using EAS Build)
- [ ] Update app.json with EAS project ID
- [ ] Take screenshots for App Store (see APP_STORE.md for requirements)
- [ ] Create app preview video (optional)
- [ ] Set up App Store Connect account
- [ ] Set up Google Play Console account
- [ ] Prepare App Store listing using APP_STORE.md
- [ ] Host privacy policy (justonejobapps.com/privacy/tip-calculator)
- [ ] Set up support page (justonejobapps.com/support)

### Website Setup (justonejobapps.com)
- [ ] Create basic website
- [ ] Add "About" page
- [ ] Add privacy policy page
- [ ] Add support/contact page
- [ ] Add Tip Calculator product page (optional)

### Final Checks
- [ ] Review all code for any console.logs or debug code
- [ ] Verify no test/development code in production build
- [ ] Update CHANGELOG.md with final version notes
- [ ] Create GitHub release
- [ ] Tag release in git

## 🚀 Ready to Build

Once all items above are complete:

1. **Build for iOS:**
   ```bash
   eas build --platform ios
   ```

2. **Build for Android:**
   ```bash
   eas build --platform android
   ```

3. **Submit to App Store:**
   - Upload via App Store Connect
   - Submit for review

4. **Submit to Google Play:**
   - Upload via Google Play Console
   - Submit for review

## Notes

- App is locked to portrait orientation (as per app.json)
- Dark mode is supported and toggles with system preference by default
- All calculations are local, no network required
- No analytics or tracking implemented (privacy-first)

---

**Last Updated:** November 2025

