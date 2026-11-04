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
      stmtTerroir.finalize();

      // 5. Stories table
      db.run(`
        CREATE TABLE IF NOT EXISTS stories (
          id TEXT PRIMARY KEY,
          region_id TEXT NOT NULL,
          title TEXT NOT NULL,
          farmer_name TEXT NOT NULL,
          role_title TEXT NOT NULL,
          category TEXT NOT NULL,
          quote TEXT NOT NULL,
          full_story TEXT NOT NULL,
          ambient_sound TEXT NOT NULL,
          image_url TEXT NOT NULL,
          FOREIGN KEY (region_id) REFERENCES regions (id)
        )
      `);

      const seedStories = [
        [
          'story-sahyadri',
          'sahyadri',
          'The Deshmukh Family',
          'Ramrao & Savitri Deshmukh',
          'Heirloom Seed Keepers & Agroforest Stewards',
          'Indigenous Seeds',
          'We do not merely grow grain; we preserve sixty varieties of drought-resilient heirloom rice passed down through four generations.',
          'For thirty-eight years, Savitri and I watched chemical fertilizers harden our father’s soft red clay into cracked chalk. In 2004, we took an oath to cast aside artificial sprays forever. We trekked across remote Sahyadri valleys collecting forgotten indigenous seeds: Indrayani, Ghansal, and Ambemohar. Today, our living soil drinks torrential monsoon rains without eroding, and our heirloom grains feed over four hundred urban families with pure unadulterated vitality.',
          'canopy-breeze',
          'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80'
        ],
        [
          'story-deccan',
          'deccan',
          'From Cubicles to Crops',
          'Ananya & Devraj',
          'Regenerative Agroforestry Stewards',
          'Regenerative Farming',
          'Trading twelve hours of screen time for morning dew and seed sowing gave our family a living relationship with where our nourishment begins.',
          'We used to be senior software architects in Whitefield, Bangalore. After twelve years of artificial office air conditioning, chronic fatigue, and grocery store food with no aroma, we bought eight acres of barren granite boulder land on the Deccan plateau. Using multi-layered Syntropic Agroforestry—planting jackfruit, coffee, cardamom, and native leguminous shade trees—we created an oasis with its own microclimate that remains 4°C cooler than surrounding towns.',
          'canopy-breeze',
          'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80'
        ],
        [
          'story-punjab',
          'punjab',
          'Golden Mustard Harvests',
          'Gurmehar Singh',
          'Master Organic Wheat & Mustard Grower',
          'Ancestral Foodways',
          'The aroma of fresh cold-pressed mustard oil and slow woodfire hearth cooking has the magic to bring three generations together at one wooden table.',
          'Punjab was once made the epicenter of petrochemical agriculture, but my grandfather refused to poison our family well. He taught me that wheat grown slowly under cool winter skies does not need artificial hormones to grow tall. When you bite into a hot makki roti cooked over a slow-burning woodfire hearth, lathered with fresh white butter, your body instantly remembers what genuine food tastes like.',
          'hearth-fire',
          'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80'
        ],
        [
          'story-cauvery',
          'cauvery',
          'Sacred Waters of the Delta',
          'Murugesan & Valliammai',
          'Wetland Traditional Stewards',
          'Ancient Wetland Stewardship',
          'The river Cauvery does not just supply irrigation water; she brings living mineral silt from the mountains that gives our Samba rice its sacred healing power.',
          'In our village near Kumbakonam, wet paddy fields are cultivated using ancient Chola canal networks. We allow wild ducks, native mud crabs, and indigenous river snails to live within the standing water of our rice paddies—they eliminate weed seeds naturally and aerate the muddy soil. Our Mappillai Samba rice is legendary across southern India for building strength and endurance.',
          'river-flow',
          'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=800&q=80'
        ]
      ];

      const stmtStory = db.prepare(`
        INSERT OR REPLACE INTO stories (
          id, region_id, title, farmer_name, role_title, category,
          quote, full_story, ambient_sound, image_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      seedStories.forEach(s => stmtStory.run(s));
      stmtStory.finalize();

      // 6. Produce Hampers table
      db.run(`
        CREATE TABLE IF NOT EXISTS hampers (
          id TEXT PRIMARY KEY,
          region_id TEXT NOT NULL,
          name TEXT NOT NULL,
          price_usd INTEGER NOT NULL,
          weight TEXT NOT NULL,
          freshness_window TEXT NOT NULL,
          inclusions TEXT NOT NULL,
          steward TEXT NOT NULL,
          stock_remaining INTEGER DEFAULT 20,
          image_url TEXT NOT NULL,
          FOREIGN KEY (region_id) REFERENCES regions (id)
        )
      `);

      const seedHampers = [
        [
          'hamper-sahyadri',
          'sahyadri',
          'Sahyadri Monsoon & Wild Honey Crate',
          48,
          '5.5 kg',
          'Harvested Nov 2026 • Dispatched Fresh within 48h',
          'Indrayani Fragrant Rice (2kg), Raw Wild Mountain Honey (500g), Sprouted Nachni Ragi Flour (1kg), Sun-dried Kokum Rinds (250g), Hand-churned A2 Desi Cow Ghee (500ml)',
          'Ramrao & Savitri Deshmukh',
          18,
          'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
        ],
        [
          'hamper-deccan',
          'deccan',
          'Deccan Shade-Canopy Agroforest Crate',
          54,
          '4.8 kg',
          'Estate Cured Nov 2026 • Small-batch Roast',
          'Single-Origin Arabica Whole Beans (500g), Malabar Green Cardamom (150g), Cold-Pressed Native Sesame Oil (1L), Sprouted Foxtail Millet (1.5kg), Raw Turmeric Rhizomes (500g)',
          'Ananya & Devraj',
          14,
          'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80'
        ],
        [
          'hamper-cauvery',
          'cauvery',
          'Cauvery Wetland Heirloom Rice Crate',
          46,
          '6.2 kg',
          'Slow Sun-Dried Nov 2026 • Ancestral Strains',
          'Seeraga Samba Petite Rice (2kg), Mappillai Samba Medicinal Red Rice (2kg), Palmyra Palm Jaggery Block (1kg), Fresh Coconut Blossom Nectar (500ml), Hand-ground Idli Podi (300g)',
          'Murugesan & Valliammai',
          22,
          'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80'
        ],
        [
          'hamper-punjab',
          'punjab',
          'Punjab Winter Hearth Harvest Crate',
          52,
          '7.0 kg',
          'Freshly Milled Nov 2026 • Cold-Pressed Pure',
          'Stone-Ground Sharbati Amber Wheat (3kg), Cold-Pressed Yellow Mustard Oil (1L), Desi Sugarcane Gur (1.5kg), Raw Clover Honey (500g), Hand-pounded Garam Masala Blend (250g)',
          'Gurmehar Singh',
          16,
          'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
        ]
      ];

      const stmtHamper = db.prepare(`
        INSERT OR REPLACE INTO hampers (
          id, region_id, name, price_usd, weight, freshness_window,
          inclusions, steward, stock_remaining, image_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      seedHampers.forEach(h => stmtHamper.run(h));
      stmtHamper.finalize();

      // 7. Hamper Orders table
      db.run(`
        CREATE TABLE IF NOT EXISTS hamper_orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          order_ref TEXT UNIQUE NOT NULL,
          hamper_id TEXT NOT NULL,
          full_name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          delivery_address TEXT NOT NULL,
          frequency TEXT NOT NULL,
          special_notes TEXT,
          status TEXT DEFAULT 'confirmed',
          qr_code_data TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (hamper_id) REFERENCES hampers (id)
        )
      `);

      // 8. Phase 4: Seasonal Agrarian Workshops / Masterclasses
      db.run(`
        CREATE TABLE IF NOT EXISTS workshops (
          id TEXT PRIMARY KEY,
          region_id TEXT NOT NULL,
          title TEXT NOT NULL,
          subtitle TEXT NOT NULL,
          instructor TEXT NOT NULL,
          role_title TEXT NOT NULL,
          difficulty TEXT NOT NULL,
          duration TEXT NOT NULL,
          schedule TEXT NOT NULL,
          price_usd INTEGER NOT NULL,
          max_participants INTEGER NOT NULL,
          remaining_seats INTEGER NOT NULL,
          curriculum TEXT NOT NULL,
          takeaways TEXT NOT NULL,
          image_url TEXT NOT NULL,
          FOREIGN KEY (region_id) REFERENCES regions (id)
        )
      `);

      const seedWorkshops = [
        [
          'ws-jeevamrutha',
          'sahyadri',
          'Jeevamrutha & Living Soil Microbiology',
          'Brew ancient microbial nectar to revitalize degraded soil naturally',
          'Ramrao & Savitri Deshmukh',
          'Master Agroforest Stewards',
          'All Ages & Beginners',
          '3.5 Hours',
          'Every Saturday • 9:30 AM',
          35,
          14,
          6,
          '1. Microbial Soil Ecology & Earthworm Habitats • 2. Fermenting Desi Cow Dung & Jaggery Inoculum • 3. Application on Basalt Terraces',
          'Active Jeevamrutha culture flask, Sahyadri heirloom seed envelope, Cotton garden apron, Woodfire hearth lunch',
          'https://images.unsplash.com/photo-1592417817098-8f3d6ef2c6e6?auto=format&fit=crop&w=800&q=80'
        ],
        [
          'ws-chulha-baking',
          'punjab',
          'Clay Chulha Hearth & Heirloom Grains',
          'Hand-knead ancestral emmer & bake rustic flatbreads on open clay embers',
          'Gurmehar Singh & Family',
          'Heritage Wheat Conservators',
          'Family & Food Enthusiasts',
          '4.0 Hours',
          'Every Sunday • 10:00 AM',
          42,
          16,
          5,
          '1. Stone-Milling Sharbati & Makki Grains • 2. Shaping Earthen Clay Tandoor & Wood Embers • 3. Slow Hearth Cooking & Fresh Makhan Churning',
          'Cast-iron hearth paddle, 2kg stone-ground flour pouch, Fresh white butter crock, Family communal feast',
          'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80'
        ],
        [
          'ws-syntropic-canopy',
          'deccan',
          'Syntropic Agroforestry & Shade Coffee',
          'Design multi-layered edible forests that harvest rainwater and create microclimates',
          'Ananya & Devraj',
          'Regenerative Forest Designers',
          'Enthusiasts & Permaculturists',
          '4.5 Hours',
          'Saturdays • 8:30 AM',
          48,
          12,
          4,
          '1. Stratification: Canopy, Sub-canopy, Root Layers • 2. Biomass Pruning & Living Mulch Matrices • 3. Harvesting Shade-Grown Arabica & Cardamom',
          'Estate Arabica roast sample, Grafted sapling of native nitrogen fixer, Syntropic design blueprint, Farmhouse lunch',
          'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80'
        ],
        [
          'ws-wetland-heirloom',
          'cauvery',
          'Ancient Wetland Rice & Silt Stewardship',
          'Wade into delta mud, transplant ancestral Samba rice, and learn natural aquatic weed control',
          'Murugesan & Valliammai',
          'Traditional Wetland Stewards',
          'Family & Nature Lovers',
          '3.5 Hours',
          'Every Sunday • 9:00 AM',
          38,
          15,
          7,
          '1. Ancient Chola Waterways & Alluvial Silt Science • 2. Barefoot Rice Paddy Transplanting & Duck Foraging • 3. Banana Leaf Feast with Fragrant Seeraga Samba',
          'Sprouted Samba seedling bundle, Palmyra palm jaggery brick, Traditional farmer headcloth, Banana leaf temple lunch',
          'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=800&q=80'
        ]
      ];

      const stmtWorkshop = db.prepare(`
        INSERT OR REPLACE INTO workshops (
          id, region_id, title, subtitle, instructor, role_title,
          difficulty, duration, schedule, price_usd, max_participants,
          remaining_seats, curriculum, takeaways, image_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      seedWorkshops.forEach(w => stmtWorkshop.run(w));
      stmtWorkshop.finalize();

      // 9. Phase 4: Workshop Registrations table
      db.run(`
        CREATE TABLE IF NOT EXISTS workshop_registrations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          ticket_ref TEXT UNIQUE NOT NULL,
          workshop_id TEXT NOT NULL,
          full_name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          session_date TEXT NOT NULL,
          seats INTEGER NOT NULL DEFAULT 1,
          special_notes TEXT,
          status TEXT DEFAULT 'confirmed',
          qr_code_data TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (workshop_id) REFERENCES workshops (id)
        )
      `);

      // 10. Phase 4: Verified Community Reviews & Guest Logbook
      db.run(`
        CREATE TABLE IF NOT EXISTS reviews (
          id TEXT PRIMARY KEY,
          booking_ref TEXT,
          region_id TEXT NOT NULL,
          guest_name TEXT NOT NULL,
          city TEXT NOT NULL,
          rating INTEGER NOT NULL DEFAULT 5,
          title TEXT NOT NULL,
          comment TEXT NOT NULL,
          farm_response TEXT,
          visit_date TEXT NOT NULL,
          helpful_count INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (region_id) REFERENCES regions (id)
        )
      `);

      const seedReviews = [
        [
          'rev-1',
          'ODK-2610-8KWQ',
          'deccan',
          'Kavita Ramachandran',
          'Bengaluru',
          5,
          'An unforgettable reset for our tech-weary family',
          'My husband and I work 60+ hour weeks in software. Bringing our 8-year-old twins to Ananya and Devraj’s living farm was transformative. Seeing our children gently hold earthworms and plant cardamom saplings instead of staring at iPads brought tears to our eyes. The food was heaven.',
          'Ananya says: Watching the twins run through the coffee grove reminded us why we turned our back on corporate cubicles!',
          'October 2026',
          38
        ],
        [
          'rev-2',
          'ODK-2610-P4TM',
          'sahyadri',
          'Arun & Sunita Kulkarni',
          'Pune',
          5,
          'Wading into living paddy mud cured my chronic anxiety',
          'Ramrao and Savitri treated us like long-lost family. Putting bare feet into cool basalt mud while learning about 60 ancestral rice varieties made all my city stress vanish. The woodfire Indrayani rice lunch under the ancient banyan tree was the best meal of my life.',
          'Ramrao says: The rice you helped transplant is already heading into golden bloom, Arun! Come back for harvest feast.',
          'October 2026',
          44
        ],
        [
          'rev-3',
          'ODK-2609-M9LA',
          'punjab',
          'Siddharth Verma',
          'New Delhi',
          5,
          'The aroma of woodfire hearth & golden mustard seas',
          'I brought my elderly parents back to Punjab where they grew up. Gurmehar’s farm is pure magic. We sat around the clay chulha while his mother served hot makki di roti dripping with fresh white butter. It bridged three generations in an afternoon.',
          'Gurmehar says: Your father’s folk stories around our evening chulha will be remembered for years to come!',
          'September 2026',
          29
        ],
        [
          'rev-4',
          'ODK-2610-3TXR',
          'cauvery',
          'Dr. Lakshmi Venkatesh',
          'Chennai',
          5,
          'A living communion with 2,000 years of agricultural wisdom',
          'As a botanist, I was astonished by the ecological harmony in Murugesan’s wetlands. Ducks eating weeds, mud crabs aerating the roots, and river silt carrying mountain minerals. This is not just farming; it is living regenerative poetry.',
          'Murugesan says: The river Cauvery is our common mother, Dr. Lakshmi. Her blessings feed us all.',
          'October 2026',
          51
        ],
        [
          'rev-5',
          'ODK-2611-L2PQ',
          'sahyadri',
          'Nikhil & Tanya Merchant',
          'Mumbai',
          5,
          'Pure bliss 2 hours from Mumbai',
          'The highland air was crisp, the honey was warm right from the hive, and the Deshmukh family’s warmth is unmatched. Zero advance deposit required made booking completely stress-free. We have already subscribed to their monthly harvest box!',
          'Savitri says: Your wild mountain honey jar was hand-packed this Monday, Tanya!',
          'November 2026',
          19
        ],
        [
          'rev-6',
          'ODK-2610-9WRQ',
          'deccan',
          'Rohan Mehra',
          'Hyderabad',
          5,
          'The Syntropic workshop opened my eyes to real sustainability',
          'Devraj explained how multi-tier canopies cool the ground and capture morning moisture. We planted 30 native trees together and shared filter coffee under shade trees. Truly an essential experience for every urban citizen.',
          'Devraj says: Your jackfruit tree seedling has taken root beautifully, Rohan.',
          'October 2026',
          22
        ]
      ];

      const stmtReview = db.prepare(`
        INSERT OR REPLACE INTO reviews (
          id, booking_ref, region_id, guest_name, city, rating,
          title, comment, farm_response, visit_date, helpful_count
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      seedReviews.forEach(r => stmtReview.run(r));
      stmtReview.finalize();

      resolve();
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

// Phase 3: Farmer Stories queries
async function getStories() {
  return all(`
    SELECT s.*, r.name as region_name, r.farm_name, r.location as farm_location
    FROM stories s
    JOIN regions r ON s.region_id = r.id
    ORDER BY s.id
  `);
}

async function getStoryById(idOrRegionId) {
  const cleanId = idOrRegionId ? idOrRegionId.replace(/^story-/, '') : '';
  return get(`
    SELECT s.*, r.name as region_name, r.farm_name, r.location as farm_location
    FROM stories s
    JOIN regions r ON s.region_id = r.id
    WHERE s.id = ? OR s.region_id = ? OR s.region_id = ? OR s.id = 'story-' || ?
  `, [idOrRegionId, idOrRegionId, cleanId, cleanId]);
}

// Phase 3: Produce Hampers queries
async function getHampers() {
  return all(`
    SELECT h.*, r.name as region_name, r.farm_name
    FROM hampers h
    JOIN regions r ON h.region_id = r.id
    ORDER BY h.id
  `);
}

async function getHamperById(id) {
  return get(`
    SELECT h.*, r.name as region_name, r.farm_name, r.location as farm_location
    FROM hampers h
    JOIN regions r ON h.region_id = r.id
    WHERE h.id = ?
  `, [id]);
}

// Phase 3: Create Hamper Reservation / Subscription Order
async function createHamperOrder(data) {
  const {
    hamperId,
    fullName,
    email,
    phone,
    deliveryAddress,
    frequency = 'one_time',
    specialNotes = ''
  } = data;

  const hamper = await getHamperById(hamperId);
  if (!hamper) throw new Error('Selected harvest hamper not found.');
  if (hamper.stock_remaining <= 0) throw new Error('This harvest hamper is currently fully reserved.');

  // Generate unique order ref: ODK-BOX-YYYYMM-XXXX
  const now = new Date();
  const ym = String(now.getFullYear()).slice(2) + String(now.getMonth() + 1).padStart(2, '0');
  const randSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  const orderRef = `ODK-BOX-${ym}-${randSuffix}`;

  const qrPayload = JSON.stringify({
    orderRef,
    hamper: hamper.name,
    customer: fullName,
    frequency,
    dispatchedBy: hamper.steward,
    verified: true
  });

  const qrCodeData = await QRCode.toDataURL(qrPayload, {
    width: 260,
    margin: 1,
    color: {
      dark: '#203C2B',
      light: '#F5F1E8'
    }
  });

  await run(`UPDATE hampers SET stock_remaining = stock_remaining - 1 WHERE id = ?`, [hamperId]);

  await run(`
    INSERT INTO hamper_orders (
      order_ref, hamper_id, full_name, email, phone,
      delivery_address, frequency, special_notes, status, qr_code_data
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'confirmed', ?)
  `, [orderRef, hamperId, fullName, email, phone, deliveryAddress, frequency, specialNotes, qrCodeData]);

  return getHamperOrderByRef(orderRef);
}

// Phase 3: Get Hamper Order by Reference
async function getHamperOrderByRef(orderRef) {
  return get(`
    SELECT 
      o.*,
      h.name as hamper_name,
      h.price_usd,
      h.weight,
      h.freshness_window,
      h.inclusions,
      h.steward,
      h.image_url as hamper_image,
      r.name as region_name,
      r.farm_name
    FROM hamper_orders o
    JOIN hampers h ON o.hamper_id = h.id
    JOIN regions r ON h.region_id = r.id
    WHERE o.order_ref = ?
  `, [orderRef]);
}

// Phase 4: Workshop queries
async function getWorkshops(regionId = null) {
  if (regionId && regionId !== 'all') {
    return all(`
      SELECT w.*, r.name as region_name, r.farm_name, r.location as farm_location
      FROM workshops w
      JOIN regions r ON w.region_id = r.id
      WHERE w.region_id = ?
      ORDER BY w.price_usd ASC
    `, [regionId]);
  }
  return all(`
    SELECT w.*, r.name as region_name, r.farm_name, r.location as farm_location
    FROM workshops w
    JOIN regions r ON w.region_id = r.id
    ORDER BY w.price_usd ASC
  `);
}

async function getWorkshopById(id) {
  return get(`
    SELECT w.*, r.name as region_name, r.farm_name, r.location as farm_location
    FROM workshops w
    JOIN regions r ON w.region_id = r.id
    WHERE w.id = ?
  `, [id]);
}

async function registerWorkshop({ workshopId, fullName, email, phone, sessionDate, seats = 1, specialNotes = '' }) {
  const workshop = await getWorkshopById(workshopId);
  if (!workshop) {
    throw new Error('Workshop not found.');
  }

  const seatCount = parseInt(seats, 10) || 1;
  if (workshop.remaining_seats < seatCount) {
    throw new Error(`Only ${workshop.remaining_seats} seats remaining for this masterclass.`);
  }

  const datePart = (sessionDate || new Date().toISOString().slice(0, 10)).replace(/-/g, '').slice(2, 6);
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  const ticketRef = `ODK-WS-${datePart}-${randomSuffix}`;

  const qrPayload = JSON.stringify({
    type: 'WORKSHOP_PASS',
    ref: ticketRef,
    workshop: workshop.title,
    instructor: workshop.instructor,
    farm: workshop.farm_name,
    guest: fullName,
    date: sessionDate,
    seats: seatCount,
    verification: 'CONFIRMED_ZERO_ADVANCE'
  });

  const qrCodeData = await QRCode.toDataURL(qrPayload, {
    width: 260,
    margin: 1,
    color: {
      dark: '#203C2B',
      light: '#F5F1E8'
    }
  });

  await run(`UPDATE workshops SET remaining_seats = remaining_seats - ? WHERE id = ?`, [seatCount, workshopId]);

  await run(`
    INSERT INTO workshop_registrations (
      ticket_ref, workshop_id, full_name, email, phone,
      session_date, seats, special_notes, status, qr_code_data
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'confirmed', ?)
  `, [ticketRef, workshopId, fullName, email, phone, sessionDate, seatCount, specialNotes, qrCodeData]);

  return getWorkshopRegistrationByRef(ticketRef);
}

async function getWorkshopRegistrationByRef(ticketRef) {
  return get(`
    SELECT 
      wr.*,
      w.title as workshop_title,
      w.subtitle as workshop_subtitle,
      w.instructor,
      w.role_title,
      w.duration,
      w.schedule,
      w.price_usd,
      w.takeaways,
      w.curriculum,
      w.image_url as workshop_image,
      r.name as region_name,
      r.farm_name,
      r.location as farm_location
    FROM workshop_registrations wr
    JOIN workshops w ON wr.workshop_id = w.id
    JOIN regions r ON w.region_id = r.id
    WHERE wr.ticket_ref = ?
  `, [ticketRef]);
}

// Phase 4: Reviews & Guest Logbook queries
async function getReviews(regionId = null) {
  let reviews;
  if (regionId && regionId !== 'all') {
    reviews = await all(`
      SELECT rv.*, r.name as region_name, r.farm_name
      FROM reviews rv
      JOIN regions r ON rv.region_id = r.id
      WHERE rv.region_id = ?
      ORDER BY rv.helpful_count DESC, rv.id DESC
    `, [regionId]);
  } else {
    reviews = await all(`
      SELECT rv.*, r.name as region_name, r.farm_name
      FROM reviews rv
      JOIN regions r ON rv.region_id = r.id
      ORDER BY rv.helpful_count DESC, rv.id DESC
    `);
  }

  const allRatings = reviews.map(r => r.rating);
  const avgRating = allRatings.length ? (allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(2) : '5.00';

  return {
    reviews,
    stats: {
      total_reviews: reviews.length,
      average_rating: parseFloat(avgRating),
      verified_percentage: 100,
      five_star_count: reviews.filter(r => r.rating === 5).length
    }
  };
}

async function createReview({ bookingRef = '', regionId, guestName, city, rating = 5, title, comment }) {
  const newId = 'rev-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 5);
  const dateStr = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });

  const stewardReplies = {
    sahyadri: 'Ramrao & Savitri Deshmukh say: Thank you for stepping barefoot into our mountain soil! You are always welcome back.',
    deccan: 'Ananya & Devraj say: We are so happy the living agroforest gave your family biological peace and deep nourishment.',
    punjab: 'Gurmehar Singh says: Warm hearth fires and hot makki roti will always be waiting for your family at our farm.',
    cauvery: 'Murugesan & Valliammai say: The sacred river waters and traditional rice paddies send you our deepest blessings.'
  };

  const farmResponse = stewardReplies[regionId] || 'Our agrarian stewards thank you warmly for honoring our living earth.';

  await run(`
    INSERT INTO reviews (
      id, booking_ref, region_id, guest_name, city, rating,
      title, comment, farm_response, visit_date, helpful_count
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
  `, [newId, bookingRef, regionId, guestName, city, parseInt(rating, 10) || 5, title, comment, farmResponse, dateStr]);

  return get(`
    SELECT rv.*, r.name as region_name, r.farm_name
    FROM reviews rv
    JOIN regions r ON rv.region_id = r.id
    WHERE rv.id = ?
  `, [newId]);
}

async function likeReview(id) {
  await run(`UPDATE reviews SET helpful_count = helpful_count + 1 WHERE id = ?`, [id]);
  return get(`SELECT id, helpful_count FROM reviews WHERE id = ?`, [id]);
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
};
