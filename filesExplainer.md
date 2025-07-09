# 📁 Project File Structure Analysis

This document provides a comprehensive breakdown of the project's file structure, dependencies, and component relationships.

## 🗂️ Root Directory

```
├── 🟢 package.json                    - Project dependencies and scripts configuration
├── 🟢 vite.config.ts                  - Vite bundler configuration with React and path aliases
├── 🟢 tailwind.config.ts              - Tailwind CSS configuration with custom theme and animations
├── 🟢 tsconfig.json                   - TypeScript compiler configuration
├── 🟢 index.html                      - Main HTML entry point for the application
├── 🟡 eslint.config.js                - ESLint linting rules and configuration
├── 🟡 postcss.config.js               - PostCSS configuration for CSS processing
├── 🟡 components.json                 - Shadcn UI components configuration
├── 🟡 .gitignore                      - Git ignore rules for build artifacts and dependencies
├── 🔴 bun.lockb                       - Bun package manager lock file
├── 🔴 README.md                       - Basic project documentation (to be replaced)
```

## 📦 Source Directory (`src/`)

### 🎯 Core Application Files
```
src/
├── 🟢 main.tsx                        - React application entry point, renders App component
├── 🟢 App.tsx                         - Root component with routing, providers, and layout
├── 🟢 index.css                       - Global styles, CSS variables, and Tailwind imports
├── 🔴 App.css                         - Legacy CSS file (empty, can be removed)
├── 🔴 vite-env.d.ts                   - Vite environment type definitions
```

### 🧩 Component Architecture (`src/components/`)

#### 🎨 UI Components (`src/components/ui/`)
```
src/components/ui/
├── 🟢 button.tsx                      - Reusable button component with variants (used extensively)
├── 🟢 card.tsx                        - Card layout component (used in all major features)
├── 🟢 input.tsx                       - Form input component with validation styling
├── 🟢 tabs.tsx                        - Tab navigation component (Learning page)
├── 🟢 toast.tsx                       - Toast notification system
├── 🟢 toaster.tsx                     - Toast provider component
├── 🟢 calendar.tsx                    - Date picker component (Learning calendar)
├── 🟡 dialog.tsx                      - Modal dialog component
├── 🟡 dropdown-menu.tsx               - Dropdown menu component (Navigation)
├── 🟡 form.tsx                        - Form wrapper with validation (Contact, Auth)
├── 🟡 badge.tsx                       - Status indicator component
├── 🟡 progress.tsx                    - Progress bar component (Quiz, Flashcards)
├── 🟡 skeleton.tsx                    - Loading skeleton component
├── 🟡 textarea.tsx                    - Multi-line text input
├── 🟡 label.tsx                       - Form label component
├── 🟡 separator.tsx                   - Visual separator line
├── 🟡 avatar.tsx                      - User avatar display component
├── 🟡 select.tsx                      - Dropdown select component
├── 🟡 switch.tsx                      - Toggle switch component
├── 🟡 checkbox.tsx                    - Checkbox input component
├── 🟡 radio-group.tsx                 - Radio button group component
├── 🟡 slider.tsx                      - Range slider component
├── 🟡 popover.tsx                     - Popover overlay component
├── 🟡 tooltip.tsx                     - Tooltip component
├── 🟡 accordion.tsx                   - Collapsible content component
├── 🟡 alert.tsx                       - Alert message component
├── 🟡 alert-dialog.tsx                - Confirmation dialog component
├── 🟡 aspect-ratio.tsx                - Aspect ratio container
├── 🔴 use-toast.ts                    - Toast hook (re-exports from hooks)
└── ... [other specialized UI components]
```

#### 🏗️ Feature Components

##### 📚 Learning Components (`src/components/learning/`)
```
src/components/learning/
├── 🟢 LearningCalendar.tsx            - Calendar view for scheduled classes
├── 🟢 InteractiveQuiz.tsx             - Grammar quiz with progress tracking
├── 🟢 FlashcardDeck.tsx               - Vocabulary flashcard system
├── 🟢 MaterialsManager.tsx            - File download and management system
├── 🟢 LiveClasses.tsx                 - Zoom meeting integration and display
├── 🟢 RecordingsSection.tsx           - YouTube video recordings display
```

##### 📞 Contact Components (`src/components/contact/`)
```
src/components/contact/
├── 🟡 LiveChat.tsx                    - Live chat support widget
```

##### 📝 Form Components (`src/components/forms/`)
```
src/components/forms/
├── 🟡 ContactForm.tsx                 - Contact page form with validation
```

#### 🧭 Layout Components
```
src/components/
├── 🟢 Navigation.tsx                  - Main navigation header (used on all pages)
├── 🟢 Footer.tsx                      - Site footer (used on all pages)
├── 🟢 Hero.tsx                        - Homepage hero section
├── 🟢 Features.tsx                    - Feature showcase section
├── 🟢 Testimonials.tsx                - Customer testimonials section
├── 🟢 Pricing.tsx                     - Pricing plans component
├── 🟡 PaymentButton.tsx               - Stripe payment integration
├── 🟡 ProtectedRoute.tsx              - Authentication route guard
```

### 📄 Pages (`src/pages/`)
```
src/pages/
├── 🟢 Index.tsx                       - Homepage with hero, features, testimonials
├── 🟢 Learning.tsx                    - Main learning dashboard (refactored, 85 lines)
├── 🟢 About.tsx                       - Company information page
├── 🟢 Contact.tsx                     - Contact form and information
├── 🟡 Dashboard.tsx                   - User dashboard (protected route)
├── 🟡 Login.tsx                       - User authentication page
├── 🟡 Register.tsx                    - User registration page
├── 🟡 PricingPage.tsx                 - Standalone pricing page
├── 🟡 Instructors.tsx                 - Teacher profiles page
├── 🟡 FAQ.tsx                         - Frequently asked questions
├── 🟡 LevelTest.tsx                   - English level assessment
├── 🟡 PaymentSuccess.tsx              - Payment confirmation page
├── 🟡 PaymentFailed.tsx               - Payment failure page
├── 🔴 NotFound.tsx                    - 404 error page
```

### 🔧 Utilities & Hooks (`src/`)

#### 🪝 Custom Hooks (`src/hooks/`)
```
src/hooks/
├── 🟢 use-toast.ts                    - Toast notification hook (used throughout app)
├── 🟡 use-mobile.tsx                  - Mobile device detection hook
```

#### 🛠️ Utilities (`src/lib/`)
```
src/lib/
├── 🟢 utils.ts                        - Common utility functions (cn for class merging)
```

#### 🔌 Integrations (`src/integrations/`)
```
src/integrations/supabase/
├── 🟢 client.ts                       - Supabase client configuration
├── 🔴 types.ts                        - Auto-generated database types (read-only)
```

#### 🔐 Context Providers (`src/contexts/`)
```
src/contexts/
├── 🟡 AuthContext.tsx                 - Authentication state management
```

## 🖥️ Backend Services (`supabase/`)

### ⚡ Edge Functions (`supabase/functions/`)
```
supabase/functions/
├── 🟢 zoom-meetings/index.ts          - Zoom API integration for live classes
├── 🟢 youtube-videos/index.ts         - YouTube API for recorded lessons
├── 🟡 contact-inquiries/index.ts      - Contact form submission handler
├── 🟡 send-email/index.ts             - Email service integration
├── 🟡 create-checkout/index.ts        - Stripe payment processing
├── 🟡 check-subscription/index.ts     - Subscription status verification
```

### ⚙️ Configuration
```
supabase/
├── 🟢 config.toml                     - Supabase project configuration
```

## 📊 Component Dependency Analysis

### 🔄 High-Impact Components (🟢)
- **App.tsx** → Routes all pages, provides global context
- **Navigation.tsx** → Used on every page, critical for UX
- **Learning.tsx** → Main application feature, integrates 6 learning tools
- **Button.tsx** → Used in 15+ components across the application
- **Card.tsx** → Primary layout component for content sections

### 🔗 Medium-Impact Components (🟡)
- **Form components** → Used in authentication and contact flows
- **Authentication system** → Login, Register, ProtectedRoute, AuthContext
- **Payment system** → PaymentButton, checkout functions, success/failure pages

### ⚪ Low-Impact Components (🔴)
- **Error pages** → NotFound, PaymentFailed (rarely accessed)
- **Legacy files** → App.css, vite-env.d.ts (can be cleaned up)
- **Configuration files** → Lock files, auto-generated types

## 🎯 Architecture Patterns

### 📐 Design System
- **Centralized theming** via `index.css` and `tailwind.config.ts`
- **Component library** using Shadcn UI with consistent variants
- **Utility-first** CSS with semantic color tokens

### 🏗️ Component Architecture
- **Atomic design** with UI components as building blocks
- **Feature-based** organization for complex functionality
- **Single responsibility** principle with small, focused components

### 📡 State Management
- **React Context** for authentication state
- **Local state** for component-specific data
- **Server state** managed via Supabase client

### 🔄 Data Flow
- **Supabase integration** for database and authentication
- **Edge functions** for external API integrations (Zoom, YouTube)
- **Real-time updates** for learning progress and notifications