const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const QRCode = require('qrcode');

const dbPath = path.join(__dirname, 'onedaykissan.db');
const db = new sqlite3.Database(dbPath);

function initDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // 1. Regions table
      db.run(`
        CREATE TABLE IF NOT EXISTS regions (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          farm_name TEXT NOT NULL,
          host_name TEXT NOT NULL,
          location TEXT NOT NULL,
          daily_capacity INTEGER DEFAULT 25,
          elevation TEXT DEFAULT '1,200m'
        )
      `);

      // 2. Experiences table
      db.run(`
        CREATE TABLE IF NOT EXISTS experiences (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          duration TEXT NOT NULL,
          inclusions TEXT NOT NULL
        )
      `);

      // 3. Bookings table
      db.run(`
        CREATE TABLE IF NOT EXISTS bookings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          booking_ref TEXT UNIQUE NOT NULL,
          full_name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          region_id TEXT NOT NULL,
          experience_id TEXT NOT NULL,
          visit_date TEXT NOT NULL,
          travellers TEXT NOT NULL,
          guest_count INTEGER NOT NULL,
          dietary_notes TEXT,
          special_requests TEXT,
          status TEXT DEFAULT 'confirmed',
          qr_code_data TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (region_id) REFERENCES regions (id),
          FOREIGN KEY (experience_id) REFERENCES experiences (id)
        )
      `);

      // Seed Regions
      const seedRegions = [
        ['sahyadri', 'Western Ghats Foothills', 'Sahyadri Heritage Agroforest', 'Ramrao & Savitri Deshmukh', 'Near Lonavala / Pune Valley, Maharashtra', 25, '1,250m'],
        ['deccan', 'Deccan Agroforest Plateau', 'Ananya & Devraj Living Farm', 'Ananya & Devraj', 'Kanipakam Valley, Andhra / Karnataka Border', 25, '820m'],
        ['cauvery', 'Cauvery Delta Wetlands', 'Thanjavur Heirloom Rice Wetland', 'Murugesan & Valliammai', 'Kumbakonam Belt, Tamil Nadu', 20, '120m'],
        ['punjab', 'Canal Plains Organic Estate', 'Singh Ancestral Wheat & Mustard Farm', 'Gurmehar Singh', 'Rupnagar Belt, Punjab', 30, '280m']
      ];

      const stmtRegion = db.prepare('INSERT OR IGNORE INTO regions (id, name, farm_name, host_name, location, daily_capacity, elevation) VALUES (?, ?, ?, ?, ?, ?, ?)');
      seedRegions.forEach(r => stmtRegion.run(r));
      stmtRegion.finalize();

      // Seed Experiences
      const seedExp = [
        ['paddy', 'Paddy Immersion & Sowing', '8:00 AM – 5:30 PM (Full Day)', 'Organic Breakfast, Muddy Paddy Transplanting, Heirloom Seed Potting, Woodfire Lunch, Field Boots & Apron'],
        ['harvest', 'Organic Harvest & Feast', '9:00 AM – 4:30 PM (Day Retreat)', 'Fresh Cane Crushing, Seasonal Greens Harvesting, Clay-Chulha Cooking Class, Farm-to-Table Feast'],
        ['artisanal', 'Pottery & Rural Hearth Life', '10:00 AM – 6:00 PM (Artisan Special)', 'Potter Wheel Masterclass, Earthen Stove Sourdough / Roti Baking, Folk Story Circle, Herb Walk'],
        ['family', 'Full Family Countryside Day', '8:30 AM – 6:00 PM (All Ages)', 'Family Tractor Trail, Milking Demonstration, Kids Nature Treasure Hunt, Fresh Sugarcane Juice, Shaded Hammocks']
      ];

      const stmtExp = db.prepare('INSERT OR IGNORE INTO experiences (id, title, duration, inclusions) VALUES (?, ?, ?, ?)');
      seedExp.forEach(e => stmtExp.run(e));
      stmtExp.finalize(err => {
        if (err) reject(err);
        else resolve();
      });
    });
  });
}

// Helper: Query all
function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// Helper: Query one
function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// Helper: Run command
function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

// Availability calculator
async function getAvailability(regionId, dateStr) {
  const region = await get('SELECT * FROM regions WHERE id = ?', [regionId]);
  if (!region) return null;

  const booked = await get(`
    SELECT COALESCE(SUM(guest_count), 0) as total_booked
    FROM bookings
    WHERE region_id = ? AND visit_date = ? AND status != 'cancelled'
  `, [regionId, dateStr]);

  const totalBooked = booked ? booked.total_booked : 0;
  const remaining = Math.max(0, region.daily_capacity - totalBooked);

  return {
    region_id: region.id,
    region_name: region.name,
    farm_name: region.farm_name,
    date: dateStr,
    daily_capacity: region.daily_capacity,
    booked_guests: totalBooked,
    remaining_slots: remaining,
    is_available: remaining > 0
  };
}

// Booking creation
async function createBooking(data) {
  const {
    fullName,
    email,
    phone,
    regionId,
    experienceId,
    visitDate,
    travellers,
    guestCount = 2,
    dietaryNotes = '',
    specialRequests = ''
  } = data;

  // Check availability
  const avail = await getAvailability(regionId, visitDate);
  if (!avail || avail.remaining_slots < guestCount) {
    throw new Error(`Only ${avail ? avail.remaining_slots : 0} slots remaining on this date.`);
  }

  // Generate unique booking reference: ODK-YYYYMM-XXXX
  const datePart = visitDate.replace(/-/g, '').slice(2, 6); // e.g. 2604
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  const bookingRef = `ODK-${datePart}-${randomSuffix}`;

  // Generate QR Code data URL for gate check-in
  const qrPayload = JSON.stringify({
    ref: bookingRef,
    name: fullName,
    guests: guestCount,
    farm: avail.farm_name,
    date: visitDate,
    verified: true
  });
  const qrCodeData = await QRCode.toDataURL(qrPayload, {
    width: 280,
    margin: 1,
    color: {
      dark: '#203C2B',
      light: '#F5F1E8'
    }
  });

  await run(`
    INSERT INTO bookings (
      booking_ref, full_name, email, phone, region_id, experience_id,
      visit_date, travellers, guest_count, dietary_notes, special_requests,
      status, qr_code_data
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed', ?)
  `, [
    bookingRef, fullName, email, phone, regionId, experienceId,
    visitDate, travellers, guestCount, dietaryNotes, specialRequests,
    qrCodeData
  ]);

  return getBookingByRef(bookingRef);
}

// Get Booking by Reference with joined details
async function getBookingByRef(bookingRef) {
  return get(`
    SELECT 
      b.*,
      r.name as region_name,
      r.farm_name,
      r.host_name,
      r.location as farm_location,
      r.elevation,
      e.title as experience_title,
      e.duration as experience_duration,
      e.inclusions
    FROM bookings b
    LEFT JOIN regions r ON b.region_id = r.id
    LEFT JOIN experiences e ON b.experience_id = e.id
    WHERE b.booking_ref = ?
  `, [bookingRef]);
}

module.exports = {
  db,
  initDatabase,
  all,
  get,
  run,
  getAvailability,
  createBooking,
  getBookingByRef
};
