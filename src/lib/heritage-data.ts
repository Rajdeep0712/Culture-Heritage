export interface District {
  id: string;
  name: string;
  craft: string;
  area: string;
  description: string;
  tags: string[];
  artisansLeft: number;
}

export interface State {
  id: string;
  name: string;
  tagline: string;
  districts?: District[];
  documented: boolean;
  knownCrafts?: string[];
}

export const states: State[] = [
  {
    id: "rajasthan",
    name: "Rajasthan",
    tagline: "Land of kings and color",
    documented: true,
    districts: [
      {
        id: "jaipur",
        name: "Jaipur",
        craft: "Block Printing",
        area: "Sanganer & Bagru belt",
        description:
          "For over 400 years, the Sanganer and Bagru belt has been the heart of hand block printing. Artisans carve intricate teak blocks and stamp natural-dye patterns onto cotton — a craft passed through generations of Khatri families.",
        tags: ["Block Printing", "Natural Dye", "Cotton"],
        artisansLeft: 42,
      },
      {
        id: "jodhpur",
        name: "Jodhpur",
        craft: "Bandhani Tie-Dye",
        area: "Old City & Soorsagar",
        description:
          "Bandhani is the ancient art of tying tiny knots on fabric before dyeing, creating dotted patterns. In Jodhpur's old city, master artisans produce ceremonial turbans and sarees using techniques unchanged since the 6th century.",
        tags: ["Bandhani", "Tie-Dye", "Silk"],
        artisansLeft: 28,
      },
      {
        id: "barmer",
        name: "Barmer",
        craft: "Embroidery & Mirror Work",
        area: "Thar Desert villages",
        description:
          "In the remote Thar desert villages around Barmer, women embroider vivid geometric patterns with tiny mirrors stitched into the fabric. Each piece tells a story of desert life, weddings, and festivals.",
        tags: ["Embroidery", "Mirror Work", "Textile"],
        artisansLeft: 35,
      },
    ],
  },
  {
    id: "gujarat",
    name: "Gujarat",
    tagline: "Where thread becomes poetry",
    documented: true,
    districts: [
      {
        id: "kutch",
        name: "Kutch",
        craft: "Mirror Embroidery & Rogan",
        area: "Nirona & Hodka villages",
        description:
          "The Kutch district is home to the rare Rogan painting craft — painting on fabric with castor-oil-based pigments using only a metal stylus. In Nirona village, a single family preserves this 300-year-old art form.",
        tags: ["Rogan Art", "Mirror Embroidery", "Leather"],
        artisansLeft: 12,
      },
      {
        id: "patan",
        name: "Patan",
        craft: "Patola Silk Weaving",
        area: "Patan town",
        description:
          "Patola is one of the world's most complex weaving traditions — a double-ikat silk saree that takes 6 months to a year to weave. Only two Salvi families in Patan still practice this craft, with fewer than 5 master weavers remaining.",
        tags: ["Patola", "Silk", "Double Ikat"],
        artisansLeft: 5,
      },
      {
        id: "surendranagar",
        name: "Surendranagar",
        craft: "Tangaliya Weaving",
        area: "Bajana & Dasada",
        description:
          "Tangaliya is a unique weaving style where extra weft threads create dotted patterns that look like embroidery. Originally woven for the Dangasia community, it is now practiced by fewer than 30 weavers in the Bajana-Dasada region.",
        tags: ["Tangaliya", "Weaving", "Wool"],
        artisansLeft: 30,
      },
    ],
  },
  {
    id: "west-bengal",
    name: "West Bengal",
    tagline: "Threads of tradition",
    documented: true,
    districts: [
      {
        id: "murshidabad",
        name: "Murshidabad",
        craft: "Silk & Baluchari",
        area: "Bishnupur & Jiaganj",
        description:
          "Baluchari sarees feature mythological scenes woven in silk threads. In Bishnupur, master weavers create these narrative textiles on jacquard looms, a tradition dating to the Mughal-era Nawabs of Bengal.",
        tags: ["Baluchari", "Silk", "Jacquard"],
        artisansLeft: 22,
      },
      {
        id: "nadia",
        name: "Nadia",
        craft: "Clay Dolls & Pottery",
        area: "Krishnanagar",
        description:
          "Krishnanagar in Nadia district is famous for its miniature clay dolls — tiny figures depicting everyday life, crafted with astonishing realism. The artisans use local Ganges clay and natural pigments.",
        tags: ["Clay Dolls", "Pottery", "Folk Art"],
        artisansLeft: 18,
      },
    ],
  },
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    tagline: "Temples in thread and stone",
    documented: true,
    districts: [
      {
        id: "kancheepuram",
        name: "Kancheepuram",
        craft: "Silk Saree Weaving",
        area: "Kancheepuram town",
        description:
          "Kancheepuram silk sarees are woven with pure mulberry silk and zari (gold thread). The town has been a weaving center since the Pallava dynasty. Each saree carries temple-border motifs inspired by the city's ancient temples.",
        tags: ["Silk", "Zari", "Temple Border"],
        artisansLeft: 55,
      },
      {
        id: "tanjore",
        name: "Thanjavur",
        craft: "Tanjore Painting",
        area: "Thanjavur town",
        description:
          "Tanjore paintings are classical South Indian art featuring gods and goddesses adorned with gold leaf and semi-precious stones. The craft flourished under the Maratha rulers of Thanjavur in the 16th century.",
        tags: ["Tanjore Painting", "Gold Leaf", "Classical Art"],
        artisansLeft: 25,
      },
    ],
  },
  {
    id: "odisha",
    name: "Odisha",
    tagline: "Sculpted in stone and song",
    documented: false,
    knownCrafts: [
      "Pipili Applique Work (Pipili)",
      "Pattachitra Painting (Raghurajpur)",
      "Stone Carving (Puri)",
      "Silver Filigree (Cuttack)",
    ],
  },
  {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    tagline: "The loom of empires",
    documented: false,
    knownCrafts: [
      "Banarasi Silk Weaving (Varanasi)",
      "Chikankari Embroidery (Lucknow)",
      "Brassware (Moradabad)",
      "Marble Inlay (Agra)",
    ],
  },
  {
    id: "karnataka",
    name: "Karnataka",
    tagline: "Sandalwood and silk",
    documented: false,
    knownCrafts: [
      "Mysore Silk (Mysuru)",
      "Sandalwood Carving (Mysuru)",
      "Kinhal Toys (Koppal)",
      "Lambadi Embroidery (Bellary)",
    ],
  },
];

export interface MediaItem {
  caption: string;
  query: string;
}

export const heritageMedia: MediaItem[] = [
  { caption: "Block printing in Sanganer, Rajasthan", query: "indian block printing fabric" },
  { caption: "Patola weaving in Patan, Gujarat", query: "indian silk weaving loom" },
  { caption: "Tanjore painting in Thanjavur", query: "indian classical painting art" },
  { caption: "Bandhani tie-dye in Jodhpur", query: "indian tie dye fabric colorful" },
  { caption: "Clay dolls of Krishnanagar", query: "indian clay pottery craft" },
];

export const trustStats = {
  artisansDocumented: 248,
  districtsMapped: 37,
  endangeredCrafts: 14,
  languagesSupported: 6,
};

export interface TutorialStep {
  title: string;
  description: string;
  query: string;
  narration: string;
}

export const commonTutorialSteps: TutorialStep[] = [
  {
    title: "Welcome to Sutr",
    description: "A marketplace built to preserve India's vanishing crafts. Every purchase directly supports an artisan family.",
    query: "indian artisan craft textile",
    narration: "Welcome to Sutr. This is a marketplace built to preserve India's vanishing crafts. Every purchase directly supports an artisan family.",
  },
  {
    title: "Voice Navigation",
    description: "Tap the microphone icon to turn on voice guide. Say 'marketplace', 'story map', or 'home' to navigate hands-free.",
    query: "person speaking microphone",
    narration: "Tap the microphone icon to turn on the voice guide. You can say marketplace, story map, or home to navigate hands-free.",
  },
];

export const artisanTutorialSteps: TutorialStep[] = [
  {
    title: "Record Your Product",
    description: "Use your phone to photograph your craft and list it in minutes. No paperwork, no middlemen.",
    query: "artisan hands working craft",
    narration: "Use your phone to photograph your craft and list it in minutes. No paperwork, no middlemen.",
  },
  {
    title: "Get Paid Directly",
    description: "When a buyer purchases, the payment goes straight to your account. Zero commission, full transparency.",
    query: "indian artisan smiling workshop",
    narration: "When a buyer purchases your product, the payment goes straight to your account. Zero commission, full transparency.",
  },
];

export const buyerTutorialSteps: TutorialStep[] = [
  {
    title: "Explore Heritage",
    description: "Browse states, districts, and crafts. Learn the story behind each piece before you buy.",
    query: "indian textile market colorful",
    narration: "Browse states, districts, and crafts. Learn the story behind each piece before you buy.",
  },
  {
    title: "Meet the Maker",
    description: "Every product comes with a QR code linking you to the artisan who made it. Know the hands behind your purchase.",
    query: "indian craftsman portrait",
    narration: "Every product comes with a QR code linking you to the artisan who made it. Know the hands behind your purchase.",
  },
];
