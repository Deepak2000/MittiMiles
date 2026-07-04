export interface DestinationData {
  destinationName: string;
  stateOrRegion: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  tagline: string;
  description: string;
  lore: {
    title: string;
    story: string;
  };
  crafts: Array<{
    name: string;
    description: string;
    location: string;
  }>;
  food: Array<{
    name: string;
    description: string;
  }>;
  heritageSights: Array<{
    name: string;
    description: string;
    historicalEra: string;
  }>;
  itinerary: Array<{
    timeSlot: string;
    activity: string;
    localTip: string;
  }>;
  locationValidation?: {
    isValid: boolean;
    message?: string;
    suggestions?: string[];
  };
}

export const fallbackDestinations: Record<string, DestinationData> = {
  bishnupur: {
    destinationName: "Bishnupur",
    stateOrRegion: "West Bengal",
    coordinates: {
      lat: 23.0678,
      lng: 87.3175,
    },
    tagline: "The terracotta town of temples and master weavers",
    description: "Bishnupur is famous for its unique terracotta temples built by the Malla kings, and its traditional hand-woven Baluchari silk sarees depicting epics.",
    lore: {
      title: "The Clay That Speaks of Kings",
      story: "Long ago, because stone was scarce in the alluvial plains of Bengal, the local Malla kings commissioned artisans to bake local red clay into exquisite tiles to adorn the walls of temples dedicated to Radha-Krishna. Each tile narrates tales of ancient folklore, musical ragas, and classical epics, transforming dry earth into a living historical record.",
    },
    crafts: [
      {
        name: "Terracotta Pottery & Horse Dolls",
        description: "Created by local Kumbhakar artisans, these stylized long-eared clay horses are symbols of local folklore and religious offerings.",
        location: "Panchmura Village (20km from Bishnupur town center)",
      },
      {
        name: "Baluchari Saree Weaving",
        description: "Intricately hand-woven silk sarees that depict scenes from ancient Indian mythologies on their pallu (outer draping edge).",
        location: "Tantipara Weaving Cluster, Bishnupur",
      }
    ],
    food: [
      {
        name: "Posto-er Bora (Poppy Seed Fritters)",
        description: "Poppy seeds are ground into a rich paste, mixed with local green chilies and onions, and fried to a golden crisp in native mustard oil.",
      },
      {
        name: "Mecha Sandesh",
        description: "A traditional sweet made of parched gram flour, clarified butter (ghee), and sugar, prepared uniquely in the Bishnupur region.",
      }
    ],
    heritageSights: [
      {
        name: "Rasmancha",
        description: "The oldest brick temple in Bishnupur, featuring a unique pyramidal structure and an arcaded gallery where deities were displayed during the Rash festival.",
        historicalEra: "1600 AD (Malla Dynasty)",
      },
      {
        name: "Shyam Rai Temple",
        description: "Known for its five towers (Pancha-ratna) and highly detailed terracotta panels depicting scenes from the Ramayana, Mahabharata, and Krishna-Lila.",
        historicalEra: "1643 AD (Malla Dynasty)",
      },
      {
        name: "Jorebangla Temple",
        description: "Features a double-hut style roof (do-chala fused together) characteristic of Bengal architecture, decorated with detailed carvings of battles and royal hunts.",
        historicalEra: "1655 AD (Malla Dynasty)",
      }
    ],
    itinerary: [
      {
        timeSlot: "Morning",
        activity: "Explore the Shyam Rai and Rasmancha terracotta temples to admire the detailed brickwork carvings.",
        localTip: "Hire a local registered cycle-rickshaw guide right outside the station to support the local community directly.",
      },
      {
        timeSlot: "Afternoon",
        activity: "Visit the weaving cottages of Baluchari weavers, observe the jacquard loom cards, and purchase directly from the cooperative.",
        localTip: "Always buy directly from weaver cooperatives to ensure 100% of fair wages benefit the artisan families.",
      },
      {
        timeSlot: "Evening",
        activity: "Attend a live sitar performance or learn about the Bishnupur Gharana, the only classical music school (Gharana) of Bengal.",
        localTip: "Ask locals for a visit to the Bishnupur Music College, which has a small museum of ancient musical instruments.",
      }
    ],
    locationValidation: {
      isValid: true,
    }
  },
  chettinad: {
    destinationName: "Chettinad",
    stateOrRegion: "Tamil Nadu",
    coordinates: {
      lat: 10.1256,
      lng: 78.7834,
    },
    tagline: "Grand mansions, hand-crafted tiles, and culinary legends",
    description: "Chettinad is a historical region famous for its massive 19th-century merchant mansions, Athangudi clay tiles, and spicy, aromatic local gastronomy.",
    lore: {
      title: "Mansions of Burma Teak and Egg-White Walls",
      story: "The wealthy Nattukottai Chettiars built grand palatial mansions importing teak from Burma, satin-smooth marble from Italy, and crystal chandeliers from Europe. The plastering of these walls was made using a unique blend of lime, egg whites, and shells, resulting in walls that remain cool and glossily reflective even after a century.",
    },
    crafts: [
      {
        name: "Athangudi Handmade Tiles",
        description: "Locally manufactured sand tiles colored with organic dyes and hand-cast individually in glass frames to obtain a unique sheen.",
        location: "Athangudi Village (12km from Karaikudi)",
      },
      {
        name: "Kandangi Saree Weaving",
        description: "Coarse cotton sarees woven on handlooms, known for their bright contrasting border patterns and high durability.",
        location: "Karaikudi Handloom Cooperative, Karaikudi",
      }
    ],
    food: [
      {
        name: "Chettinad Chicken Pepper Fry",
        description: "A classic dish prepared with fresh stone-ground spices including fennel, peppercorns, cumin, and star anise.",
      },
      {
        name: "Kuzhi Paniyaram",
        description: "Fritters made of fermented rice and black lentils batter, cooked in a special cast-iron mold with multiple small cavities.",
      }
    ],
    heritageSights: [
      {
        name: "Chettinad Palace",
        description: "An outstanding example of Chettinad architecture, combining European grandeur with Tamil layouts, featuring Burmese teak woodwork and Belgian glass mirrors.",
        historicalEra: "Built in 1912 by Raja Sir Annamalai Chettiar",
      },
      {
        name: "Thirumayam Fort",
        description: "An ancient hilltop fortress offering panoramic views, featuring historical rock-cut Shiva and Vishnu temples at its base.",
        historicalEra: "1687 AD (Sethupathi Dynasty)",
      }
    ],
    itinerary: [
      {
        timeSlot: "Morning",
        activity: "Visit the Athangudi tile workshops and watch artisans hand-pour liquid pigment onto glass molds.",
        localTip: "You can try making a tile yourself under an artisan's guidance for a small donation.",
      },
      {
        timeSlot: "Afternoon",
        activity: "Take a walking tour of the grand mansions in Kanadukathan, checking out the Burma teak columns and Belgian mirrors.",
        localTip: "Respect local signs. Some mansions are private homes, but caretakers will open doors for a small entry tip.",
      },
      {
        timeSlot: "Evening",
        activity: "Dine at an authentic local mess serving Chettinad meals on a banana leaf.",
        localTip: "Request 'Kavuni Arisi', a unique sweet black rice pudding native to Chettiar household festivals.",
      }
    ],
    locationValidation: {
      isValid: true,
    }
  },
  hampi: {
    destinationName: "Hampi",
    stateOrRegion: "Karnataka",
    coordinates: {
      lat: 15.3350,
      lng: 76.4600,
    },
    tagline: "Whispering stone ruins and mythical river crossings",
    description: "Hampi is a UNESCO World Heritage site showcasing the ruins of the Vijayanagara Empire amidst a dramatic, boulder-strewn landscape.",
    lore: {
      title: "The Pillars That Sing",
      story: "Within the Vittala Temple complex stands a hall with 56 musical pillars. When tapped gently by ancient priests, these solid granite pillars emitted clear, resonant musical notes (Swaras) that carried across the temple courtyard. Legend says the musicians used these stone pillars to accompany traditional dances performed in front of the deity.",
    },
    crafts: [
      {
        name: "Lambani Embroidery & Mirror Work",
        description: "Intricate needlework with mirrors and beads created by the women of the local nomadic Lambani tribe.",
        location: "Lambani Artisan Clusters near Hampi (Sandur Crafts)",
      },
      {
        name: "Banana Fiber Handloom Weaving",
        description: "Eco-friendly bags, mats, and accessories crafted from discarded agricultural banana plant stems.",
        location: "Anegundi Village (across the Tungabhadra river)",
      }
    ],
    food: [
      {
        name: "Sajjige Roti",
        description: "A crisp flatbread made of semolina (rawa) and mixed with local herbs, served with coconut chutney.",
      },
      {
        name: "Tungabhadra Fish Curry",
        description: "Freshly caught river fish cooked in a tangy tamarind and spicy coconut gravy, prepared by riverbank families.",
      }
    ],
    heritageSights: [
      {
        name: "Virupaksha Temple",
        description: "The sacred center of Hampi dedicated to Shiva, featuring a towering 160-foot entrance gopuram and ancient ceiling paintings.",
        historicalEra: "Built in the 7th Century; expanded in 1510 AD",
      },
      {
        name: "Vittala Temple Complex",
        description: "The architectural pinnacle of Hampi, famous for its stone chariot, pillared halls, and musical stone columns.",
        historicalEra: "15th-16th Century (Vijayanagara Empire)",
      },
      {
        name: "Lotus Mahal & Elephant Stables",
        description: "A secure royal enclosure showing Indo-Islamic architectural styles, featuring highly symmetric arched dome structures.",
        historicalEra: "16th Century (Vijayanagara Empire)",
      }
    ],
    itinerary: [
      {
        timeSlot: "Morning",
        activity: "Watch the sunrise over Hampi's boulder landscape from Matanga Hill, then walk through the Hampi Bazaar ruins.",
        localTip: "Matanga Hill is steep; wear high-traction shoes and carry a water bottle.",
      },
      {
        timeSlot: "Afternoon",
        activity: "Cross the river in a traditional coracle (circular bamboo boat) to Anegundi to visit the banana fiber weaving cooperative.",
        localTip: "Always wear the provided life jacket in coracles. Anegundi is less crowded and retains rich ancient village layout.",
      },
      {
        timeSlot: "Evening",
        activity: "Explore the Virupaksha Temple, which has been in active worship since the 7th century.",
        localTip: "Don't miss the temple elephant Laxmi's blessing ritual in the temple courtyard at dusk.",
      }
    ],
    locationValidation: {
      isValid: true,
    }
  }
};

export function getFallbackDestination(query: string): DestinationData {
  const normalized = query.toLowerCase().trim();
  if (normalized.includes("bishnupur") || normalized.includes("bengal") || normalized.includes("pottery") || normalized.includes("saree")) {
    return fallbackDestinations.bishnupur;
  }
  if (normalized.includes("chettinad") || normalized.includes("nadu") || normalized.includes("karaikudi") || normalized.includes("tile")) {
    return fallbackDestinations.chettinad;
  }
  return fallbackDestinations.hampi;
}
