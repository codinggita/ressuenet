# Backend Environment Setup

Add the missing secret values in `backend/.env` before you run the backend.

## Required values from you

```env
MONGODB_URI=
JWT_SECRET=
FRONTEND_URL=http://localhost:5173
```

## Optional but recommended

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

BREVO_EMAIL=
BREVO_API_KEY=

EMAIL_HOST=
EMAIL_PORT=587
EMAIL_USER=
EMAIL_PASS=
EMAIL_FROM=

MAPTILER_API_KEY=
GOOGLE_PLACES_API_KEY=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

UNSPLASH_ACCESS_KEY=
FAST2SMS_API_KEY=

ADMIN_EMAIL=admin@animalrescue.com
ADMIN_PASSWORD=Admin@123
```

## What to do

1. Create `backend/.env`.
2. Copy the keys from `backend/.env.example`.
3. Paste your real values into `backend/.env`.
4. Run `npm run seed` after `MONGODB_URI` is added.
5. Run `npm run dev` to start the API.

## Notes

- If you skip Cloudinary, email, or Razorpay keys, the backend still starts.
- If you skip `MONGODB_URI` or `JWT_SECRET`, auth and database features will not work.
