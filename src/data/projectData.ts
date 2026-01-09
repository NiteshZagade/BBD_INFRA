export type ProjectDetail = {
  name: string;
  value: string;
  location: string;
  sector: string;
  status: string;
  scope: string[];
  impact: string;
};

const projectData: Record<string, ProjectDetail> = {
  "wani-water-supply": {
    name: "Wani Water Supply Scheme",
    value: "₹140.62 Crores",
    location: "Wani, Yavatmal District, Maharashtra",
    sector: "Water Supply",
    status: "On-Going",
    scope: [
      "Construction of intake wells and pumping stations",
      "Laying of transmission and distribution pipelines",
      "Development of storage reservoirs and ESRs",
      "Electro-mechanical works and commissioning",
    ],
    impact:
      "Ensured sustainable drinking water supply, reduced dependency on seasonal sources, and strengthened long-term urban water resilience.",
  },
  "indapur-cc-road": {
    name: "Indapur CC Road Project",
    value: "₹104.90 Crores",
    location: "Indapur Municipal Council, Pune District",
    sector: "Urban Road Infrastructure",
    status: "On-Going",
    scope: [
      "Construction of cement concrete urban road network",
      "RCC drains and footpaths",
      "Junction improvements and safety upgrades",
    ],
    impact:
      "Improved urban mobility, reduced maintenance costs, enhanced safety, and upgraded municipal road infrastructure.",
  },
  "pandharkawda-water-supply": {
    name: "Pandharkawda Water Supply Scheme",
    value: "₹68.44 Crores",
    location: "Pandharkawda, Yavatmal District",
    sector: "Water Supply",
    status: "On-Going",
    scope: [
      "Augmentation of water source and pumping systems",
      "Pipeline network across multiple zones",
      "Storage and distribution infrastructure",
    ],
    impact:
      "Improved water accessibility across multiple wards, enhanced public health outcomes, and reduced operational water losses.",
  },
  "sh-390-road-improvement": {
    name: "SH-390 Road Improvement Project (New NH-753)",
    value: "₹55 Crores",
    location: "Chikhali & Mehkar Taluka, Buldhana District, Maharashtra",
    sector: "State Highway / Major Road Infrastructure",
    status: "On-Going",
    scope: [
      "Project stretch: Amdapur – Janepahal – Lonigawli – Ghatbori – Januna – Pangarkhed – Belgaon – Kenwad (KM 37+000 to KM 48+818)",
      "Widening and strengthening of existing carriageway",
      "Pavement rehabilitation and surface improvement",
      "Construction of side drains and shoulder strengthening",
      "Road safety features including signage and markings",
      "Improvement of riding quality for heavy and commercial traffic",
    ],
    impact:
      "Improved inter-district connectivity, reduced travel time and vehicle operating costs, enhanced safety on a key corridor, and boosted economic activity in rural and semi-urban areas.",
  },
  "painganga-river-bridge": {
    name: "Painganga River Bridge Project",
    value: "₹25 Crores",
    location: "Across Painganga River, Buldhana District, Maharashtra",
    sector: "Major Bridge Infrastructure",
    status: "On-Going",
    scope: [
      "Construction of 350 m long river bridge structure",
      "Substructure works including piers and foundations",
      "Superstructure construction with RCC / PSC elements",
      "Approach roads and embankment works",
      "Safety barriers, expansion joints, and drainage systems",
    ],
    impact:
      "All-weather connectivity across the Painganga River, reduced dependency on seasonal crossings, improved movement of goods and people, and strengthened regional economic linkage.",
  },
  "wani-modern-auditorium": {
    name: "Wani Modern Auditorium",
    value: "₹12 Crores",
    location: "Wani, Yavatmal District, Maharashtra",
    sector: "Urban Cultural Infrastructure",
    status: "On-Going",
    scope: [
      "Construction of a modern 600-seater auditorium",
      "Interior fit-outs including stage, seating, and acoustic treatment",
      "Energy-efficient lighting and HVAC systems",
      "Fire safety, accessibility and crowd management provisions",
      "Site development and utility integration",
    ],
    impact:
      "A state-of-the-art cultural and community hub supporting performing arts and public events, integrating sustainable and energy-efficient design principles.",
  },
};

export default projectData;
