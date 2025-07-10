# KruEnglish Learning Platform

## Overview

KruEnglish is a comprehensive online English learning platform that provides live Zoom classes with native English teachers, interactive learning materials, and student management features. The application has been successfully migrated from Lovable to Replit with a modern full-stack architecture using React, Express, and PostgreSQL.

## Recent Changes (January 2025)

- ✓ Successfully migrated from Lovable to Replit environment
- ✓ Replaced Supabase with PostgreSQL database using Drizzle ORM
- ✓ Migrated from React Router to wouter for navigation
- ✓ Converted all Supabase Edge Functions to Express API routes
- ✓ Updated authentication system to use server-side endpoints
- ✓ Removed all external dependencies on Supabase
- ✓ Database schema pushed successfully to PostgreSQL

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Context for authentication, TanStack Query for server state
- **Routing**: React Router v6 for client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API endpoints
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Database**: Neon serverless PostgreSQL
- **Authentication**: Server-side API endpoints (ready for integration)
- **Payment Processing**: Stripe integration (ready for configuration)

## Key Components

### Authentication System
- Server-side authentication endpoints (ready for implementation)
- Protected routes with role-based access control
- User context provider for global auth state
- Mock authentication for development (ready for real integration)

### Database Schema
- **Users table**: Basic user information and credentials
- **Subscription tracking**: Managed through Supabase and Stripe integration
- **Contact inquiries**: Form submissions and user support requests

### Payment & Subscription System
- Stripe Checkout integration for payment processing
- Multiple subscription tiers (General English, CEFR Platinum, Combo packages)
- Webhook handling for subscription status updates
- Customer portal for subscription management

### Learning Management
- **Live Classes**: Zoom API integration for class scheduling and joining
- **Recordings**: YouTube API integration for accessing recorded sessions
- **Materials**: File management system for learning resources
- **Interactive Features**: Quizzes, flashcards, and progress tracking

### External Integrations
- **Zoom API**: Meeting creation, listing, and management
- **YouTube API**: Video content retrieval and embedding
- **Supabase**: Authentication, database, and edge functions
- **Stripe**: Payment processing and subscription management

## Data Flow

1. **User Registration/Login**: Supabase handles authentication and creates user sessions
2. **Subscription Purchase**: Stripe Checkout processes payments and updates subscription status
3. **Class Access**: Authenticated users can join live Zoom meetings based on subscription tier
4. **Content Delivery**: YouTube recordings and downloadable materials are served to subscribed users
5. **Progress Tracking**: User interactions with quizzes and flashcards are stored locally

## External Dependencies

### Core Services
- **Supabase**: Backend-as-a-Service for auth, database, and serverless functions
- **Neon**: Serverless PostgreSQL database hosting
- **Stripe**: Payment processing and subscription billing
- **Zoom**: Video conferencing API for live classes
- **YouTube**: Video hosting and API for recorded content

### Development Tools
- **Vite**: Frontend build tool and development server
- **Drizzle Kit**: Database migration and schema management
- **TypeScript**: Type safety across the entire stack
- **Tailwind CSS**: Utility-first CSS framework

## Deployment Strategy

### Frontend Deployment
- Static site generation optimized for production
- Assets served from CDN for optimal performance
- Environment-specific configuration for API endpoints

### Backend Deployment
- Express server bundled with esbuild for production
- Environment variables for external service credentials
- Database migrations handled through Drizzle Kit

### Database Management
- PostgreSQL schema defined in shared/schema.ts
- Migrations stored in /migrations directory
- Connection pooling through Neon serverless

### Environment Configuration
- Development: Local Vite dev server with hot reload
- Production: Bundled Express server serving static frontend
- Database: Neon PostgreSQL with connection string from environment

The architecture prioritizes scalability, maintainability, and user experience while integrating multiple external services to provide a comprehensive English learning platform.