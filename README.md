# Student Marketplace Web UI

A modern, campus-focused web interface for students to buy and sell items locally.

## About
Student Marketplace connects university students to trade textbooks, dorm supplies, graduation regalia, electronics, furniture, subscriptions, and more. The platform facilitates discovery and initial contact, with all transactions happening offline for safety and convenience.

## Features
- Browse student sellers and their profiles
- View available items with detailed information
- Read and write seller reviews
- List items for sale with categories
- Dark and light mode support
- Mobile-responsive design
- Clean, minimal black and white aesthetic

## Tech Stack
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Static site generation for Cloud Storage

## Getting Started

### Development
```bash
npm install
npm run dev
```

Open http://localhost:3000

### Build for Production
```bash
npm run build
```

Static files generated in `out/` directory.

### Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=https://composite-microservice-471529071641.us-east1.run.app
```

## Deployment
Deploy to Google Cloud Storage for static hosting.

## How It Works
1. Students browse available items by category
2. Interested buyers view seller profiles and contact info
3. Buyers and sellers connect via phone to arrange offline transaction
4. After transaction, buyers can leave reviews
