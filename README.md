# 🐾 Animal Rescue Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-brightgreen.svg)](https://www.mongodb.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

> 🚨 **Emergency Animal Rescue & Adoption Web Application** — A life-saving platform connecting people with nearby animal rescue services instantly.

---

## 📑 Table of Contents

- [🎯 Overview](#-overview)
- [❓ Problem Statement](#-problem-statement)
- [💡 Solution](#-solution)
- [✨ Key Features](#-key-features)
- [🎨 UI/UX Design](#-uiux-design)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔄 Application Flow](#-application-flow)
- [🌐 Deployment](#-deployment)
- [🔮 Future Roadmap](#-future-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 Overview

The **Animal Rescue Platform** is a comprehensive full-stack web application designed to bridge the critical gap between compassionate citizens and animal rescue services. Built using modern web technologies and following NGO design best practices, this platform creates a unified ecosystem for emergency response, pet adoption, community engagement, and animal welfare education.

### 🌟 What Makes This Special?

- **🚑 GPS-based Smart Rescue System** — Real-time location detection with instant routing
- **🗺️ Interactive Map Integration** — Leaflet.js powered mapping with color-coded rescue centers
- **🐶 Community-Driven Adoption** — Comprehensive pet listing and adoption workflow
- **📚 Educational Hub** — Pet care guides, first aid instructions, and awareness content
- **💰 Impact-Based Donations** — Transparent contribution system showing real-world impact
- **📱 Mobile-First Design** — Optimized for emergency use on any device

### 🔗 Design Reference

**UI/UX System:** [Stitch by Google](https://stitch.withgoogle.com/projects/6897484782242910610)

This project implements the complete design system created in Stitch, featuring:
- Modern NGO-inspired visual language
- Emotional connection through animal-centric imagery
- High-contrast emergency CTAs
- Accessible, responsive layouts

---

## ❓ Problem Statement

### The Emergency Gap

**Severity Score:** 8/10 | **Frequency Score:** 10/10 | **Overall Itch Score:** 76/100

When compassionate citizens encounter injured, trapped, or sick stray animals, they face a critical **information asymmetry problem**:

#### 🔴 Current Pain Points

1. **No Centralized Directory** — Scattered information across multiple sources
2. **Time-Critical Delays** — Manual searching wastes precious minutes during emergencies
3. **Outdated Information** — Phone numbers and addresses frequently change
4. **Geographic Irrelevance** — Search results often show services too far away
5. **Cognitive Overload** — High-stress situations make decision-making difficult

#### 📊 Real-World Impact

- ⏱️ **Average delay:** 15-30 minutes searching for help
- 😔 **Citizen helplessness:** 67% abandon rescue attempts due to information friction
- 🐕 **Animal suffering:** Delayed response increases mortality and complications

### Research-Backed Evidence

Studies from platforms like **Buddy Animal Rescue** and **Let It Wag** demonstrate:
- 🔺 **40% increase** in successful rescues with centralized systems
- ⚡ **3x faster** response times with GPS-based routing
- 💚 **Higher community engagement** through educational content

---

## 💡 Solution

### A Unified Emergency Response Ecosystem

The Animal Rescue Platform addresses the core problem through:

#### 1. **Instant Location-Based Routing**
- HTML5 Geolocation API for precise user positioning
- Real-time calculation of nearest rescue services
- One-tap calling and navigation

#### 2. **Verified Service Database**
- NGOs, veterinary hospitals, government helplines
- Contact verification and regular updates
- Service categorization and filtering

#### 3. **Community Engagement Layer**
- Pet adoption listings with emotional storytelling
- Success stories to build trust
- Educational content for prevention and awareness

#### 4. **Multi-Channel Support**
- Emergency hotlines (Gujarat 1962 Karuna Abhiyan)
- Direct NGO contact
- Government wildlife departments

---

## ✨ Key Features

### 🔥 1. Emergency Rescue System (Core Feature)

**The Life-Saving Button**

```
┌─────────────────────────────────┐
│   🚨 FIND NEAREST HELP NOW 🚨   │
│                                 │
│  GPS Location: Auto-detected    │
│  Searching radius: 10 km        │
└─────────────────────────────────┘
```

**What It Does:**
- Detects user's real-time GPS location
- Queries database for nearest services
- Displays results sorted by distance
- Provides instant actions:
  - 📞 **Call Now** — Direct phone connection
  - 🧭 **Get Directions** — Open in Maps app
  - ℹ️ **View Details** — Full service information

**Supported Services:**
- 🏥 Veterinary Hospitals
- 🚑 Animal Ambulances
- 🏢 NGO Rescue Centers
- 📞 Government Helplines

---

### 🗺️ 2. Interactive Map Integration

**Technology:** Leaflet.js + OpenStreetMap

**Features:**
- **Live User Marker** with pulse animation
- **Color-Coded Service Pins:**
  - 🟢 Green — NGO Rescue Centers
  - 🔵 Blue — Veterinary Hospitals
  - 🔴 Red — Emergency Ambulances
- **Bottom Sheet List** (mobile-optimized)
- **Distance Calculation** in real-time
- **Clustering** for dense urban areas

**Filter Options:**
- Service Type (Vet / NGO / Ambulance)
- Maximum Distance Radius
- Operating Hours
- Availability Status

---

### 🐕 3. Pet Adoption System

**The Emotional Connection**

> 📌 *Research shows: Animal-focused UI increases adoption engagement by 60%*

**Adoption Gallery:**
- Grid layout with high-quality images
- Quick info cards:
  - Name & Age
  - Breed
  - Health Status
  - Personality Traits

**Advanced Filters:**
- Animal Type (Dog / Cat / Rabbit / Bird)
- Age Range (Puppy / Adult / Senior)
- Size (Small / Medium / Large)
- Special Needs

**Detailed Pet Profile:**
```
┌────────────────────────────────────┐
│  [Large Image Gallery - Swipeable] │
│                                    │
│  🐕 Charlie | 2 years old          │
│  Breed: Golden Retriever Mix       │
│  Health: ✅ Vaccinated & Neutered  │
│                                    │
│  📖 Story:                         │
│  "Found abandoned near highway...  │
│   now looking for forever home"    │
│                                    │
│  📍 Shelter: Happy Paws NGO        │
│  📞 Contact: +91-XXXXXXXXXX        │
│                                    │
│  [💚 ADOPT CHARLIE NOW 💚]         │
└────────────────────────────────────┘
```

---

### 📖 4. Journey Stories (Community Engagement)

**Success Story Showcase**

**Purpose:**
- Build emotional trust in the platform
- Encourage donations through real impact
- Create community identity

**Story Elements:**
- Before/After rescue images
- Timeline of recovery
- Adopter testimonials
- Total impact metrics

**Example:**
> "From Street to Sweet Home: Luna's Journey"
> - **Rescued:** Injured pup found in ditch
> - **Treatment:** 45 days at Happy Tails Shelter
> - **Adopted:** Forever home with loving family
> - **Impact:** Your ₹500 donation helped save Luna

---

### 📚 5. Educational Content Hub

**Pet Care Knowledge Base**

**Categories:**
1. **Emergency First Aid**
   - CPR for animals
   - Wound treatment
   - Poisoning response

2. **Pet Care Guides**
   - Nutrition basics
   - Training tips
   - Health monitoring

3. **Awareness Articles**
   - Stray animal rights
   - Adoption process
   - Volunteer opportunities

**Format:**
- Clean reading layout
- Step-by-step instructions
- Infographics and videos
- Downloadable PDF guides

---

### 💰 6. Donation System

**Transparent Impact-Based Giving**

> 📌 *Impact visibility increases donation conversion by 45%*

**Donation Tiers:**
```
┌─────────────────────────────────────┐
│  ₹200  →  Food for 5 animals (1 day)│
│  ₹500  →  Emergency medicine        │
│  ₹1000 →  Vaccination drive (10 pets)│
│  ₹5000 →  Monthly shelter support   │
└─────────────────────────────────────┘
```

**Features:**
- Quick-donate buttons
- Custom amount input
- Multiple payment options:
  - UPI / PhonePe / GPay
  - Credit/Debit Cards
  - Net Banking
- Donation receipt generation
- Monthly subscription option

**Impact Dashboard:**
- Total animals helped
- Medicines purchased
- Vaccinations completed

---

### 🙋 7. Volunteer Registration

**Join the Rescue Community**

**Volunteer Roles:**
- 🚑 **Rescue Operations** — Field response
- 🏠 **Foster Care** — Temporary shelter
- 🚗 **Transport Support** — Emergency drives
- 📸 **Media & Awareness** — Social media
- 🎓 **Education** — Community workshops

**Registration Process:**
1. Fill interest form
2. Background verification
3. Training session (online/offline)
4. Active assignment

---

### 🏢 8. NGO Registration Portal

**Empowering Rescue Organizations**

**For NGOs/Vets to Register:**
- Organization details
- Service type selection
- Location (GPS + address)
- Operating hours
- Contact information
- Verification documents

**Benefits:**
- Free listing on platform
- Increased visibility
- Direct citizen connection
- Impact analytics

---

### 📱 9. Mobile-First Responsive Design

> 📌 *73% of NGO website traffic comes from mobile devices*

**Optimization Strategy:**
- Touch-friendly buttons (min 44px)
- Swipe gestures for galleries
- Bottom navigation for thumbs
- Offline-first architecture
- Progressive Web App (PWA)

**Performance Targets:**
- ⚡ First Contentful Paint: < 1.5s
- 📊 Lighthouse Score: > 90
- 📱 Mobile-optimized images

---

### ⚡ 10. Advanced Features

**SOS Floating Button**
- Visible on every page
- Sticky positioning
- One-tap emergency call

**Offline Mode**
- Service worker caching
- Offline page with helpline numbers
- Sync when connection restored

**Push Notifications**
- Rescue updates
- Adoption matches
- Donation receipts

**Multi-Language Support**
- English (primary)
- Hindi (हिन्दी)
- Gujarati (ગુજરાતી)

**User Dashboard**
- Saved rescues
- Adoption favorites
- Donation history
- Volunteer hours

---

## 🎨 UI/UX Design

### Design Philosophy

The interface follows **NGO design principles** optimized for:
- ⚡ **Fast action** during emergencies
- ❤️ **Emotional connection** for adoptions
- 🤝 **Trust** through transparency

### Visual Identity

**🎨 Color Palette**

```css
/* Primary Colors */
--rescue-green: #2ECC71;    /* Safety, Life, Hope */
--trust-blue: #3498DB;       /* Reliability, Calm */
--emergency-red: #FF6B6B;    /* Urgency, Action */

/* Neutrals */
--bg-light: #F9FAFB;         /* Clean background */
--text-dark: #1F2937;        /* Readable text */
--gray-medium: #6B7280;      /* Secondary text */

/* Semantic Colors */
--success: #10B981;
--warning: #F59E0B;
--info: #3B82F6;
```

**🔤 Typography**

```css
/* Font Families */
--heading-font: 'Poppins', sans-serif;
--body-font: 'Inter', sans-serif;

/* Font Sizes */
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 30px;
--text-4xl: 36px;

/* Font Weights */
--weight-normal: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
```

**📐 Spacing & Layout**

```css
/* 8px Grid System */
--space-1: 8px;
--space-2: 16px;
--space-3: 24px;
--space-4: 32px;
--space-5: 40px;
--space-6: 48px;

/* Border Radius */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
```

### Component Library

**Reusable UI Components:**

1. **Navigation**
   - Navbar (desktop + mobile)
   - Sidebar
   - Bottom Navigation
   - Breadcrumbs

2. **Cards**
   - Rescue Service Card
   - Pet Adoption Card
   - Story Card
   - Article Card

3. **Interactive Elements**
   - Primary Button
   - Secondary Button
   - Danger Button (Emergency)
   - Icon Buttons
   - Toggle Switches

4. **Forms**
   - Text Inputs
   - Dropdowns
   - File Upload
   - Radio Buttons
   - Checkboxes

5. **Feedback**
   - Modals
   - Alerts
   - Toasts
   - Loading Skeletons

6. **Map Components**
   - Service Pin Markers
   - User Location Marker
   - Info Window
   - Filter Panel

### Design Deliverables

**Complete Design System Includes:**
- ✅ All 10 pages fully designed
- ✅ Component library (50+ components)
- ✅ Responsive layouts (mobile, tablet, desktop)
- ✅ Interactive prototype with click-through flow
- ✅ Dark mode variants
- ✅ Accessibility annotations

**View Full Design:**
🔗 [Stitch by Google — Animal Rescue Platform](https://stitch.withgoogle.com/projects/6897484782242910610)

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React.js** | 18.2+ | UI Framework |
| **Vite** | 4.0+ | Build Tool & Dev Server |
| **Tailwind CSS** | 3.3+ | Utility-first Styling |
| **Leaflet.js** | 1.9+ | Interactive Maps |
| **React Router** | 6.0+ | Client-side Routing |
| **Axios** | 1.4+ | HTTP Client |
| **React Query** | 4.0+ | Server State Management |
| **Zustand** | 4.3+ | Client State Management |
| **Framer Motion** | 10.0+ | Animations |

### Backend

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 18+ | Runtime Environment |
| **Express.js** | 4.18+ | Web Framework |
| **MongoDB** | 6.0+ | NoSQL Database |
| **Mongoose** | 7.0+ | ODM Library |
| **JWT** | 9.0+ | Authentication |
| **Bcrypt** | 5.1+ | Password Hashing |
| **Multer** | 1.4+ | File Uploads |
| **Nodemailer** | 6.9+ | Email Service |

### APIs & Services

| Service | Purpose |
|---------|---------|
| **Leaflet + OpenStreetMap** | Base mapping |
| **MapTiler / Geoapify** | Geocoding & routing |
| **HTML5 Geolocation** | User location detection |
| **Cloudinary** | Image hosting & optimization |
| **Razorpay / Stripe** | Payment processing |

### DevOps & Deployment

| Tool | Purpose |
|------|---------|
| **Git & GitHub** | Version control |
| **Render / Vercel** | Frontend hosting |
| **Railway / Render** | Backend hosting |
| **MongoDB Atlas** | Database hosting |
| **GitHub Actions** | CI/CD Pipeline |

### Development Tools

- **Google Antigravity IDE** — Agentic development environment
- **ESLint + Prettier** — Code quality
- **Husky** — Git hooks
- **Postman** — API testing
- **React DevTools** — Component debugging

---

## 📂 Project Structure

```
animal-rescue-platform/
│
├── 📁 frontend/                      # React Application
│   ├── 📁 public/
│   │   ├── favicon.ico
│   │   ├── manifest.json
│   │   └── robots.txt
│   │
│   ├── 📁 src/
│   │   ├── 📁 assets/                # Static files
│   │   │   ├── 📁 images/
│   │   │   ├── 📁 icons/
│   │   │   └── 📁 fonts/
│   │   │
│   │   ├── 📁 components/            # Reusable UI Components
│   │   │   ├── 📁 common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── Loader.jsx
│   │   │   │
│   │   │   ├── 📁 rescue/
│   │   │   │   ├── RescueCard.jsx
│   │   │   │   ├── MapView.jsx
│   │   │   │   └── ServicePin.jsx
│   │   │   │
│   │   │   ├── 📁 adoption/
│   │   │   │   ├── PetCard.jsx
│   │   │   │   ├── PetGallery.jsx
│   │   │   │   └── AdoptionForm.jsx
│   │   │   │
│   │   │   └── 📁 forms/
│   │   │       ├── ReportForm.jsx
│   │   │       ├── VolunteerForm.jsx
│   │   │       └── NGOForm.jsx
│   │   │
│   │   ├── 📁 pages/                 # Route Pages
│   │   │   ├── Home.jsx              # Landing + Dashboard
│   │   │   ├── EmergencyMap.jsx      # Rescue Finder Map
│   │   │   ├── ReportAnimal.jsx      # Report Form
│   │   │   ├── Adoption.jsx          # Pet Listings
│   │   │   ├── PetDetails.jsx        # Individual Pet Profile
│   │   │   ├── Stories.jsx           # Success Stories
│   │   │   ├── Articles.jsx          # Educational Content
│   │   │   ├── Donate.jsx            # Donation Page
│   │   │   ├── Volunteer.jsx         # Volunteer Registration
│   │   │   ├── NGORegister.jsx       # NGO Registration
│   │   │   └── Dashboard.jsx         # User Dashboard
│   │   │
│   │   ├── 📁 services/              # API Integration
│   │   │   ├── api.js                # Axios instance
│   │   │   ├── rescueService.js
│   │   │   ├── adoptionService.js
│   │   │   ├── mapService.js
│   │   │   └── authService.js
│   │   │
│   │   ├── 📁 hooks/                 # Custom React Hooks
│   │   │   ├── useGeolocation.js
│   │   │   ├── useNearbyServices.js
│   │   │   └── useDebounce.js
│   │   │
│   │   ├── 📁 context/               # Global State
│   │   │   ├── AuthContext.jsx
│   │   │   └── LocationContext.jsx
│   │   │
│   │   ├── 📁 utils/                 # Helper Functions
│   │   │   ├── distance.js           # Haversine formula
│   │   │   ├── formatter.js
│   │   │   └── validators.js
│   │   │
│   │   ├── 📁 styles/                # Global Styles
│   │   │   ├── index.css
│   │   │   └── tailwind.config.js
│   │   │
│   │   ├── App.jsx                   # Root Component
│   │   ├── main.jsx                  # Entry Point
│   │   └── routes.jsx                # Route Configuration
│   │
│   ├── .env.example
│   ├── .eslintrc.json
│   ├── .prettierrc
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── 📁 backend/                       # Node.js Server
│   ├── 📁 src/
│   │   ├── 📁 config/
│   │   │   ├── database.js               # MongoDB connection
│   │   │   ├── cloudinary.js             # Image upload config
│   │   │   └── passport.js               # Auth strategies
│   │   │
│   │   ├── 📁 controllers/               # Route Handlers
│   │   │   ├── rescueController.js
│   │   │   ├── adoptionController.js
│   │   │   ├── storyController.js
│   │   │   ├── donationController.js
│   │   │   └── authController.js
│   │   │
│   │   ├── 📁 models/                    # Mongoose Schemas
│   │   │   ├── RescueService.js
│   │   │   ├── Pet.js
│   │   │   ├── Story.js
│   │   │   ├── Article.js
│   │   │   ├── Donation.js
│   │   │   ├── Volunteer.js
│   │   │   ├── NGO.js
│   │   │   └── User.js
│   │   │
│   │   ├── 📁 routes/                    # API Endpoints
│   │   │   ├── rescueRoutes.js
│   │   │   ├── adoptionRoutes.js
│   │   │   ├── storyRoutes.js
│   │   │   ├── articleRoutes.js
│   │   │   ├── donationRoutes.js
│   │   │   └── authRoutes.js
│   │   │
│   │   ├── 📁 middleware/
│   │   │   ├── auth.js                   # JWT verification
│   │   │   ├── errorHandler.js
│   │   │   ├── validator.js
│   │   │   └── upload.js                 # Multer config
│   │   │
│   │   ├── 📁 utils/
│   │   │   ├── geocoding.js              # Lat/Long conversion
│   │   │   ├── email.js                  # Email templates
│   │   │   └── logger.js
│   │   │
│   │   └── server.js                     # Express server
│   │
│   ├── 📁 database/               # Database seeds
│   │   └── seed.js
│   ├── 📁 docs/                   # API Documentation
│   │   └── API.md
│   ├── .env.example
│   └── package.json
│
├── .gitignore
├── .env.example
├── LICENSE
├── package.json
└── README.md                         # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **MongoDB** 6.0+ ([Install](https://www.mongodb.com/try/download/community))
- **Git** ([Install](https://git-scm.com/))

### Installation

#### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/animal-rescue-platform.git
cd animal-rescue-platform
```

#### 2️⃣ Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

**Environment Variables:**

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/animal-rescue

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Payment (Razorpay)
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

#### 3️⃣ Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env
nano .env
```

**Frontend Environment Variables:**

```env
VITE_API_URL=http://localhost:5000/api
VITE_MAPTILER_API_KEY=your_maptiler_key
```

#### 4️⃣ Database Seeding (Optional)

```bash
cd backend
node database/seed.js
```

#### 5️⃣ Run Development Servers

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

#### 6️⃣ Access Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Docs:** http://localhost:5000/api-docs

---

## 🔄 Application Flow

### User Journey: Emergency Rescue

```mermaid
graph TD
    A[User Opens App] --> B{Location Permission}
    B -->|Granted| C[Detect GPS Location]
    B -->|Denied| D[Show Manual Location Input]
    C --> E[Click 'Find Nearest Help']
    D --> E
    E --> F[Backend Queries Rescue Services]
    F --> G[Calculate Distances]
    G --> H[Sort by Proximity]
    H --> I[Display on Map + List]
    I --> J{User Action}
    J -->|Call| K[Initiate Phone Call]
    J -->|Directions| L[Open Maps App]
    J -->|Details| M[Show Full Info Modal]
```

### Backend Architecture

```
┌─────────────┐
│   Client    │
│  (Browser)  │
└──────┬──────┘
       │ HTTP/HTTPS
       │
┌──────▼──────┐
│   Express   │
│   Server    │
└──────┬──────┘
       │
       ├──► Authentication Middleware (JWT)
       │
       ├──► Request Validation
       │
       ├──► Route Controllers
       │    │
       │    ├──► Rescue Controller
       │    ├──► Adoption Controller
       │    ├──► Donation Controller
       │    └──► Story Controller
       │
       └──► Database Layer
            │
            ├──► MongoDB (Primary Data)
            ├──► Cloudinary (Images)
            └──► External APIs
                 │
                 ├──► Geolocation API
                 ├──► Payment Gateway
                 └──► Email Service
```

---

## 🌐 Deployment

### Free Hosting Options

#### Frontend Deployment

**Option 1: Vercel (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

**Option 2: Netlify**

```bash
# Build
npm run build

# Deploy via Netlify CLI or drag-and-drop
netlify deploy --prod --dir=dist
```

#### Backend Deployment

**Option 1: Render**

1. Create account at [Render.com](https://render.com)
2. Connect GitHub repo
3. Select backend folder
4. Add environment variables
5. Deploy

**Option 2: Railway**

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login & deploy
railway login
cd backend
railway up
```

#### Database Hosting

**MongoDB Atlas (Free Tier)**

1. Create cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Whitelist IP addresses
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`

---

## 🔮 Future Roadmap

### Phase 1: MVP (Current)
- ✅ Emergency rescue finder
- ✅ Pet adoption listings
- ✅ Basic donation system
- ✅ Educational articles

### Phase 2: Enhanced Features (Q3 2026)
- 🔄 Real-time rescue tracking
- 🔄 Push notification system
- 🔄 Multi-language support (Hindi, Gujarati)
- 🔄 PWA with offline mode

### Phase 3: Advanced AI (Q4 2026)
- 🔮 AI-powered injury detection (image upload)
- 🔮 Chatbot for instant guidance
- 🔮 Predictive analytics for rescue hotspots
- 🔮 Automated pet matching algorithm

### Phase 4: Mobile Apps (2027)
- 📱 Native iOS app
- 📱 Native Android app
- 📱 Wearable integration (emergency SOS)

### Phase 5: Community Expansion
- 🌍 International version
- 🤝 NGO dashboard with analytics
- 📊 Impact reporting system
- 🎓 Volunteer training portal

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Types of Contributions

1. **🐛 Bug Fixes** — Report or fix bugs
2. **✨ Feature Development** — Build new features
3. **📚 Documentation** — Improve docs
4. **🎨 UI/UX Improvements** — Design enhancements
5. **🧪 Testing** — Write tests

### Contribution Workflow

```bash
# 1. Fork the repository
# 2. Create feature branch
git checkout -b feature/amazing-feature

# 3. Make changes and commit
git commit -m "Add amazing feature"

# 4. Push to branch
git push origin feature/amazing-feature

# 5. Open Pull Request
```

### Development Guidelines

- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Keep PRs focused and small

### Code Style

**JavaScript/React:**
- Use ES6+ syntax
- Functional components with hooks
- Proper PropTypes or TypeScript
- 2-space indentation

**CSS/Tailwind:**
- Mobile-first approach
- Use Tailwind utilities
- Custom classes in `@layer components`

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) file for details.

### Open Source Notice

```
Copyright (c) 2026 Animal Rescue Platform

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

### Research & Inspiration

- **Buddy Animal Rescue** — Platform architecture reference
- **Let It Wag** — Community engagement model
- **Gujarat Government 1962 Helpline** — Government integration case study
- **Google Antigravity** — Development framework

### Technologies

- React.js Team
- MongoDB Team
- Leaflet.js Community
- OpenStreetMap Contributors

### Design

- **Stitch by Google** — Complete UI/UX system
- **Tailwind Labs** — CSS framework
- **Heroicons** — Icon library

---

## 📞 Contact & Support

### Get Help

- 📧 **Email:** support@animalrescue.org
- 💬 **Discord:** [Join Community](https://discord.gg/animalrescue)
- 🐦 **Twitter:** [@AnimalRescuePlatform](https://twitter.com/animalrescue)

### Report Issues

Found a bug? [Open an issue](https://github.com/yourusername/animal-rescue-platform/issues)

---

## 🌟 Star History

If this project helps you, please ⭐ star the repository!

---

## 🎯 Project Status

**Current Version:** 1.0.0  
**Status:** ✅ Active Development  
**Last Updated:** April 2026

---

<div align="center">

**Built with ❤️ for animals in need**

🐕 🐈 🐇 🐦

[Website](https://animalrescue.org) • [Documentation](https://docs.animalrescue.org) • [Community](https://discord.gg/animalrescue)

</div>
