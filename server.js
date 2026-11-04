const express = require('express');
const cors = require('cors');
const path = require('path');
const {
  initDatabase,
  all,
  get,
  getAvailability,
  createBooking,
  getBookingByRef
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
