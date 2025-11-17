# Netlify Deployment Guide

This monorepo uses `file:` links for workspace dependencies, which are compatible with both npm and Bun. This makes deployment straightforward on Netlify.

## How It Works

1. **Local Development**: Uses Bun (or npm) with `file:` protocol for workspace dependencies
2. **Netlify CI**: Uses npm with the same `file:` links - no conversion needed

## Build Process

The build process on Netlify:

1. **Dependency installation**: Netlify runs `npm install` at the root (monorepo-aware via npm workspaces)
2. **Build**: Runs `npm --workspace=apps/tip-calculator run build:web` to build the app
3. **Publish**: Publishes the `apps/tip-calculator/dist` directory

## Configuration

### netlify.toml

Each app has its own `netlify.toml` file in its directory (e.g., `apps/tip-calculator/netlify.toml`). This keeps app-specific configuration separate from the root.

The `netlify.toml` file configures:
- Base directory: `../..` (repo root, required for monorepo workspace support)
- Build command: `npm run build:netlify:tip` (runs from repo root)
- Publish directory: `apps/tip-calculator/dist` (relative to base)
- Node.js version: 22

**Note**: When setting up a Netlify site, configure it to use the app's `netlify.toml` file:
- In Netlify dashboard: Site settings → Build & deploy → Build settings
- Set "Config file" to `apps/tip-calculator/netlify.toml`

### Scripts

- `build:netlify:tip`: Installs dependencies and builds the tip-calculator app using npm workspaces
- `build:netlify:deal`: Installs dependencies and builds the deal-steal app using npm workspaces

## Workspace Dependencies

All workspace packages use `file:` links in their dependencies:

```json
{
  "dependencies": {
    "@just-one-job/theme": "file:../../packages/theme",
    "@just-one-job/utils": "file:../../packages/utils"
  }
}
```

This approach:
- ✅ Works with npm (used by Netlify)
- ✅ Works with Bun (for local development)
- ✅ No conversion scripts needed
- ✅ Simple and reliable

## Adding New Apps

When adding a new app that needs to be deployed:

1. Add a new build script in root `package.json`:
   ```json
   "build:netlify:new-app": "npm install && npm --workspace=apps/new-app run build:web"
   ```

2. Create a `netlify.toml` file in the app's directory (e.g., `apps/new-app/netlify.toml`):
   ```toml
   [build]
     base = "../.."
     command = "npm run build:netlify:new-app"
     publish = "apps/new-app/dist"
   
   [build.environment]
     NODE_VERSION = "22"
     NPM_FLAGS = "--legacy-peer-deps"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. Create a new Netlify site and configure it to use the app's `netlify.toml` file

## Using Bun on Netlify (Optional)

Netlify now supports Bun! If you want to use Bun instead of npm:

1. Ensure `bun.lockb` is committed to your repo
2. Netlify will automatically detect it and use `bun install`
3. Update build commands to use `bun` instead of `npm`:
   ```json
   "build:netlify:tip": "bun install && bun --workspace=apps/tip-calculator run build:web"
   ```

## Troubleshooting

### Build fails with dependency errors

- Ensure all workspace packages are properly listed in the root `package.json` `workspaces` array
- Verify `file:` paths are correct relative to each app's `package.json`
- Check that package versions match between packages and apps (if using semver instead of `file:`)

### Dependencies not found

- Verify package paths are correct relative to the app directory
- Ensure workspace packages have valid `package.json` files with proper `name` and `version` fields

### Can't run `npm install` locally

- Use `bun install` instead (recommended for local development)
- Or use `npm install` directly - it works with `file:` links
