<<<<<<< HEAD
# RePlate — Food-Surplus Management & Recovery Platform

> **"Good food deserves another plate."**

RePlate is a modern, premium SaaS food-surplus management and recovery platform designed for commercial kitchens, hotels, restaurants, bakeries, cloud kitchens, and verified recipient NGOs in Noida and Delhi NCR.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js (v18)
- **Build Tool**: Vite
- **Language**: JavaScript (`.js` / `.jsx` only — strictly no TypeScript)
- **Styling**: Tailwind CSS with custom design tokens, glassmorphic utilities, and warm off-white palette
- **Routing**: React Router DOM (v6)
- **HTTP Client**: Axios (with automatic Firebase Bearer token interceptor)
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript (CommonJS)
- **Database ORM**: Mongoose (MongoDB Atlas)
- **Authentication**: Firebase Admin SDK & Firebase Client Auth SDK
- **Middleware**: CORS, JSON Body Parser, Centralized Error Handler

### Database
- **Database**: MongoDB Atlas

### Authentication
- **Provider**: Firebase Authentication (Email/Password & Google Sign-In)

---

## 📁 Directory Structure

```text
replate/
├── client/                      # React + Vite Frontend
│   ├── public/                  # Static assets & favicons
│   ├── src/
│   │   ├── components/          # Reusable UI component library
│   │   │   ├── common/          # Button, Card, Badge, Input, Select, Modal, LoadingSpinner, EmptyState, ErrorState, SuccessState, StatCard
│   │   │   ├── dashboard/       # Isolated chart components (DailySurplusChart, FoodRescuedChart, RevenueRecoveredChart, WasteReductionChart)
│   │   │   ├── food/            # FoodCard & food marketplace items
│   │   │   └── layout/          # Navbar, Footer, DashboardLayout
│   │   ├── config/              # Firebase Client SDK configuration
│   │   ├── context/             # AuthContext provider (Firebase + MongoDB user sync)
│   │   ├── pages/               # Application page modules
│   │   │   ├── admin/           # AdminDashboardPage
│   │   │   ├── auth/            # LoginPage, SignupPage
│   │   │   ├── business/        # BusinessDashboardPage
│   │   │   ├── food/            # FoodDirectoryPage, FoodDetailPage, ListFoodPage
│   │   │   ├── public/          # HomePage, HowItWorksPage, BusinessLandingPage, RecipientLandingPage, ImpactPage, ProfilePage, SettingsPage
│   │   │   └── recipient/       # RecipientDashboardPage
│   │   ├── routes/              # AppRoutes, ProtectedRoute, RoleGuard
│   │   ├── services/            # Axios API service instance & interceptors
│   │   ├── utils/               # Mock dataset & category constants
│   │   ├── App.jsx              # Main App entry point
│   │   ├── index.css            # Tailwind directives & design tokens
│   │   └── main.jsx             # React DOM root bootstrap with AuthProvider
│   ├── .env.example             # Client environment template
│   ├── package.json             # Frontend dependencies & scripts
│   └── vite.config.js           # Vite dev server port configuration (Port 3000)
│
├── server/                      # Express.js REST API Backend
│   ├── config/                  # MongoDB db.js & firebaseAdmin.js
│   ├── controllers/             # User controller & sync handlers
│   ├── middleware/              # authMiddleware & centralized error.middleware
│   ├── models/                  # Mongoose User model
│   ├── routes/                  # Modular domain route files (health, auth, user, food, business, recipient, reservation, analytics, ai)
│   ├── .env.example             # Server environment template
│   ├── package.json             # Backend dependencies & scripts
│   └── server.js                # Express entry point (Port 5000)
│
├── README.md                    # Platform documentation
└── .gitignore                   # Git ignore patterns
```

---

## 🔑 Environment Variables Reference

### Client Environment Template (`client/.env.example`)
```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Server Environment Template (`server/.env.example`)
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/replate?retryWrites=true&w=majority
PORT=5000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@your_project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_rsa_private_key\n-----END PRIVATE KEY-----\n"
```

---

## ⚡ Installation & Setup Guide

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas cluster URI
- Firebase Project with Authentication (Email/Password & Google) enabled

### 1. Clone & Install Dependencies

```bash
# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

---

## 🚀 Running the Application

### Option A: Start Backend Express Server (Port 5000)
```bash
cd server
npm run dev
```
*(Express server will run at http://localhost:5000 with CORS and health check endpoint enabled)*

### Option B: Start Frontend Vite Client (Port 3000)
```bash
cd client
npm run dev
```
*(Vite development server will launch at http://localhost:3000)*

---

## 🩺 API Health Endpoint

To verify server operation and connection status:

**Request**:
`GET http://localhost:5000/api/health`

**Response**:
```json
{
  "success": true,
  "message": "RePlate API is running"
}
```

---

## 🗺️ Application Routes Directory

| Route Path | Description | Access Level |
| :--- | :--- | :--- |
| `/` | Premium Startup Landing Page | Public |
| `/how-it-works` | How RePlate Works Timeline | Public |
| `/business` | Commercial Donor Information | Public |
| `/recipient` | Recipient NGO Information | Public |
| `/impact` | Sustainability & ESG Impact Metrics | Public |
| `/food` | Food Surplus Marketplace Directory | Public / Auth |
| `/food/:id` | Food Surplus Detailed View & Claim Modal | Public / Auth |
| `/list-food` | Post Surplus Food Listing Form | Protected (Business) |
| `/login` | Login with Firebase & Google Auth | Public |
| `/signup` | Signup with Role Selection (Business / Recipient) | Public |
| `/dashboard` | Intelligent Role Router | Protected |
| `/business/dashboard` | Executive Business Partner Dashboard | Protected (Business) |
| `/recipient/dashboard` | Recipient NGO Shelter Dashboard | Protected (Recipient) |
| `/admin/dashboard` | Super Admin Platform Console | Protected (Admin) |
| `/profile` | Organization Profile & Edit UI Modal | Protected |
| `/settings` | 4-Section Account & Alert Settings | Protected |

---

## 📜 License
Copyright © 2026 RePlate. All rights reserved.
=======
# Replate
>>>>>>> f7d1ffe967e0d7ca3af73fd87983eb59d620408b
