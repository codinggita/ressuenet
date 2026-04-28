const stateHelplines = [
  {
    state: 'Gujarat',
    helpline: '1962',
    agency: 'Karuna Animal Helpline',
    coverage: 'Statewide emergency rescue and ambulance coordination',
    website: 'https://forests.gujarat.gov.in/karuna-abhiyan.htm',
    coordinates: [72.5714, 23.0225],
  },
  {
    state: 'Delhi',
    helpline: '+91-11-20818191',
    agency: 'Sanjay Gandhi Animal Care Centre',
    coverage: 'Emergency treatment, shelter intake, adoption support',
    website: 'https://www.peopleforanimalsindia.org/',
    coordinates: [77.1025, 28.7041],
  },
  {
    state: 'Maharashtra',
    helpline: '+91-22-24137518',
    agency: 'Bai Sakarbai Dinshaw Petit Hospital for Animals',
    coverage: 'Veterinary hospital and referral support in Mumbai',
    website: 'https://www.bspdah.org/',
    coordinates: [72.8777, 19.076],
  },
  {
    state: 'Tamil Nadu',
    helpline: '+91-44-46274999',
    agency: 'Blue Cross of India',
    coverage: 'Rescue, shelter, and adoption support in Chennai',
    website: 'https://bluecrossofindia.org/',
    coordinates: [80.2208, 13.0105],
  },
  {
    state: 'Karnataka',
    helpline: '+91-80-22947300',
    agency: 'CUPA and partner rescue network',
    coverage: 'Rescue referrals, shelter care, volunteer programs',
    website: 'https://cupaindia.org/',
    coordinates: [77.5946, 12.9716],
  },
  {
    state: 'National',
    helpline: '011-26717601',
    agency: 'Wildlife Crime Control Bureau',
    coverage: 'Wildlife trafficking and crime reporting',
    website: 'https://wccb.gov.in/',
    coordinates: [77.209, 28.6139],
  },
];

const governmentSchemes = [
  {
    name: 'Karuna Abhiyan',
    launchedBy: 'Government of Gujarat',
    year: 2001,
    helpline: '1962',
    focus: 'Emergency treatment, rescue vehicles, anti-rabies support',
    impact: 'Used across Gujarat as a first-response animal helpline',
    website: 'https://forests.gujarat.gov.in/karuna-abhiyan.htm',
  },
  {
    name: 'Project Tiger',
    launchedBy: 'Government of India',
    year: 1973,
    focus: 'Tiger reserve management and habitat protection',
    impact: '53 reserves and nationally tracked tiger census reporting',
    website: 'https://ntca.gov.in/',
  },
  {
    name: 'Project Elephant',
    launchedBy: 'Government of India',
    year: 1992,
    focus: 'Corridor protection and conflict mitigation',
    impact: 'Supports elephant landscapes across 13 states',
    website: 'https://moef.gov.in/en/division/wildlife/project-elephant/',
  },
  {
    name: 'Animal Birth Control Rules',
    launchedBy: 'Animal Welfare Board of India',
    year: 2023,
    focus: 'Humane dog population management through sterilization and vaccination',
    impact: 'Framework used by urban local bodies and welfare organizations',
    website: 'https://awbi.gov.in/',
  },
];

const wildlifeSanctuaries = [
  {
    name: 'Gir National Park and Wildlife Sanctuary',
    state: 'Gujarat',
    district: 'Junagadh',
    coordinates: [70.7979, 21.1247],
    keySpecies: ['Asiatic Lion', 'Leopard', 'Chital'],
    status: 'High-priority carnivore habitat',
    website: 'https://forests.gujarat.gov.in/',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Marine National Park',
    state: 'Gujarat',
    district: 'Jamnagar',
    coordinates: [69.075, 22.4833],
    keySpecies: ['Green Sea Turtle', 'Dugong', 'Coral reef fauna'],
    status: 'India\'s first marine national park',
    website: 'https://forests.gujarat.gov.in/',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Wild Ass Sanctuary',
    state: 'Gujarat',
    district: 'Little Rann of Kutch',
    coordinates: [71.0833, 23.8333],
    keySpecies: ['Indian Wild Ass', 'Desert Fox', 'Flamingo'],
    status: 'Flagship grassland and salt desert habitat',
    website: 'https://forests.gujarat.gov.in/',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Nalsarovar Bird Sanctuary',
    state: 'Gujarat',
    district: 'Ahmedabad',
    coordinates: [72.0833, 22.8333],
    keySpecies: ['Flamingo', 'Pelican', 'Cranes'],
    status: 'Major migratory wetland',
    website: 'https://forests.gujarat.gov.in/',
    image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Kaziranga National Park',
    state: 'Assam',
    district: 'Golaghat and Nagaon',
    coordinates: [93.1711, 26.5775],
    keySpecies: ['One-Horned Rhinoceros', 'Tiger', 'Wild Buffalo'],
    status: 'World Heritage conservation stronghold',
    website: 'https://assamforest.in/',
    image: 'https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Ranthambore National Park',
    state: 'Rajasthan',
    district: 'Sawai Madhopur',
    coordinates: [76.5026, 26.0173],
    keySpecies: ['Tiger', 'Sloth Bear', 'Leopard'],
    status: 'Tiger reserve with active tourism and monitoring pressure',
    website: 'https://forest.rajasthan.gov.in/',
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=1200&q=80',
  },
];

const speciesSpotlight = [
  {
    name: 'Asiatic Lion',
    scientificName: 'Panthera leo persica',
    iucnStatus: 'Endangered',
    population: '674 in the 2020 Gujarat lion estimate',
    habitat: 'Gir landscape, Gujarat',
    threats: ['Disease risk', 'Single landscape concentration', 'Human conflict'],
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Bengal Tiger',
    scientificName: 'Panthera tigris tigris',
    iucnStatus: 'Endangered',
    population: '2,967 in India\'s 2018 tiger assessment',
    habitat: 'Forest reserves across central, northern, and northeastern India',
    threats: ['Poaching', 'Habitat fragmentation', 'Prey decline'],
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Indian Elephant',
    scientificName: 'Elephas maximus indicus',
    iucnStatus: 'Endangered',
    population: '29,964 from the 2017 all-India estimate',
    habitat: 'Elephant corridors across 13 states',
    threats: ['Linear infrastructure', 'Crop conflict', 'Habitat fragmentation'],
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Great Indian Bustard',
    scientificName: 'Ardeotis nigriceps',
    iucnStatus: 'Critically Endangered',
    population: 'Fewer than 150 individuals are widely reported',
    habitat: 'Arid grasslands in Rajasthan and Gujarat',
    threats: ['Power-line collision', 'Grassland loss', 'Disturbance'],
    image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Ganges River Dolphin',
    scientificName: 'Platanista gangetica',
    iucnStatus: 'Endangered',
    population: 'Distributed across the Ganga-Brahmaputra river system',
    habitat: 'Large river channels and confluences',
    threats: ['Pollution', 'Fishing gear entanglement', 'Flow alteration'],
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Green Sea Turtle',
    scientificName: 'Chelonia mydas',
    iucnStatus: 'Endangered',
    population: 'Important nesting and foraging presence along Indian coasts',
    habitat: 'Marine protected areas and coastal rookeries',
    threats: ['Marine debris', 'Fishing bycatch', 'Beach disturbance'],
    image: 'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?auto=format&fit=crop&w=1200&q=80',
  },
];

const legalResources = [
  {
    title: 'Wildlife Protection Act, 1972',
    summary: 'Core framework for protected species schedules, sanctuaries, and enforcement.',
    penalties: 'Serious offenses can trigger imprisonment and financial penalties under Section 51.',
    link: 'https://www.indiacode.nic.in/handle/123456789/1726',
  },
  {
    title: 'Prevention of Cruelty to Animals Act, 1960',
    summary: 'Defines cruelty offenses and underpins national animal welfare administration.',
    penalties: 'Used alongside municipal and police action in companion-animal cases.',
    link: 'https://legislative.gov.in/actsofparliamentfromtheyear/prevention-cruelty-animals-act-1960',
  },
  {
    title: 'Indian Penal Code Sections 428 and 429',
    summary: 'Criminal provisions for killing or maiming animals with monetary value thresholds.',
    penalties: 'Frequently cited in companion-animal cruelty cases with police complaints.',
    link: 'https://www.indiacode.nic.in/',
  },
];

const officialResources = [
  {
    name: 'Ministry of Environment, Forest and Climate Change',
    description: 'National policy, wildlife division notices, and conservation program updates.',
    url: 'https://moef.gov.in/',
  },
  {
    name: 'National Tiger Conservation Authority',
    description: 'Tiger reserve governance, advisories, and census-linked public resources.',
    url: 'https://ntca.gov.in/',
  },
  {
    name: 'Animal Welfare Board of India',
    description: 'Animal welfare schemes, ABC guidance, and recognized organization references.',
    url: 'https://awbi.gov.in/',
  },
  {
    name: 'Wildlife Crime Control Bureau',
    description: 'Wildlife crime coordination, public reporting points, and enforcement information.',
    url: 'https://wccb.gov.in/',
  },
];

const conservationTimeline = [
  { year: '1972', title: 'Wildlife Protection Act enacted', detail: 'India establishes its central wildlife protection framework.' },
  { year: '1973', title: 'Project Tiger launches', detail: 'Tiger reserves become the backbone of large-cat conservation.' },
  { year: '1992', title: 'Project Elephant launches', detail: 'Corridor and conflict management gain dedicated national focus.' },
  { year: '2001', title: 'Karuna Abhiyan expands in Gujarat', detail: 'A recognizable emergency animal helpline model gains public traction.' },
  { year: '2018', title: 'Tiger estimate reaches 2,967', detail: 'India reports one of the world\'s largest wild tiger populations.' },
  { year: '2020', title: 'Asiatic lion estimate reaches 674', detail: 'Gir landscape conservation shows measurable growth.' },
];

const rescueStories = [
  {
    title: 'Leopard rescued from a well near Junagadh',
    location: 'Junagadh, Gujarat',
    organization: 'Gujarat Forest Department',
    summary: 'Forest teams and villagers coordinated a careful extraction before releasing the animal after observation.',
    focus: 'Human-wildlife conflict response',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Elephant conflict team steers herd away from villages',
    location: 'Assam',
    organization: 'State forest staff and rapid responders',
    summary: 'Night monitoring and corridor management prevented injuries on both sides of the conflict line.',
    focus: 'Conflict mitigation',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Street dog triage network speeds up transport to treatment',
    location: 'Ahmedabad, Gujarat',
    organization: 'Karuna-linked responders and local NGOs',
    summary: 'A helpline escalation moved an injured dog from roadside report to treatment within the same shift.',
    focus: 'Urban emergency workflow',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Marine rescue teams respond to turtle distress on the coast',
    location: 'Jamnagar, Gujarat',
    organization: 'Marine National Park field staff',
    summary: 'Early reporting and beach patrol coordination reduced the delay between sighting and intervention.',
    focus: 'Coastal wildlife rescue',
    image: 'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?auto=format&fit=crop&w=1200&q=80',
  },
];

const newsBriefings = [
  {
    headline: 'India\'s rescue networks are leaning harder on local helplines and verified referral lists',
    source: 'Platform briefing',
    category: 'Operations',
    summary: 'Fast routing matters more than volume when emergency reporting spikes during heat, traffic, or festival periods.',
  },
  {
    headline: 'Protected-area management keeps spotlight on grassland and marine species, not only large carnivores',
    source: 'Platform briefing',
    category: 'Conservation',
    summary: 'The public conversation often narrows to tigers and lions, while bustards, turtles, and dolphins remain under-reported.',
  },
  {
    headline: 'Wildlife crime reporting depends on better public signposting',
    source: 'Platform briefing',
    category: 'Enforcement',
    summary: 'Users need a clearer handoff between local rescue, police, and the Wildlife Crime Control Bureau.',
  },
];

const wildlifeCrimeCases = [
  {
    title: 'Pangolin trafficking bust referenced in public enforcement reporting',
    location: 'Mumbai region',
    action: 'Seizure, arrests, and WCCB-linked coordination',
  },
  {
    title: 'Tiger body-part trafficking seizures continue to shape enforcement messaging',
    location: 'North India transit corridors',
    action: 'Customs, police, and wildlife officers coordinate casework',
  },
  {
    title: 'Parakeet and small-bird illegal trade remains a recurring urban issue',
    location: 'Multiple metro markets',
    action: 'Public reporting and seizure support are still critical',
  },
];

module.exports = {
  stateHelplines,
  governmentSchemes,
  wildlifeSanctuaries,
  speciesSpotlight,
  legalResources,
  officialResources,
  conservationTimeline,
  rescueStories,
  newsBriefings,
  wildlifeCrimeCases,
};
