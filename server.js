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

// Phase 2: Get all ancestral terroirs with soil, climate & seasonal calendar
app.get('/api/terroirs', async (req, res) => {
  try {
    const terroirs = await getTerroirs();
    res.json({ success: true, count: terroirs.length, data: terroirs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Phase 2: Get single terroir by ID or region ID
app.get('/api/terroirs/:id', async (req, res) => {
  try {
    const terroir = await getTerroirById(req.params.id);
    if (!terroir) {
      return res.status(404).json({ success: false, error: 'Terroir not found.' });
    }
    res.json({ success: true, data: terroir });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
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

// 360 Realtime Farm Tour API (South Indian Hill Estate & Terroir Sectors)
app.get('/api/farm-360', (req, res) => {
  res.json({
    success: true,
    estate: {
      name: "Sahyadri & Nilgiri Foothill Sanctuary",
      style: "South Indian Heritage Thotti Farm",
      location: "Western Ghats Ridge • Coorg & Wayanad Foothills",
      elevation: "1,180m Montane Mist Belt",
      primary_crops: "Gandhakasala Fragrant Rice, Shade Arabica, Malabar Pepper & Cardamom",
      tagline: "Mist-veiled rolling hills, cascading paddy terraces, and ancestral courtyard homestead surrounded by drifting clouds."
    },
    atmospheres: [
      { id: "morning", name: "Morning Mist", sub: "Prabhat", desc: "Cool silver mountain dew and rising valley fog" },
      { id: "golden", name: "Golden Hour", sub: "Sandhya", desc: "Radiant amber sunset glow over Western Ghats ridges" },
      { id: "monsoon", name: "Monsoon Dew", sub: "Varsha", desc: "Dramatic swirling rain clouds and verdant emerald slopes" }
    ],
    sectors: [
      {
        id: "desi-sanctuary",
        name: "Indigenous Cattle Sanctuary & Bund Pasture",
        tag: "Living Soil Fertility Center",
        icon: "🐄",
        elevation: "940m Elevation",
        microclimate: "22°C • Open Meadow Breeze",
        coords: { x: 360, y: -70, z: 200, yaw: 45, pitch: -8 },
        desc: "Free-ranging indigenous Malnad Gidda and Hallikar miniature hill cattle grazing peacefully along the green clay terrace bunds in the morning mist. Their daily manure and herbal grazing form the foundation for all biodynamic bio-fertilizers across the entire estate.",
        img: "/assets/farm_tour/morning_misty_paddy_cattle.jpg",
        highlights: ["Malnad Gidda Native Cattle", "Jeevamrutha Mixing Vat", "Zero Chemical Input Hub", "Gentle Animal Interaction"]
      },
      {
        id: "paddy-terraces",
        name: "Cascading Mountain Rice Terraces",
        tag: "Regenerative Wetland Rice",
        icon: "🌾",
        elevation: "920m Elevation",
        microclimate: "23°C • Mountain Stream Breeze",
        coords: { x: -340, y: -90, z: -260, yaw: -140, pitch: -12 },
        desc: "Stepped clay terraces sculpted into the hillside slope, fed continuously by living natural mountain aquifers and reflecting the morning sky. Guests can walk barefoot along the clay bunds, practice traditional transplantation, and learn ancestral gravity-fed water stewardship.",
        img: "/assets/farm_tour/morning_misty_paddy_cattle.jpg",
        highlights: ["Barefoot Clay Bund Walks", "Gravity Water Channels", "Organic Duck Weed Control", "Ancestral Fragrant Grains"]
      },
      {
        id: "thotti-house",
        name: "Ancestral Thotti Estate Lane & Banana Canopy",
        tag: "Heritage Architecture & Farm Lane",
        icon: "🏡",
        elevation: "960m Elevation",
        microclimate: "21°C • Cool Veranda Breeze",
        coords: { x: 280, y: -30, z: -320, yaw: 180, pitch: -6 },
        desc: "Scenic country lane flanked by lush Nendran banana groves, betel palms, and flooded paddies leading to the traditional red-tiled courtyard homestead (Thotti Mane). Experience the living verandas where guests join the farming family for fresh woodfire meals and filter decoction.",
        img: "/assets/farm_tour/rural_estate_country_lane.jpg",
        highlights: ["Nendran Banana Agroforest", "Rainwater Courtyard Tank", "Woodfire Hearth Breakfast", "Fresh Filter Decoction"]
      },
      {
        id: "shola-peak",
        name: "Cloud-Veiled Shola Ridge & Mist Deck",
        tag: "Montane Rainforest Canopy",
        icon: "⛰️",
        elevation: "1,240m Ridge Crest",
        microclimate: "18°C • Drifting Cloud Vapor",
        coords: { x: -220, y: 160, z: 360, yaw: 125, pitch: 20 },
        desc: "The highest ridge of the estate where rolling clouds break over ancient Shola evergreens and tall coconut palms. A panoramic viewing deck overlooking three valley passes. Early mornings offer breathtaking cloud inversions as the mist carpets the lower valleys.",
        img: "/assets/farm_tour/morning_misty_paddy_cattle.jpg",
        highlights: ["360° Valley Cloud Inversion", "Highland Coffee Canopy", "Wild Honey Tree Hives", "Panoramic Meditation Deck"]
      },
      {
        id: "cardamom-stream",
        name: "Active Rice Transplantation & Mud Bunds",
        tag: "Generational Agrarian Stewardship",
        icon: "🌿",
        elevation: "890m Valley Bed",
        microclimate: "20°C • Humid Spice Microclimate",
        coords: { x: 40, y: -150, z: 420, yaw: -45, pitch: -10 },
        desc: "Vibrant flooded emerald paddy fields where local agrarian farmers in traditional lungis and saris walk the clay bunds, transplanting heirloom Samba rice seedlings under the mist-covered mountain backdrop.",
        img: "/assets/farm_tour/monsoon_farmers_rice_paddy.jpg",
        highlights: ["Heirloom Samba Seedling Planting", "Barefoot Bund Walking", "Monsoon Water Management", "Farming Family Wisdom"]
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
