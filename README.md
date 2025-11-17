# Just One Job Microapps

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A monorepo of focused, privacy-first mobile apps built with React Native and Expo. Each app follows the "Just One Job" philosophy—one app, one purpose, no BS.

## 📱 Apps

- **[Tip Calculator](apps/tip-calculator/)** - Fast, privacy-first tip calculator
- **[Deal & Steal](apps/deal-steal/)** - Discount calculator for finding the best deals

## 🏗️ Monorepo Structure

```
microapps/
├── apps/                    # Individual applications
│   ├── tip-calculator/      # Tip calculator app
│   └── deal-steal/          # Discount calculator app
├── packages/                # Shared packages
│   ├── theme/               # Shared theme and styling
│   └── utils/               # Shared utilities
├── scripts/                 # Build and utility scripts
└── package.json             # Root workspace configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or later recommended)
- **Bun** (recommended) or **npm** for package management
- **Expo CLI** (optional, but recommended)
- iOS Simulator (for Mac) or Android Emulator, or Expo Go app on your device

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd microapps
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Start development server for an app**
   ```bash
   # Tip Calculator
   bun run dev:tip
   # or
   npm run dev:tip
   
   # Deal & Steal
   bun run dev:deal
   # or
   npm run dev:deal
   ```

4. **Run on your platform**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your device
   - Press `w` for web browser

## 🔧 Development

### Available Scripts

#### Root Level

- `bun run dev:tip` - Start Tip Calculator development server
- `bun run dev:deal` - Start Deal & Steal development server
- `bun run web:tip` - Start Tip Calculator web server
- `bun run web:deal` - Start Deal & Steal web server
- `bun run build:web:tip` - Build Tip Calculator for web
- `bun run build:web:deal` - Build Deal & Steal for web
- `bun run build:netlify:tip` - Build Tip Calculator for Netlify
- `bun run build:netlify:deal` - Build Deal & Steal for Netlify

#### App Level

Each app has its own scripts (see individual app directories):
- `start` - Start Expo development server
- `android` - Run on Android emulator
- `ios` - Run on iOS simulator
- `web` - Run in web browser
- `build:web` - Build for web deployment

### Workspace Dependencies

This monorepo uses npm workspaces with `file:` links for workspace dependencies. This approach:
- ✅ Works with npm (used by Netlify CI)
- ✅ Works with Bun (for local development)
- ✅ No conversion scripts needed
- ✅ Simple and reliable

Shared packages:
- `@just-one-job/theme` - Shared theme, colors, and styling
- `@just-one-job/utils` - Shared utility functions

## 📦 Building for Production

### Web Deployment (Netlify)

Each app has its own `netlify.toml` configuration file. See [NETLIFY.md](NETLIFY.md) for detailed deployment instructions.

### Mobile Apps (EAS Build)

Use EAS Build for iOS and Android:

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

See [PRE_RELEASE_CHECKLIST.md](PRE_RELEASE_CHECKLIST.md) for detailed release procedures.

## 🎨 Design Philosophy

All apps follow the "Just One Job" philosophy:

1. **One Screen, One Purpose** - Everything you need is visible and accessible
2. **No Distractions** - No ads, tracking, or unnecessary features
3. **Fast & Responsive** - Instant calculations and smooth interactions
4. **Accessible** - Large touch targets, clear typography, dark mode support
5. **Privacy First** - No data collection, everything stored locally

## 🏗️ Adding a New App

1. **Create app directory**
   ```bash
   mkdir -p apps/new-app
   cd apps/new-app
   ```

2. **Initialize Expo app**
   ```bash
   npx create-expo-app . --template blank-typescript
   ```

3. **Add workspace dependencies**
   Update `apps/new-app/package.json`:
   ```json
   {
     "dependencies": {
       "@just-one-job/theme": "file:../../packages/theme",
       "@just-one-job/utils": "file:../../packages/utils"
     }
   }
   ```

4. **Add root scripts**
   Update root `package.json`:
   ```json
   {
     "scripts": {
       "dev:new-app": "cd apps/new-app && bunx expo start",
       "build:netlify:new-app": "npm install && npm --workspace=apps/new-app run build:web"
     }
   }
   ```

5. **Create Netlify config** (if deploying to web)
   Copy `netlify.toml.example` to `apps/new-app/netlify.toml` and customize.

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

## 📚 Documentation

- [SETUP.md](SETUP.md) - Detailed setup instructions
- [NETLIFY.md](NETLIFY.md) - Netlify deployment guide
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [PRE_RELEASE_CHECKLIST.md](PRE_RELEASE_CHECKLIST.md) - Release checklist
- [APP_STORE.md](APP_STORE.md) - App store submission guide

## 🛠️ Tech Stack

- **React Native** (0.81.5) - Mobile framework
- **Expo** (~54.0.23) - Development platform
- **TypeScript** (~5.9.2) - Type safety
- **React** (19.1.0) - UI library
- **Bun** - Package manager (recommended) or npm
- **EAS Build** - Mobile app builds
- **Netlify** - Web deployment

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Built with the "Just One Job" philosophy—one app, one purpose, no BS.

---

**Made with ❤️ for people who want simple, focused apps that just work.**
