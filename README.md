# RescueNet

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-brightgreen.svg)](https://www.mongodb.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

RescueNet is a full-stack animal rescue and adoption platform that helps people report emergencies, find nearby rescue support, adopt rescued pets, donate, and volunteer.

## Overview

The platform is built to reduce friction in animal rescue response. It brings rescue discovery, mapping, adoption, community stories, education, donations, and volunteer flows into one experience.

## Live Links

- Frontend: https://rescue-plus.vercel.app
- Backend: https://rescuenet-backend-02ao.onrender.com
- Backend health check: https://rescuenet-backend-02ao.onrender.com/api/test/ping

## Design Links

- Figma design file: https://www.figma.com/design/WGDkIwH7DQfwFG1JGMb2Kj/Untitled?node-id=0-1&t=zQXciC2pOC9LqFHR-1
- Figma prototype: https://www.figma.com/proto/WGDkIwH7DQfwFG1JGMb2Kj/Untitled?node-id=309-4&viewport=-163%2C77%2C0.02&t=6tiWHPTIq7kQ7Pk4-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=309%3A4&page-id=0%3A1

## Key Features

- Emergency animal rescue reporting
- Nearby rescue center and support discovery
- Interactive map-based rescue lookup
- Pet adoption listings and pet detail pages
- Donations and impact-oriented contribution flows
- Volunteer onboarding and community participation
- Stories and education content for awareness
- Responsive mobile-first interface

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- TanStack Query
- Zustand
- Framer Motion
- Leaflet / React Leaflet
- React Helmet Async

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication
- Multer
- Nodemailer
- Razorpay integration

### Deployment

- Vercel for frontend
- Render for backend
- MongoDB Atlas for database hosting

## Project Structure

```text
ressuenet/
├── backend/
│   ├── database/
│   ├── docs/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
├── render.yaml
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB 6+
- Git

### Backend setup

```bash
cd backend
npm install
```

Create `backend/.env` from `backend/.env.example`.

Important backend variables:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/rescuenet
JWT_SECRET=change-this-secret-before-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
cd backend
npm run dev
```

### Frontend setup

```bash
cd frontend
npm install
```

Create `frontend/.env` from `frontend/.env.example`.

Frontend variables:

```env
VITE_API_URL=http://localhost:5000
VITE_MAPTILER_API_KEY=your_maptiler_key
```

Start the frontend:

```bash
cd frontend
npm run dev
```

### Local URLs

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Backend health check: http://localhost:5000/api/test/ping

## Deployment

### Current live deployment

- Frontend: https://rescue-plus.vercel.app
- Backend: https://rescuenet-backend-02ao.onrender.com

### Frontend

The frontend is deployed on Vercel. Set `VITE_API_URL` to the backend origin, not to a `/api` path.

Example production value:

```env
VITE_API_URL=https://rescuenet-backend-02ao.onrender.com
```

### Backend

The backend is deployed on Render using the root `render.yaml` blueprint.

Important production environment variables:

```env
MONGODB_URI=your_production_connection_string
JWT_SECRET=your_production_secret
FRONTEND_URL=https://rescue-plus.vercel.app
FRONTEND_URLS=https://rescue-plus.vercel.app,https://frontend-bice-theta-73.vercel.app
```

## Roadmap

- Real-time rescue coordination improvements
- Better volunteer operations flows
- Stronger donation analytics and reporting
- More educational and rescue awareness content
- Additional SEO and structured-data coverage
- Continued UX refinement from the Figma system

## Contributing

Contributions are welcome.

```bash
git checkout -b feature/your-change
git commit -m "Describe your change"
git push origin feature/your-change
```

Please keep changes focused, document behavior updates, and follow the existing project structure.

## License

This project is licensed under the MIT License.
