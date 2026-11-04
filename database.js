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
      stmtExp.finalize();

      // 4. Terroirs table
      db.run(`
        CREATE TABLE IF NOT EXISTS terroirs (
          id TEXT PRIMARY KEY,
          region_id TEXT UNIQUE NOT NULL,
          soil_type TEXT NOT NULL,
          climate TEXT NOT NULL,
          elevation TEXT NOT NULL,
          primary_crops TEXT NOT NULL,
          current_season TEXT NOT NULL,
          distance_city TEXT NOT NULL,
          tagline TEXT NOT NULL,
          weather_temp TEXT NOT NULL,
          weather_cond TEXT NOT NULL,
          soil_ph TEXT NOT NULL,
          steward_quote TEXT NOT NULL,
          image_url TEXT NOT NULL,
          calendar_json TEXT NOT NULL,
          FOREIGN KEY (region_id) REFERENCES regions (id)
        )
      `);

      // Seed Terroirs
      const seedTerroirs = [
        [
          'terroir-sahyadri',
          'sahyadri',
          'Volcanic Basalt & Rich Mountain Humus',
          'Montane Mist & Highland Monsoon Rains',
          '1,250m Elevation',
          'Indrayani Fragrant Rice, Wild Forest Honey, Nachni (Ragi)',
          'Autumn Sowing & Terrace Paddy Ripening',
          '95 km from Pune / 110 km from Mumbai',
          'Mist-veiled terraced paddy slopes and native banyans overlooking Western Ghats.',
          '22°C',
          'Crisp Highland Air & Morning Mist',
          '6.8 pH Balanced',
          'When city families put their bare feet into living paddy mud, centuries of separation from nature dissolve in minutes.',
          'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
          JSON.stringify([
            { month: 'Oct – Nov', stage: 'Autumn Sowing', detail: 'Transplanting heirloom winter grains & wild honey collection' },
            { month: 'Dec – Feb', stage: 'Breezy Ripening', detail: 'Slow sun-drying of paddy sheaves & cane crushing feast' },
            { month: 'Mar – May', stage: 'Soil Resting', detail: 'Cover crop green manuring & earthen hearth baking workshops' },
            { month: 'Jun – Sep', stage: 'Monsoon Splendor', detail: 'Mud transplanting in cascading mountain terraces' }
          ])
        ],
        [
          'terroir-deccan',
          'deccan',
          'Deep Red Laterite & Native Clay Loam with Dense Mulch',
          'Breezy Semi-Arid Plateau with Cool Starry Nights',
          '820m Elevation',
          'Arabica Shade Coffee, Tree Cardamom, Native Foxtail Millet, Moringa',
          'Coffee Berry Ripening & Millet Reaping',
          '140 km from Bengaluru / 220 km from Hyderabad',
          'A regenerative multi-layered food forest cultivating biodiversity under a natural canopy.',
          '25°C',
          'Breezy Sunlit Canopy & Low Humidity',
          '6.5 pH Mineral Rich',
          'We do not purchase industrial fertilizers. The fallen teak leaves and free-grazing indigenous cows generate all the living fertility our earth needs.',
          'https://images.unsplash.com/photo-1592417817098-8f3d6ef2c6e6?auto=format&fit=crop&w=1200&q=80',
          JSON.stringify([
            { month: 'Oct – Dec', stage: 'Coffee Berry Picking', detail: 'Selective hand-picking of ruby coffee cherries under shade canopy' },
            { month: 'Jan – Mar', stage: 'Millet Harvesting', detail: 'Traditional stone-milling of native foxtail & pearl millets' },
            { month: 'Apr – May', stage: 'Hearth Drying', detail: 'Artisanal sun roasting and cardamom pod curing' },
            { month: 'Jun – Sep', stage: 'Agroforest Regeneration', detail: 'Planting native timber, fruit saplings, and nitrogen fixers' }
          ])
        ],
        [
          'terroir-cauvery',
          'cauvery',
          'Heavy Alluvial River Silt & Mineral-Dense Wetland Clay',
          'Tropical Riverine Plains with Coastal Morning Dew',
          '120m Elevation',
          'Seeraga Samba Petite Rice, Mappillai Samba, Coconut Palms, Sweet Betel',
          'Winter Samba Rice Transplantation',
          '45 km from Thanjavur / 80 km from Trichy',
          'Sacred river silt deltas sustaining continuous regenerative agriculture for two millennia.',
          '27°C',
          'Tropical River Breeze & Morning Dew',
          '7.2 pH Silty Clay',
          'Our ancient Samba grains take five full months under winter sun. Fast hybrid seeds can never produce this fragrance or healing nourishment.',
          'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=1200&q=80',
          JSON.stringify([
            { month: 'Sep – Nov', stage: 'Samba Planting', detail: 'Nursery seedling lifting & knee-deep alluvial transplantation' },
            { month: 'Dec – Jan', stage: 'Heirloom Tending', detail: 'Bio-dynamic herbal pest decoctions & duck foraging in waterways' },
            { month: 'Feb – Apr', stage: 'Grand Harvest Feast', detail: 'Pongal woodfire cooking of freshly husked fragrant rice' },
            { month: 'May – Aug', stage: 'River Silt Restoration', detail: 'Sun baking clay beds and canal irrigation silt dredging' }
          ])
        ],
        [
          'terroir-punjab',
          'punjab',
          'Golden Canal Silt Loam enriched with Vermicompost',
          'Continental Riverine Basin with Crisp Foggy Mornings',
          '280m Elevation',
          'Sharbati Amber Wheat, Yellow Mustard (Sarson), Desi Sugarcane, Chickpeas',
          'Golden Mustard Flowering & Winter Wheat Emergence',
          '70 km from Chandigarh / 240 km from New Delhi',
          'Endless golden mustard horizons, ancestral canals, and traditional clay woodfire hearths.',
          '19°C',
          'Crisp Morning Fog & Radiant Afternoon Sun',
          '7.0 pH Neutral Alluvium',
          'The scent of flowering mustard in late autumn and hot makki roti from a clay hearth is an unbroken heritage passed across six generations.',
          'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1200&q=80',
          JSON.stringify([
            { month: 'Oct – Nov', stage: 'Winter Sowing', detail: 'Broadcasting indigenous amber wheat & yellow mustard seeds' },
            { month: 'Dec – Jan', stage: 'Yellow Bloom & Cane Crushing', detail: 'Walking blooming mustard seas & fresh sugarcane boiling' },
            { month: 'Feb – Mar', stage: 'Grain Maturation', detail: 'Ears turning golden under radiant spring sun' },
            { month: 'Apr – May', stage: 'Baisakhi Harvest', detail: 'Community sickle harvesting, folk singing, and wheat threshing' }
          ])
        ]
      ];

      const stmtTerroir = db.prepare(`
        INSERT OR REPLACE INTO terroirs (
          id, region_id, soil_type, climate, elevation, primary_crops,
          current_season, distance_city, tagline, weather_temp,
          weather_cond, soil_ph, steward_quote, image_url, calendar_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      seedTerroirs.forEach(t => stmtTerroir.run(t));
      stmtTerroir.finalize(err => {
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

// Get all Terroirs with joined region metadata
async function getTerroirs() {
  const rows = await all(`
    SELECT 
      t.*,
      r.name as region_name,
      r.farm_name,
      r.host_name,
      r.location as farm_location,
      r.daily_capacity
    FROM terroirs t
    JOIN regions r ON t.region_id = r.id
    ORDER BY r.id
  `);
  return rows.map(r => {
    try {
      r.calendar = JSON.parse(r.calendar_json);
    } catch (e) {
      r.calendar = [];
    }
    return r;
  });
}

// Get single Terroir by ID or region ID
async function getTerroirById(idOrRegionId) {
  const row = await get(`
    SELECT 
      t.*,
      r.name as region_name,
      r.farm_name,
      r.host_name,
      r.location as farm_location,
      r.daily_capacity
    FROM terroirs t
    JOIN regions r ON t.region_id = r.id
    WHERE t.id = ? OR t.region_id = ?
  `, [idOrRegionId, idOrRegionId]);

  if (!row) return null;
  try {
    row.calendar = JSON.parse(row.calendar_json);
  } catch (e) {
    row.calendar = [];
  }
  return row;
}

module.exports = {
  db,
  initDatabase,
  all,
  get,
  run,
  getAvailability,
  createBooking,
  getBookingByRef,
  getTerroirs,
  getTerroirById
};
