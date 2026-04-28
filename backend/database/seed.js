require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const connectDatabase = require('../src/config/database');
const User = require('../src/models/User');
const RescueService = require('../src/models/RescueService');
const Pet = require('../src/models/Pet');
const Story = require('../src/models/Story');
const Article = require('../src/models/Article');
const NGO = require('../src/models/NGO');

const cityMap = {
  Ahmedabad: { state: 'Gujarat', coordinates: [72.5714, 23.0225] },
  Agra: { state: 'Uttar Pradesh', coordinates: [78.0081, 27.1767] },
  Ahmednagar: { state: 'Maharashtra', coordinates: [74.7496, 19.0948] },
  Akola: { state: 'Maharashtra', coordinates: [77.002, 20.7096] },
  Alipurduar: { state: 'West Bengal', coordinates: [89.5229, 26.4914] },
  Alwar: { state: 'Rajasthan', coordinates: [76.625, 27.553] },
  Ambikapur: { state: 'Chhattisgarh', coordinates: [83.196, 23.118] },
  Amritsar: { state: 'Punjab', coordinates: [74.8723, 31.634] },
  'Port Blair': { state: 'Andaman and Nicobar Islands', coordinates: [92.7265, 11.6234] },
  Aurangabad: { state: 'Maharashtra', coordinates: [75.3433, 19.8762] },
  Bareilly: { state: 'Uttar Pradesh', coordinates: [79.4304, 28.367] },
  Bhandara: { state: 'Maharashtra', coordinates: [79.6538, 21.1777] },
  Bharatpur: { state: 'Rajasthan', coordinates: [77.492, 27.2152] },
  Badaun: { state: 'Uttar Pradesh', coordinates: [79.1143, 28.0362] },
  Calicut: { state: 'Kerala', coordinates: [75.7804, 11.2588] },
  Dehradun: { state: 'Uttarakhand', coordinates: [78.0322, 30.3165] },
  Dhar: { state: 'Madhya Pradesh', coordinates: [75.3025, 22.6013] },
  Faridabad: { state: 'Haryana', coordinates: [77.3178, 28.4089] },
  Firozabad: { state: 'Uttar Pradesh', coordinates: [78.3931, 27.1592] },
  Ghaziabad: { state: 'Uttar Pradesh', coordinates: [77.4538, 28.6692] },
  Ponda: { state: 'Goa', coordinates: [74.008, 15.4029] },
  Vasco: { state: 'Goa', coordinates: [73.818, 15.3959] },
  Gondia: { state: 'Maharashtra', coordinates: [80.192, 21.4602] },
  Gurugram: { state: 'Haryana', coordinates: [77.0266, 28.4595] },
  Guwahati: { state: 'Assam', coordinates: [91.7362, 26.1445] },
  Hanumangarh: { state: 'Rajasthan', coordinates: [74.3225, 29.5815] },
  Haridwar: { state: 'Uttarakhand', coordinates: [78.1642, 29.9457] },
  Hooghly: { state: 'West Bengal', coordinates: [88.3915, 22.9088] },
  Hubli: { state: 'Karnataka', coordinates: [75.124, 15.3647] },
  Indore: { state: 'Madhya Pradesh', coordinates: [75.8577, 22.7196] },
  Jaipur: { state: 'Rajasthan', coordinates: [75.7873, 26.9124] },
  Jalandhar: { state: 'Punjab', coordinates: [75.5762, 31.326] },
  Kalimpong: { state: 'West Bengal', coordinates: [88.4676, 27.0612] },
  Kanpur: { state: 'Uttar Pradesh', coordinates: [80.3319, 26.4499] },
  Kendrapara: { state: 'Odisha', coordinates: [86.4223, 20.5017] },
  Khamgaon: { state: 'Maharashtra', coordinates: [76.5684, 20.7074] },
  Kolhapur: { state: 'Maharashtra', coordinates: [74.2433, 16.705] },
  Kollam: { state: 'Kerala', coordinates: [76.6141, 8.8932] },
  Kota: { state: 'Rajasthan', coordinates: [75.8648, 25.2138] },
  Kotabagh: { state: 'Uttarakhand', coordinates: [79.2183, 29.4321] },
  Kumbakonam: { state: 'Tamil Nadu', coordinates: [79.3845, 10.9601] },
  Latur: { state: 'Maharashtra', coordinates: [76.5604, 18.4088] },
  Lucknow: { state: 'Uttar Pradesh', coordinates: [80.9462, 26.8467] },
  Madurai: { state: 'Tamil Nadu', coordinates: [78.1198, 9.9252] },
  Malkangiri: { state: 'Odisha', coordinates: [81.8947, 18.3642] },
  Meerut: { state: 'Uttar Pradesh', coordinates: [77.7064, 28.9845] },
  Moradabad: { state: 'Uttar Pradesh', coordinates: [78.7733, 28.8386] },
  Mumbai: { state: 'Maharashtra', coordinates: [72.8777, 19.076] },
  Mysore: { state: 'Karnataka', coordinates: [76.6394, 12.2958] },
  Bengaluru: { state: 'Karnataka', coordinates: [77.5946, 12.9716] },
  Secunderabad: { state: 'Telangana', coordinates: [78.4983, 17.4399] },
  Nagpur: { state: 'Maharashtra', coordinates: [79.0882, 21.1458] },
  Nashik: { state: 'Maharashtra', coordinates: [73.7898, 19.9975] },
  'Pali Marwar': { state: 'Rajasthan', coordinates: [73.3234, 25.7781] },
  Panchgani: { state: 'Maharashtra', coordinates: [73.824, 17.9243] },
  Pune: { state: 'Maharashtra', coordinates: [73.8567, 18.5204] },
  Raiganj: { state: 'West Bengal', coordinates: [88.1265, 25.6168] },
  Ranchi: { state: 'Jharkhand', coordinates: [85.3096, 23.3441] },
  Rewari: { state: 'Haryana', coordinates: [76.6185, 28.192] },
  Roorkee: { state: 'Uttarakhand', coordinates: [77.888, 29.8543] },
  Sambalpur: { state: 'Odisha', coordinates: [83.9701, 21.4704] },
  Shahjahanpur: { state: 'Uttar Pradesh', coordinates: [79.9048, 27.8804] },
  Shimla: { state: 'Himachal Pradesh', coordinates: [77.1734, 31.1048] },
  Pakyong: { state: 'Sikkim', coordinates: [88.6091, 27.2252] },
  Siliguri: { state: 'West Bengal', coordinates: [88.3953, 26.7271] },
  Sirohi: { state: 'Rajasthan', coordinates: [72.8593, 24.8829] },
  Sivakasi: { state: 'Tamil Nadu', coordinates: [77.805, 9.4493] },
  Sriganganagar: { state: 'Rajasthan', coordinates: [73.8809, 29.9038] },
  Suratgarh: { state: 'Rajasthan', coordinates: [73.8982, 29.3215] },
  Talcher: { state: 'Odisha', coordinates: [85.23, 20.95] },
  Udaipur: { state: 'Rajasthan', coordinates: [73.7125, 24.5854] },
  Shillong: { state: 'Meghalaya', coordinates: [91.8933, 25.5788] },
  Bhiwadi: { state: 'Rajasthan', coordinates: [76.8627, 28.2102] },
  Bhopal: { state: 'Madhya Pradesh', coordinates: [77.4126, 23.2599] },
  Thiruvananthapuram: { state: 'Kerala', coordinates: [76.9366, 8.5241] },
  Thrissur: { state: 'Kerala', coordinates: [76.2144, 10.5276] },
  Thoubal: { state: 'Manipur', coordinates: [94.008, 24.638] },
  'Uttar Dinajpur': { state: 'West Bengal', coordinates: [88.2, 25.62] },
  Vadodara: { state: 'Gujarat', coordinates: [73.1812, 22.3072] },
  Wardha: { state: 'Maharashtra', coordinates: [78.6022, 20.7453] },
  Pathankot: { state: 'Punjab', coordinates: [75.6522, 32.2643] },
  Sambhal: { state: 'Uttar Pradesh', coordinates: [78.5696, 28.5842] },
  'Durg Bhilai': { state: 'Chhattisgarh', coordinates: [81.3509, 21.1938] },
  Tambaram: { state: 'Tamil Nadu', coordinates: [80.1183, 12.9249] },
  'Charkhi Dadri': { state: 'Haryana', coordinates: [76.2691, 28.5921] },
  Parbhani: { state: 'Maharashtra', coordinates: [76.7748, 19.2704] },
  Tirupur: { state: 'Tamil Nadu', coordinates: [77.3411, 11.1085] },
  Bhubaneswar: { state: 'Odisha', coordinates: [85.8245, 20.2961] },
  Trichy: { state: 'Tamil Nadu', coordinates: [78.7047, 10.7905] },
  Chennai: { state: 'Tamil Nadu', coordinates: [80.2707, 13.0827] },
  Delhi: { state: 'Delhi', coordinates: [77.209, 28.6139] },
  Hyderabad: { state: 'Telangana', coordinates: [78.4867, 17.385] },
  Coimbatore: { state: 'Tamil Nadu', coordinates: [76.9558, 11.0168] },
  Kochi: { state: 'Kerala', coordinates: [76.2673, 9.9312] },
};

const pfaUnits = [
  'Ahmedabad', 'Agra', 'Ahmednagar', 'Akola', 'Alipurduar', 'Alwar', 'Ambikapur', 'Amritsar', 'Port Blair',
  'Aurangabad', 'Bareilly', 'Bhandara', 'Bharatpur', 'Badaun', 'Calicut', 'Dehradun', 'Dhar', 'Faridabad',
  'Firozabad', 'Ghaziabad', 'Ponda', 'Vasco', 'Gondia', 'Gurugram', 'Guwahati', 'Hanumangarh', 'Haridwar',
  'Hooghly', 'Hubli', 'Indore', 'Jaipur', 'Jalandhar', 'Kalimpong', 'Kanpur', 'Kendrapara', 'Khamgaon',
  'Kolhapur', 'Kollam', 'Kota', 'Kotabagh', 'Kumbakonam', 'Latur', 'Lucknow', 'Madurai', 'Malkangiri',
  'Meerut', 'Moradabad', 'Mumbai', 'Mysore', 'Nagpur', 'Nashik', 'Pali Marwar', 'Panchgani', 'Pune',
  'Raiganj', 'Ranchi', 'Rewari', 'Roorkee', 'Sambalpur', 'Secunderabad', 'Shahjahanpur', 'Shimla', 'Pakyong',
  'Siliguri', 'Sirohi', 'Sivakasi', 'Sriganganagar', 'Suratgarh', 'Talcher', 'Udaipur', 'Shillong', 'Lucknow',
  'Bhiwadi', 'Faridabad', 'Dehradun', 'Bhopal', 'Shahjahanpur', 'Thiruvananthapuram', 'Thrissur', 'Thoubal',
  'Uttar Dinajpur', 'Vadodara', 'Wardha', 'Pathankot', 'Sambhal', 'Durg Bhilai', 'Tambaram', 'Charkhi Dadri',
  'Parbhani', 'Tirupur', 'Bhubaneswar', 'Trichy',
];

const standaloneCenters = [
  {
    name: 'People For Animals Delhi - Sanjay Gandhi Animal Care Centre',
    city: 'Delhi',
    state: 'Delhi',
    coordinates: [77.209, 28.6139],
    source: 'https://www.peopleforanimalsindia.org/',
    phones: ['+91-11-20818191'],
    email: 'gandhim@exmpls.sansad.in',
    services: ['Emergency Rescue', 'Animal Hospital', 'Shelter', 'Adoption'],
    type: 'NGO',
  },
  {
    name: 'People For Animals Bengaluru - Wildlife Rescue and Conservation Centre',
    city: 'Bengaluru',
    state: 'Karnataka',
    coordinates: [77.5032, 12.9146],
    source: 'https://www.peopleforanimalsindia.org/public/units/details/11',
    phones: ['080-28611986', '9980339880'],
    email: 'info@peopleforanimalsbangalore.org',
    services: ['Wildlife Rescue', 'Helpline', 'Shelter', 'Ambulance'],
    type: 'NGO',
  },
  {
    name: 'Animal Aid Unlimited',
    city: 'Udaipur',
    state: 'Rajasthan',
    coordinates: [73.7125, 24.5854],
    source: 'https://www.animalaidunlimited.org/contact/',
    phones: ['+91-9829044220'],
    email: 'info@animalaidunlimited.org',
    services: ['Emergency Rescue', 'Hospital', 'Sanctuary', 'Adoption'],
    type: 'NGO',
  },
  {
    name: 'Friendicoes SECA',
    city: 'Delhi',
    state: 'Delhi',
    coordinates: [77.1025, 28.7041],
    source: 'https://friendicoes.org/',
    phones: ['+91-9810938226'],
    email: 'info@friendicoes.org',
    services: ['Shelter', 'Adoption', 'Emergency Rescue', 'Clinic'],
    type: 'NGO',
  },
  {
    name: 'Blue Cross of Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    coordinates: [78.4036, 17.4212],
    source: 'https://bluecrossofhyd.org/contact-us/',
    phones: ['+91-8886676074'],
    email: 'info@bluecrossofhyd.org',
    services: ['Shelter', 'ABC-ARV', 'Rescue', 'Volunteer Programs'],
    type: 'NGO',
  },
  {
    name: 'Blue Cross of India',
    city: 'Chennai',
    state: 'Tamil Nadu',
    coordinates: [80.2208, 13.0105],
    source: 'https://awbi.gov.in/uploads/documents/175750190730List%2520of%2520Recognised%2520Organisation%2520as%2520on%252031%2520Aug%25202025_compressed.pdf',
    phones: ['+91-44-46274999'],
    email: '',
    services: ['Shelter', 'Emergency Rescue', 'Animal Hospital', 'Adoption'],
    type: 'NGO',
  },
  {
    name: 'Jeev Ashram Foundation',
    city: 'Ahmedabad',
    state: 'Gujarat',
    coordinates: [72.5176, 23.0307],
    source: 'https://www.jeev.net.in/contact-us',
    phones: ['+91-79-48920808'],
    email: 'support@jeev.net.in',
    services: ['Shelter', 'Adoption', 'Medical Care'],
    type: 'NGO',
  },
  {
    name: 'RESQ Charitable Trust',
    city: 'Pune',
    state: 'Maharashtra',
    coordinates: [73.8567, 18.5204],
    source: 'public organization data',
    phones: ['+91-9175928593'],
    email: 'info@resqct.org',
    services: ['Rescue', 'Wildlife Care', 'Adoption'],
    type: 'NGO',
  },
  {
    name: 'CUPA Second Chance Adoption Centre',
    city: 'Bengaluru',
    state: 'Karnataka',
    coordinates: [77.5946, 12.9716],
    source: 'public organization data',
    phones: ['+91-80-22947300'],
    email: 'info@cupaindia.org',
    services: ['Adoption', 'Shelter', 'Rescue'],
    type: 'NGO',
  },
  {
    name: "Charlie's Animal Rescue Centre",
    city: 'Bengaluru',
    state: 'Karnataka',
    coordinates: [77.5946, 12.9716],
    source: 'public organization data',
    phones: ['+91-9535099990'],
    email: 'info@careforanimals.org',
    services: ['Shelter', 'Hospital', 'Adoption'],
    type: 'NGO',
  },
  {
    name: 'Karuna Animal Helpline',
    city: 'Ahmedabad',
    state: 'Gujarat',
    coordinates: [72.5714, 23.0225],
    source: 'public helpline data',
    phones: ['1962'],
    email: '',
    services: ['Emergency Rescue', 'Government Helpline', 'Ambulance'],
    type: 'Government',
  },
  {
    name: 'Wildlife SOS Rescue Centre',
    city: 'Agra',
    state: 'Uttar Pradesh',
    coordinates: [78.0081, 27.1767],
    source: 'public organization data',
    phones: ['+91-9871963535'],
    email: 'info@wildlifesos.org',
    services: ['Wildlife Rescue', 'Medical Care', 'Sanctuary'],
    type: 'NGO',
  },
  {
    name: 'Auroville Animal Shelter',
    city: 'Kochi',
    state: 'Kerala',
    coordinates: [76.2673, 9.9312],
    source: 'public organization data',
    phones: ['+91-413-2622054'],
    email: '',
    services: ['Shelter', 'Adoption', 'Volunteer'],
    type: 'NGO',
  },
];

function standardHours() {
  return {
    monday: { open: '09:00', close: '18:00' },
    tuesday: { open: '09:00', close: '18:00' },
    wednesday: { open: '09:00', close: '18:00' },
    thursday: { open: '09:00', close: '18:00' },
    friday: { open: '09:00', close: '18:00' },
    saturday: { open: '09:00', close: '16:00' },
    sunday: { open: '10:00', close: '14:00' },
    is24x7: false,
  };
}

function createPfaCenter(city, index) {
  const meta = cityMap[city];
  if (!meta) {
    return null;
  }

  const offsetLng = meta.coordinates[0] + (index % 4) * 0.01;
  const offsetLat = meta.coordinates[1] + (index % 3) * 0.008;

  return {
    name: `People For Animals ${city}`,
    type: 'NGO',
    location: {
      type: 'Point',
      coordinates: [offsetLng, offsetLat],
      address: `${city} rescue support office`,
      city,
      state: meta.state,
      pincode: '',
    },
    contact: {
      phone: ['+91-11-20818191'],
      email: '',
      whatsapp: '',
    },
    services: ['Emergency Rescue', 'Shelter', 'Adoption', 'Animal Welfare'],
    operatingHours: standardHours(),
    verified: true,
    rating: 4.6,
    totalRescues: 150 + index * 4,
    images: [],
    source: 'https://www.peopleforanimalsindia.org/public/units/details/11',
  };
}

function createStandaloneCenter(item, index) {
  return {
    name: item.name,
    type: item.type,
    location: {
      type: 'Point',
      coordinates: item.coordinates,
      address: `${item.city}, ${item.state}`,
      city: item.city,
      state: item.state,
      pincode: '',
    },
    contact: {
      phone: item.phones,
      email: item.email,
      whatsapp: item.phones[0] || '',
    },
    services: item.services,
    operatingHours: { ...standardHours(), is24x7: item.services.includes('Emergency Rescue') },
    verified: true,
    rating: 4.8,
    totalRescues: 400 + index * 10,
    images: [],
    source: item.source,
  };
}

async function seedRescueCenters() {
  const pfaCenters = pfaUnits.map(createPfaCenter).filter(Boolean);
  const extraCenters = standaloneCenters.map(createStandaloneCenter);
  const rescueCenters = [...extraCenters, ...pfaCenters];

  await RescueService.deleteMany({});
  await RescueService.insertMany(rescueCenters);

  console.log(`Seeded ${rescueCenters.length} rescue centers.`);
  return rescueCenters;
}

async function seedPets(rescueCenters) {
  await Pet.deleteMany({});

  const sheltersByCity = Object.fromEntries(rescueCenters.map((center) => [center.location.city, center._id]));
  const basePets = [
    ['Bento', 'Dog', 'Golden Mix', 'Delhi'],
    ['Luna', 'Cat', 'Indie Cat', 'Mumbai'],
    ['Piper', 'Dog', 'Border Collie Mix', 'Pune'],
    ['Cheddar', 'Cat', 'Domestic Shorthair', 'Bengaluru'],
    ['Ghost', 'Dog', 'Husky Mix', 'Hyderabad'],
    ['Honey', 'Dog', 'Golden Retriever', 'Ahmedabad'],
    ['Milo', 'Rabbit', 'Mini Lop', 'Chennai'],
    ['Rio', 'Bird', 'Parakeet', 'Delhi'],
    ['Tara', 'Dog', 'Indie', 'Jaipur'],
    ['Zuzu', 'Cat', 'Calico', 'Kolkata'],
    ['Bruno', 'Dog', 'Labrador Mix', 'Nagpur'],
    ['Nila', 'Cat', 'Tabby', 'Kochi'],
  ];

  const pets = [];
  for (let index = 0; index < basePets.length; index++) {
    const item = basePets[index];
    let imageUrl = `https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80&seed=${index + 1}`;
    
    try {
      if (item[1] === 'Dog') {
        const res = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await res.json();
        if (data && data.message) imageUrl = data.message;
      } else if (item[1] === 'Cat') {
        const res = await fetch('https://api.thecatapi.com/v1/images/search');
        const data = await res.json();
        if (data && data.length > 0 && data[0].url) imageUrl = data[0].url;
      } else if (item[1] === 'Bird') {
        imageUrl = 'https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?auto=format&fit=crop&w=900&q=80';
      } else if (item[1] === 'Rabbit') {
        imageUrl = 'https://images.unsplash.com/photo-1585110396000-c9fd7e48afa4?auto=format&fit=crop&w=900&q=80';
      }
    } catch (err) {
      console.log('Error fetching image for', item[0], err.message);
    }

    pets.push({
      name: item[0],
      species: item[1],
      breed: item[2],
      age: 1 + (index % 7),
      ageLabel: `${1 + (index % 7)} Years`,
      gender: index % 2 === 0 ? 'Male' : 'Female',
      size: index % 3 === 0 ? 'Large' : index % 3 === 1 ? 'Medium' : 'Small',
      color: index % 2 === 0 ? 'Brown' : 'White',
      city: item[3],
      images: [imageUrl],
      description: `${item[0]} is a rescue companion currently waiting for a safe forever home.`,
      personality: ['Friendly', 'Resilient', index % 2 === 0 ? 'Playful' : 'Gentle'],
      healthStatus: {
        vaccinated: true,
        neutered: index % 2 === 0,
        medicalHistory: 'Routine rescue intake completed.',
      },
      adoptionStatus: index % 5 === 0 ? 'Pending' : 'Available',
      shelter: sheltersByCity[item[3]] || rescueCenters[0]._id,
      urgencyLevel: index % 4 === 0 ? 'High' : 'Medium',
      postedDate: new Date(),
      views: 50 + index * 11,
      tags: ['frontend-ready', item[1].toLowerCase()],
    });
  }

  await Pet.insertMany(pets);
  console.log(`Seeded ${pets.length} pets.`);
}

async function seedStories() {
  await Story.deleteMany({});
  const stories = [
    {
      title: 'Luna Returns to the Wild',
      slug: 'luna-returns-to-the-wild',
      excerpt: 'A leopard rescue story from Rajasthan.',
      content: 'Long-form story content for frontend story pages.',
      category: 'Wildlife',
      city: 'Udaipur',
      organization: 'Animal Aid Unlimited',
      image: 'https://images.unsplash.com/photo-1599443015574-be5fe8a05783?auto=format&fit=crop&w=1200&q=80',
      featured: true,
      readTime: '12 min',
    },
    {
      title: 'Barnaby Finds a New Home',
      slug: 'barnaby-finds-a-new-home',
      excerpt: 'An adoption success story from Bengaluru.',
      content: 'Long-form story content for frontend story pages.',
      category: 'Happy Endings',
      city: 'Bengaluru',
      organization: 'CUPA',
      image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1200&q=80',
      readTime: '8 min',
    },
    {
      title: 'Rapid Response on the Ring Road',
      slug: 'rapid-response-on-the-ring-road',
      excerpt: 'Critical rescue coordination across Delhi NCR.',
      content: 'Long-form story content for frontend story pages.',
      category: 'Critical Rescues',
      city: 'Delhi',
      organization: 'People For Animals',
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80',
      readTime: '6 min',
    },
  ];

  await Story.insertMany(stories);
  console.log(`Seeded ${stories.length} stories.`);
}

async function seedArticles() {
  await Article.deleteMany({});
  const articles = [
    {
      title: 'Field CPR: Canine Response Protocol',
      slug: 'field-cpr-canine-response-protocol',
      category: 'Emergency Triage',
      type: 'Video',
      readTime: '5 min',
      summary: 'Quick access protocol for emergency responders.',
      content: 'Article body goes here.',
      featured: true,
    },
    {
      title: 'Thermoregulation and Heatstroke Diagnostics',
      slug: 'thermoregulation-and-heatstroke-diagnostics',
      category: 'Bio-Wellness',
      type: 'Article',
      readTime: '3 min',
      summary: 'Recognizing severe heat stress in rescued animals.',
      content: 'Article body goes here.',
    },
    {
      title: 'Trauma-Informed Extraction Techniques',
      slug: 'trauma-informed-extraction-techniques',
      category: 'Rescue Protocol',
      type: 'Guide',
      readTime: '6 min',
      summary: 'Safer handling patterns for frightened animals.',
      content: 'Article body goes here.',
    },
  ];

  await Article.insertMany(articles);
  console.log(`Seeded ${articles.length} articles.`);
}

async function seedNgos() {
  await NGO.deleteMany({});
  const ngos = standaloneCenters.slice(0, 8).map((item) => ({
    name: item.name,
    contactPerson: 'Operations Team',
    email: item.email || `${item.city.toLowerCase().replace(/\s+/g, '')}@rescuenet.local`,
    phone: item.phones[0],
    city: item.city,
    state: item.state,
    description: `${item.name} is part of the seeded NGO network.`,
    services: item.services,
    verified: true,
    website: item.source,
  }));

  await NGO.insertMany(ngos);
  console.log(`Seeded ${ngos.length} NGOs.`);
}

async function seedAdminUser() {
  await User.deleteMany({});
  const admin = await User.create({
    fullName: 'RescueNet Admin',
    email: process.env.ADMIN_EMAIL || 'admin@animalrescue.com',
    phone: '+91-9999999999',
    city: 'Delhi',
    password: process.env.ADMIN_PASSWORD || 'Admin@123',
    role: 'admin',
  });

  console.log(`Seeded admin user ${admin.email}.`);
}

async function seedAll() {
  await connectDatabase();
  const rescueCenters = await seedRescueCenters();
  await seedPets(rescueCenters);
  await seedStories();
  await seedArticles();
  await seedNgos();
  await seedAdminUser();
  console.log('Database seeding complete.');
  process.exit(0);
}

seedAll().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
