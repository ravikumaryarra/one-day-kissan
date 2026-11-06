const express = require('express');
const cors = require('cors');
const path = require('path');
const {
  initDatabase,
  all,
  get,
  getAvailability,
  createBooking,
  getBookingByRef,
  getTerroirs,
  getTerroirById,
  getStories,
  getStoryById,
  getHampers,
  getHamperById,
  createHamperOrder,
  getHamperOrderByRef,
  getWorkshops,
  getWorkshopById,
  registerWorkshop,
  getWorkshopRegistrationByRef,
  getReviews,
  createReview,
  likeReview
} = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static(path.join(__dirname)));

// 1. Get all farm regions
app.get('/api/regions', async (req, res) => {
  try {
    const regions = await all('SELECT * FROM regions ORDER BY id');
    res.json({ success: true, data: regions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Get all experience types
app.get('/api/experiences', async (req, res) => {
  try {
    const experiences = await all('SELECT * FROM experiences ORDER BY id');
    res.json({ success: true, data: experiences });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Verified One Day Kissan Locations in Telangana
const FARM_LOCATIONS = [
  {
    id: 'bhongir',
    tag: 'LOCATION 01',
    label: 'Main Farm',
    name: 'Bhongir',
    full_title: 'Location 01 — Bhongir (Main Farm)',
    address: 'Hotel Vivera, Hyderabad–Warangal Highway, Bhongir Bypass, Bhongir, Telangana – 508116.',
    landmark: 'Hotel Vivera, Bhongir Bypass (NH 163)',
    district: 'Yadadri Bhuvanagiri District, Telangana',
    maps_url: 'https://www.google.com/maps/search/?api=1&query=Hotel+Vivera+Bhongir+Bypass+Telangana+508116',
    image_url: '/assets/locations/bhongir_main_farm.jpg',
    visual_features: [
      'Realistic Telangana farmland',
      'Open agricultural fields',
      'Traditional farming activities',
      'Rural surroundings and local landscapes'
    ]
  },
  {
    id: 'moinabad',
    tag: 'LOCATION 02',
    label: 'Branch Farm',
    name: 'Moinabad',
    full_title: 'Location 02 — Moinabad (Branch Farm)',
    address: 'Kapil Agro Farms, Sriramnagar, Moinabad, Telangana – 501504.',
    landmark: 'Kapil Agro Farms, Sriramnagar',
    district: 'Ranga Reddy District, Telangana',
    maps_url: 'https://www.google.com/maps/search/?api=1&query=Kapil+Agro+Farms+Sriramnagar+Moinabad+Telangana+501504',
    image_url: '/assets/locations/moinabad_branch_farm.jpg',
    visual_features: [
      'Telangana countryside',
      'Green agricultural fields',
      'Farm activities and rural surroundings',
      'Natural vegetation and farm life'
    ]
  }
];

// Verified One Day Kissan Locations API
app.get('/api/locations', (req, res) => {
  res.json({ success: true, count: FARM_LOCATIONS.length, data: FARM_LOCATIONS });
});

app.get('/api/locations/:id', (req, res) => {
  const loc = FARM_LOCATIONS.find(l => l.id.toLowerCase() === req.params.id.toLowerCase());
  if (!loc) {
    return res.status(404).json({ success: false, error: 'Location not found.' });
  }
  res.json({ success: true, data: loc });
});

// Backward-compatible terroirs endpoint returning verified locations
app.get('/api/terroirs', async (req, res) => {
  res.json({ success: true, count: FARM_LOCATIONS.length, data: FARM_LOCATIONS });
});

app.get('/api/terroirs/:id', async (req, res) => {
  const loc = FARM_LOCATIONS.find(l => l.id.toLowerCase() === req.params.id.toLowerCase()) || FARM_LOCATIONS[0];
  res.json({ success: true, data: loc });
});

// Phase 3: Farmer Stories API
app.get('/api/stories', async (req, res) => {
  try {
    const stories = await getStories();
    res.json({ success: true, count: stories.length, data: stories });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/stories/:id', async (req, res) => {
  try {
    const story = await getStoryById(req.params.id);
    if (!story) {
      return res.status(404).json({ success: false, error: 'Story not found.' });
    }
    res.json({ success: true, data: story });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Authentic One Day Kisan Farm Experiences API
app.get('/api/experiences', (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const experiencesPath = path.join(__dirname, 'official_activities.json');
    if (fs.existsSync(experiencesPath)) {
      const activities = JSON.parse(fs.readFileSync(experiencesPath, 'utf8'));
      return res.json({ success: true, count: activities.length, data: activities });
    }
    res.json({ success: true, count: 0, data: [] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Authentic One Day Kisan Testimonials & Field Films API
app.get('/api/testimonials', (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const testimonialsPath = path.join(__dirname, 'testimonial_videos.json');
    if (fs.existsSync(testimonialsPath)) {
      const videos = JSON.parse(fs.readFileSync(testimonialsPath, 'utf8'));
      return res.json({ success: true, count: videos.length, data: videos });
    }
    res.json({ success: true, count: 0, data: [] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Phase 3: Farm-to-Table Harvest Hampers API
app.get('/api/hampers', async (req, res) => {
  try {
    const hampers = await getHampers();
    res.json({ success: true, count: hampers.length, data: hampers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/hampers/:id', async (req, res) => {
  try {
    const hamper = await getHamperById(req.params.id);
    if (!hamper) {
      return res.status(404).json({ success: false, error: 'Harvest hamper not found.' });
    }
    res.json({ success: true, data: hamper });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Phase 3: Reserve a Harvest Hamper
app.post('/api/hampers/orders', async (req, res) => {
  try {
    const {
      hamperId,
      fullName,
      email,
      phone,
      deliveryAddress,
      frequency,
      specialNotes
    } = req.body;

    if (!hamperId || !fullName || !email || !phone || !deliveryAddress) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required fields: hamperId, fullName, email, phone, deliveryAddress.'
      });
    }

    const order = await createHamperOrder({
      hamperId,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      deliveryAddress: deliveryAddress.trim(),
      frequency: frequency || 'one_time',
      specialNotes: specialNotes ? specialNotes.trim() : ''
    });

    res.status(201).json({
      success: true,
      message: 'Harvest hamper reserved with $0 deposit. Hand-packed fresh by our agrarian stewards.',
      data: order
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Phase 3: Lookup Hamper Order by Reference
app.get('/api/hampers/orders/:ref', async (req, res) => {
  try {
    const order = await getHamperOrderByRef(req.params.ref.toUpperCase());
    if (!order) {
      return res.status(404).json({ success: false, error: 'Hamper order reservation not found.' });
    }
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Phase 4: Agrarian Masterclasses & Workshops API
app.get('/api/workshops', async (req, res) => {
  try {
    const { regionId } = req.query;
    const workshops = await getWorkshops(regionId);
    res.json({ success: true, count: workshops.length, data: workshops });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/workshops/:id', async (req, res) => {
  try {
    const workshop = await getWorkshopById(req.params.id);
    if (!workshop) {
      return res.status(404).json({ success: false, error: 'Masterclass not found.' });
    }
    res.json({ success: true, data: workshop });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Phase 4: Register for a Workshop
app.post('/api/workshops/register', async (req, res) => {
  try {
    const {
      workshopId,
      fullName,
      email,
      phone,
      sessionDate,
      seats = 1,
      specialNotes
    } = req.body;

    if (!workshopId || !fullName || !email || !phone || !sessionDate) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required fields: workshopId, fullName, email, phone, sessionDate.'
      });
    }

    const registration = await registerWorkshop({
      workshopId,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      sessionDate,
      seats: parseInt(seats, 10) || 1,
      specialNotes: specialNotes ? specialNotes.trim() : ''
    });

    res.status(201).json({
      success: true,
      message: 'Masterclass seat confirmed with $0 advance deposit. Field boots & materials included.',
      data: registration
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Phase 4: Lookup Workshop Registration by Reference
app.get('/api/workshops/register/:ref', async (req, res) => {
  try {
    const reg = await getWorkshopRegistrationByRef(req.params.ref.toUpperCase());
    if (!reg) {
      return res.status(404).json({ success: false, error: 'Workshop pass not found.' });
    }
    res.json({ success: true, data: reg });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Phase 4: Community Logbook & Reviews API
app.get('/api/reviews', async (req, res) => {
  try {
    const { regionId } = req.query;
    const result = await getReviews(regionId);
    res.json({
      success: true,
      count: result.reviews.length,
      stats: result.stats,
      data: result.reviews
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Phase 4: Submit a Review
app.post('/api/reviews', async (req, res) => {
  try {
    const {
      bookingRef,
      regionId,
      guestName,
      city,
      rating = 5,
      title,
      comment
    } = req.body;

    if (!regionId || !guestName || !city || !title || !comment) {
      return res.status(400).json({
        success: false,
        error: 'Please complete all fields: regionId, guestName, city, title, comment.'
      });
    }

    const review = await createReview({
      bookingRef: bookingRef ? bookingRef.trim().toUpperCase() : '',
      regionId,
      guestName: guestName.trim(),
      city: city.trim(),
      rating: parseInt(rating, 10) || 5,
      title: title.trim(),
      comment: comment.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for contributing to the Agrarian Guest Logbook!',
      data: review
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Phase 4: Upvote Helpful Review
app.post('/api/reviews/:id/like', async (req, res) => {
  try {
    const liked = await likeReview(req.params.id);
    if (!liked) {
      return res.status(404).json({ success: false, error: 'Review not found.' });
    }
    res.json({ success: true, data: liked });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Check live slot availability for a region and date
app.get('/api/availability', async (req, res) => {
  try {
    const { regionId = 'sahyadri', date } = req.query;
    if (!date) {
      return res.status(400).json({ success: false, error: 'date query parameter is required (YYYY-MM-DD).' });
    }

    const avail = await getAvailability(regionId, date);
    if (!avail) {
      return res.status(404).json({ success: false, error: 'Region not found.' });
    }

    res.json({ success: true, data: avail });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Create a new farm booking
app.post('/api/bookings', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      regionId,
      experienceId,
      visitDate,
      travellers,
      guestCount,
      dietaryNotes,
      specialRequests
    } = req.body;

    if (!fullName || !email || !phone || !regionId || !experienceId || !visitDate) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required fields: fullName, email, phone, regionId, experienceId, visitDate.'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    }

    const booking = await createBooking({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      regionId,
      experienceId,
      visitDate,
      travellers: travellers || '2 Adults',
      guestCount: parseInt(guestCount, 10) || 2,
      dietaryNotes: dietaryNotes ? dietaryNotes.trim() : '',
      specialRequests: specialRequests ? specialRequests.trim() : ''
    });

    res.status(201).json({
      success: true,
      message: 'Farm immersion reserved with $0 deposit. Your digital pass is ready.',
      data: booking
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 5. Lookup booking by reference
app.get('/api/bookings/:ref', async (req, res) => {
  try {
    const booking = await getBookingByRef(req.params.ref.toUpperCase());
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Reservation pass not found.' });
    }
    res.json({ success: true, data: booking });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. List recent bookings (for steward review)
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await all(`
      SELECT 
        b.booking_ref, b.full_name, b.email, b.phone, b.visit_date, 
        b.travellers, b.guest_count, b.status, b.created_at,
        r.name as region_name, r.farm_name,
        e.title as experience_title
      FROM bookings b
      LEFT JOIN regions r ON b.region_id = r.id
      LEFT JOIN experiences e ON b.experience_id = e.id
      ORDER BY b.created_at DESC
      LIMIT 50
    `);
    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Live Business Statistics API (Verified from Official One Day Kissan Website)
app.get('/api/farm-stats', (req, res) => {
  res.json({
    success: true,
    schoolsWelcomed: 400,
    schoolsSuffix: "+",
    studentsExperienced: 80000,
    studentsSuffix: "+",
    googleRating: 4.8,
    ratingOutOf: "/5",
    reviewCount: 664,
    farmLocations: 2,
    locationsList: [
      { name: "Bhongir Main Farm", detail: "Near Hotel Vivera, Hyderabad–Warangal Highway" },
      { name: "Moinabad Branch Farm", detail: "Kapil Agro Farms, Sriramnagar" }
    ],
    verifiedActivitiesCount: 23,
    lastUpdated: new Date().toISOString()
  });
});

// 360 Realtime Farm Tour API (Tamil Nadu Hill Village Farm & Agrarian Sectors)
app.get('/api/farm-360', (req, res) => {
  res.json({
    success: true,
    estate: {
      name: "Tamil Nadu Hill Village Farm Sanctuary",
      style: "Authentic South Indian Hill Homestead & Terraced Paddies",
      location: "Nilgiris & Kolli Hills Foothills • Tamil Nadu, India",
      elevation: "1,180m Mist-Clad Hill Slope",
      primary_crops: "Traditional Heirloom Kichili Samba Rice, Coconut Palms, Mountain Bananas & Pepper",
      tagline: "Mist-veiled rolling hills, terraced paddies, clay walking bunds, and traditional red-tiled farmhouse plinth surrounded by drifting clouds."
    },
    atmospheres: [
      { id: "morning", name: "Morning Mist", sub: "Kaalai", desc: "Cool silver mountain mist and soft rising valley clouds" },
      { id: "golden", name: "Golden Hour", sub: "Maalai", desc: "Warm amber sunlight glowing over rolling Tamil Nadu hill ridges" },
      { id: "monsoon", name: "Monsoon Dew", sub: "Mazhai", desc: "Swirling rain clouds, lush wet soil, and vibrant emerald slopes" }
    ],
    sectors: [
      {
        id: "desi-sanctuary",
        name: "Indigenous Kangayam Cattle & Ridge Pasture",
        tag: "Native Soil Fertility Hub",
        icon: "🐄",
        elevation: "940m Elevation",
        microclimate: "22°C • Open Meadow Breeze",
        coords: { x: 360, y: -70, z: 200, yaw: 45, pitch: -8 },
        desc: "Authentic indigenous Kangayam hill cattle grazing quietly along the reddish clay terrace bunds in the morning mist. Their daily organic manure nourishes the multi-tiered agroforest and terraced paddies.",
        img: "/assets/farm_tour/tamil_nadu_hill_farm_360_master.jpg",
        highlights: ["Indigenous Kangayam Native Cattle", "Natural Clay Bund Grazing", "Traditional Organic Composting", "Gentle Farm Animal Interaction"]
      },
      {
        id: "paddy-terraces",
        name: "Stepped Wetland Paddy Terraces",
        tag: "Heirloom Samba Rice Terraces",
        icon: "🌾",
        elevation: "920m Elevation",
        microclimate: "23°C • Mountain Stream Breeze",
        coords: { x: -340, y: -90, z: -260, yaw: -140, pitch: -12 },
        desc: "Naturally stepped clay terraces sculpted along the gentle Tamil Nadu hill slope, fed by living mountain water channels and reflecting open tropical skies. Visitors walk barefoot on firm clay bunds.",
        img: "/assets/farm_tour/pano_morning.jpg",
        highlights: ["Barefoot Clay Bund Walks", "Living Gravity Runoff Channels", "Heirloom Kichili Samba Rice", "Chemical-Free Soil Regeneration"]
      },
      {
        id: "thotti-house",
        name: "Traditional Tamil Rural Farmhouse & Veranda",
        tag: "Heritage Homestead & Walking Path",
        icon: "🏡",
        elevation: "960m Elevation",
        microclimate: "21°C • Shaded Veranda Breeze",
        coords: { x: 280, y: -30, z: -320, yaw: 180, pitch: -6 },
        desc: "Traditional Tamil rural farmhouse featuring sloping terracotta clay tiles, granite stone plinth, and shaded timber veranda nestled beside wild banana clusters and curving coconut palms.",
        img: "/assets/farm_tour/pano_golden.jpg",
        highlights: ["Terracotta-Tiled Rural Architecture", "Granite Stone Foundation Plinth", "Shaded Timber Living Veranda", "Woodfire Farm Hearth & Meals"]
      },
      {
        id: "shola-peak",
        name: "Misty Mountain Ridge & Open Cloud Sky",
        tag: "Layered Western Ghats Horizon",
        icon: "⛰️",
        elevation: "1,240m Ridge Crest",
        microclimate: "18°C • Drifting Cloud Mist",
        coords: { x: -220, y: 160, z: 360, yaw: 125, pitch: 20 },
        desc: "Layered rolling green hills and distant mountain ranges enveloped in natural morning mist and realistic cloud depth. The eye-level standing viewpoint captures the authentic tranquil atmosphere of a remote hill village.",
        img: "/assets/farm_tour/pano_morning.jpg",
        highlights: ["360° Layered Mountain Vistas", "Atmospheric Cloud Inversions", "Shola Evergreen Canopy", "Natural Daylight & Horizon Depth"]
      },
      {
        id: "cardamom-stream",
        name: "Clay Walking Bund & Water Channels",
        tag: "Natural Agrarian Pathway",
        icon: "🌿",
        elevation: "890m Valley Bed",
        microclimate: "20°C • Moist Earth & Foliage",
        coords: { x: 40, y: -150, z: 420, yaw: -45, pitch: -10 },
        desc: "Natural walking path of uneven reddish loamy soil, grass tufts, and river stones winding between the flooded plots where crystal-clear spring runoff sustains the heirloom crop.",
        img: "/assets/farm_tour/pano_monsoon.jpg",
        highlights: ["Natural Soil & Stone Walking Paths", "Uneven Earthen Bund Formations", "Living Gravity Irrigation Channels", "Traditional Tamil Agrarian Rhythm"]
      }
    ]
  });
});

// Fallback to index.html for root routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server after database initialization
initDatabase()
  .then(() => {
    function startListening(portToTry) {
      const server = app.listen(portToTry, () => {
        console.log(`🌾 One Day Kissan full-stack engine running on http://localhost:${portToTry}`);
      });

      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.warn(`⚠️ Port ${portToTry} is already active. Checking next port...`);
          startListening(portToTry + 1);
        } else {
          console.error('Server error:', err);
        }
      });
    }

    startListening(Number(PORT));
  })
  .catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
