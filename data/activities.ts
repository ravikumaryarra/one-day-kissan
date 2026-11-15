export interface Activity {
  id: number;
  img: string;
  icon_path?: string;
  title: string;
  short: string;
  full: string;
  category: "agriculture" | "heritage_tech" | "animals" | "experiences";
}

export const activities: Activity[] = [
  {
    "img": "images/18.png",
    "icon_path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
    "title": "Domestic & Exotic Animals",
    "short": "Learn about cattle, milking, and A1/A2 milk.",
    "full": "Learn about cattle types, feeding, hands-on milking, and the difference between A1 and A2 milk. Understand India's role as world leader in milk production. Get up close with friendly farm animals and learn about responsible animal husbandry.",
    "id": 1,
    "category": "animals"
  },
  {
    "img": "images/16.png",
    "icon_path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
    "title": "Ploughing",
    "short": "Experience soil preparation firsthand.",
    "full": "Ploughing helps remove weeds and loosen soil \u2014 one of the most important farming activities. Our motto is to help every student experience the process of ploughing. Get your hands dirty and understand why soil preparation is crucial for a good harvest.",
    "id": 2,
    "category": "agriculture"
  },
  {
    "img": "images/4.png",
    "icon_path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
    "title": "Vermicompost / Earthworm Pit",
    "short": "Understand organic waste recycling and soil health.",
    "full": "Understand why earthworms are called the farmer's friend and how they help make soil fertile. Learn about organic farming and vermicompost. Know why Vermicompost is becoming popular as a major component of organic farming systems.",
    "id": 3,
    "category": "agriculture"
  },
  {
    "img": "images/1.png",
    "icon_path": "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8 0-1.5.4-2.9 1.1-4.1l3.9 7.1v1c0 1.1.9 2 2 2v2zm7.9-2.5c-.3-.8-1.1-1.4-2-1.4h-1v-3c0-.5-.5-1-1-1H8v-2h2c.6 0 1-.4 1-1V8h2c1.1 0 2-.9 2-2V5.6c2.9 1.2 5 4 5 7.4 0 2-.8 3.9-2.1 5.3z",
    "title": "Dung Cake Making",
    "short": "Learn how cow dung is used to make natural fuel.",
    "full": "\"Dung cakes\", made from the by-products of animal husbandry, are traditionally used as fuel in India for cooking food in a domestic hearth called a Chulha. They are made by hand by village women and are traditionally made from cow or buffalo dung. Experience this ancient art practiced by village women for centuries.",
    "id": 4,
    "category": "agriculture"
  },
  {
    "img": "images/5.png",
    "icon_path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
    "title": "Scarecrow Making",
    "short": "Build scarecrows and learn how they protect crops.",
    "full": "Understand what a scarecrow is, why farmers use them in their farms, and how they impact cultivation at different stages. Make one with a group of friends! Build scarecrows and learn how they protect crops in this creative team activity.",
    "id": 5,
    "category": "agriculture"
  },
  {
    "img": "images/21.png",
    "icon_path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
    "title": "Paddy Life Cycle",
    "short": "From seed to harvest \u2014 a journey of growth.",
    "full": "From seed to harvest \u2014 the paddy life cycle is a journey of resilience and growth, nurturing the earth and feeding the world. Learn about sowing, transplantation, growth stages, and the final harvest of this essential grain.",
    "id": 6,
    "category": "agriculture"
  },
  {
    "img": "images/2.png",
    "icon_path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
    "title": "Pottery",
    "short": "Shape creativity and build skills with clay.",
    "full": "Pottery improves children's motor skills by giving them the chance to engage their arm and hand muscles. As they learn how to manipulate the clay, they will discover that their hands can be powerful creative tools. Shape creativity and build essential skills with clay in this hands-on pottery workshop.",
    "id": 7,
    "category": "agriculture"
  },
  {
    "img": "images/6.png",
    "icon_path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
    "title": "Reservoir Working Model",
    "short": "See how dams work and generate electricity.",
    "full": "Witness a live working model of a dam. Understand different types of dams in India \u2014 manual and automatic \u2014 and how electricity is generated. See how dams work and generate electricity in this interactive engineering demonstration.",
    "id": 8,
    "category": "heritage_tech"
  },
  {
    "img": "images/7.png",
    "icon_path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
    "title": "Persian Wheel",
    "short": "Learn ancient irrigation technology in action.",
    "full": "Witness one of the oldest irrigation tools, operated by draught animals to lift water from wells. Known as the Sakia, mentioned even in ancient Sanskrit texts. In Sanskrit the word Aragha\u1e6d\u1e6da has been used to describe the Persian Wheel. Learn ancient irrigation technology in action.",
    "id": 9,
    "category": "heritage_tech"
  },
  {
    "img": "images/8.png",
    "icon_path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
    "title": "Archimedes Screw",
    "short": "See how this tool lifts water for irrigation.",
    "full": "One of the oldest tools used to transport water from low-lying areas to irrigation ditches. The design is so effective that it is still being used today. For instance, it is used to lift wastewater in water treatment plants and even to lift water in some amusement park rides.",
    "id": 10,
    "category": "heritage_tech"
  },
  {
    "img": "images/9.png",
    "icon_path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
    "title": "Vintage Borewell",
    "short": "Explore traditional water extraction methods.",
    "full": "Experience the Vintage Hand Borewell used to draw water for domestic needs \u2014 a rare sight in today's modern world. Explore traditional water extraction methods and understand how communities accessed water before modern pumps.",
    "id": 11,
    "category": "heritage_tech"
  },
  {
    "img": "images/11.png",
    "icon_path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
    "title": "Vintage Domestic Water Well",
    "short": "Experience old-style domestic water systems.",
    "full": "Experience the vintage domestic water well equipped with a wooden wheel, rope, and small bucket to learn about the olden days water-fetching system. Experience old-style domestic water systems and appreciate modern conveniences.",
    "id": 12,
    "category": "heritage_tech"
  },
  {
    "img": "images/19.png",
    "icon_path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
    "title": "Mota Bavi",
    "short": "A timeless testament to traditional water techniques.",
    "full": "A timeless well standing as a testament to traditional water-drawing techniques, where communities gathered and life flowed with every drawn bucket. Understand the importance of community water sources in rural life.",
    "id": 13,
    "category": "heritage_tech"
  },
  {
    "img": "images/20.png",
    "icon_path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
    "title": "Rain Water Harvesting Pit",
    "short": "Learn water conservation for a sustainable future.",
    "full": "A rainwater harvesting pit designed for school children to learn the importance of conserving water for a sustainable future. Saving every drop \u2014 understand how rainwater harvesting helps recharge groundwater and supports sustainable living.",
    "id": 14,
    "category": "agriculture"
  },
  {
    "img": "images/23.png",
    "icon_path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
    "title": "Hay Trampoline",
    "short": "Jump into joy and make unforgettable memories.",
    "full": "School children find simple pleasures jumping on a haystack, where laughter fills the air and unforgettable memories are made. Leaping into joy \u2014 experience the simple pleasure of jumping on a haystack!",
    "id": 15,
    "category": "experiences"
  },
  {
    "img": "images/13.png",
    "icon_path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
    "title": "Poly House Farming",
    "short": "Experience modern greenhouse farming techniques.",
    "full": "Experience modern greenhouse-style poly house farming and understand how controlled environments boost crop yields year-round. Learn about temperature control, humidity management, and how modern farming maximizes productivity.",
    "id": 16,
    "category": "agriculture"
  },
  {
    "img": "images/10.png",
    "icon_path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
    "title": "Vintage Farmer's Watch Tower",
    "short": "Understand its role in farming life.",
    "full": "Experience the watch towers used by farmers in olden days to guard their crops and survey their fields from height. Understand its role in traditional farming life and crop protection strategies.",
    "id": 17,
    "category": "experiences"
  },
  {
    "img": "images/12.png",
    "icon_path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
    "title": "Hand Grinding",
    "short": "Try hand grinding and learn about ancient tools.",
    "full": "Warm up with an ancient hand grinding machine and understand the mechanism used before the invention of electric grinders. Try hand grinding and learn about ancient tools that were once essential in every household.",
    "id": 18,
    "category": "heritage_tech"
  },
  {
    "img": "images/17.png",
    "icon_path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
    "title": "Birds Nest Exploration",
    "short": "Witness real bird nests and their artistry.",
    "full": "Birds are nature's premier architects. Witness real bird nests and understand the artistry and engineering behind these natural homes. Using a dazzling array of talents to build functional homes, they are the originators of green architecture.",
    "id": 19,
    "category": "animals"
  },
  {
    "img": "images/22.png",
    "icon_path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
    "title": "Vegetable Field Exploration",
    "short": "Discover the journey from farm to fork.",
    "full": "A hands-on vegetable field exploration where students learn the journey from farm to fork and discover the roots of nutrition. Discover the roots of nutrition and understand how fresh vegetables make their way to your plate.",
    "id": 20,
    "category": "agriculture"
  },
  {
    "img": "images/15.png",
    "icon_path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
    "title": "Bullock Cart Experience",
    "short": "Enjoy a classic vintage cart ride.",
    "full": "Enjoy the classic, vintage Bullock Cart Experience \u2014 just the way farmers transported goods in rural India for centuries. Experience the charm of a bygone era and understand traditional transportation.",
    "id": 21,
    "category": "experiences"
  },
  {
    "img": "images/14.png",
    "icon_path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
    "title": "Tractor Ride",
    "short": "Enjoy the farmer's joy ride through the fields.",
    "full": "Enjoy the joy ride in the farmer's car and experience the life of a one-day farmer as you traverse the farm fields. Feel the thrill of a tractor ride and see the farm from a farmer's perspective.",
    "id": 22,
    "category": "experiences"
  },
  {
    "img": "images/24.png",
    "icon_path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
    "title": "DJ Music, Dance & Fun Activities",
    "short": "Unwind in rhythm after a day of learning.",
    "full": "Unwinding in rhythm. After a day of learning and exploration, DJ music and dance offer students the perfect way to relax, celebrate, and bond. The perfect way to relax, celebrate, and bond with friends after a day full of farm learning.",
    "id": 23,
    "category": "experiences"
  }
];
