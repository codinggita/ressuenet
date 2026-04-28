# RescueNet Backend API

Base URL: `http://localhost:5000`

## Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `PUT /api/auth/update-profile`
- `POST /api/auth/forgot-password`

## Rescue

- `GET /api/rescue/nearby?lat=23.0225&lng=72.5714&radius=10000&type=NGO`
- `GET /api/rescue/search?city=Ahmedabad`
- `GET /api/rescue/emergency`
- `GET /api/rescue/dashboard`
- `GET /api/rescue/:id`
- `POST /api/rescue/report`

`POST /api/rescue/report` accepts form-data fields:

- `location`
- `lat`
- `lng`
- `species`
- `severity`
- `description`
- `isAnonymous`
- `reporterName`
- `reporterPhone`
- `photo`

## Adoption

- `GET /api/adoption/pets`
- `GET /api/adoption/pets/:id`
- `POST /api/adoption/favorite`
- `DELETE /api/adoption/favorite/:id`
- `GET /api/adoption/favorites`
- `POST /api/adoption/apply`

## Donation

- `POST /api/donation/create`
- `POST /api/donation/verify`
- `GET /api/donation/history`
- `GET /api/donation/stats`
- `POST /api/donation/receipt`

## Stories and Education

- `GET /api/stories`
- `GET /api/stories/:id`
- `POST /api/stories`
- `GET /api/articles`
- `GET /api/articles/:id`
- `POST /api/articles`

## Volunteers and NGOs

- `POST /api/volunteer/register`
- `GET /api/volunteer/opportunities`
- `PUT /api/volunteer/update`
- `POST /api/ngo/register`
- `GET /api/ngo/list`
- `PUT /api/ngo/:id`

## Test Routes

- `GET /api/test/ping`
- `GET /api/test/db`
- `GET /api/test/geocoding?address=Ahmedabad`
- `GET /api/test/email?email=you@example.com`

## Seeding

1. Add `MONGODB_URI` in `.env`.
2. Run `npm run seed`.
3. Use the seeded admin credentials from `.env`.
