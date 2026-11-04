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

// Fallback to index.html for root routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server after database initialization
initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🌾 One Day Kissan full-stack engine running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
