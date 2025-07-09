# 🌍 Environment Configuration Guide

This document provides comprehensive guidance for setting up environment variables and configuration for different deployment environments.

## 📋 Environment Overview

The application supports multiple environments with different configurations:

- **Development** - Local development with debugging enabled
- **Staging** - Pre-production testing environment  
- **Production** - Live application environment
- **Testing** - Automated testing environment

## 🔧 Environment Variables

### 📁 File Structure

```
project-root/
├── .env.example          # Template with all required variables
├── .env.local           # Local development (git-ignored)
├── .env.staging         # Staging environment (git-ignored)
├── .env.production      # Production environment (git-ignored)
└── .env.test           # Testing environment (git-ignored)
```

### 🔑 Required Variables

#### Core Application Variables

```env
# Application Configuration
NODE_ENV=development|staging|production|test
VITE_APP_NAME="English Learning Platform"
VITE_APP_VERSION="1.0.0"
VITE_APP_URL=http://localhost:8080

# Supabase Configuration (Required)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Supabase Backend Variables (For Edge Functions)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret
```

#### Third-Party API Keys (Optional)

```env
# Zoom API (For Live Classes)
ZOOM_API_KEY=your_zoom_api_key
ZOOM_API_SECRET=your_zoom_api_secret
ZOOM_WEBHOOK_SECRET_TOKEN=your_webhook_secret

# YouTube API (For Video Content)
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CHANNEL_ID=your_channel_id

# Stripe Payment Processing
STRIPE_PUBLISHABLE_KEY=pk_test_or_live_key
STRIPE_SECRET_KEY=sk_test_or_live_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email Service (Resend)
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Analytics (Optional)
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
VITE_POSTHOG_KEY=your_posthog_project_key
```

#### Security & Monitoring

```env
# Security
VITE_APP_DOMAIN=yourdomain.com
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Monitoring & Logging
SENTRY_DSN=https://your-sentry-dsn
LOG_LEVEL=info|debug|warn|error
```

---

## 🏗️ Environment-Specific Configurations

### 🔧 Development Environment

**File**: `.env.local`
```env
NODE_ENV=development
VITE_APP_URL=http://localhost:8080
VITE_APP_NAME="English Learning Platform (Dev)"

# Supabase Local/Development
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=your_local_anon_key

# Development API Keys (Test/Sandbox)
ZOOM_API_KEY=test_zoom_key
ZOOM_API_SECRET=test_zoom_secret
YOUTUBE_API_KEY=dev_youtube_key
STRIPE_PUBLISHABLE_KEY=pk_test_development_key
STRIPE_SECRET_KEY=sk_test_development_key

# Development Settings
LOG_LEVEL=debug
VITE_DEBUG_MODE=true
VITE_MOCK_API=false
```

**Characteristics**:
- Local Supabase instance or development project
- Test/sandbox API keys
- Debug logging enabled
- Mock data options
- Hot reload enabled

### 🧪 Staging Environment

**File**: `.env.staging`
```env
NODE_ENV=staging
VITE_APP_URL=https://staging.yourdomain.com
VITE_APP_NAME="English Learning Platform (Staging)"

# Supabase Staging Project
VITE_SUPABASE_URL=https://staging-project.supabase.co
VITE_SUPABASE_ANON_KEY=staging_anon_key

# Staging API Keys (Test/Sandbox)
ZOOM_API_KEY=staging_zoom_key
ZOOM_API_SECRET=staging_zoom_secret
YOUTUBE_API_KEY=staging_youtube_key
STRIPE_PUBLISHABLE_KEY=pk_test_staging_key
STRIPE_SECRET_KEY=sk_test_staging_key

# Staging Settings
LOG_LEVEL=info
VITE_DEBUG_MODE=false
VITE_ANALYTICS_ENABLED=false
```

**Characteristics**:
- Separate Supabase staging project
- Test API keys but production-like setup
- Realistic data and workflows
- Performance monitoring
- Client testing environment

### 🚀 Production Environment

**File**: `.env.production`
```env
NODE_ENV=production
VITE_APP_URL=https://yourdomain.com
VITE_APP_NAME="English Learning Platform"

# Supabase Production Project
VITE_SUPABASE_URL=https://production-project.supabase.co
VITE_SUPABASE_ANON_KEY=production_anon_key

# Production API Keys (Live)
ZOOM_API_KEY=live_zoom_key
ZOOM_API_SECRET=live_zoom_secret
YOUTUBE_API_KEY=live_youtube_key
STRIPE_PUBLISHABLE_KEY=pk_live_production_key
STRIPE_SECRET_KEY=sk_live_production_key

# Production Settings
LOG_LEVEL=warn
VITE_DEBUG_MODE=false
VITE_ANALYTICS_ENABLED=true
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Security
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
SENTRY_DSN=https://your-production-sentry-dsn
```

**Characteristics**:
- Live API keys and production services
- Error tracking and monitoring
- Analytics enabled
- Optimized performance
- Security headers and CORS

### 🧪 Testing Environment

**File**: `.env.test`
```env
NODE_ENV=test
VITE_APP_URL=http://localhost:3000

# Test Database
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=test_anon_key

# Mock/Test Settings
VITE_MOCK_API=true
LOG_LEVEL=error
SKIP_ENV_VALIDATION=true

# Disable External Services in Tests
ZOOM_API_KEY=mock_zoom_key
YOUTUBE_API_KEY=mock_youtube_key
STRIPE_PUBLISHABLE_KEY=pk_test_mock_key
```

**Characteristics**:
- Mock external services
- In-memory or test database
- Fast execution
- Isolated from real services
- Minimal logging

---

## 🔐 Security Best Practices

### 🛡️ Variable Security Levels

#### Public Variables (VITE_ prefix)
- **Safe for client-side**: Exposed in browser
- **Examples**: App name, public API endpoints, Supabase URL
- **Convention**: Use `VITE_` prefix

```env
VITE_APP_NAME="English Learning Platform"
VITE_SUPABASE_URL=https://project.supabase.co
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

#### Private Variables (Server-side only)
- **Server environment only**: Never exposed to client
- **Examples**: API secrets, database passwords, private keys
- **Location**: Supabase secrets, server environment

```env
SUPABASE_SERVICE_ROLE_KEY=secret_key
ZOOM_API_SECRET=secret_value
STRIPE_SECRET_KEY=sk_live_secret
```

### 🔒 API Key Security

#### Development Keys
```env
# Use test/sandbox keys for development
STRIPE_PUBLISHABLE_KEY=pk_test_...
ZOOM_API_KEY=development_key
```

#### Production Keys
```env
# Use live keys only in production
STRIPE_PUBLISHABLE_KEY=pk_live_...
ZOOM_API_KEY=production_key
```

#### Key Rotation Policy
- **Development**: Rotate monthly
- **Staging**: Rotate quarterly  
- **Production**: Rotate bi-annually or when compromised
- **Monitor**: Set up alerts for unusual API usage

---

## 🛠️ Setup Instructions

### 1. Initial Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit with your values
nano .env.local

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Supabase Configuration

#### Create Supabase Project
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create new project
3. Get URL and anon key from Settings → API
4. Add to environment variables

#### Configure Database
```sql
-- Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for user data access
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);
```

#### Set up Edge Functions
```bash
# Deploy edge functions
npx supabase functions deploy zoom-meetings
npx supabase functions deploy youtube-videos
npx supabase functions deploy contact-inquiries
```

### 3. External Service Setup

#### Zoom API Setup
1. Create Zoom App at [Zoom Marketplace](https://marketplace.zoom.us)
2. Choose "Server-to-Server OAuth"
3. Get API Key and Secret
4. Add to Supabase secrets:

```bash
supabase secrets set ZOOM_API_KEY=your_key
supabase secrets set ZOOM_API_SECRET=your_secret
```

#### YouTube API Setup
1. Create project in [Google Cloud Console](https://console.cloud.google.com)
2. Enable YouTube Data API v3
3. Create API key
4. Add to Supabase secrets:

```bash
supabase secrets set YOUTUBE_API_KEY=your_key
```

#### Stripe Setup
1. Create account at [Stripe](https://stripe.com)
2. Get publishable and secret keys
3. Set up webhooks for subscription events
4. Add keys to environment

---

## 🔍 Validation & Troubleshooting

### Environment Validation Script

```typescript
// scripts/validate-env.ts
const requiredVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'NODE_ENV'
];

const optionalVars = [
  'ZOOM_API_KEY',
  'YOUTUBE_API_KEY', 
  'STRIPE_PUBLISHABLE_KEY'
];

function validateEnvironment() {
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing);
    process.exit(1);
  }
  
  console.log('✅ Environment validation passed');
}

validateEnvironment();
```

### Common Issues & Solutions

#### Issue: Supabase Connection Fails
```bash
# Check URL and key format
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY

# Test connection
curl -H "apikey: $VITE_SUPABASE_ANON_KEY" "$VITE_SUPABASE_URL/rest/v1/"
```

#### Issue: CORS Errors
```typescript
// Check Supabase CORS settings
// Add your domain to Supabase Auth settings
// Update CORS_ORIGINS environment variable
```

#### Issue: API Rate Limits
```env
# Monitor API usage
# Implement request caching
# Add rate limiting to edge functions
API_RATE_LIMIT=100
API_RATE_WINDOW=3600
```

### Environment Testing

```bash
# Test different environments
npm run dev              # Development
npm run build:staging    # Staging build
npm run build            # Production build

# Validate environment variables
npm run validate-env

# Test API connections
npm run test:integration
```

---

## 📚 Environment Documentation

### Team Setup Guide

1. **New Developer Onboarding**
   ```bash
   # Clone repository
   git clone <repo-url>
   
   # Copy environment template
   cp .env.example .env.local
   
   # Get development keys from team lead
   # Add keys to .env.local
   
   # Install and start
   npm install
   npm run dev
   ```

2. **Development Keys Access**
   - Store development keys in secure team vault
   - Use separate keys for each developer when needed
   - Document key purposes and limitations

3. **Production Deployment**
   - Production keys managed by DevOps/Senior developers
   - Environment variables set in deployment platform
   - Regular key rotation schedule

### Deployment Checklist

- [ ] All required environment variables set
- [ ] API keys are production versions
- [ ] CORS settings configured correctly
- [ ] Monitoring and logging enabled
- [ ] Security headers configured
- [ ] SSL certificates valid
- [ ] Database connections tested
- [ ] Edge functions deployed
- [ ] Webhook endpoints configured

This comprehensive environment setup ensures secure, scalable, and maintainable deployment across all stages of the application lifecycle.