export type Language = "en" | "te";

export interface AppTranslations {
  brand: {
    name: string;
    tagline: string;
    subtagline: string;
    location: string;
  };
  nav: {
    story: string;
    tour360: string;
    directions: string;
    schools: string;
    gallery: string;
    reviews: string;
    faqs: string;
    bookVisit: string;
    callHelpline: string;
    adminPortal: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
    exploreTourBtn: string;
    bookVisitBtn: string;
    stat1Label: string;
    stat1Desc: string;
    stat2Label: string;
    stat2Desc: string;
    stat3Label: string;
    stat3Desc: string;
  };
  prologue: {
    badge: string;
    title: string;
    bodyPart1: string;
    bodyHighlight: string;
    bodyPart2: string;
    highwayNote: string;
    audienceNote: string;
  };
  tour360: {
    badge: string;
    title: string;
    subtitle: string;
    selectFarm: string;
    bhongirFarm: string;
    moinabadFarm: string;
    fullscreen: string;
    exitFullscreen: string;
    instructions: string;
  };
  directions: {
    badge: string;
    title: string;
    subtitle: string;
    bhongirTitle: string;
    bhongirHighway: string;
    bhongirAddress: string;
    bhongirTime: string;
    moinabadTitle: string;
    moinabadHighway: string;
    moinabadAddress: string;
    moinabadTime: string;
    openMaps: string;
    callDesk: string;
  };
  booking: {
    modalTitle: string;
    modalSubtitle: string;
    tabOnlineToken: string;
    tabWhatsApp: string;
    visitTypeLabel: string;
    school: string;
    corporate: string;
    family: string;
    farmSelectLabel: string;
    nameLabel: string;
    namePlaceholder: string;
    orgLabel: string;
    orgPlaceholder: string;
    cityLabel: string;
    headcountLabel: string;
    dateLabel: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    notesLabel: string;
    tokenSummaryTitle: string;
    perPersonEst: string;
    tokenPayableNow: string;
    balanceDueAtGate: string;
    payTokenBtn: string;
    processing: string;
    submitWhatsAppBtn: string;
    ticketSuccessTitle: string;
    ticketSuccessSubtitle: string;
    ticketReference: string;
    qrPassNote: string;
    printPassBtn: string;
    shareWhatsAppBtn: string;
  };
  footer: {
    manifesto: string;
    downloadBrochure: string;
    quickLinks: string;
    campuses: string;
    operatingHours: string;
    copyright: string;
    privacy: string;
    terms: string;
    refunds: string;
    safety: string;
  };
}

export const translations: Record<Language, AppTranslations> = {
  en: {
    brand: {
      name: "One Day Kissan",
      tagline: "Experience Life. Learn Real Farming.",
      subtagline: "India's Premier Farm-Based Edutainment Destination",
      location: "Bhongir & Moinabad, Telangana",
    },
    nav: {
      story: "The Experience",
      tour360: "360° Virtual Tour",
      directions: "Directions",
      schools: "Schools & Field Trips",
      gallery: "Curated Photos",
      reviews: "Testimonials",
      faqs: "FAQs",
      bookVisit: "Book a Visit",
      callHelpline: "98497 98674",
      adminPortal: "Staff Portal",
    },
    hero: {
      badge: "India's Premier Farm-Based Edutainment Destination",
      titleLine1: "Reconnect to Living",
      titleHighlight: "Indian Agriculture",
      subtitle: "Give your children the childhood you had. 15 acres of living farmland near Hyderabad featuring muddy paddy transplantation, working Persian water wheels, and traditional village crafts.",
      exploreTourBtn: "Explore 360° Farm Tour",
      bookVisitBtn: "Book Farm Visit",
      stat1Label: "15+ Acres",
      stat1Desc: "Two scenic agro-sanctuaries at Bhongir & Moinabad",
      stat2Label: "350+ Schools",
      stat2Desc: "CBSE & ICSE curriculum field trips hosted",
      stat3Label: "24 Modules",
      stat3Desc: "Barefoot paddy, Persian wheel, pottery & cattle care",
    },
    prologue: {
      badge: "The Living Farm Manifesto",
      title: "Why One Day Kissan Exists",
      bodyPart1: "Today, an urban child in Hyderabad spends over six hours a day looking into glass screens. They can pass a botany exam without ever touching the silky roots of a rice sapling.",
      bodyHighlight: "One Day Kissan (One Day Kisan) is not a resort or a sterile amusement park.",
      bodyPart2: "It is fifteen acres of living, breathing Telangana farmland—two lush campuses at Bhongir and Moinabad—where children take off their sneakers, roll up their sleeves, and discover how humanity actually survives.",
      highwayNote: "45 mins from Hyderabad (ORR Access)",
      audienceNote: "Open for Schools, Corporates & Families",
    },
    tour360: {
      badge: "Panoramic Virtual Horizon",
      title: "Step Inside Both Farm Campuses",
      subtitle: "Look around our live paddy fields, working Persian water wheel, Desi Gir cattle dairy, and shady mango orchards before your visit.",
      selectFarm: "Select Campus",
      bhongirFarm: "Bhongir Main Farm (15+ Acres)",
      moinabadFarm: "Moinabad Agro-Sanctuary (12+ Acres)",
      fullscreen: "Enter Fullscreen",
      exitFullscreen: "Exit Fullscreen",
      instructions: "Drag to look 360° around • Tap glowing beacons to discover farm modules",
    },
    directions: {
      badge: "Campus Locations & Highway Routes",
      title: "How to Reach Our Farm Campuses",
      subtitle: "Conveniently situated along major Telangana highway corridors, accessible within 35 to 50 minutes from Hyderabad via the Outer Ring Road (ORR).",
      bhongirTitle: "Bhongir Main Farm (Flagship Campus)",
      bhongirHighway: "Hyderabad - Warangal Highway (NH 163) • ORR Exit 9",
      bhongirAddress: "Near Hotel Vivera, Hyderabad - Warangal Highway, Bhongir Bypass, Yadadri Bhuvanagiri District, Telangana - 508116.",
      bhongirTime: "~45–50 Mins from Hyderabad (Uppal / Secunderabad)",
      moinabadTitle: "Moinabad Agro-Sanctuary",
      moinabadHighway: "Chilkur Balaji Corridor • Chevella Road • ORR Exit 18",
      moinabadAddress: "Kapil Agro Farms, Sriramnagar, Chilkur Balaji Corridor, Chevella Road, Moinabad, Telangana - 501504.",
      moinabadTime: "~30–35 Mins from Gachibowli / Financial District",
      openMaps: "Open in Google Maps",
      callDesk: "Call Campus Helpdesk",
    },
    booking: {
      modalTitle: "Plan Your Farm Experience",
      modalSubtitle: "Reserve your date for schools, corporate teams, or family weekend day passes.",
      tabOnlineToken: "Instant Online Token (UPI / Card)",
      tabWhatsApp: "Direct WhatsApp Inquiry",
      visitTypeLabel: "Select Visit Category",
      school: "School Field Trip",
      corporate: "Corporate Retreat",
      family: "Family Day Pass",
      farmSelectLabel: "Choose Campus",
      nameLabel: "Contact Name",
      namePlaceholder: "Enter your full name",
      orgLabel: "School / Organization Name",
      orgPlaceholder: "E.g., Oakridge International School / Tech Mahindra",
      cityLabel: "City / Location",
      headcountLabel: "Estimated Headcount (Persons)",
      dateLabel: "Preferred Visit Date",
      phoneLabel: "Mobile / WhatsApp Number",
      phonePlaceholder: "10-digit mobile number (e.g. 9849798674)",
      emailLabel: "Email Address (for Digital Pass)",
      notesLabel: "Specific Focus or Food Preferences (Optional)",
      tokenSummaryTitle: "Estimated Pricing & Advance Token",
      perPersonEst: "Package Rate:",
      tokenPayableNow: "Advance Token Due Now:",
      balanceDueAtGate: "Balance Settled at Farm Gate:",
      payTokenBtn: "Pay Advance Token & Generate Pass",
      processing: "Opening Secure Gateway...",
      submitWhatsAppBtn: "Submit Inquiry via WhatsApp",
      ticketSuccessTitle: "Booking Confirmed & Gate Pass Issued!",
      ticketSuccessSubtitle: "Your digital pass is generated. Present this QR pass or reference code upon arrival at the campus gate.",
      ticketReference: "Pass Reference ID:",
      qrPassNote: "Show this digital pass at the entrance gate for express check-in.",
      printPassBtn: "Print / Save Pass",
      shareWhatsAppBtn: "Share to WhatsApp",
    },
    footer: {
      manifesto: "India's First Farm-Based Edutainment Destination. Reconnecting urban schools, corporate teams, and families to living Indian agricultural heritage, water engineering, and living soil stewardship.",
      downloadBrochure: "Download Official 2024–2025 Brochure (PDF)",
      quickLinks: "Quick Navigation",
      campuses: "Our Campuses",
      operatingHours: "Operating Hours: 9:00 AM – 6:00 PM (All 7 Days)",
      copyright: "© 2026 One Day Kissan. Experience Life. Learn Real Farming.",
      privacy: "Privacy Policy",
      terms: "Terms of Entry",
      refunds: "Cancellation & Refunds",
      safety: "Safety Standards",
    },
  },
  te: {
    brand: {
      name: "వన్ డే కిస్సాన్",
      tagline: "జీవితాన్ని ఆస్వాదించండి. అసలైన వ్యవసాయాన్ని నేర్చుకోండి.",
      subtagline: "భారతదేశపు అగ్రగామి వ్యవసాయ ఆధారిత విద్యా వినోద కేంద్రం",
      location: "భువనగిరి & మొయినాబాద్, తెలంగాణ",
    },
    nav: {
      story: "వ్యవసాయ అనుభవం",
      tour360: "360° వర్చువల్ టూర్",
      directions: "దారి / మార్గాలు",
      schools: "పాఠశాలల విద్యా యాత్రలు",
      gallery: "చిత్రమాలిక",
      reviews: "సమీక్షలు",
      faqs: "సందేహాలు",
      bookVisit: "సందర్శన బుక్ చేయండి",
      callHelpline: "98497 98674",
      adminPortal: "సిబ్బంది పోర్టల్",
    },
    hero: {
      badge: "భారతదేశపు అగ్రగామి వ్యవసాయ ఆధారిత విద్యా వినోద కేంద్రం",
      titleLine1: "జీవకళతో ఉట్టిపడే",
      titleHighlight: "భారతీయ వ్యవసాయం",
      subtitle: "మీ చిన్నతనంలో మీరు ఆస్వాదించిన పల్లెటూరి మధురమైన జ్ఞాపకాలను మీ పిల్లలకు అందించండి. బురద మడిలో వరి నాట్లు, పురాతన పర్షియన్ చక్రం నీటి వసతి మరియు సాంప్రదాయ గ్రామీణ కళలు.",
      exploreTourBtn: "360° ఫార్మ్ టూర్ చూడండి",
      bookVisitBtn: "సందర్శన బుక్ చేయండి",
      stat1Label: "15+ ఎకరాలు",
      stat1Desc: "భువనగిరి & మొయినాబాద్ వద్ద రెండు అందమైన వ్యవసాయ ప్రాంగణాలు",
      stat2Label: "350+ పాఠశాలలు",
      stat2Desc: "CBSE & ICSE సిలబస్ ఆధారిత ప్రాక్టికల్ విద్యా యాత్రలు",
      stat3Label: "24 విద్యా విభాగాలు",
      stat3Desc: "వరి నాట్లు, ఏతాము, కుండల తయారీ మరియు గోశాల సంరక్షణ",
    },
    prologue: {
      badge: "సజీవ వ్యవసాయ దార్శనికత",
      title: "వన్ డే కిస్సాన్ ఎందుకు ప్రత్యేకమైనది?",
      bodyPart1: "నేటి హైదరాబాద్ నగరంలో ఒక విద్యార్థి రోజుకు ఆరు గంటలకు పైగా గాజు తెరలను చూస్తూ గడుపుతున్నాడు. చేతులతో పచ్చి వరి మొక్క వేర్లను ఎన్నడూ తాకకుండానే వృక్షశాస్త్ర పరీక్షల్లో ఉత్తీర్ణులవుతున్నారు.",
      bodyHighlight: "వన్ డే కిస్సాన్ అనేది సాధారణ రిసార్ట్ లేదా కృత్రిమ ఎమ్యూజ్‌మెంట్ పార్క్ కాదు.",
      bodyPart2: "ఇది పదిహేను ఎకరాల సజీవ తెలంగాణ వ్యవసాయ క్షేత్రం—భువనగిరి మరియు మొయినాబాద్‌లలోని రెండు పచ్చని క్యాంపస్‌లు—ఇక్కడ విద్యార్థులు బూట్లు విడిచి, చేతులు మట్టిలో పెట్టి మానవాళి మనుగడకు వ్యవసాయం ఎంత ముఖ్యమో స్వయంగా నేర్చుకుంటారు.",
      highwayNote: "హైదరాబాద్ నుండి 45 నిమిషాల ప్రయాణం (ORR ద్వారా)",
      audienceNote: "పాఠశాలలు, కార్పొరేట్ సంస్థలు & కుటుంబాలకు స్వాగతం",
    },
    tour360: {
      badge: "సమగ్ర 360° వీక్షణ",
      title: "రెండు ఫార్మ్ క్యాంపస్‌లను వర్చువల్‌గా వీక్షించండి",
      subtitle: "సందర్శనకు వచ్చే ముందే పచ్చని వరి చేలు, పురాతన పర్షియన్ చక్రం, దేశీ గిర్ గోశాల మరియు మామిడి తోటలను 360 డిగ్రీల కోణంలో చూడండి.",
      selectFarm: "క్యాంపస్ ఎంచుకోండి",
      bhongirFarm: "భువనగిరి మెయిన్ ఫార్మ్ (15+ ఎకరాలు)",
      moinabadFarm: "మొయినాబాద్ అగ్రో-శాంక్చువరీ (12+ ఎకరాలు)",
      fullscreen: "పూర్తి స్క్రీన్",
      exitFullscreen: "సాధారణ స్క్రీన్",
      instructions: "360° చుట్టూ తిప్పి చూడండి • వివరాలు తెలుసుకోవడానికి చిహ్నాలపై క్లిక్ చేయండి",
    },
    directions: {
      badge: "క్యాంపస్ మార్గాలు & హైవే వివరాలు",
      title: "మా ఫార్మ్ క్యాంపస్‌లకు చేరుకోవడం ఎలా?",
      subtitle: "తెలంగాణ ముఖ్యమైన హైవే కారిడార్లలో సులభమైన ప్రయాణ మార్గం. ఔటర్ రింగ్ రోడ్ (ORR) ద్వారా హైదరాబాద్ నుండి 35 నుండి 50 నిమిషాల్లో చేరుకోవచ్చు.",
      bhongirTitle: "భువనగిరి మెయిన్ ఫార్మ్ (ఫ్లాగ్‌షిప్ క్యాంపస్)",
      bhongirHighway: "హైదరాబాద్ - వరంగల్ జాతీయ రహదారి (NH 163) • ORR ఎగ్జిట్ 9",
      bhongirAddress: "హోటల్ వివేరా సమీపంలో, హైదరాబాద్ - వరంగల్ హైవే, భువనగిరి బైపాస్, యాదాద్రి భువనగిరి జిల్లా, తెలంగాణ - 508116.",
      bhongirTime: "ఉప్పల్ / సికింద్రాబాద్ నుండి ~45–50 నిమిషాల డ్రైవ్",
      moinabadTitle: "మొయినాబాద్ అగ్రో-శాంక్చువరీ",
      moinabadHighway: "చిల్కూరు బాలాజీ కారిడార్ • చేవెళ్ల రోడ్ • ORR ఎగ్జిట్ 18",
      moinabadAddress: "కపిల్ ఆగ్రో ఫార్మ్స్, శ్రీరామ్‌నగర్, చిల్కూరు బాలాజీ రోడ్, చేవెళ్ల మార్గం, మొయినాబాద్, తెలంగాణ - 501504.",
      moinabadTime: "గచ్చిబౌలి / హైటెక్ సిటీ నుండి ~30–35 నిమిషాల డ్రైవ్",
      openMaps: "గూగుల్ మ్యాప్స్‌లో తెరవండి",
      callDesk: "క్యాంపస్ హెల్ప్‌డెస్క్‌కు కాల్ చేయండి",
    },
    booking: {
      modalTitle: "వ్యవసాయ క్షేత్ర సందర్శన ప్లాన్ చేసుకోండి",
      modalSubtitle: "పాఠశాలలు, కార్పొరేట్ ఉద్యోగులు లేదా కుటుంబాల వీకెండ్ డే పాస్‌ల కొరకు తేదీని రిజర్వ్ చేయండి.",
      tabOnlineToken: "ఆన్‌లైన్ అడ్వాన్స్ టోకెన్ (UPI / Card)",
      tabWhatsApp: "నేరుగా వాట్సాప్ విచారణ",
      visitTypeLabel: "సందర్శన రకాన్ని ఎంచుకోండి",
      school: "పాఠశాల విద్యా యాత్ర (School Trip)",
      corporate: "కార్పొరేట్ అవుటింగ్ (Corporate)",
      family: "కుటుంబ డే పాస్ (Family Pass)",
      farmSelectLabel: "క్యాంపస్ ఎంచుకోండి",
      nameLabel: "సంప్రదించే వ్యక్తి పేరు",
      namePlaceholder: "మీ పూర్తి పేరు నమోదు చేయండి",
      orgLabel: "పాఠశాల / సంస్థ పేరు",
      orgPlaceholder: "ఉదా: ఢిల్లీ పబ్లిక్ స్కూల్ / టీసీఎస్",
      cityLabel: "నగరం / ప్రాంతం",
      headcountLabel: "సందర్శకుల సంఖ్య (వ్యక్తులు)",
      dateLabel: "సందర్శించదలచిన తేదీ",
      phoneLabel: "మొబైల్ / వాట్సాప్ నంబర్",
      phonePlaceholder: "10 అంకెల మొబైల్ నంబర్ (ఉదా: 9849798674)",
      emailLabel: "ఈమెయిల్ చిరునామా (డిజిటల్ పాస్ కొరకు)",
      notesLabel: "ప్రత్యేక అవసరాలు / భోజన సూచనలు (ఐచ్ఛికం)",
      tokenSummaryTitle: "అంచనా వ్యయం & అడ్వాన్స్ టోకెన్",
      perPersonEst: "ప్యాకేజీ రుసుము:",
      tokenPayableNow: "చెల్లించాల్సిన అడ్వాన్స్ టోకెన్:",
      balanceDueAtGate: "మిగిలిన మొత్తం ఫార్మ్ వద్ద చెల్లించవచ్చు:",
      payTokenBtn: "అడ్వాన్స్ చెల్లించి డిజిటల్ పాస్ పొందండి",
      processing: "సురక్షిత గేట్‌వే తెరవబడుతోంది...",
      submitWhatsAppBtn: "వాట్సాప్ ద్వారా అభ్యర్థన పంపండి",
      ticketSuccessTitle: "బుకింగ్ విజయవంతమైంది • గేట్ పాస్ జారీ చేయబడింది!",
      ticketSuccessSubtitle: "మీ డిజిటల్ గేట్ పాస్ సిద్ధమైంది. క్యాంపస్ ప్రవేశ ద్వారం వద్ద ఈ క్యూఆర్ కోడ్ లేదా రిఫరెన్స్ నంబర్ చూపించండి.",
      ticketReference: "పాస్ రిఫరెన్స్ ఐడీ:",
      qrPassNote: "వేగవంతమైన ప్రవేశం కొరకు ఈ డిజిటల్ పాస్‌ను గేట్ వద్ద చూపించండి.",
      printPassBtn: "పాస్ ప్రింట్ / సేవ్ చేయండి",
      shareWhatsAppBtn: "వాట్సాప్‌లో షేర్ చేయండి",
    },
    footer: {
      manifesto: "భారతదేశపు మొట్టమొదటి వ్యవసాయ ఆధారిత ఎడ్యుటైన్‌మెంట్ కేంద్రం. పట్టణ విద్యార్థులు, కార్పొరేట్ ఉద్యోగులు మరియు కుటుంబాలను సజీవ భారతీయ వ్యవసాయ వారసత్వం మరియు మట్టి సంస్కృతితో అనుసంధానిస్తుంది.",
      downloadBrochure: "అధికారిక బ్రోచర్ డౌన్‌లోడ్ చేసుకోండి (PDF)",
      quickLinks: "ముఖ్యమైన లింకులు",
      campuses: "మా ఫార్మ్ ప్రాంగణాలు",
      operatingHours: "పనివేళలు: ఉదయం 9:00 నుండి సాయంత్రం 6:00 వరకు (రోజూ)",
      copyright: "© 2026 వన్ డే కిస్సాన్. జీవితాన్ని ఆస్వాదించండి. నిజమైన వ్యవసాయాన్ని నేర్చుకోండి.",
      privacy: "గోప్యతా విధానం (Privacy)",
      terms: "నిబంధనలు (Terms)",
      refunds: "రీఫండ్ విధానం (Refunds)",
      safety: "భద్రతా ప్రమాణాలు (Safety)",
    },
  },
};
