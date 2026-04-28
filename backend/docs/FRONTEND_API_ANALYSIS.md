# Frontend API Analysis

This report is based on the current files in `frontend/src/pages`.

## Observed frontend workflows

- `Home.jsx`: needs high-level stats, featured stories, donation highlights.
- `Report.jsx`: needs emergency report submission, optional photo upload, and nearby rescue discovery.
- `NearbyHelp.jsx`: needs nearby rescue centers with ETA, phone, and dispatch-ready data.
- `Adopt.jsx` and `PetProfile.jsx`: need pet listing, pet detail, favorites, and adoption applications.
- `Donation.jsx`: needs donation order creation, payment verification, donation stats, and receipt generation.
- `Volunteer.jsx`: needs volunteer onboarding, document upload, and role/opportunity data.
- `Login.jsx` and `Register.jsx`: need auth, profile lookup, and profile updates.
- `Stories.jsx`: needs story listing and single story detail.
- `Education.jsx`: needs article/protocol listing and single article detail.
- `Dashboard.jsx`: needs live rescue metrics and recent report feed.
- `Register.jsx`: also implies NGO registration for `NGO / Unit`.

## Backend routes mapped

- Auth: `/api/auth/*`
- Rescue: `/api/rescue/*`
- Adoption: `/api/adoption/*`
- Donation: `/api/donation/*`
- Volunteer: `/api/volunteer/*`
- Stories: `/api/stories/*`
- Articles: `/api/articles/*`
- NGO: `/api/ngo/*`
- Diagnostics: `/api/test/*`

## File upload expectations

- Emergency report photo
- Volunteer profile photo
- Volunteer ID document

## Third-party integrations prepared

- MongoDB via Mongoose
- Cloudinary for uploads
- Razorpay for test-mode payments
- Nodemailer for email
- Nominatim/OpenStreetMap helper for geocoding

## Notes

- The current frontend is mostly static and does not yet call these endpoints directly.
- The backend was designed to match the visible UI flows so frontend integration can be added without changing backend structure.
