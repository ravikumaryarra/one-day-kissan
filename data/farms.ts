export interface Hotspot {
  id: string;
  title: string;
  description: string;
  yaw: number; // horizontal angle in degrees (-180 to 180)
  pitch: number; // vertical angle in degrees (-90 to 90)
  icon: string;
  image?: string;
  tag: string;
}

export interface FarmLocation {
  id: "bhongir" | "moinabad";
  name: string;
  tagline: string;
  address: string;
  highway: string;
  travelTime: string;
  panoramaUrl: string;
  description: string;
  stats: {
    acreage: string;
    activities: number;
    dailyCapacity: string;
    distance: string;
  };
  features: string[];
  hotspots: Hotspot[];
  mapEmbedUrl: string;
  directionsUrl: string;
}

export const farmsData: Record<"bhongir" | "moinabad", FarmLocation> = {
  bhongir: {
    id: "bhongir",
    name: "Bhongir Farm",
    tagline: "India's First Water Heritage & Agriculture Experience",
    address: "Near Hotel Vivera, Hyderabad - Warangal Highway, Bhongir Bypass, Bhongir - 508 116",
    highway: "Hyderabad - Warangal Highway (NH 163)",
    travelTime: "~50 mins from Uppal / Secunderabad",
    panoramaUrl: "/panoramas/bhongir-farm.jpg",
    description: "Our flagship location specializing in traditional Indian water architecture (Persian wheel, Mota Bavi, Archimedes screw), paddy cultivation, and rural heritage living.",
    stats: {
      acreage: "15+ Acres",
      activities: 24,
      dailyCapacity: "800+ Students",
      distance: "42 km from Hyderabad",
    },
    features: [
      "Persian Wheel Working Model",
      "Traditional Mota Bavi (Deep Well)",
      "Paddy Sowing & Transplanting Mud Arena",
      "Archimedes Screw & Reservoir Model",
      "Farmer Watch Tower & Grass Castle",
      "Tractor Joyrides & DJ Celebration Arena"
    ],
    hotspots: [
      {
        id: "persian-wheel",
        title: "Persian Wheel (Rahat)",
        description: "Historic water-lifting device powered by continuous circular mechanical gear motion, demonstrating ancient hydraulic engineering.",
        yaw: 45,
        pitch: -10,
        icon: "Droplets",
        image: "/images/7.png",
        tag: "Water Heritage"
      },
      {
        id: "paddy-fields",
        title: "Paddy Transplantation Zone",
        description: "Hands-on mud fields where students step into the soil to sow and transplant rice saplings directly with local farmers.",
        yaw: -60,
        pitch: -15,
        icon: "Sprout",
        image: "/images/16.png",
        tag: "Farming Practice"
      },
      {
        id: "mota-bavi",
        title: "Mota Bavi & Vintage Well",
        description: "An authentic stone well and leather-bucket pulley mechanism demonstrating pre-electricity rural domestic water extraction.",
        yaw: 130,
        pitch: -5,
        icon: "Compass",
        image: "/images/11.png",
        tag: "Heritage Architecture"
      },
      {
        id: "watch-tower",
        title: "Farmer's Watch Tower",
        description: "Elevated vantage point overlooking the entire expanse of agricultural crops, scarecrows, and green field horizons.",
        yaw: -150,
        pitch: 15,
        icon: "Eye",
        image: "/images/14.png",
        tag: "Observation"
      }
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.495046274431!2d78.892976!3d17.436034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb7707e7ce71bb%3A0xea8db618bf5d4e13!2sOne%20Day%20Kisan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    directionsUrl: "https://maps.google.com/?q=One+Day+Kisan+Bhongir"
  },
  moinabad: {
    id: "moinabad",
    name: "Moinabad Agro-Sanctuary",
    tagline: "Eco-Aviary, Livestock Care & Organic Farming Haven",
    address: "Kapil Agro Farms, Sriramnagar, Moinabad, Telangana - 501 504",
    highway: "Chevella Road / Chilkur Balaji Corridor",
    travelTime: "~35 mins from Gachibowli / Mehdipatnam",
    panoramaUrl: "/panoramas/moinabad-farm.jpg",
    description: "Set inside lush green plantations near the IT corridor, this location features the Walk-In Birds Aviary, A1/A2 dairy education, exotic domestic birds, and climate-controlled polyhouses.",
    stats: {
      acreage: "12+ Acres",
      activities: 20,
      dailyCapacity: "650+ Visitors",
      distance: "28 km from Gachibowli",
    },
    features: [
      "Walk-In Birds Aviary (Budgies, Doves, Finches)",
      "Desi Gir & Sahiwal Dairy Cattle Shed",
      "Vermicompost & Earthworm Pits",
      "Polyhouse Hi-Tech Agriculture",
      "Pottery & Clay Wheel Workshop",
      "Organic Vegetable & Herb Plots"
    ],
    hotspots: [
      {
        id: "aviary",
        title: "Walk-In Aviary",
        description: "Immersive bird sanctuary where children safely interact with harmless birds, feed nectar seeds, and observe nesting behavior.",
        yaw: 20,
        pitch: 0,
        icon: "Feather",
        image: "/images/23.png",
        tag: "Biodiversity"
      },
      {
        id: "dairy-cattle",
        title: "Desi Cattle Dairy Station",
        description: "Hands-on care, feeding, and educational overview of indigenous Indian cattle breeds (Gir, Kankrej) and the nutritional science of A2 milk.",
        yaw: -110,
        pitch: -10,
        icon: "HeartHandshake",
        image: "/images/18.png",
        tag: "Animal Husbandry"
      },
      {
        id: "polyhouse",
        title: "Climate-Controlled Polyhouse",
        description: "Modern greenhouse methods showcasing drip irrigation, micro-climate humidity control, and soil-less nursery techniques.",
        yaw: 160,
        pitch: -5,
        icon: "Leaf",
        image: "/images/13.png",
        tag: "Modern Agritech"
      },
      {
        id: "vermicompost",
        title: "Vermicompost Earthworm Pit",
        description: "Discover nature's recyclers—how Eisenia fetida earthworms transform farm compost into rich bio-fertilizer within 45 days.",
        yaw: -45,
        pitch: -20,
        icon: "Recycle",
        image: "/images/4.png",
        tag: "Soil Health"
      }
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3809.845678!2d78.273!3d17.332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbeabbbb!2sKapil+Agro+Farms!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    directionsUrl: "https://maps.google.com/?q=Kapil+Agro+Farms+Moinabad"
  }
};
