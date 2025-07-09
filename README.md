# 🎓 English Learning Platform

A comprehensive, modern web application designed for English language learning with interactive tools, live classes, and progress tracking.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Development](#development)
- [Architecture](#architecture)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

This English learning platform provides students with a complete learning experience including:

- **Live Classes**: Real-time Zoom integration for interactive lessons
- **Interactive Learning Tools**: Quizzes, flashcards, and progress tracking
- **Content Management**: Video recordings, downloadable materials, and resources
- **Progress Tracking**: Comprehensive analytics and achievement systems
- **Mobile-First Design**: Responsive interface optimized for all devices

## ✨ Features

### 🎓 Learning Management
- **Live Classes**: Zoom API integration for scheduled lessons
- **Video Library**: YouTube integration for recorded sessions
- **Interactive Quizzes**: Grammar assessments with explanations
- **Flashcard System**: Vocabulary learning with spaced repetition
- **Calendar View**: Visual schedule management
- **Materials Hub**: File downloads and resource management

### 🔐 User Management
- **Authentication**: Secure login/registration with Supabase Auth
- **User Profiles**: Personalized learning dashboards
- **Progress Tracking**: Achievement badges and learning analytics
- **Subscription Management**: Stripe integration for payments

## 🛠️ Technology Stack

- **React 18.3.1** with TypeScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - High-quality component library
- **Supabase** - Backend-as-a-Service (BaaS)
- **Zoom API** - Video conferencing integration
- **YouTube API** - Video content management
- **Stripe** - Payment processing

## 📋 Prerequisites

- **Node.js** (version 18.0 or higher)
- **npm/yarn/bun** package manager
- **Git** for version control

## 🚀 Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

## ⚙️ Environment Configuration

See [environment-setup.md](environment-setup.md) for comprehensive environment configuration.

Required variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

## 💻 Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

## 🏗️ Architecture

The application follows a modern React architecture with:
- **Component-based design** using Shadcn UI
- **Feature-based organization** for scalability
- **Supabase integration** for backend services
- **Real-time updates** for learning progress

See [architecture.md](architecture.md) for detailed system architecture.

## 🚀 Deployment

### Using Lovable (Recommended)
1. Open your [Lovable Project](https://lovable.dev/projects/46fa09bc-66f5-4c9b-8852-2be54ea05dce)
2. Click "Share" → "Publish"

### Manual Deployment
- **Vercel**: `vercel --prod`
- **Netlify**: Upload `dist/` folder
- **Self-hosting**: Serve `dist/` folder

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and run: `npm run lint`
4. Commit changes: `git commit -m 'Add amazing feature'`
5. Push and open Pull Request

## 📚 Documentation

- [File Structure Guide](filesExplainer.md)
- [Architecture Documentation](architecture.md)
- [Scripts Reference](scripts.md)
- [Structure Recommendations](structure-recommendations.md)
- [Environment Setup](environment-setup.md)

---

**Built with ❤️ for English learners worldwide**
