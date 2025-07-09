# 📜 Scripts Documentation

This document provides comprehensive information about all available npm scripts in the project, their purposes, usage examples, and expected outputs.

## 📋 Available Scripts Overview

| Script | Purpose | Environment | Dependencies |
|--------|---------|-------------|--------------|
| `dev` | Development server | Development | Node.js, Vite |
| `build` | Production build | Production | All dependencies |
| `build:dev` | Development build | Development | All dependencies |
| `lint` | Code linting | Any | ESLint |
| `preview` | Preview build | Testing | Build artifacts |

---

## 🚀 Development Scripts

### `npm run dev`

**Purpose**: Starts the Vite development server with hot module replacement (HMR) for rapid development.

**Functionality**:
- Launches development server on `http://localhost:8080`
- Enables hot module replacement for instant updates
- Provides source maps for debugging
- Serves static assets from `public/` directory
- Automatically opens browser (configurable)

**Usage Examples**:
```bash
# Standard development start
npm run dev

# With custom port (if needed via Vite config)
npm run dev -- --port 3000

# With host binding for network access
npm run dev -- --host 0.0.0.0
```

**Expected Output**:
```
  VITE v5.4.1  ready in 523 ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Common Use Cases**:
- Daily development workflow
- Component development and testing
- Real-time UI/UX iteration
- API integration testing
- Responsive design testing

**Required Environment Variables**:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

**Troubleshooting**:
- **Port already in use**: Vite will auto-increment to next available port
- **Slow startup**: Clear node_modules and reinstall dependencies
- **Hot reload not working**: Check file watchers and browser cache

---

## 🏗️ Build Scripts

### `npm run build`

**Purpose**: Creates an optimized production build of the application.

**Functionality**:
- Compiles TypeScript to JavaScript
- Bundles and minifies all assets
- Optimizes images and fonts
- Generates source maps
- Creates manifest files
- Tree-shakes unused code
- Applies production optimizations

**Usage Examples**:
```bash
# Standard production build
npm run build

# Build with custom output directory
npm run build -- --outDir custom-dist

# Build with detailed bundle analysis
npm run build -- --mode production --analyze
```

**Expected Output**:
```
vite v5.4.1 building for production...
✓ 34 modules transformed.
dist/index.html                   0.46 kB │ gzip:  0.30 kB
dist/assets/index-DiwrgTda.css    8.15 kB │ gzip:  2.34 kB
dist/assets/index-BKKjLQw8.js   143.44 kB │ gzip: 46.13 kB
✓ built in 1.23s
```

**Generated Files**:
```
dist/
├── index.html              # Main HTML entry point
├── assets/
│   ├── index-[hash].css    # Minified CSS bundle
│   ├── index-[hash].js     # Minified JS bundle
│   └── [asset-files]       # Optimized static assets
├── favicon.ico             # Favicon
└── manifest.json           # PWA manifest (if configured)
```

**Build Optimizations**:
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Removes unused code
- **Minification**: CSS and JS compression
- **Asset Optimization**: Image compression and optimization
- **Gzip Compression**: Pre-compressed assets

**Required Environment Variables**:
```env
NODE_ENV=production
VITE_SUPABASE_URL=production_supabase_url
VITE_SUPABASE_ANON_KEY=production_supabase_key
```

---

### `npm run build:dev`

**Purpose**: Creates a development build with debugging features enabled.

**Functionality**:
- Builds without minification
- Includes detailed source maps
- Preserves console logs
- Faster build times
- Easier debugging in staging environments

**Usage Examples**:
```bash
# Development build for staging
npm run build:dev

# Development build with specific mode
npm run build:dev -- --mode staging
```

**Expected Output**:
```
vite v5.4.1 building for development...
✓ 34 modules transformed.
dist/index.html                   1.23 kB
dist/assets/index.css            12.45 kB
dist/assets/index.js            256.78 kB
✓ built in 856ms
```

**Differences from Production Build**:
- Larger bundle sizes (not minified)
- More detailed source maps
- Console logs preserved
- Debug information included
- Faster build process

**Common Use Cases**:
- Staging environment deployment
- Debug production issues
- Performance testing with unminified code
- Integration testing

---

## 🔍 Quality Assurance Scripts

### `npm run lint`

**Purpose**: Runs ESLint to check code quality, style consistency, and potential errors.

**Functionality**:
- Analyzes TypeScript and JavaScript files
- Checks React-specific patterns
- Enforces coding standards
- Identifies potential bugs
- Suggests fixes for common issues

**Usage Examples**:
```bash
# Standard linting
npm run lint

# Lint with auto-fix
npm run lint -- --fix

# Lint specific files
npm run lint -- src/components/**/*.tsx

# Lint with detailed output
npm run lint -- --format=detailed
```

**Expected Output (No Errors)**:
```bash
✨ No linting errors found!
```

**Expected Output (With Errors)**:
```bash
/src/components/Example.tsx
  12:15  error    'useState' is not defined              no-undef
  18:23  warning  Missing dependency in useEffect hook  react-hooks/exhaustive-deps
  25:8   error    Unused variable 'data'                 @typescript-eslint/no-unused-vars

✖ 3 problems (2 errors, 1 warning)
  1 error and 0 warnings potentially fixable with the --fix option.
```

**Linting Rules Applied**:
- **ESLint Core**: Basic JavaScript/TypeScript rules
- **React Hooks**: Hook usage patterns
- **React Refresh**: Fast refresh compatibility
- **TypeScript**: Type-specific rules
- **Custom Rules**: Project-specific guidelines

**Auto-fixable Issues**:
- Missing semicolons
- Incorrect spacing
- Import sorting
- Unused imports
- Basic formatting issues

**Manual Fix Required**:
- Missing dependencies in hooks
- Unused variables
- Type errors
- Logic errors
- Accessibility issues

**Configuration Files**:
- `eslint.config.js` - Main ESLint configuration
- `.eslintignore` - Files to ignore (if present)

---

## 🔍 Testing & Preview Scripts

### `npm run preview`

**Purpose**: Serves the production build locally for testing and validation.

**Functionality**:
- Serves built files from `dist/` directory
- Simulates production environment
- Tests build artifacts
- Validates routing and assets
- Performance testing

**Usage Examples**:
```bash
# Standard preview
npm run preview

# Preview with custom port
npm run preview -- --port 4173

# Preview with network access
npm run preview -- --host 0.0.0.0
```

**Expected Output**:
```
  ➜  Local:   http://localhost:4173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Prerequisites**:
```bash
# Must build first
npm run build
npm run preview
```

**Testing Checklist**:
- [ ] All routes load correctly
- [ ] Static assets serve properly
- [ ] API endpoints function
- [ ] Authentication flows work
- [ ] Performance is acceptable
- [ ] Mobile responsiveness

**Common Use Cases**:
- Pre-deployment testing
- Performance benchmarking
- Client preview/demo
- Build validation
- Integration testing

---

## 🔧 Script Combinations & Workflows

### Development Workflow
```bash
# Start development
npm run dev

# In separate terminal - continuous linting
npm run lint -- --watch

# Build and test before commit
npm run build
npm run preview
```

### Pre-deployment Workflow
```bash
# Quality checks
npm run lint

# Build for production
npm run build

# Test production build
npm run preview

# Deploy (manual or CI/CD)
```

### Debugging Workflow
```bash
# Development build for debugging
npm run build:dev

# Serve and inspect
npm run preview

# Check console and network tab
```

---

## 🌍 Environment-Specific Configurations

### Development Environment
```json
{
  "scripts": {
    "dev": "vite --mode development"
  }
}
```

**Environment Variables**:
- `NODE_ENV=development`
- `VITE_*` variables for client-side access
- Debug flags enabled

### Production Environment
```json
{
  "scripts": {
    "build": "vite build --mode production"
  }
}
```

**Environment Variables**:
- `NODE_ENV=production`
- Production API endpoints
- Analytics and monitoring enabled

---

## 🚨 Troubleshooting Common Issues

### Script Failures

#### Development Server Won't Start
```bash
# Clear cache and restart
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### Build Failures
```bash
# Check for TypeScript errors
npx tsc --noEmit

# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

#### Linting Errors
```bash
# Auto-fix common issues
npm run lint -- --fix

# Check specific file
npm run lint -- src/components/Problem.tsx
```

#### Port Conflicts
```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Performance Issues

#### Slow Development Server
- Clear node_modules and reinstall
- Check for large files in public/
- Disable unnecessary browser extensions
- Close other development servers

#### Large Bundle Size
```bash
# Analyze bundle
npm run build -- --analyze

# Check for duplicate dependencies
npm ls --depth=0
```

---

## 📈 Performance Monitoring

### Build Size Analysis
```bash
# Build with bundle analyzer
npm run build -- --analyze

# Manual size check
ls -la dist/assets/
```

### Development Performance
```bash
# Monitor memory usage
npm run dev -- --debug

# Check build time
time npm run build
```

---

## 🔄 Script Customization

### Adding Custom Scripts

```json
{
  "scripts": {
    "dev:debug": "vite --debug --mode development",
    "build:analyze": "vite build --mode production --analyze",
    "test:e2e": "cypress run",
    "deploy:staging": "npm run build:dev && deploy-to-staging",
    "clean": "rm -rf dist node_modules/.vite"
  }
}
```

### Environment-Specific Scripts

```json
{
  "scripts": {
    "dev:local": "vite --mode local",
    "dev:staging": "vite --mode staging",
    "build:staging": "vite build --mode staging",
    "build:production": "vite build --mode production"
  }
}
```

This comprehensive script documentation should help developers understand and effectively use all available project scripts for development, testing, and deployment workflows.