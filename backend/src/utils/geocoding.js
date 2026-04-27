const axios = require('axios');

const cityCoordinates = {
  Ahmedabad: { lat: 23.0225, lng: 72.5714 },
  Surat: { lat: 21.1702, lng: 72.8311 },
  Vadodara: { lat: 22.3072, lng: 73.1812 },
  Rajkot: { lat: 22.3039, lng: 70.8022 },
  Mumbai: { lat: 19.076, lng: 72.8777 },
  Pune: { lat: 18.5204, lng: 73.8567 },
  Nashik: { lat: 19.9975, lng: 73.7898 },
  Nagpur: { lat: 21.1458, lng: 79.0882 },
  Delhi: { lat: 28.6139, lng: 77.209 },
  Noida: { lat: 28.5355, lng: 77.391 },
  Gurugram: { lat: 28.4595, lng: 77.0266 },
  Bengaluru: { lat: 12.9716, lng: 77.5946 },
  Mysuru: { lat: 12.2958, lng: 76.6394 },
  Chennai: { lat: 13.0827, lng: 80.2707 },
  Coimbatore: { lat: 11.0168, lng: 76.9558 },
  Hyderabad: { lat: 17.385, lng: 78.4867 },
  Udaipur: { lat: 24.5854, lng: 73.7125 },
  Jaipur: { lat: 26.9124, lng: 75.7873 },
  Kolkata: { lat: 22.5726, lng: 88.3639 },
  Kochi: { lat: 9.9312, lng: 76.2673 },
  Thiruvananthapuram: { lat: 8.5241, lng: 76.9366 },
  Guwahati: { lat: 26.1445, lng: 91.7362 },
  Chandigarh: { lat: 30.7333, lng: 76.7794 },
  Bhopal: { lat: 23.2599, lng: 77.4126 },
  Indore: { lat: 22.7196, lng: 75.8577 },
  Lucknow: { lat: 26.8467, lng: 80.9462 },
};

async function geocodeAddress(address) {
  const response = await axios.get('https://nominatim.openstreetmap.org/search', {
    params: {
      q: address,
      format: 'json',
      limit: 1,
    },
    headers: {
      'User-Agent': 'RescueNet Backend',
    },
    timeout: 5000,
  });

  if (!response.data.length) {
    throw new Error('Address could not be geocoded.');
  }

  return {
    lat: Number(response.data[0].lat),
    lng: Number(response.data[0].lon),
  };
}

function lookupCityCoordinates(city) {
  return cityCoordinates[city] || null;
}

function inferCoordinatesFromText(text = '') {
  const match = Object.entries(cityCoordinates).find(([city]) =>
    text.toLowerCase().includes(city.toLowerCase())
  );

  return match ? match[1] : null;
}

function calculateDistance(lat1, lng1, lat2, lng2) {
  const earthRadiusKm = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

module.exports = {
  geocodeAddress,
  lookupCityCoordinates,
  inferCoordinatesFromText,
  calculateDistance,
};
